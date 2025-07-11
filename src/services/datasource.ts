import prisma from "@/lib/prisma";
import {
    CreateDatasourceDTO,
    CreateGithubDatasourceDTO,
    CreateLocalDatasourceDTO,
    CreateS3DatasourceDTO,
    Datasource,
    DatasourceTypes,
    GithubDatasource,
    LocalDatasource,
    S3Datasource
} from "@/models/datasource";
import fs from 'fs';
import path from 'path';

// Type guards for validation
function isCreateLocalDatasourceDTO(dto: CreateDatasourceDTO): dto is CreateLocalDatasourceDTO {
    return dto.type === DatasourceTypes.LOCAL && 'path' in dto && typeof dto.path === 'string';
}

function isCreateGithubDatasourceDTO(dto: CreateDatasourceDTO): dto is CreateGithubDatasourceDTO {
    return dto.type === DatasourceTypes.GITHUB &&
        'repository' in dto && typeof dto.repository === 'string' &&
        'branch' in dto && typeof dto.branch === 'string' &&
        'credentialsId' in dto && typeof dto.credentialsId === 'number';
}

function isCreateS3DatasourceDTO(dto: CreateDatasourceDTO): dto is CreateS3DatasourceDTO {
    return dto.type === DatasourceTypes.S3 &&
        'bucketName' in dto && typeof dto.bucketName === 'string' &&
        'region' in dto && typeof dto.region === 'string' &&
        'credentialsId' in dto && typeof dto.credentialsId === 'number';
}

function transformDatasource(datasource: any): Datasource | LocalDatasource | GithubDatasource | S3Datasource {
    const base = {
        id: datasource.id,
        name: datasource.name,
        type: datasource.type as DatasourceTypes,
        description: datasource.description,
        createdAt: datasource.createdAt.toISOString(),
        updatedAt: datasource.updatedAt.toISOString(),
        createdBy: datasource.createdBy,
        updatedBy: datasource.updatedBy,
    };

    switch (datasource.type) {
        case DatasourceTypes.LOCAL:
            return {
                ...base,
                type: DatasourceTypes.LOCAL,
                path: datasource.localDatasource?.path || '',
            } as LocalDatasource;
        case DatasourceTypes.GITHUB:
            return {
                ...base,
                type: DatasourceTypes.GITHUB,
                repository: datasource.githubDatasource?.repository || '',
                branch: datasource.githubDatasource?.branch || '',
                credentialsId: datasource.githubDatasource?.credentialsId || 0,
            } as GithubDatasource;
        case DatasourceTypes.S3:
            return {
                ...base,
                type: DatasourceTypes.S3,
                bucketName: datasource.s3Datasource?.bucketName || '',
                region: datasource.s3Datasource?.region || '',
                credentialsId: datasource.s3Datasource?.credentialsId || 0,
            } as S3Datasource;
        default:
            return base;
    }
}

export async function getDatasources(): Promise<(Datasource | LocalDatasource | GithubDatasource | S3Datasource)[]> {
    const datasources = await prisma.datasource.findMany({
        include: {
            localDatasource: true,
            githubDatasource: true,
            s3Datasource: true,
        }
    });
    return datasources.map(transformDatasource);
}

export async function createDatasource(dto: CreateDatasourceDTO): Promise<Datasource> {
    let targetPath = '';

    switch (dto.type) {
        case DatasourceTypes.GITHUB:
            if (!isCreateGithubDatasourceDTO(dto)) {
                throw new Error('Invalid GitHub datasource DTO: missing repository, branch, or credentialsId');
            }
            const githubCredentials = await prisma.githubCredentials.findUnique({
                where: { id: dto.credentialsId }
            });
            if (!githubCredentials) {
                throw new Error(`GitHub credentials with id ${dto.credentialsId} not found`);
            }
            break;

        case DatasourceTypes.LOCAL:
            if (!isCreateLocalDatasourceDTO(dto)) {
                throw new Error('Invalid Local datasource DTO: missing path');
            }
            if (!fs.existsSync(dto.path)) {
                throw new Error(`Local path ${dto.path} does not exist`);
            }
            targetPath = path.resolve(dto.path);
            break;

        case DatasourceTypes.S3:
            if (!isCreateS3DatasourceDTO(dto)) {
                throw new Error('Invalid S3 datasource DTO: missing bucketName, region, or credentialsId');
            }
            const s3Credentials = await prisma.s3Credentials.findUnique({
                where: { id: dto.credentialsId }
            });
            if (!s3Credentials) {
                throw new Error(`S3 credentials with id ${dto.credentialsId} not found`);
            }
            break;

        default:
            throw new Error(`Unsupported datasource type: ${(dto as any).type}`);
    }

    const taskfiles = scanDirectoryForTaskfiles(targetPath);
    if (taskfiles.length === 0) {
        throw new Error(`No taskfiles found in the specified path: ${targetPath}`);
    }

    const datasource = await prisma.datasource.create({
        data: {
            name: dto.name,
            description: dto.description,
            type: dto.type,
            createdBy: 'system',
            updatedBy: 'system',
        },
    });

    switch (dto.type) {
        case DatasourceTypes.LOCAL:
            await prisma.localDatasource.create({
                data: {
                    path: (dto as CreateLocalDatasourceDTO).path,
                    datasourceId: datasource.id,
                },
            });
            break;
        case DatasourceTypes.GITHUB:
            await prisma.githubDatasource.create({
                data: {
                    repository: (dto as CreateGithubDatasourceDTO).repository,
                    branch: (dto as CreateGithubDatasourceDTO).branch,
                    credentialsId: (dto as CreateGithubDatasourceDTO).credentialsId,
                    datasourceId: datasource.id,
                },
            });
            break;
        case DatasourceTypes.S3:
            await prisma.s3Datasource.create({
                data: {
                    bucketName: (dto as CreateS3DatasourceDTO).bucketName,
                    region: (dto as CreateS3DatasourceDTO).region,
                    credentialsId: (dto as CreateS3DatasourceDTO).credentialsId,
                    datasourceId: datasource.id,
                },
            });
            break;
    }

    return {
        id: datasource.id,
        name: datasource.name,
        type: datasource.type as DatasourceTypes,
        description: datasource.description,
        createdAt: datasource.createdAt.toISOString(),
        updatedAt: datasource.updatedAt.toISOString(),
        createdBy: datasource.createdBy,
        updatedBy: datasource.updatedBy,
    };
}

export async function removeDatasource(id: number): Promise<void> {
    await prisma.datasource.delete({
        where: { id },
    });
}

function scanDirectoryForTaskfiles(dir: string): string[] {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let taskfiles: string[] = [];

    for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            if (file.name !== '.git') {
                const nestedTaskfiles = scanDirectoryForTaskfiles(fullPath);
                taskfiles = [...taskfiles, ...nestedTaskfiles];
            }
        } else if (
            file.name.toLowerCase() === 'taskfile.yml' ||
            file.name.toLowerCase() === 'taskfile.yaml'
        ) {
            taskfiles.push(fullPath);
        }
    }

    return taskfiles;
}

import { Datasource, DatasourceType, User } from "../../generated/prisma";
import { prisma } from "../prismaClient";
import { CreateDatasourceRequest, CreateGitDatasourceRequest, CreateS3DatasourceRequest } from "../schema/datasource";

function validateGitDatasource(data: CreateDatasourceRequest): data is CreateGitDatasourceRequest {
    return data.type === DatasourceType.GITHUB && 'gitCredentialsId' in data;
}

function validateS3Datasource(data: CreateDatasourceRequest): data is CreateS3DatasourceRequest {
    return data.type === DatasourceType.S3 && 's3CredentialsId' in data;
}

function validateDatasourceData(data: CreateDatasourceRequest): void {
    if (validateGitDatasource(data) || validateS3Datasource(data)) {
        return;
    } else if (data.type === DatasourceType.LOCAL) {
        return;
    } else {
        throw new Error(`Invalid datasource type: ${data.type}`);
    }
}

export async function getDatasources(): Promise<Datasource[]> {
    return await prisma.datasource.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export async function getDatasourceById(id: number): Promise<Datasource | null> {
    return await prisma.datasource.findUnique({
        where: { id },
    });
}

export async function createDatasource(user: User, data: CreateDatasourceRequest): Promise<Datasource> {
    validateDatasourceData(data);

    const baseData = {
        ...data,
        createdBy: user.id,
        updatedBy: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    return await prisma.datasource.create({
        data: baseData
    });
}
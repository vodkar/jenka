import prisma from "@/lib/prisma";
import {
    CreateGithubCredentialsDTO,
    CreateS3CredentialsDTO,
    GithubCredentials,
    S3Credentials
} from "@/models/credentials";

export async function createS3Credentials(dto: CreateS3CredentialsDTO): Promise<S3Credentials> {
    const credentials = await prisma.s3Credentials.create({
        data: {
            accessKeyId: dto.accessKeyId,
            secretAccessKey: dto.secretAccessKey,
            region: dto.region,
            endpointUrl: dto.endpointUrl,
        },
    });

    return {
        id: credentials.id,
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        region: credentials.region,
        endpointUrl: credentials.endpointUrl,
        createdAt: credentials.createdAt.toISOString(),
        updatedAt: credentials.updatedAt.toISOString(),
    };
}

export async function createGithubCredentials(dto: CreateGithubCredentialsDTO): Promise<GithubCredentials> {
    const credentials = await prisma.githubCredentials.create({
        data: {
            token: dto.token,
            address: dto.address,
        },
    });

    return {
        id: credentials.id,
        token: credentials.token,
        address: credentials.address,
        createdAt: credentials.createdAt.toISOString(),
        updatedAt: credentials.updatedAt.toISOString(),
    };
}

export async function getS3Credentials(id: number): Promise<S3Credentials | null> {
    const credentials = await prisma.s3Credentials.findUnique({
        where: { id },
    });

    if (!credentials) return null;

    return {
        id: credentials.id,
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        region: credentials.region,
        endpointUrl: credentials.endpointUrl,
        createdAt: credentials.createdAt.toISOString(),
        updatedAt: credentials.updatedAt.toISOString(),
    };
}

export async function getGithubCredentials(id: number): Promise<GithubCredentials | null> {
    const credentials = await prisma.githubCredentials.findUnique({
        where: { id },
    });

    if (!credentials) return null;

    return {
        id: credentials.id,
        token: credentials.token,
        address: credentials.address,
        createdAt: credentials.createdAt.toISOString(),
        updatedAt: credentials.updatedAt.toISOString(),
    };
}

export async function removeS3Credentials(id: number): Promise<void> {
    await prisma.s3Credentials.delete({
        where: { id },
    });
}

export async function removeGithubCredentials(id: number): Promise<void> {
    await prisma.githubCredentials.delete({
        where: { id },
    });
}

import { S3Credentials, User } from "../../generated/prisma";
import { prisma } from "../prismaClient";
import { CreateS3CredentialsRequest } from "../schema/s3Credentials";

export async function getS3Credentials(): Promise<S3Credentials[]> {
    return await prisma.s3Credentials.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export async function getS3CredentialsById(id: number): Promise<S3Credentials | null> {
    return await prisma.s3Credentials.findUnique({
        where: { id },
    });
}

export async function createS3Credentials(user: User, data: CreateS3CredentialsRequest): Promise<S3Credentials> {
    return await prisma.s3Credentials.create({
        data: {
            name: data.name,
            description: data.description,
            accessKey: data.accessKey,
            secretKey: data.secretKey,
            endpointUrl: data.endpointUrl,
            region: data.region,
            createdBy: user.id,
            updatedBy: user.id,
        }
    });
}

export async function updateS3Credentials(user: User, id: number, data: Partial<CreateS3CredentialsRequest>): Promise<S3Credentials> {
    return await prisma.s3Credentials.update({
        where: { id },
        data: {
            ...(data.name && { name: data.name }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.accessKey && { accessKey: data.accessKey }),
            ...(data.secretKey && { secretKey: data.secretKey }),
            ...(data.endpointUrl !== undefined && { endpointUrl: data.endpointUrl }),
            ...(data.region !== undefined && { region: data.region }),
            updatedBy: user.id,
        }
    });
}

export async function deleteS3Credentials(id: number): Promise<void> {
    await prisma.s3Credentials.delete({
        where: { id }
    });
}

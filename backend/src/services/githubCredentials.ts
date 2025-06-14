import { GithubCredentials, User } from "../../generated/prisma";
import { prisma } from "../prismaClient";
import { CreateGithubCredentialsRequest } from "../schema/githubCredentials";

export async function getGithubCredentials(): Promise<GithubCredentials[]> {
    return await prisma.githubCredentials.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export async function getGithubCredentialsById(id: number): Promise<GithubCredentials | null> {
    return await prisma.githubCredentials.findUnique({
        where: { id },
    });
}

export async function createGithubCredentials(user: User, data: CreateGithubCredentialsRequest): Promise<GithubCredentials> {
    return await prisma.githubCredentials.create({
        data: {
            name: data.name,
            description: data.description,
            privateSSHKey: data.privateSSHKey,
            createdBy: user.id,
            updatedBy: user.id,
        }
    });
}

export async function updateGithubCredentials(user: User, id: number, data: Partial<CreateGithubCredentialsRequest>): Promise<GithubCredentials> {
    return await prisma.githubCredentials.update({
        where: { id },
        data: {
            ...(data.name && { name: data.name }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.privateSSHKey !== undefined && { privateSSHKey: data.privateSSHKey }),
            updatedBy: user.id,
        }
    });
}

export async function deleteGithubCredentials(id: number): Promise<void> {
    await prisma.githubCredentials.delete({
        where: { id }
    });
}

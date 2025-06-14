import * as bcrypt from 'bcrypt';
import { User } from "../../generated/prisma";
import { prisma } from "../prismaClient";
import { CreateUserRequest } from "../schema/user";
import { HASH_ROUNDS } from './consts';

export async function getUsers(): Promise<User[]> {
    return await prisma.user.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export async function getUserById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
        where: { id },
    });
}

export async function createUser(data: CreateUserRequest): Promise<User> {
    return await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            hashed_password: bcrypt.hashSync(data.email, HASH_ROUNDS),
        },
    });
}

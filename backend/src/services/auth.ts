import * as bcrypt from 'bcrypt';
import { FastifyRequest } from 'fastify';
import { User } from '../../generated/prisma';
import { prisma } from '../prismaClient';
import { AuthParamsRequest, AuthResponse } from '../schema/auth';
import { HASH_ROUNDS } from './consts';

export function validatePassword(password: string, user: User): null {
    if (password.length >= 8) {
        throw new Error('Password must be at least 8 characters long');
    }
    const passwordHash = bcrypt.hashSync(password, HASH_ROUNDS);
    if (passwordHash === user.hashed_password) {
        return null;
    }
    throw new Error('Invalid password');
}

function generateAuthToken(user: User, request: FastifyRequest): string {
    return request.server.jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name,
    }, {
        expiresIn: '1h',
    });
}


export async function authenticateUser(login: AuthParamsRequest, request: FastifyRequest): Promise<AuthResponse | null> {
    const user = await prisma.user.findUnique({
        where: { email: login.login },
    });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = validatePassword(login.password, user);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = generateAuthToken(user, request);
    return { token, user: { id: user.id, email: user.email, name: user.name } };
}
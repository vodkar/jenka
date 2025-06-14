import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../prismaClient.js';
import { createUser } from '../services/user.js';

export const getUsersHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to fetch users'
        };
    }
};

export const getUserByIdHandler = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const userId = parseInt(request.params.id);
        if (isNaN(userId)) {
            reply.code(400);
            return {
                statusCode: 400,
                error: 'Bad Request',
                message: 'Invalid user ID'
            };
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            reply.code(404);
            return {
                statusCode: 404,
                error: 'Not Found',
                message: 'User not found'
            };
        }

        return user;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to fetch user'
        };
    }
};

export const createUserHandler = async (request: FastifyRequest<{ Body: { email: string; name: string; password: string } }>, reply: FastifyReply) => {
    try {
        const { email, name } = request.body;

        const user = await createUser({
            email,
            name,
            password: request.body.password
        });

        reply.code(201);
        return user;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to create user'
        };
    }
};

export const updateUserHandler = async (request: FastifyRequest<{ Params: { id: string }; Body: { email?: string; name?: string } }>, reply: FastifyReply) => {
    try {
        const userId = parseInt(request.params.id);
        if (isNaN(userId)) {
            reply.code(400);
            return {
                statusCode: 400,
                error: 'Bad Request',
                message: 'Invalid user ID'
            };
        }

        const { email, name } = request.body;

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(email && { email }),
                ...(name && { name })
            }
        });

        return user;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to update user'
        };
    }
};

export const deleteUserHandler = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const userId = parseInt(request.params.id);
        if (isNaN(userId)) {
            reply.code(400);
            return {
                statusCode: 400,
                error: 'Bad Request',
                message: 'Invalid user ID'
            };
        }

        await prisma.user.delete({
            where: { id: userId }
        });

        reply.code(204);
        return;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to delete user'
        };
    }
};

import type { FastifyReply, FastifyRequest } from 'fastify';
import { CreateGithubCredentialsRequest, GithubCredentialsParams } from '../schema/githubCredentials';
import {
    createGithubCredentials,
    deleteGithubCredentials,
    getGithubCredentials,
    getGithubCredentialsById,
    updateGithubCredentials
} from '../services/githubCredentials';

// Mock user for now - should be replaced with actual authentication
const mockUser = {
    id: 1,
    email: 'system@example.com',
    name: 'System',
    hashed_password: '',
    createdAt: new Date(),
    updatedAt: new Date()
};

export const getGithubCredentialsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const credentials = await getGithubCredentials();
        return credentials;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to fetch GitHub credentials'
        };
    }
};

export const getGithubCredentialsByIdHandler = async (request: FastifyRequest<{ Params: GithubCredentialsParams }>, reply: FastifyReply) => {
    try {
        const credentialsId = request.params.id;

        const credentials = await getGithubCredentialsById(credentialsId);

        if (!credentials) {
            reply.code(404);
            return {
                statusCode: 404,
                error: 'Not Found',
                message: 'GitHub credentials not found'
            };
        }

        return credentials;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to fetch GitHub credentials'
        };
    }
};

export const createGithubCredentialsHandler = async (request: FastifyRequest<{ Body: CreateGithubCredentialsRequest }>, reply: FastifyReply) => {
    try {
        const credentials = await createGithubCredentials(mockUser, request.body);

        reply.code(201);
        return credentials;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to create GitHub credentials'
        };
    }
};

export const updateGithubCredentialsHandler = async (request: FastifyRequest<{ Params: GithubCredentialsParams; Body: Partial<CreateGithubCredentialsRequest> }>, reply: FastifyReply) => {
    try {
        const credentialsId = request.params.id;

        const credentials = await updateGithubCredentials(mockUser, credentialsId, request.body);

        return credentials;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to update GitHub credentials'
        };
    }
};

export const deleteGithubCredentialsHandler = async (request: FastifyRequest<{ Params: GithubCredentialsParams }>, reply: FastifyReply) => {
    try {
        const credentialsId = request.params.id;

        await deleteGithubCredentials(credentialsId);

        reply.code(204);
        return;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to delete GitHub credentials'
        };
    }
};

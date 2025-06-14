import type { FastifyReply, FastifyRequest } from 'fastify';
import { CreateS3CredentialsRequest, S3CredentialsParams } from '../schema/s3Credentials';
import {
    createS3Credentials,
    deleteS3Credentials,
    getS3Credentials,
    getS3CredentialsById,
    updateS3Credentials
} from '../services/s3Credentials';

// Mock user for now - should be replaced with actual authentication
const mockUser = {
    id: 1,
    email: 'system@example.com',
    name: 'System',
    hashed_password: '',
    createdAt: new Date(),
    updatedAt: new Date()
};

export const getS3CredentialsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const credentials = await getS3Credentials();
        return credentials;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to fetch S3 credentials'
        };
    }
};

export const getS3CredentialsByIdHandler = async (request: FastifyRequest<{ Params: S3CredentialsParams }>, reply: FastifyReply) => {
    try {
        const credentialsId = request.params.id;

        const credentials = await getS3CredentialsById(credentialsId);

        if (!credentials) {
            reply.code(404);
            return {
                statusCode: 404,
                error: 'Not Found',
                message: 'S3 credentials not found'
            };
        }

        return credentials;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to fetch S3 credentials'
        };
    }
};

export const createS3CredentialsHandler = async (request: FastifyRequest<{ Body: CreateS3CredentialsRequest }>, reply: FastifyReply) => {
    try {
        const credentials = await createS3Credentials(mockUser, request.body);

        reply.code(201);
        return credentials;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to create S3 credentials'
        };
    }
};

export const updateS3CredentialsHandler = async (request: FastifyRequest<{ Params: S3CredentialsParams; Body: Partial<CreateS3CredentialsRequest> }>, reply: FastifyReply) => {
    try {
        const credentialsId = request.params.id;

        const credentials = await updateS3Credentials(mockUser, credentialsId, request.body);

        return credentials;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to update S3 credentials'
        };
    }
};

export const deleteS3CredentialsHandler = async (request: FastifyRequest<{ Params: S3CredentialsParams }>, reply: FastifyReply) => {
    try {
        const credentialsId = request.params.id;

        await deleteS3Credentials(credentialsId);

        reply.code(204);
        return;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to delete S3 credentials'
        };
    }
};

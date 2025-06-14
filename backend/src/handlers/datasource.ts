import type { FastifyReply, FastifyRequest } from 'fastify';
import { DatasourceType } from '../../generated/prisma/index.js';
import { prisma } from '../prismaClient.js';

export const getDatasourcesHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const datasources = await prisma.datasource.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return datasources;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to fetch datasources'
        };
    }
};

export const getDatasourceByIdHandler = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const datasourceId = parseInt(request.params.id);
        if (isNaN(datasourceId)) {
            reply.code(400);
            return {
                statusCode: 400,
                error: 'Bad Request',
                message: 'Invalid datasource ID'
            };
        }

        const datasource = await prisma.datasource.findUnique({
            where: { id: datasourceId }
        });

        if (!datasource) {
            reply.code(404);
            return {
                statusCode: 404,
                error: 'Not Found',
                message: 'Datasource not found'
            };
        }

        return datasource;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to fetch datasource'
        };
    }
};

export const createDatasourceHandler = async (request: FastifyRequest<{ Body: { name: string; description: string; type: DatasourceType, path: string } }>, reply: FastifyReply) => {
    try {
        const { name, description, type, path } = request.body;

        const datasource = await prisma.datasource.create({
            data: {
                name,
                description,
                type,
                createdBy: 1,
                updatedBy: 1,
                path,
            }
        });

        reply.code(201);
        return datasource;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to create datasource'
        };
    }
};

export const updateDatasourceHandler = async (request: FastifyRequest<{ Params: { id: string }; Body: { name?: string; description?: string; type?: string } }>, reply: FastifyReply) => {
    try {
        const datasourceId = parseInt(request.params.id);
        if (isNaN(datasourceId)) {
            reply.code(400);
            return {
                statusCode: 400,
                error: 'Bad Request',
                message: 'Invalid datasource ID'
            };
        }

        const { name, description, type } = request.body;

        const datasource = await prisma.datasource.update({
            where: { id: datasourceId },
            data: {
                ...(name && { name }),
                ...(description && { description }),
                ...(type && { type }),
                updatedBy: 'system'
            }
        });

        return datasource;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to update datasource'
        };
    }
};

export const deleteDatasourceHandler = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const datasourceId = parseInt(request.params.id);
        if (isNaN(datasourceId)) {
            reply.code(400);
            return {
                statusCode: 400,
                error: 'Bad Request',
                message: 'Invalid datasource ID'
            };
        }

        await prisma.datasource.delete({
            where: { id: datasourceId }
        });

        reply.code(204);
        return;
    } catch (error) {
        reply.code(500);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Failed to delete datasource'
        };
    }
};

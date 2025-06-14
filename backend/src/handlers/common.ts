import type { FastifyReply, FastifyRequest } from 'fastify';

export const rootHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'Backend server is running!' };
};

export const healthHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    return {
        status: 'OK',
        timestamp: new Date().toISOString()
    };
};

export const openApiSpecHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    // @ts-ignore - fastify instance will be bound to this context
    return request.server.swagger();
};

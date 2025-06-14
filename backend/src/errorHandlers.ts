import { FastifyReply, FastifyRequest } from "fastify";
import { NotFoundError, UnauthorizedError, ValidationError, WrongCredentialsError } from "./errors";

const handleWrongCredentialsError = (error: WrongCredentialsError, request: FastifyRequest, reply: FastifyReply) => {
    reply.status(401).send({
        error: error.name,
        message: error.message
    });
};

const handleNotFoundError = (error: Error, request: FastifyRequest, reply: FastifyReply) => {
    reply.status(404).send({
        error: 'Not Found',
        message: error.message
    });
};
const handleInternalServerError = (error: Error, request: FastifyRequest, reply: FastifyReply) => {
    console.error('Internal Server Error:', error);
    reply.status(500).send({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred'
    });
};

const handlerValidationError = (error: Error, request: FastifyRequest, reply: FastifyReply) => {
    console.error('Validation Error:', error);
    reply.status(400).send({
        error: 'Bad Request',
        message: error.message
    });
}

const handleUnauthorizedError = (error: Error, request: FastifyRequest, reply: FastifyReply) => {
    console.error('Unauthorized Error:', error);
    reply.status(401).send({
        error: 'Unauthorized',
        message: 'You are not authorized to access this resource'
    });
}

const handleForbiddenError = (error: Error, request: FastifyRequest, reply: FastifyReply) => {
    console.error('Forbidden Error:', error);
    reply.status(403).send({
        error: 'Forbidden',
        message: 'You do not have permission to access this resource'
    });
}

export const handleErrors = (error: Error, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof WrongCredentialsError) {
        return handleWrongCredentialsError(error, request, reply);
    }
    if (error instanceof NotFoundError) {
        return handleNotFoundError(error, request, reply);
    }
    if (error instanceof ValidationError) {
        return handlerValidationError(error, request, reply);
    }
    if (error instanceof UnauthorizedError) {
        return handleUnauthorizedError(error, request, reply);
    }
    return handleInternalServerError(error, request, reply);
};
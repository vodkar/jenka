import { FastifyReply, FastifyRequest } from "fastify";
import { AuthParamsRequest } from "../schema/auth";
import { authenticateUser } from "../services/auth";

export const authHandler = async (request: FastifyRequest<{ Body: AuthParamsRequest }>, reply: FastifyReply) => {
    return await authenticateUser(request.body, request);
}
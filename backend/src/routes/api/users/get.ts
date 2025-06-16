import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { getUsersHandler } from "../../../handlers/user";
import { errorResponseSchema, userResponseSchema } from "../../../schema";

const routes: FastifyPluginAsyncTypebox = async (app: FastifyInstance) => {
    app.get('', {
        schema: {
            summary: 'Get all users',
            description: 'Retrieve a list of all users from the database',
            tags: ['Users'],
            response: {
                200: userResponseSchema,
                500: errorResponseSchema
            }
        }
    }, getUsersHandler);
};

export default routes;
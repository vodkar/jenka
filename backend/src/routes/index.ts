import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import { healthHandler, rootHandler } from "../handlers/common.js";
import { healthResponseSchema, messageResponseSchema } from "../schema/index.js";

const routes: FastifyPluginAsyncTypebox = async (app: FastifyInstance) => {
    app.get('/', {
        schema: {
            summary: 'Root endpoint',
            description: 'Returns a welcome message indicating the server is running',
            response: {
                200: messageResponseSchema
            }
        }
    }, rootHandler);

    app.get('/health', {
        schema: {
            summary: 'Health check endpoint',
            description: 'Returns server health status with timestamp',
            tags: ['Health'],
            response: {
                200: healthResponseSchema
            }
        }
    }, healthHandler);
}

export default routes;
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { getDatasourcesHandler } from "../../../handlers/datasource.js";
import { datasourceListResponseSchema, errorResponseSchema } from "../../../schema/index.js";

const routes: FastifyPluginAsyncTypebox = async (app: FastifyInstance) => {
    app.get('', {
        schema: {
            summary: 'Get all datasources',
            description: 'Retrieve a list of all datasources from the database',
            tags: ['Datasources'],
            response: {
                200: datasourceListResponseSchema,
                500: errorResponseSchema
            }
        }
    }, getDatasourcesHandler);
};

export default routes;

import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { getDatasourceByIdHandler } from "../../../handlers/datasource.js";
import { datasourceParamsSchema, datasourceSchema, errorResponseSchema } from "../../../schema/index.js";

const routes: FastifyPluginAsyncTypebox = async (app: FastifyInstance) => {
    app.get('/:id', {
        schema: {
            summary: 'Get datasource by ID',
            description: 'Retrieve a specific datasource by its ID',
            tags: ['Datasources'],
            params: datasourceParamsSchema,
            response: {
                200: datasourceSchema,
                400: errorResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, getDatasourceByIdHandler);
};

export default routes;

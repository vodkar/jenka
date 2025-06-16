import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { updateDatasourceHandler } from "../../../handlers/datasource.js";
import { datasourceParamsSchema, datasourceSchema, errorResponseSchema, updateDatasourceRequestSchema } from "../../../schema/index.js";

const routes: FastifyPluginAsyncTypebox = async (app: FastifyInstance) => {
    app.put('/:id', {
        schema: {
            summary: 'Update datasource',
            description: 'Update an existing datasource by its ID',
            tags: ['Datasources'],
            params: datasourceParamsSchema,
            body: updateDatasourceRequestSchema,
            response: {
                200: datasourceSchema,
                400: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, updateDatasourceHandler);
};

export default routes;

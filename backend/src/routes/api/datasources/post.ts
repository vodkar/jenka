import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { createDatasourceHandler } from "../../../handlers/datasource.js";
import { createDatasourceRequestSchema, datasourceSchema, errorResponseSchema } from "../../../schema/index.js";

const routes: FastifyPluginAsyncTypebox = async (app: FastifyInstance) => {
    app.post('', {
        schema: {
            summary: 'Create new datasource',
            description: 'Create a new datasource with the provided data',
            tags: ['Datasources'],
            body: createDatasourceRequestSchema,
            response: {
                201: datasourceSchema,
                500: errorResponseSchema
            }
        }
    }, createDatasourceHandler);
};

export default routes;

import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { deleteDatasourceHandler } from "../../../handlers/datasource.js";
import { datasourceParamsSchema, errorResponseSchema } from "../../../schema/index.js";

const routes: FastifyPluginAsyncTypebox = async (app: FastifyInstance) => {
    app.delete('/:id', {
        schema: {
            summary: 'Delete datasource',
            description: 'Delete a datasource by its ID',
            tags: ['Datasources'],
            params: datasourceParamsSchema,
            response: {
                204: { type: 'null' },
                400: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, deleteDatasourceHandler);
};

export default routes;

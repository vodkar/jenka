import Fastify from 'fastify';
import {
    createDatasourceHandler,
    createGithubCredentialsHandler,
    createS3CredentialsHandler,
    deleteDatasourceHandler,
    deleteGithubCredentialsHandler,
    deleteS3CredentialsHandler,
    getDatasourceByIdHandler,
    getDatasourcesHandler,
    getGithubCredentialsByIdHandler,
    getGithubCredentialsHandler,
    getS3CredentialsByIdHandler,
    getS3CredentialsHandler,
    getUsersHandler,
    healthHandler,
    openApiSpecHandler,
    rootHandler,
    updateDatasourceHandler,
    updateGithubCredentialsHandler,
    updateS3CredentialsHandler
} from './handlers/index.js';
import {
    createDatasourceRequestSchema,
    createGithubCredentialsRequestSchema,
    createS3CredentialsRequestSchema,
    datasourceListResponseSchema,
    datasourceParamsSchema,
    datasourceSchema,
    errorResponseSchema,
    githubCredentialsListResponseSchema,
    githubCredentialsParamsSchema,
    githubCredentialsSchema,
    healthResponseSchema,
    messageResponseSchema,
    s3CredentialsListResponseSchema,
    s3CredentialsParamsSchema,
    s3CredentialsSchema,
    updateDatasourceRequestSchema,
    updateGithubCredentialsRequestSchema,
    updateS3CredentialsRequestSchema,
    userResponseSchema
} from './schema/index.js';

const fastify = Fastify({
    logger: true
});

const PORT = Number(process.env.PORT) || 3000;

// Register Swagger plugin for automatic documentation generation
await fastify.register(import('@fastify/swagger'), {
    openapi: {
        openapi: '3.0.0',
        info: {
            title: 'Jenka API',
            description: 'Automatically generated API documentation from route schemas',
            version: '1.0.0'
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Development server'
            }
        ],
        tags: [
            { name: 'Health', description: 'Health check endpoints' },
            { name: 'Users', description: 'User management endpoints' },
            { name: 'Datasources', description: 'Datasource management endpoints' },
            { name: 'S3 Credentials', description: 'S3 credentials management endpoints' },
            { name: 'GitHub Credentials', description: 'GitHub credentials management endpoints' }
        ]
    }
});

// Register Swagger UI plugin
await fastify.register(import('@fastify/swagger-ui'), {
    routePrefix: '/api-docs',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
        return swaggerObject;
    },
    transformSpecificationClone: true
});

await fastify.register(import('@fastify/jwt'), {
    secret: process.env.JWT_SECRET || 'default_secret'
});

// Routes with automatic schema validation and documentation generation
fastify.get('/', {
    schema: {
        summary: 'Root endpoint',
        description: 'Returns a welcome message indicating the server is running',
        response: {
            200: messageResponseSchema
        }
    }
}, rootHandler);

fastify.get('/api/health', {
    schema: {
        summary: 'Health check endpoint',
        description: 'Returns server health status with timestamp',
        tags: ['Health'],
        response: {
            200: healthResponseSchema
        }
    }
}, healthHandler);


fastify.get('/users', {
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

fastify.get('/datasources', {
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

fastify.get('/datasources/:id', {
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

fastify.post('/datasources', {
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

fastify.put('/datasources/:id', {
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

fastify.delete('/datasources/:id', {
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

// S3 Credentials routes
fastify.get('/s3-credentials', {
    schema: {
        summary: 'Get all S3 credentials',
        description: 'Retrieve a list of all S3 credentials from the database',
        tags: ['S3 Credentials'],
        response: {
            200: s3CredentialsListResponseSchema,
            500: errorResponseSchema
        }
    }
}, getS3CredentialsHandler);

fastify.get('/s3-credentials/:id', {
    schema: {
        summary: 'Get S3 credentials by ID',
        description: 'Retrieve specific S3 credentials by its ID',
        tags: ['S3 Credentials'],
        params: s3CredentialsParamsSchema,
        response: {
            200: s3CredentialsSchema,
            400: errorResponseSchema,
            404: errorResponseSchema,
            500: errorResponseSchema
        }
    }
}, getS3CredentialsByIdHandler);

fastify.post('/s3-credentials', {
    schema: {
        summary: 'Create new S3 credentials',
        description: 'Create new S3 credentials with the provided data',
        tags: ['S3 Credentials'],
        body: createS3CredentialsRequestSchema,
        response: {
            201: s3CredentialsSchema,
            500: errorResponseSchema
        }
    }
}, createS3CredentialsHandler);

fastify.put('/s3-credentials/:id', {
    schema: {
        summary: 'Update S3 credentials',
        description: 'Update existing S3 credentials by its ID',
        tags: ['S3 Credentials'],
        params: s3CredentialsParamsSchema,
        body: updateS3CredentialsRequestSchema,
        response: {
            200: s3CredentialsSchema,
            400: errorResponseSchema,
            500: errorResponseSchema
        }
    }
}, updateS3CredentialsHandler);

fastify.delete('/s3-credentials/:id', {
    schema: {
        summary: 'Delete S3 credentials',
        description: 'Delete S3 credentials by its ID',
        tags: ['S3 Credentials'],
        params: s3CredentialsParamsSchema,
        response: {
            204: { type: 'null' },
            400: errorResponseSchema,
            500: errorResponseSchema
        }
    }
}, deleteS3CredentialsHandler);

// GitHub Credentials routes
fastify.get('/github-credentials', {
    schema: {
        summary: 'Get all GitHub credentials',
        description: 'Retrieve a list of all GitHub credentials from the database',
        tags: ['GitHub Credentials'],
        response: {
            200: githubCredentialsListResponseSchema,
            500: errorResponseSchema
        }
    }
}, getGithubCredentialsHandler);

fastify.get('/github-credentials/:id', {
    schema: {
        summary: 'Get GitHub credentials by ID',
        description: 'Retrieve specific GitHub credentials by its ID',
        tags: ['GitHub Credentials'],
        params: githubCredentialsParamsSchema,
        response: {
            200: githubCredentialsSchema,
            400: errorResponseSchema,
            404: errorResponseSchema,
            500: errorResponseSchema
        }
    }
}, getGithubCredentialsByIdHandler);

fastify.post('/github-credentials', {
    schema: {
        summary: 'Create new GitHub credentials',
        description: 'Create new GitHub credentials with the provided data',
        tags: ['GitHub Credentials'],
        body: createGithubCredentialsRequestSchema,
        response: {
            201: githubCredentialsSchema,
            500: errorResponseSchema
        }
    }
}, createGithubCredentialsHandler);

fastify.put('/github-credentials/:id', {
    schema: {
        summary: 'Update GitHub credentials',
        description: 'Update existing GitHub credentials by its ID',
        tags: ['GitHub Credentials'],
        params: githubCredentialsParamsSchema,
        body: updateGithubCredentialsRequestSchema,
        response: {
            200: githubCredentialsSchema,
            400: errorResponseSchema,
            500: errorResponseSchema
        }
    }
}, updateGithubCredentialsHandler);

fastify.delete('/github-credentials/:id', {
    schema: {
        summary: 'Delete GitHub credentials',
        description: 'Delete GitHub credentials by its ID',
        tags: ['GitHub Credentials'],
        params: githubCredentialsParamsSchema,
        response: {
            204: { type: 'null' },
            400: errorResponseSchema,
            500: errorResponseSchema
        }
    }
}, deleteGithubCredentialsHandler);

// Add JSON endpoint for OpenAPI spec
fastify.get('/api-docs.json', {
    schema: {
        summary: 'OpenAPI specification',
        description: 'Returns the OpenAPI specification in JSON format',
        response: {
            200: {
                type: 'object',
                additionalProperties: true
            }
        }
    }
}, openApiSpecHandler);

// Global error handler
fastify.setErrorHandler(async (error, request, reply) => {
    fastify.log.error(error);

    const statusCode = error.statusCode || 500;
    const errorResponse = {
        statusCode,
        error: error.name || 'Internal Server Error',
        message: error.message || 'An unexpected error occurred'
    };

    reply.code(statusCode).send(errorResponse);
});

// Start server
const start = async () => {
    try {
        await fastify.listen({ port: PORT, host: '0.0.0.0' });
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
        console.log(`OpenAPI JSON spec available at http://localhost:${PORT}/api-docs.json`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
import autoLoad from "@fastify/autoload";
import Fastify from 'fastify';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { handleErrors } from './errorHandlers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({
    logger: true
});

const PORT = Number(process.env.PORT) || 3000;

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

await fastify.register(import('@fastify/sensible'));


await fastify.register(import('@fastify/jwt'), {
    secret: process.env.JWT_SECRET || 'default_secret'
});

fastify.setErrorHandler(handleErrors);


await fastify.register(autoLoad, {
    dir: join(__dirname, 'routes'),
    forceESM: true,
});

// // S3 Credentials routes
// fastify.get('/s3-credentials', {
//     schema: {
//         summary: 'Get all S3 credentials',
//         description: 'Retrieve a list of all S3 credentials from the database',
//         tags: ['S3 Credentials'],
//         response: {
//             200: s3CredentialsListResponseSchema,
//             500: errorResponseSchema
//         }
//     }
// }, getS3CredentialsHandler);

// fastify.get('/s3-credentials/:id', {
//     schema: {
//         summary: 'Get S3 credentials by ID',
//         description: 'Retrieve specific S3 credentials by its ID',
//         tags: ['S3 Credentials'],
//         params: s3CredentialsParamsSchema,
//         response: {
//             200: s3CredentialsSchema,
//             400: errorResponseSchema,
//             404: errorResponseSchema,
//             500: errorResponseSchema
//         }
//     }
// }, getS3CredentialsByIdHandler);

// fastify.post('/s3-credentials', {
//     schema: {
//         summary: 'Create new S3 credentials',
//         description: 'Create new S3 credentials with the provided data',
//         tags: ['S3 Credentials'],
//         body: createS3CredentialsRequestSchema,
//         response: {
//             201: s3CredentialsSchema,
//             500: errorResponseSchema
//         }
//     }
// }, createS3CredentialsHandler);

// fastify.put('/s3-credentials/:id', {
//     schema: {
//         summary: 'Update S3 credentials',
//         description: 'Update existing S3 credentials by its ID',
//         tags: ['S3 Credentials'],
//         params: s3CredentialsParamsSchema,
//         body: updateS3CredentialsRequestSchema,
//         response: {
//             200: s3CredentialsSchema,
//             400: errorResponseSchema,
//             500: errorResponseSchema
//         }
//     }
// }, updateS3CredentialsHandler);

// fastify.delete('/s3-credentials/:id', {
//     schema: {
//         summary: 'Delete S3 credentials',
//         description: 'Delete S3 credentials by its ID',
//         tags: ['S3 Credentials'],
//         params: s3CredentialsParamsSchema,
//         response: {
//             204: { type: 'null' },
//             400: errorResponseSchema,
//             500: errorResponseSchema
//         }
//     }
// }, deleteS3CredentialsHandler);

// // GitHub Credentials routes
// fastify.get('/github-credentials', {
//     schema: {
//         summary: 'Get all GitHub credentials',
//         description: 'Retrieve a list of all GitHub credentials from the database',
//         tags: ['GitHub Credentials'],
//         response: {
//             200: githubCredentialsListResponseSchema,
//             500: errorResponseSchema
//         }
//     }
// }, getGithubCredentialsHandler);

// fastify.get('/github-credentials/:id', {
//     schema: {
//         summary: 'Get GitHub credentials by ID',
//         description: 'Retrieve specific GitHub credentials by its ID',
//         tags: ['GitHub Credentials'],
//         params: githubCredentialsParamsSchema,
//         response: {
//             200: githubCredentialsSchema,
//             400: errorResponseSchema,
//             404: errorResponseSchema,
//             500: errorResponseSchema
//         }
//     }
// }, getGithubCredentialsByIdHandler);

// fastify.post('/github-credentials', {
//     schema: {
//         summary: 'Create new GitHub credentials',
//         description: 'Create new GitHub credentials with the provided data',
//         tags: ['GitHub Credentials'],
//         body: createGithubCredentialsRequestSchema,
//         response: {
//             201: githubCredentialsSchema,
//             500: errorResponseSchema
//         }
//     }
// }, createGithubCredentialsHandler);

// fastify.put('/github-credentials/:id', {
//     schema: {
//         summary: 'Update GitHub credentials',
//         description: 'Update existing GitHub credentials by its ID',
//         tags: ['GitHub Credentials'],
//         params: githubCredentialsParamsSchema,
//         body: updateGithubCredentialsRequestSchema,
//         response: {
//             200: githubCredentialsSchema,
//             400: errorResponseSchema,
//             500: errorResponseSchema
//         }
//     }
// }, updateGithubCredentialsHandler);

// fastify.delete('/github-credentials/:id', {
//     schema: {
//         summary: 'Delete GitHub credentials',
//         description: 'Delete GitHub credentials by its ID',
//         tags: ['GitHub Credentials'],
//         params: githubCredentialsParamsSchema,
//         response: {
//             204: { type: 'null' },
//             400: errorResponseSchema,
//             500: errorResponseSchema
//         }
//     }
// }, deleteGithubCredentialsHandler);

// // Add JSON endpoint for OpenAPI spec
// fastify.get('/api-docs.json', {
//     schema: {
//         summary: 'OpenAPI specification',
//         description: 'Returns the OpenAPI specification in JSON format',
//         response: {
//             200: {
//                 type: 'object',
//                 additionalProperties: true
//             }
//         }
//     }
// }, openApiSpecHandler);


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
export const s3CredentialsSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        description: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        createdBy: { type: 'integer' },
        updatedBy: { type: 'integer' },
        accessKey: { type: 'string' },
        secretKey: { type: 'string' },
        endpointUrl: { type: 'string' },
        region: { type: 'string' }
    },
    required: ['id', 'name', 'createdBy', 'updatedBy', 'accessKey', 'secretKey']
} as const;

export const s3CredentialsListResponseSchema = {
    type: 'array',
    items: s3CredentialsSchema
} as const;

export const s3CredentialsResponseSchema = {
    type: 'object',
    properties: {
        s3Credentials: s3CredentialsSchema
    }
} as const;

export const createS3CredentialsRequestSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        accessKey: { type: 'string', minLength: 1 },
        secretKey: { type: 'string', minLength: 1 },
        endpointUrl: { type: 'string' },
        region: { type: 'string' }
    },
    required: ['name', 'accessKey', 'secretKey']
} as const;

export const updateS3CredentialsRequestSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        accessKey: { type: 'string', minLength: 1 },
        secretKey: { type: 'string', minLength: 1 },
        endpointUrl: { type: 'string' },
        region: { type: 'string' }
    },
    additionalProperties: false
} as const;

export const s3CredentialsParamsSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', minimum: 1 }
    },
    required: ['id']
} as const;

export interface CreateS3CredentialsRequest {
    name: string;
    description?: string;
    accessKey: string;
    secretKey: string;
    endpointUrl?: string;
    region?: string;
}

export interface UpdateS3CredentialsRequest extends CreateS3CredentialsRequest {
    id: number;
}

export type S3CredentialsParams = {
    id: number;
};

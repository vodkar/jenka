export const githubCredentialsSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        description: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        createdBy: { type: 'integer' },
        updatedBy: { type: 'integer' },
        privateSSHKey: { type: 'string' }
    },
    required: ['id', 'name', 'createdBy', 'updatedBy']
} as const;

export const githubCredentialsListResponseSchema = {
    type: 'array',
    items: githubCredentialsSchema
} as const;

export const githubCredentialsResponseSchema = {
    type: 'object',
    properties: {
        githubCredentials: githubCredentialsSchema
    }
} as const;

export const createGithubCredentialsRequestSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        privateSSHKey: { type: 'string' }
    },
    required: ['name']
} as const;

export const updateGithubCredentialsRequestSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        privateSSHKey: { type: 'string' }
    },
    additionalProperties: false
} as const;

export const githubCredentialsParamsSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', minimum: 1 }
    },
    required: ['id']
} as const;

export interface CreateGithubCredentialsRequest {
    name: string;
    description?: string;
    privateSSHKey?: string;
}

export interface UpdateGithubCredentialsRequest extends CreateGithubCredentialsRequest {
    id: number;
}

export type GithubCredentialsParams = {
    id: number;
};

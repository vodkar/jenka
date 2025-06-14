export const datasourceSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        type: { type: 'string', enum: ['GITHUB', 'LOCAL', 'S3'] },
        description: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        createdBy: { type: 'string' },
        updatedBy: { type: 'string' }
    },
    required: ['id', 'name', 'type', 'description']
} as const;

export const datasourceListResponseSchema = {
    type: 'array',
    items: datasourceSchema
} as const;

export const datasourceResponseSchema = {
    type: 'object',
    properties: {
        datasource: datasourceSchema
    }
} as const;

export const createDatasourceRequestSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        description: { type: 'string', minLength: 1 },
        type: { type: 'string', enum: ['GITHUB', 'LOCAL', 'S3'] }
    },
    required: ['name', 'description', 'type']
} as const;

export const updateDatasourceRequestSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        description: { type: 'string', minLength: 1 },
        type: { type: 'string', enum: ['GITHUB', 'LOCAL', 'S3'] }
    },
    additionalProperties: false
} as const;

export const datasourceParamsSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', minimum: 1 }
    },
    required: ['id']
} as const;

export type DatasourceType = 'GITHUB' | 'LOCAL' | 'S3';


export interface CreateDatasourceRequest {
    name: string;
    description: string;
    type: DatasourceType;
    path: string;
};

export interface CreateGitDatasourceRequest extends CreateDatasourceRequest {
    gitCredentialsId: number;
}

export interface CreateS3DatasourceRequest extends CreateDatasourceRequest {
    s3CredentialsId: number;
}

export interface UpdateDatasourceRequest extends CreateDatasourceRequest {
    id: number;
}

export type DatasourceParams = {
    id: number;
};

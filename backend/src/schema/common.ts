export const messageResponseSchema = {
    type: 'object',
    properties: {
        message: { type: 'string' }
    },
    required: ['message']
} as const;

export const errorResponseSchema = {
    type: 'object',
    properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' }
    },
    required: ['statusCode', 'error', 'message']
} as const;

export const healthResponseSchema = {
    type: 'object',
    properties: {
        status: { type: 'string' },
        timestamp: { type: 'string', format: 'date-time' }
    },
    required: ['status', 'timestamp']
} as const;

export type MessageResponse = {
    message: string;
};

export type ErrorResponse = {
    statusCode: number;
    error: string;
    message: string;
};

export type HealthResponse = {
    status: string;
    timestamp: string;
};

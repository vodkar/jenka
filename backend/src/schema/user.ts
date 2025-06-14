export const userSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        email: { type: 'string', format: 'email' },
        name: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
    },
    required: ['id', 'email']
} as const;

export const userListResponseSchema = {
    type: 'array',
    items: userSchema
} as const;

export const userResponseSchema = {
    type: 'object',
    properties: {
        users: userSchema
    }
} as const;

export const createUserRequestSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        name: { type: 'string', minLength: 1 }
    },
    required: ['email', 'name']
} as const;

export const updateUserRequestSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        name: { type: 'string', minLength: 1 }
    },
    additionalProperties: false
} as const;

export const userParamsSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', minimum: 1 }
    },
    required: ['id']
} as const;


export type CreateUserRequest = {
    email: string;
    name: string;
    password: string;
};

export type UpdateUserRequest = {
    email: string;
    name: string;
};

export type UserParams = {
    id: number;
};

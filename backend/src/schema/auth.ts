export const authParamsSchema = {
    type: 'object',
    properties: {
        login: {
            type: 'string',
            format: 'email',
            description: 'User login email'
        },
        password: {
            type: 'string',
            minLength: 8,
            description: 'User password'
        }
    },
    required: ['login', 'password'],
    additionalProperties: false
} as const;

export const authResponseSchema = {
    type: 'object',
    properties: {
        token: {
            type: 'string',
            description: 'Authentication token for the user'
        },
        user: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    description: 'User ID'
                },
                email: {
                    type: 'string',
                    format: 'email',
                    description: 'User email'
                },
                name: {
                    type: 'string',
                    description: 'User name'
                },
            },
            required: ['id', 'email'],
            additionalProperties: false
        }
    },
    required: ['token', 'user'],
    additionalProperties: false
} as const;

export interface AuthParamsRequest {
    login: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        email: string;
        name: string | null;
    };
}
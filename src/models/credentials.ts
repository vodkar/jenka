
export interface S3Credentials {
    id: number;
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    endpointUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface GithubCredentials {
    id: number;
    token: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateS3CredentialsDTO {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    endpointUrl: string;
}

export interface CreateGithubCredentialsDTO {
    token: string;
    address: string;
}
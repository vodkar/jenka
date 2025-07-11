
export enum DatasourceTypes {
    GITHUB = "GITHUB",
    LOCAL = "LOCAL",
    S3 = "S3",
}

export type CreateDatasourceDTO =
    | CreateLocalDatasourceDTO
    | CreateGithubDatasourceDTO
    | CreateS3DatasourceDTO;

export interface Datasource {
    id: number;
    name: string;
    type: DatasourceTypes;
    description: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

export interface LocalDatasource extends Datasource {
    type: DatasourceTypes.LOCAL;
    path: string;
}

export interface GithubDatasource extends Datasource {
    type: DatasourceTypes.GITHUB;
    repository: string;
    branch: string;
    credentialsId: number;
}

export interface S3Datasource extends Datasource {
    type: DatasourceTypes.S3;
    bucketName: string;
    region: string;
    credentialsId: number;
}

export interface CreateLocalDatasourceDTO {
    name: string;
    description: string;
    type: DatasourceTypes.LOCAL;
    path: string;
}

export interface CreateGithubDatasourceDTO {
    name: string;
    description: string;
    type: DatasourceTypes.GITHUB;
    repository: string;
    branch: string;
    credentialsId: number;
}

export interface CreateS3DatasourceDTO {
    name: string;
    description: string;
    type: DatasourceTypes.S3;
    bucketName: string;
    region: string;
    credentialsId: number;
}
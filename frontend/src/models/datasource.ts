export enum DatasourceTypes {
    GITHUB = "GITHUB",
    LOCAL = "LOCAL",
    S3 = "S3",
}

export interface AddDatasourceDTO {
    name: string;
    description: string;
    type: DatasourceTypes;
}

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
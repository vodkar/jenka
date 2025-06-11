export interface Project {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    datasourceId: number;
}

export interface AddProjectDTO {
    name: string;
    description: string;
    datasourceId: number;
}
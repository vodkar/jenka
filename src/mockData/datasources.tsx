import { Datasource, DatasourceTypes } from "@/models/datasource";

export const datasources: Datasource[] = [
    {
        id: 1,
        name: "Datasource 1",
        type: DatasourceTypes.GITHUB,
        description: "Github Datasource",
        createdAt: "2023-01-01",
        updatedAt: "2023-01-01",
        createdBy: "me",
        updatedBy: "me",
    },
    {
        id: 2,
        name: "Datasource 2",
        type: DatasourceTypes.S3,
        description: "S3 Datasource",
        createdAt: "2023-01-01",
        updatedAt: "2023-01-01",
        createdBy: "me",
        updatedBy: "me",
    },
]
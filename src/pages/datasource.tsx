import { MainHeader } from "@/components/sidebar/header";
import { Datasource, DatasourceTypes } from "@/models/datasource";
import type { Route } from "./+types/datasource";

const datasource: Datasource = {
    id: 1,
    name: "Datasource 1",
    description: "This is a datasource",
    type: DatasourceTypes.GITHUB,
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
    createdBy: "user1",
    updatedBy: "user1",
}

export default function DatasourcesPage({
    loaderData,
}: Route.ComponentProps) {

    return (
        <div className="flex flex-col space-y-4 px-4">
            <MainHeader headerText="Datasources" />
            <div className="flex flex-col space-y-2">
                <h2 className="text-xl font-bold">{datasource.name}</h2>
                <p>{datasource.description}</p>
                <p>Type: {datasource.type}</p>
                <p>Created at: {new Date(datasource.createdAt).toLocaleString()}</p>
                <p>Updated at: {new Date(datasource.updatedAt).toLocaleString()}</p>
                <p>Created by: {datasource.createdBy}</p>
                <p>Updated by: {datasource.updatedBy}</p>
            </div>
        </div>
    )
}
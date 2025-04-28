import { AddDatasourceForm } from "@/components/dialogs/add-datasource";
import { MainHeader } from "@/components/sidebar/header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { datasources } from "@/mockData/datasources";
import { CirclePlus, Cloud, FolderGit, HardDrive } from "lucide-react";
import { useState } from "react";
import type { Route } from "./+types/datasource";


export const datasourceTypeIcons = {
    LOCAL: <HardDrive />,
    GITHUB: <FolderGit />,
    S3: <Cloud />,
}

export default function DatasourcesPage({
    loaderData,
}: Route.ComponentProps) {
    const [visibleDatasources, setDatasources] = useState(datasources);

    return (
        <div>
            <MainHeader headerText="Datasources" additionalElements={[
                <AddDatasourceForm triggerElement={
                    <Button size="sm" variant="outline">
                        <CirclePlus />
                        Add Datasource
                    </Button>
                } datasources={visibleDatasources} setDatasources={setDatasources} />
            ]} />
            <div className="*:data-[slot=card]:shadow-xs px-4 gap-4 grid grid-cols-3 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card">
                {visibleDatasources.map((datasource) => (
                    <Card className="@container/card">
                        <CardHeader className="relative">
                            <CardDescription>
                                <div className="flex items-center gap-2">
                                    {datasourceTypeIcons[datasource.type]} {datasource.name}
                                </div>
                            </CardDescription>
                            <CardTitle>
                                {datasource.description}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}
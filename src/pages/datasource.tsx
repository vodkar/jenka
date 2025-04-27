import { MainHeader } from "@/components/sidebar/header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { datasources } from "@/mockData/datasources";
import { CirclePlus, Cloud, FolderGit, HardDrive } from "lucide-react";
import type { Route } from "./+types/datasource";


export const datasourceTypeIcons = {
    LOCAL: <HardDrive />,
    GITHUB: <FolderGit />,
    S3: <Cloud />,
}

export default function DatasourcesPage({
    loaderData,
}: Route.ComponentProps) {
    return (
        <div>
            <MainHeader headerText="Datasources" additionalElements={[
                <Button size="sm" variant="outline">
                    <CirclePlus />
                    Add Datasource
                </Button>
            ]} />
            <div className="*:data-[slot=card]:shadow-xs px-4 gap-4 grid grid-cols-3 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card">
                {datasources.map((datasource) => (
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
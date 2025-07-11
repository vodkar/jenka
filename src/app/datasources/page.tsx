"use client"
import { getDatasourcesAction, removeDatasourceAction } from "@/actions/datasource";
import { AddDatasourceForm } from "@/components/dialogs/add-datasource";
import { MainHeader } from "@/components/sidebar/header";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Datasource } from "@/models/datasource";
import { CirclePlus, Cloud, FolderGit, HardDrive, Trash } from "lucide-react";
import { useEffect, useState, useTransition } from "react";


export const datasourceTypeIcons = {
    LOCAL: <HardDrive />,
    GITHUB: <FolderGit />,
    S3: <Cloud />,
}

export default function DatasourcesPage() {
    const [visibleDatasources, setVisibleDatasources] = useState<Datasource[]>([]);
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(true);

    async function fetchDatasources() {
        try {
            const result = await getDatasourcesAction();
            if (result.success) {
                setVisibleDatasources(result.data);
            }
        } catch (error) {
            console.error('Failed to fetch datasources:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchDatasources();
    }, []);

    async function onDeleteDatasource(id: number) {
        startTransition(async () => {
            const result = await removeDatasourceAction(id);
            if (result.success) {
                setVisibleDatasources(prev => prev.filter(ds => ds.id !== id));
            }
        });
    }

    function onDatasourceCreated(newDatasource: Datasource) {
        setVisibleDatasources(prev => [...prev, newDatasource]);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <MainHeader headerText="Datasources" additionalElements={[
                <AddDatasourceForm
                    key="add-datasource"
                    triggerElement={
                        <Button size="sm" variant="outline">
                            <CirclePlus />
                            Add Datasource
                        </Button>
                    }
                    datasources={visibleDatasources}
                    onDatasourceCreated={onDatasourceCreated}
                />
            ]} />
            <div className="*:data-[slot=card]:shadow-xs px-4 gap-4 grid grid-cols-3 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card">
                {visibleDatasources.map((datasource) => (
                    <Card key={datasource.id} className="@container/card">
                        <CardHeader className="relative">
                            <CardTitle>
                                <div className="flex items-center gap-2">
                                    {datasourceTypeIcons[datasource.type]} {datasource.name}
                                </div>
                            </CardTitle>
                            <CardAction>
                                <Button size="sm" variant="destructive" disabled={isPending} onClick={() => onDeleteDatasource(datasource.id)}> <Trash /></Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            {datasource.description}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

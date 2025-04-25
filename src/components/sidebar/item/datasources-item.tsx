import { SidebarGroupAction } from "@/components/ui/sidebar"
import { Datasource } from "@/models/datasource"
import { Cloud, FolderGit, HardDrive, Plus } from "lucide-react"
import { AddDatasourceForm } from "../../dialogs/add-datasource"
import { ExtendableSidebarGroup } from "./collapsible-sidebar-item"


export interface DatasourcesSidebarMenuItemProps {
    datasources: Datasource[]
    setDatasources: (datasources: Datasource[]) => void
}

const datasourceTypeIcons = {
    LOCAL: <HardDrive />,
    GITHUB: <FolderGit />,
    S3: <Cloud />,
}


export function DatasourcesSidebarGroup({ datasources, setDatasources }: DatasourcesSidebarMenuItemProps) {
    return (
        <ExtendableSidebarGroup name="Datasources" pathTemplate="datasources/:id" subItems={datasources.map(datasource => ({ id: datasource.id, name: datasource.name, icon: datasourceTypeIcons[datasource.type], onClick: () => null }))} addButton={
            <AddDatasourceForm
                availableDatasources={datasources}
                triggerElement={
                    <SidebarGroupAction title="Add Datasource">
                        <Plus /> <span className="sr-only">Add Datasource</span>
                    </SidebarGroupAction>
                }
                datasources={datasources}
                setDatasources={setDatasources}
            />
        } />
    )
}

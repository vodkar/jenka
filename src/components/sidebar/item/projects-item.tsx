import { SidebarGroupAction } from "@/components/ui/sidebar"
import { Datasource } from "@/models/datasource"
import { Project } from "@/models/project"
import { Plus } from "lucide-react"
import { useState } from "react"
import { AddProjectForm } from "../../dialogs/add-project"
import { ExtendableSidebarGroup } from "./collapsible-sidebar-item"

const initialProjects: Project[] = [
    {
        id: 1,
        name: "Project 1",
        description: "Project 1",
        createdAt: "2023-01-01",
        updatedAt: "2023-01-01",
        createdBy: "me",
        updatedBy: "me",
        datasourceId: 1,
    },
    {
        id: 2,
        name: "Project 2",
        description: "Project 2",
        createdAt: "2023-01-01",
        updatedAt: "2023-01-01",
        createdBy: "me",
        updatedBy: "me",
        datasourceId: 2,
    },
]

export interface ProjectsSidebarMenuItemProps {
    datasources: Datasource[]
}


export function ProjectsSidebarGroup({ datasources }: ProjectsSidebarMenuItemProps) {
    const [projects, setProjects] = useState<Project[]>(initialProjects)

    return (
        <ExtendableSidebarGroup name="Project Tasks" pathTemplate="projects/:id" subItems={projects.map(project => ({ id: project.id, name: project.name, onClick: () => null }))}
            addButton={
                <AddProjectForm
                    availableDatasources={datasources}
                    triggerElement={
                        <SidebarGroupAction title="Add Project">
                            <Plus /> <span className="sr-only">Add Project</span>
                        </SidebarGroupAction>
                    }
                    projects={projects}
                    setProjects={setProjects}
                />
            } />
    )
}

import { SearchProjectsForm } from "@/components/search-form"
import { Separator } from "@/components/ui/separator"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar"
import { Project } from "@/models/project"
import { useEffect, useState } from "react"
import { generatePath, NavLink } from "react-router"


export interface CollapsibleSidebarItemProps {
    name: string
    projects: Project[]
    addButton: React.ReactNode
    pathTemplate: string,
}


export function ExtendableSidebarGroup({ name, projects, addButton, pathTemplate }: CollapsibleSidebarItemProps) {
    const [visibleProjects, setVisibleProjects] = useState<Project[]>(projects)

    useEffect(() => {
        setVisibleProjects(projects);
        console.log("Projects updated:", projects);
    }, [projects])

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="justify-between h-10">
                {name}
                {addButton}
            </SidebarGroupLabel>
            <Separator className="mb-2" />
            <SearchProjectsForm projects={projects} setFilteredProjects={setVisibleProjects} className="mb-2" />
            <SidebarMenu>
                {visibleProjects.map((item) => (
                    <SidebarMenuItem key={item.id} >
                        <SidebarMenuButton tooltip={item.name} className="cursor-pointer">
                            <NavLink to={generatePath(pathTemplate, { id: item.id })} className="flex items-center gap-2">
                                <span>{item.name}</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}

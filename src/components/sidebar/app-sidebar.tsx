import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub,
    SidebarMenuSubButton, SidebarMenuSubItem,
    SidebarRail
} from "@/components/ui/sidebar"
import { Datasource, DatasourceTypes } from "@/models/datasource"
import { ChevronRight, Settings } from "lucide-react"
import { useState } from "react"
import { DatasourcesSidebarGroup } from "./item/datasources-item"
import { ProjectsSidebarGroup } from "./item/projects-item"
import { NavUser } from "./nav-user"


const datasources: Datasource[] = [
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

export function AppSidebar() {

    const [datasourcesState, setDatasources] = useState<Datasource[]>(datasources)

    const items = [
        {
            name: "Settings",
            url: "#",
            icon: Settings,
            isActive: false,
            items: [{ name: "Workers", url: "#" }],
        },
    ]

    const user = {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    }

    return (
        <Sidebar>
            <SidebarContent>
                <ProjectsSidebarGroup datasources={datasources} />
                <DatasourcesSidebarGroup datasources={datasourcesState} setDatasources={setDatasources} />
                <SidebarGroup className="mt-auto" >
                    <SidebarMenu>
                        {items.map((item) => (
                            <Collapsible key={item.name}
                                asChild
                                defaultOpen={item.isActive || false}
                                className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.name} className="cursor-pointer">
                                            {item.icon && <item.icon />}
                                            <span>{item.name}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.name}>
                                                    <SidebarMenuSubButton asChild>
                                                        <a href="#">
                                                            <span>{subItem.name}</span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar >
    )
}

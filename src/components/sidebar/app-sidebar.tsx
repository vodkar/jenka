import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub,
    SidebarMenuSubButton, SidebarMenuSubItem,
    SidebarRail
} from "@/components/ui/sidebar"
import { datasources } from "@/mockData/datasources"
import { ChevronRight, Settings } from "lucide-react"
import { generatePath, NavLink } from "react-router"
import { ProjectsSidebarGroup } from "./item/projects-item"
import { NavUser } from "./nav-user"


export function AppSidebar() {

    const items = [
        {
            name: "Settings",
            url: "#",
            icon: Settings,
            isActive: false,
            items: [{ name: "Workers", url: "workers" }, { name: "Datasources", url: "datasources" }],
        },
    ]

    const user = {
        name: "Penis Testov",
        email: "eshkerex@lol.com",
        avatar: "/avatars/rzhomba.jpg",
    }

    return (
        <Sidebar>
            <SidebarContent>
                <ProjectsSidebarGroup datasources={datasources} />
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
                                                        <NavLink to={generatePath(subItem.url)} >
                                                            <span>{subItem.name}</span>
                                                        </NavLink>
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

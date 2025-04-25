import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar"
import { generatePath, NavLink } from "react-router"

export interface SidebarMenuSubItemProps {
    id: number,
    name: string
    icon?: React.ReactNode
    onClick: () => void
}

export interface CollapsibleSidebarItemProps {
    name: string
    subItems: SidebarMenuSubItemProps[]
    addButton: React.ReactNode
    pathTemplate: string
}


export function ExtendableSidebarGroup({ name, subItems, addButton, pathTemplate }: CollapsibleSidebarItemProps) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel className="justify-between">
                {name}
                {addButton}
            </SidebarGroupLabel>
            <SidebarMenu>
                {subItems.map((item) => (
                    <SidebarMenuItem key={item.id} >
                        <SidebarMenuButton tooltip={item.name} className="cursor-pointer">
                            <NavLink to={generatePath(pathTemplate, { id: item.id })} className="flex items-center gap-2">
                                {item.icon}
                                <span>{item.name}</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}

import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router"

export default function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <main className="flex flex-col h-screen w-full p-2">
                <SidebarInset>
                    <Outlet />
                </SidebarInset>
            </main>
        </SidebarProvider>
    )
}

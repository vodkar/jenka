import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router"

export default function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                <SidebarInset>
                    <Outlet />;
                </SidebarInset>
            </main>
        </SidebarProvider>
    )
}


import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import '../index.css';


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <title>Jenka 👷</title>
            </head>
            <body>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <SidebarProvider>
                        <AppSidebar />
                        <SidebarInset>
                            {children}
                        </SidebarInset>
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}

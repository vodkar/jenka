import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export interface SidebarHeaderProps {
    headerText: string
    additionalElements?: React.ReactNode[]
}

export function MainHeader({ headerText, additionalElements }: SidebarHeaderProps) {
    return (
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear mb-2">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base font-medium">{headerText}</h1>
                {additionalElements?.length ? (
                    <>
                        <Separator
                            orientation="vertical"
                            className="mx-2 data-[orientation=vertical]:h-4"
                        />
                        {additionalElements.map((element, index) => (
                            <span key={index}>{element}</span>
                        ))}
                    </>
                ) : null}
            </div>
        </header>
    )
}

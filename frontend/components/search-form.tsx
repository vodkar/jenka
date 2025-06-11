import { Label } from "@/components/ui/label"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput,
} from "@/components/ui/sidebar"
import { Project } from "@/models/project"
import { Search } from "lucide-react"

export interface SearchProjectsFormProps extends React.ComponentProps<"form"> {
    projects: Project[]
    setFilteredProjects: (items: Project[]) => void
}

function filterProjects(
    projects: Project[],
    searchTerm: string
): Project[] {
    if (!searchTerm) return projects;
    const regex = new RegExp(searchTerm, "i");
    let newProjects = projects.filter((project) => {
        return (
            project.name.match(regex) ||
            project.description.match(regex)
        );
    }
    );
    console.log("Filtered projects:", newProjects);
    return newProjects;
}

export function SearchProjectsForm({
    projects,
    setFilteredProjects,
    ...formProps
}: SearchProjectsFormProps) {
    return (
        <form {...formProps}>
            <SidebarGroup className="py-0">
                <SidebarGroupContent className="relative">
                    <Label htmlFor="search" className="sr-only">
                        Search
                    </Label>
                    <SidebarInput
                        id="search"
                        placeholder="Search the projects"
                        className="pl-8"
                        onChange={(e) => {
                            const searchTerm = e.target.value;
                            const filteredProjects = filterProjects(projects, searchTerm);
                            setFilteredProjects(filteredProjects);
                        }}
                    />
                    <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                </SidebarGroupContent>
            </SidebarGroup>
        </form>
    )
}
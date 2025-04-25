import type { Route } from "./+types/project";

export async function loader({ params }: Route.LoaderArgs) {
    console.log("params", params);
    const { projectId } = params;
    return { projectId }
}

export default function Component({
    loaderData,
}: Route.ComponentProps) {
    return <h1 className="text-2xl font-bold">{loaderData.projectId}</h1>;
}
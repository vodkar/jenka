import {
    type RouteConfig,
    index,
    layout,
    route
} from "@react-router/dev/routes";

export default [
    layout("./layout.tsx", [
        index("./pages/root.tsx"),
        route("projects/:projectId", "./pages/project.tsx"),
        route("datasources", "./pages/datasource.tsx"),
        route("workers", "./pages/workers.tsx"),
    ])
] satisfies RouteConfig;

import {
    type RouteConfig,
    layout,
    route
} from "@react-router/dev/routes";

export default [
    layout("./layout.tsx", [
        route("/", "./pages/root.tsx"),
        route("projects/:projectId", "./pages/project.tsx"),
        route("datasources/:datasourceId", "./pages/datasource.tsx"),
        route("workers", "./pages/workers.tsx"),
    ])
] satisfies RouteConfig;

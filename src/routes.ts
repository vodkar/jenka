import {
    type RouteConfig,
    layout,
    route
} from "@react-router/dev/routes";

export default [
    layout("./layout.tsx", [
        route("/", "./pages/root.tsx"),
        route("/projects/:projectId", "./pages/project.tsx"),
    ])
] satisfies RouteConfig;

import type { Config } from "@react-router/dev/config";

export default {
    appDirectory: "frontend",
    ssr: true,
    async prerender() {
        return ["/"];
    },
} satisfies Config;

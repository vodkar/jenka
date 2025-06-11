import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: { outDir: 'dist' },
})

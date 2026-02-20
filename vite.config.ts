import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dynamicImport from "vite-plugin-dynamic-import";
import istanbul from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dynamicImport(),
    istanbul({
      include: "src/*",
      exclude: [
        "node_modules",
        "test/",
        "src/components/*",
        "src/@types/*",
        "src/api/*",
        "src/assets/*",
        "src/auth/*",
        "src/configs/*",
        "src/constants/*",
        "src/locales/*",
        "src/mock/*",
        "src/mocks/*",
        "src/redux/*",
        "src/utils/*",
        "src/services/*",
      ],
      extension: [".ts", ".tsx"],
      requireEnv: false,
      forceBuildInstrument: true,
    }),
  ],
  assetsInclude: ["**/*.md"],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  server: {
    host: "localhost",
    port: 3000,
  },
  build: {
    outDir: "build",
  },
});

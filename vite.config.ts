import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/lib/index.ts", import.meta.url)),
      name: "ReactSmartPaginationKit",
      formats: ["es", "cjs"],
      fileName: (format) =>
        format === "es"
          ? "react-smart-pagination-kit.es.js"
          : "react-smart-pagination-kit.cjs",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        exports: "named",
      },
    },
  },
  test: {
    css: true,
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
    },
  },
});

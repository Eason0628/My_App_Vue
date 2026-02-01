import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import url from "url";
import path, { dirname } from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // "@common": path.resolve(__dirname, "../../common"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3005,
    inline: false,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:1080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    minify: "terser",
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});

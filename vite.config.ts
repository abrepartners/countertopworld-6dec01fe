import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Prerendering: scripts/prerender.mjs runs after vite build and generates
// per-route index.html files with correct <title>, meta, OG, canonical,
// and BreadcrumbList JSON-LD. No browser needed — works on Vercel.

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// NOTE: Static prerendering via @prerenderer/rollup-plugin was attempted but
// Vercel's build container is missing shared libs Puppeteer needs
// (libnspr4.so). Reverted for now. The SEO/AEO quick wins (robots.txt,
// sitemap, per-page canonical/OG/BreadcrumbList via useEffect) still land —
// Googlebot and most crawlers render JS. Revisit with @sparticuz/chromium
// or vite-react-ssg when we want non-JS AI crawler coverage.

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

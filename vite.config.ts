import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import prerender from "@prerenderer/rollup-plugin";

// Routes that get prerendered to static HTML at build time so crawlers
// (including non-JS AI indexers like ChatGPT / Perplexity) see the real
// content + per-page meta tags in the initial response. Mirror sitemap.xml.
const PRERENDER_ROUTES = [
  "/",
  "/book",
  "/stones/engineered-quartz",
  "/stones/natural-granite",
  "/stones/marble",
  "/stones/quartzite",
  "/stones/porcelain",
  "/stones/soapstone-onyx",
];

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: PRERENDER_ROUTES,
      renderer: "@prerenderer/renderer-puppeteer",
      rendererOptions: {
        // Puppeteer launch args tuned for CI / Vercel build containers.
        launchOptions: {
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
        },
        // Give useEffect-injected meta / BreadcrumbList / FAQ schema time to land.
        renderAfterTime: 1500,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://elefoxstudio.com",
  output: "server",
  adapter: node({ mode: "standalone" }),
  // Astro's default form-POST origin check misfires behind Railway's
  // proxy (the host the Node process sees != the public host), 403-ing
  // legitimate same-origin submissions. Our form endpoints are
  // unauthenticated public lead captures with their own honeypot +
  // timing + per-IP rate-limit guards, so we disable the built-in
  // check rather than block real visitors. See /api/contact.ts.
  security: { checkOrigin: false },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/lp/"),
    }),
  ],
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  server: { port: Number(process.env.PORT) || 4321, host: true },
  vite: {
    plugins: [tailwindcss()],
  },
});

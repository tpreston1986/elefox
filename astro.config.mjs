// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://elefoxstudio.com",
  output: "server",
  adapter: node({ mode: "standalone" }),
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

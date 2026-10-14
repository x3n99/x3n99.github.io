import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://x3n99.github.io",
  integrations: [sitemap()],
  build: {
    format: "file",
  },
});
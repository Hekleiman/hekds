// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.hekdesigns.com',
  integrations: [sitemap()],
  // Honor a PORT env var when one is provided (e.g. by a preview harness that
  // assigns a free port); falls back to Astro's default (4321) for normal dev.
  server: process.env.PORT ? { port: Number(process.env.PORT) } : {},
  vite: {
    plugins: [tailwindcss()]
  }
});

// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Force static output for GitHub Pages deployments. The Pages
  // workflow also passes `--site` and `--base` which will override
  // these values at build time when necessary.
  output: 'static',
  // When deploying to GitHub Pages for a project site, set the
  // `ASTRO_BASE` environment variable to "/REPO_NAME/" (including
  // leading and trailing slashes). Defaults to `/` for local dev.
  base: process.env.ASTRO_BASE || '/',
  vite: {
    plugins: [tailwindcss()]
  }
});
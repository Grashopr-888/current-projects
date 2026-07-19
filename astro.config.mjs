// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/*
 * Deployment target — single source of truth for canonical URLs and asset base paths.
 *
 * Default is a GitHub Pages *project* site: https://<owner>.github.io/<repo>.
 * If you move to a custom domain, set SITE to that domain and BASE to '/'.
 *
 *   GH Pages project site  →  SITE = 'https://grashopr-888.github.io'  BASE = '/current-projects'
 *   GH Pages user site     →  SITE = 'https://grashopr-888.github.io'  BASE = '/'
 *   Custom domain          →  SITE = 'https://your-domain.tld'         BASE = '/'   (+ public/CNAME)
 */
const SITE = 'https://grashopr-888.github.io';
const BASE = '/current-projects';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  markdown: {
    // Theme is driven by CSS variables so code blocks follow the site's light/dark mode.
    shikiConfig: { theme: 'css-variables', wrap: true },
  },
});

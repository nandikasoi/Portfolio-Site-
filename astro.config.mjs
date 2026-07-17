import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';


export default defineConfig({
  site: 'https://vibe-portfolio-site.pages.dev',
  integrations: [tailwind() ],
});

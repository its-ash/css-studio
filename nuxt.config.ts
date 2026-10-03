import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { PAGES, absUrl } from './app/utils/seo'

const BUILD_DATE = new Date().toISOString().slice(0, 10)

const pub = (f: string) => fileURLToPath(new URL(`./public/${f}`, import.meta.url))

/** Regenerates sitemap.xml + llms.txt from the SEO registry so they never drift from the routes. */
function writeSeoFiles() {
  const urls = PAGES.map((p) => `  <url>
    <loc>${absUrl(p.path)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>${p.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${p.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')
  writeFileSync(
    pub('sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  )
  const [home, ...tools] = PAGES
  writeFileSync(
    pub('llms.txt'),
    `# CSS Studio\n\n> ${home!.description} Runs fully client-side at ${absUrl('/')}\n\n## Generators\n\n${tools.map((p) => `- [${p.name}](${absUrl(p.path)}): ${p.description}`).join('\n')}\n`
  )
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: PAGES.map((p) => p.path)
    }
  },
  hooks: {
    'build:before': writeSeoFiles
  },
  modules: ['@nuxtjs/color-mode'],
  css: ['~/assets/css/main.css'],
  components: [{ path: '~/components', pathPrefix: false }],
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  },
  vite: {
    plugins: [tailwindcss()]
  },
  app: {
    head: {
      title: 'CSS Studio',
      titleTemplate: '%s',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'application-name', content: 'CSS Studio' },
        { name: 'apple-mobile-web-app-title', content: 'CSS Studio' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://www.googletagmanager.com' }
      ],
      script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-77BK6GF5MN', async: true },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-77BK6GF5MN');`
        }
      ]
    }
  },
  typescript: { strict: true }
})
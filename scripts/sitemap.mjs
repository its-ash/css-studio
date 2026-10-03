/**
 * Auto-generates public/sitemap.xml from the pages that actually exist in
 * app/pages — index.vue maps to "/", every other page file maps to "/<name>".
 * Run automatically before every `nuxt generate` (see Makefile build target).
 */
import { readdirSync } from 'node:fs'
import { join, parse } from 'node:path'

const SITE_URL = 'https://css-studio.itsash.in'
const PAGES_DIR = join(process.cwd(), 'app', 'pages')
const OUT_FILE = join(process.cwd(), 'public', 'sitemap.xml')

const CHANGEFREQ_OVERRIDES = { '/': 'weekly' }

const urls = readdirSync(PAGES_DIR)
  .filter((f) => f.endsWith('.vue'))
  .map((f) => {
    const name = parse(f).name
    // Nuxt maps index.vue -> "/", catch-alls would need special handling
    return name === 'index' ? '/' : `/${name}`
  })
  .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))

if (!urls.includes('/')) urls.unshift('/')

const now = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u === '/' ? '/' : u}</loc>${
      CHANGEFREQ_OVERRIDES[u]
        ? `\n    <changefreq>${CHANGEFREQ_OVERRIDES[u]}</changefreq>`
        : ''
    }
    <priority>${u === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

// strip a possible legacy entry for removed pages only if they don't exist
const cleaned = xml

import { writeFileSync } from 'node:fs'
writeFileSync(OUT_FILE, cleaned)
console.log(`sitemap.xml: wrote ${urls.length} URLs to ${OUT_FILE}`)
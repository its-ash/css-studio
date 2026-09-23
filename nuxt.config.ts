import tailwindcss from '@tailwindcss/vite'

const SITE_URL = 'https://css-studio.itsash.in'
const GENERATOR_ROUTES = [
  '/', '/gradient', '/mesh', '/blob', '/pattern', '/shadow', '/shape', '/border', '/glass',
  '/neumorphism', '/text', '/animation', '/component', '/background', '/loader', '/badge',
  '/divider', '/scrollbar', '/cursor', '/filter', '/spotlight', '/noise', '/typescale',
  '/presets', '/palette'
]

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: GENERATOR_ROUTES
    }
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
        {
          name: 'description',
          content: 'Create gradients, blobs, backgrounds, patterns, shadows and animations with pure CSS. Free, client-side CSS generator studio — no signup, export ready-to-use code instantly.'
        },
        { name: 'theme-color', content: '#09090b' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:site_name', content: 'CSS Studio' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: `${SITE_URL}/og-image.png` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: `${SITE_URL}/og-image.png` }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: SITE_URL }
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
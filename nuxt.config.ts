import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: false,
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
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Create gradients, blobs, backgrounds, patterns, shadows and animations with pure CSS.'
        },
        { name: 'theme-color', content: '#09090b' }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },
  typescript: { strict: true }
})
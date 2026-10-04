<script setup lang="ts">
import '@fontsource/geist/400.css'
import '@fontsource/geist/500.css'
import '@fontsource/geist/600.css'
import '@fontsource/geist-mono/400.css'
import '@fontsource/geist-mono/500.css'

const colorMode = useColorMode()

const route = useRoute()
const page = computed(() => pageSeo(route.path))
const url = computed(() => absUrl(page.value?.path ?? route.path))
const title = computed(() => {
  const p = page.value
  return !p ? SITE_NAME : p.path === '/' ? p.title : `${p.title} | ${SITE_NAME}`
})
const description = computed(() => page.value?.description ?? PAGES[0]!.description)

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: url,
  ogType: 'website',
  ogSiteName: SITE_NAME,
  ogLocale: 'en_US',
  ogImage: OG_IMAGE,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'CSS Studio — free browser-based CSS generators',
  twitterCard: 'summary_large_image',
  twitterSite: '@itsash',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: OG_IMAGE,
  twitterImageAlt: 'CSS Studio — free browser-based CSS generators',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  themeColor: () => (colorMode.value === 'light' ? '#fbfbfe' : '#010104')
})

/** Site-wide graph plus per-tool WebApplication + BreadcrumbList for rich results. */
useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'canonical', href: url }],
  script: [
    {
      key: 'ld-site',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: `${SITE_URL}/`,
            name: SITE_NAME,
            description: PAGES[0]!.description,
            inLanguage: 'en',
            publisher: { '@id': `${SITE_URL}/#organization` },
            potentialAction: {
              '@type': 'SearchAction',
              target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
              'query-input': 'required name=search_term_string'
            }
          },
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: `${SITE_URL}/`,
            logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 }
          }
        ]
      })
    },
    {
      key: 'ld-page',
      type: 'application/ld+json',
      innerHTML: computed(() => {
        const p = page.value
        if (!p) return '{}'
        const app = {
          '@type': 'WebApplication',
          '@id': `${url.value}#app`,
          name: p.name,
          headline: p.title,
          description: p.description,
          url: url.value,
          image: OG_IMAGE,
          applicationCategory: 'DeveloperApplication',
          applicationSubCategory: p.category,
          operatingSystem: 'Any',
          browserRequirements: 'Requires a modern web browser with JavaScript enabled',
          isAccessibleForFree: true,
          inLanguage: 'en',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          publisher: { '@id': `${SITE_URL}/#organization` },
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
        }
        const crumbs = {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
            ...(p.path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: p.name, item: url.value }])
          ]
        }
        return JSON.stringify({ '@context': 'https://schema.org', '@graph': p.path === '/' ? [app] : [app, crumbs] })
      })
    }
  ]
})
</script>

<template>
  <div class="min-h-dvh bg-bg text-fg">
    <NuxtLoadingIndicator color="#34d399" :height="2" />
    <NuxtPage />
    <ToastHost />
  </div>
</template>
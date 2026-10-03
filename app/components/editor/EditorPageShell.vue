<script setup lang="ts">
import { pushToast } from '~/composables/useToast'

const props = defineProps<{
  title: string
  description?: string
  css: string
  html: string
  vars?: Record<string, string>
  seed?: number
}>()

const emit = defineEmits<{
  randomize: []
  reset: []
  undo: []
  redo: []
  share: []
  download: []
  fullscreen: []
}>()

const colorMode = useColorMode()
const route = useRoute()
const seo = computed(() => pageSeo(route.path))
const related = computed(() => {
  const cur = seo.value
  return cur ? PAGES.filter((p) => p.category === cur.category && p.path !== cur.path).slice(0, 6) : []
})

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

async function copyCss() {
  try {
    await navigator.clipboard.writeText(props.css)
    pushToast('CSS copied')
  } catch {
    pushToast('Copy failed', 'error')
  }
}

/** When the page provides a shareUrl via slot, prefer it; fall back to current URL. */
const sharedUrl = ref<string | null>(null)
provide('editor:shareUrl', (url: string) => {
  sharedUrl.value = url
})

async function share() {
  const url = sharedUrl.value ?? window.location.href
  try {
    await navigator.clipboard.writeText(url)
    pushToast('Share link copied')
  } catch {
    pushToast('Could not copy link', 'error')
  }
}

useHotkeys(() => [
  { key: 'r', meta: false, handler: () => emit('randomize') },
  { key: 'f', meta: false, handler: () => emit('fullscreen') }
])
</script>

<template>
  <div class="flex min-h-dvh flex-col lg:h-dvh lg:overflow-hidden">
    <header class="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-line bg-panel/80 px-4 shadow-panel backdrop-blur-md">
      <div class="flex min-w-0 items-center gap-3">
        <NuxtLink to="/" class="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight text-fg">
          <Icon name="ph-paint-brush" :size="17" weight="duotone" class="text-accent" />
          <span class="hidden sm:inline">CSS Studio</span>
        </NuxtLink>
        <span class="hidden h-4 w-px bg-line md:block" aria-hidden="true"></span>
        <h1 class="truncate text-sm font-medium text-fg">{{ title }}</h1>
      </div>
      <div class="flex items-center gap-1">
        <button
          class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-[background-color,color,transform] duration-150 hover:bg-line/30 hover:text-fg active:scale-[0.95]"
          aria-label="Undo"
          title="Undo"
          @click="emit('undo')"
        >
          <Icon name="ph-arrow-counter-clockwise" :size="15" />
        </button>
        <button
          class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-[background-color,color,transform] duration-150 hover:bg-line/30 hover:text-fg active:scale-[0.95]"
          aria-label="Redo"
          title="Redo"
          @click="emit('redo')"
        >
          <Icon name="ph-arrow-clockwise" :size="15" />
        </button>
        <span class="mx-1 hidden h-4 w-px bg-line sm:block" aria-hidden="true"></span>
        <button
          class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]"
          @click="copyCss"
          title="Copy CSS"
        >
          <Icon name="ph-copy" :size="14" class="text-accent" />
          <span class="hidden md:inline">Copy CSS</span>
        </button>
        <button
          class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]"
          @click="emit('randomize')"
        >
          <Icon name="ph-shuffle" :size="14" class="text-accent" />
          <span class="hidden md:inline">Randomize</span>
        </button>
        <button
          class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]"
          @click="emit('reset')"
        >
          <Icon name="ph-arrow-counter-clockwise" :size="14" />
          <span class="hidden md:inline">Reset</span>
        </button>
        <button
          class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]"
          @click="share"
        >
          <Icon name="ph-share-network" :size="14" />
          <span class="hidden md:inline">Share</span>
        </button>
        <button
          class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-[background-color,color] duration-150 hover:bg-line/30 hover:text-fg active:scale-[0.95]"
          :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <Icon :name="colorMode.value === 'dark' ? 'ph-sun' : 'ph-moon'" :size="15" />
        </button>
        <CommandPalette />
      </div>
    </header>

    <div class="flex min-h-0 flex-1">
      <aside class="hidden w-56 shrink-0 overflow-y-auto border-r border-line bg-panel md:block" aria-label="Generators">
        <SidebarNav />
      </aside>

      <main class="flex min-w-0 flex-1 flex-col lg:flex-row">
        <div class="flex min-w-0 flex-1 flex-col">
          <slot name="preview" />
        </div>

        <div class="flex w-full shrink-0 flex-col gap-3.5 border-t border-line bg-panel p-3.5 lg:w-[380px] lg:min-h-0 lg:overflow-y-auto lg:border-l lg:border-t-0">
          <slot name="controls" />
          <slot name="code" />
          <section aria-labelledby="about-heading" class="mt-2 border-t border-line pt-3.5 text-xs leading-relaxed text-muted">
            <h2 id="about-heading" class="mb-1 text-[11px] font-medium tracking-wide uppercase">About this generator</h2>
            <p>{{ seo?.description ?? description }}</p>
            <nav v-if="related.length" aria-label="Related generators" class="mt-3">
              <h2 class="mb-1.5 text-[11px] font-medium tracking-wide uppercase">Related {{ seo?.category.toLowerCase() }} tools</h2>
              <ul class="flex flex-wrap gap-1.5">
                <li v-for="r in related" :key="r.path">
                  <NuxtLink :to="r.path" class="inline-flex rounded-md border border-line px-2 py-1 text-fg transition-colors duration-150 hover:border-accent/60">{{ r.name }}</NuxtLink>
                </li>
              </ul>
            </nav>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>
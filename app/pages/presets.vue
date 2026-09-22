<script setup lang="ts">
import { PRESETS_GRADIENT } from '~/utils/generators/gradient'
import { PRESETS_BLOB } from '~/utils/generators/blob'
import { PRESETS_PATTERN } from '~/utils/generators/pattern'
import { PRESETS_SHADOW } from '~/utils/generators/shadow'
import { PRESETS_GLASS } from '~/utils/generators/glass'
import { PRESETS_NEUMORPH } from '~/utils/generators/neumorph'
import { PRESETS_SHAPE } from '~/utils/generators/shape'
import { PRESETS_TEXT_EFFECT } from '~/utils/generators/text'
import { PRESETS_ANIMATION } from '~/utils/generators/animation'
import { gradientCss } from '~/utils/generators/gradient'
import { blobPreviewStyle } from '~/utils/generators/blob'
import { patternPreviewStyle } from '~/utils/generators/pattern'
import { shadowPreviewStyle } from '~/utils/generators/shadow'
import { shapeStyle } from '~/utils/generators/shape'
import { textEffectStyle } from '~/utils/generators/text'
import { pushToast } from '~/composables/useToast'

const query = ref('')
const activeCategory = ref<string>('All')

const categories = ['All', 'Gradients', 'Blobs', 'Patterns', 'Shadows', 'Glass', 'Neumorphism', 'Shapes', 'Text', 'Animations']

interface PresetEntry {
  id: string
  name: string
  tags: string[]
  category: string
  css: string
  route: string
  previewStyle: Record<string, string>
}

const entries = computed<PresetEntry[]>(() => [
  ...PRESETS_GRADIENT.map((p, i) => ({
    id: `gradient-${i}`,
    name: p.name,
    tags: p.tags,
    category: 'Gradients',
    css: gradientCss(p.state),
    route: '/gradient',
    previewStyle: { background: gradientCss(p.state) }
  })),
  ...PRESETS_BLOB.map((p, i) => ({
    id: `blob-${i}`,
    name: p.name,
    tags: p.tags,
    category: 'Blobs',
    css: '',
    route: '/blob',
    previewStyle: blobPreviewStyle(p.state)
  })),
  ...PRESETS_PATTERN.map((p, i) => ({
    id: `pattern-${i}`,
    name: p.name,
    tags: p.tags,
    category: 'Patterns',
    css: '',
    route: '/pattern',
    previewStyle: patternPreviewStyle(p.state)
  })),
  ...PRESETS_SHADOW.map((p, i) => ({
    id: `shadow-${i}`,
    name: p.name,
    tags: p.tags,
    category: 'Shadows',
    css: '',
    route: '/shadow',
    previewStyle: shadowPreviewStyle(p.state)
  })),
  ...PRESETS_GLASS.map((p, i) => ({
    id: `glass-${i}`,
    name: p.name,
    tags: p.tags,
    category: 'Glass',
    css: '',
    route: '/glass',
    previewStyle: {}
  })),
  ...PRESETS_NEUMORPH.map((p, i) => ({
    id: `neumorph-${i}`,
    name: p.name,
    tags: p.tags,
    category: 'Neumorphism',
    css: '',
    route: '/neumorphism',
    previewStyle: {}
  })),
  ...PRESETS_SHAPE.map((p, i) => ({
    id: `shape-${i}`,
    name: p.name,
    tags: p.tags,
    category: 'Shapes',
    css: '',
    route: '/shape',
    previewStyle: shapeStyle(p.state.kind, 48, p.state.color, p.state.radius)
  })),
  ...PRESETS_TEXT_EFFECT.map((p, i) => ({
    id: `text-${i}`,
    name: p.name,
    tags: p.tags,
    category: 'Text',
    css: '',
    route: '/text',
    previewStyle: {}
  })),
  ...PRESETS_ANIMATION.map((p, i) => ({
    id: `animation-${i}`,
    name: p.name,
    tags: p.tags,
    category: 'Animations',
    css: '',
    route: '/animation',
    previewStyle: {}
  }))
])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return entries.value.filter((e) => {
    const matchCat = activeCategory.value === 'All' || e.category === activeCategory.value
    const matchQ = !q || e.name.toLowerCase().includes(q) || e.tags.some((t) => t.includes(q))
    return matchCat && matchQ
  })
})

async function copyCss(entry: PresetEntry) {
  if (!entry.css) {
    pushToast('Open the generator for full CSS', 'info')
    return
  }
  try {
    await navigator.clipboard.writeText(entry.css)
    pushToast(`${entry.name} CSS copied`)
  } catch {
    pushToast('Copy failed', 'error')
  }
}

useHead({ title: 'Presets - CSS Studio' })
</script>

<template>
  <div class="flex min-h-dvh">
    <aside class="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-line bg-panel shadow-panel md:flex">
      <div class="flex h-14 shrink-0 items-center gap-2 border-b border-line px-4">
        <NuxtLink to="/" class="flex items-center gap-2 text-sm font-semibold tracking-tight text-fg">
          <Icon name="ph-paint-brush" :size="18" weight="duotone" class="text-accent" />
          CSS Studio
        </NuxtLink>
      </div>
      <div class="min-h-0 flex-1 overflow-y-auto">
        <SidebarNav />
      </div>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col">
      <header class="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-line bg-panel/80 px-4 shadow-panel backdrop-blur-md">
        <h1 class="text-sm font-medium text-fg">Preset Library</h1>
        <CommandPalette />
      </header>

      <main class="mx-auto w-full max-w-[1400px] flex-1 px-6 py-8 lg:px-10">
        <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            v-model="query"
            type="search"
            placeholder="Search presets..."
            class="h-10 w-full max-w-xs rounded-lg border border-line bg-panel px-3 text-sm text-fg placeholder:text-muted"
            aria-label="Search presets"
          />
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="cat in categories"
              :key="cat"
              class="rounded-full border px-3 py-1.5 text-xs transition-[transform,color,background-color] duration-150 active:scale-[0.97]"
              :class="activeCategory === cat ? 'border-transparent bg-accent/15 text-fg font-medium' : 'border-line bg-panel text-muted hover:text-fg'"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div v-if="filtered.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <article
            v-for="entry in filtered"
            :key="entry.id"
            class="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel shadow-panel transition-[transform,box-shadow] duration-150 hover:shadow-panel-lg"
          >
            <div class="flex h-32 items-center justify-center bg-bg p-4">
              <div
                class="h-full max-h-20 w-full max-w-28"
                :style="entry.previewStyle"
                :aria-label="`${entry.name} preview`"
              ></div>
            </div>
            <div class="flex flex-1 flex-col gap-2 p-4">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-fg">{{ entry.name }}</span>
                <div class="flex items-center gap-1">
                  <button
                    class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted hover:text-fg"
                    aria-label="Copy CSS"
                    title="Copy CSS"
                    @click="copyCss(entry)"
                  >
                    <Icon name="ph-copy" :size="13" />
                  </button>
                  <NuxtLink
                    :to="entry.route"
                    class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted hover:text-fg"
                    aria-label="Edit in generator"
                    title="Edit"
                  >
                    <Icon name="ph-pencil-simple" :size="13" />
                  </NuxtLink>
                </div>
              </div>
              <div class="flex flex-wrap gap-1">
                <span v-for="tag in entry.tags" :key="tag" class="rounded-full bg-line/30 px-2 py-0.5 text-[10px] text-muted">{{ tag }}</span>
              </div>
            </div>
          </article>
        </div>
        <div v-else class="flex flex-col items-center gap-2 py-16 text-center">
          <Icon name="ph-magnifying-glass" :size="24" class="text-muted" />
          <p class="text-sm text-muted">No presets match your search.</p>
        </div>
      </main>
    </div>
  </div>
</template>
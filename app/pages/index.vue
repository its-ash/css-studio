<script setup lang="ts">
const generators = [
  { to: '/gradient', title: 'Gradient', desc: 'Linear, radial, conic and repeating gradients with presets.', icon: 'ph-drop' },
  { to: '/mesh', title: 'Mesh Gradient', desc: 'Draggable color points composited into layered radial gradients.', icon: 'ph-circle-half' },
  { to: '/blob', title: 'Blob', desc: 'Organic border-radius shapes with animation.', icon: 'ph-scribble' },
  { to: '/pattern', title: 'Pattern', desc: '12 CSS-only tileable patterns.', icon: 'ph-grid-four' },
  { to: '/shadow', title: 'Shadow', desc: 'Layered box and text shadows.', icon: 'ph-square-half' },
  { to: '/shape', title: 'Shape', desc: '16 pure-CSS shapes with clip-path.', icon: 'ph-triangle' },
  { to: '/border', title: 'Border', desc: 'Gradient, animated, and glow borders with per-side controls.', icon: 'ph-square' },
  { to: '/glass', title: 'Glass', desc: 'Frosted backdrop-filter panels.', icon: 'ph-drop-half' },
  { to: '/neumorphism', title: 'Neumorphism', desc: 'Soft-UI dual shadows from a light source.', icon: 'ph-circle-dashed' },
  { to: '/text', title: 'Text Effects', desc: 'Gradient, neon, 3D, metallic text styles.', icon: 'ph-text-aa' },
  { to: '/animation', title: 'Animation', desc: 'Keyframe builder with timing controls.', icon: 'ph-sparkle' },
  { to: '/component', title: 'Component', desc: 'Buttons, cards, inputs, badges, navbars and heroes.', icon: 'ph-cube' },
  { to: '/background', title: 'Background', desc: 'Composite gradients, patterns and glows into layered backgrounds.', icon: 'ph-layout' },
  { to: '/loader', title: 'Loader', desc: 'Spinners, dots, bars, progress bars and skeleton shimmer.', icon: 'ph-spinner-gap' },
  { to: '/badge', title: 'Badge', desc: 'Pill shapes, status dots, notification counts and ribbons.', icon: 'ph-tag' },
  { to: '/divider', title: 'Divider', desc: 'Gradient-fade, dashed, double and zigzag section dividers.', icon: 'ph-ruler' },
  { to: '/scrollbar', title: 'Scrollbar', desc: 'Custom ::-webkit-scrollbar and scrollbar-color styling.', icon: 'ph-square-half' },
  { to: '/scroll-anim', title: 'Scroll Animations', desc: 'CSS scroll() and view() timelines: progress bars, reveals, parallax.', icon: 'ph-arrow-bend-double-up-right' },
  { to: '/tooltip', title: 'Tooltip', desc: 'Pure-CSS data-tip tooltips with placement, arrow and skins.', icon: 'ph-chat-centered-text' },
  { to: '/marquee', title: 'Marquee', desc: 'Infinite scrolling ticker with edge fade and pause-on-hover.', icon: 'ph-arrows-out-line-horizontal' },
  { to: '/var-font', title: 'Variable Font', desc: 'font-variation-settings playground with live axes.', icon: 'ph-text-t' },
  { to: '/text-ring', title: 'Text Ring', desc: 'Rotating text-on-a-circle badge in pure CSS.', icon: 'ph-circle-dashed' },
  { to: '/scroll-snap', title: 'Scroll-snap', desc: 'Magnetic snap-point carousels without JS.', icon: 'ph-magnet' },
  { to: '/mask', title: 'Mask Studio', desc: 'mask-image fades, holes, stripes and dot grids.', icon: 'ph-rectangle' },
  { to: '/clip', title: 'Clip-path', desc: 'Draggable clip-path polygon, circle and inset editor.', icon: 'ph-scissors' },
  { to: '/aspect-fit', title: 'Aspect & Fit', desc: 'aspect-ratio frames with object-fit comparison.', icon: 'ph-crop' },
  { to: '/marker-list', title: 'List Markers', desc: 'Custom ::marker bullets, glyphs and counters.', icon: 'ph-list-bullets' },
  { to: '/conic-chart', title: 'Conic Chart', desc: 'Pie and donut charts from conic-gradient data.', icon: 'ph-chart-pie-slice' },
  { to: '/palette', title: 'Color Tools', desc: 'Harmonies, contrast checker, formats.', icon: 'ph-palette' }
]

const search = ref('')
const filteredGenerators = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return generators
  return generators.filter((g) => g.title.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q))
})

const { open } = useCommandPalette()

function focusSearch() {
  document.getElementById('home-search')?.focus()
}

useSeoMeta({
  title: 'CSS Studio - Free CSS Generators for Gradients, Shadows & Animations',
  description: 'Create gradients, blobs, backgrounds, patterns, shadows and animations with pure CSS. Free, client-side CSS generator studio — no signup, export ready-to-use code instantly.',
  ogTitle: 'CSS Studio',
  ogDescription: 'Create gradients, blobs, backgrounds, patterns, shadows and animations with pure CSS.',
  ogUrl: 'https://css-studio.itsash.in/',
  twitterTitle: 'CSS Studio',
  twitterDescription: 'Create gradients, blobs, backgrounds, patterns, shadows and animations with pure CSS.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/' }] })
</script>

<template>
  <div class="flex min-h-dvh">
    <aside class="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-line bg-panel md:flex">
      <div class="flex h-14 shrink-0 items-center gap-2 border-b border-line px-4">
        <NuxtLink to="/" class="flex items-center gap-2 text-sm font-semibold tracking-tight text-fg">
          <Icon name="ph-paint-brush" :size="17" weight="duotone" class="text-accent" />
          CSS Studio
        </NuxtLink>
      </div>
      <div class="min-h-0 flex-1 overflow-y-auto">
        <SidebarNav />
      </div>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col">
      <header class="flex h-14 shrink-0 items-center justify-between border-b border-line bg-panel/80 px-4 shadow-panel backdrop-blur-md md:justify-end">
        <NuxtLink to="/" class="flex items-center gap-2 text-sm font-semibold tracking-tight text-fg md:hidden">
          <Icon name="ph-paint-brush" :size="17" weight="duotone" class="text-accent" />
          CSS Studio
        </NuxtLink>
        <div class="flex items-center gap-2">
          <CommandPalette />
        </div>
      </header>

      <main class="mx-auto w-full max-w-[1400px] flex-1 px-6 py-8 lg:px-10">
        <section class="mx-auto mb-10 flex max-w-xl flex-col items-center text-center">
          <label for="home-search" class="sr-only">Search generators</label>
          <span class="relative w-full">
            <button
              type="button"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-muted transition-colors duration-150 hover:text-fg"
              aria-label="Open command palette"
              title="Open command palette (⌘K)"
              @click="open()"
            >
              <Icon name="ph-magnifying-glass" :size="16" />
            </button>
            <input
              id="home-search"
              v-model="search"
              type="search"
              placeholder="Search generators…"
              class="h-11 w-full rounded-full border border-line bg-panel pl-9 pr-16 text-sm text-fg shadow-panel transition-[border-color,background-color] duration-150 hover:border-line-strong focus:border-accent/60 focus:outline-none placeholder:text-muted"
              aria-label="Search generators"
              @keydown.meta.k.prevent="open()"
            />
            <kbd class="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center rounded border border-line bg-bg px-1.5 font-mono text-[10px] text-muted sm:inline-flex">⌘K</kbd>
          </span>
        </section>

        <section class="mb-10 max-w-2xl">
          <h1 class="text-4xl font-semibold tracking-tighter leading-[1.05] text-fg md:text-5xl">
            Generate Beautiful CSS<br />Without Writing It
          </h1>
          <p class="mt-4 text-base leading-relaxed text-muted">
            Create gradients, blobs, backgrounds, patterns, shadows and animations with pure CSS.
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <NuxtLink
              to="/gradient"
              class="inline-flex h-10 items-center rounded-lg bg-accent px-5 text-sm font-medium text-accent-fg transition-transform duration-150 active:scale-[0.97]"
            >
              Open Gradient Studio
            </NuxtLink>
          </div>
        </section>

        <section aria-labelledby="generators-heading">
          <h2 id="generators-heading" class="mb-4 text-xs font-medium tracking-wide text-muted uppercase">Generators</h2>
          <div v-if="filteredGenerators.length" class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <NuxtLink
              v-for="g in filteredGenerators"
              :key="g.to"
              :to="g.to"
              class="group flex flex-col gap-2 rounded-xl border border-line bg-panel p-4 shadow-panel transition-[transform,border-color,box-shadow] duration-150 hover:border-accent/60 hover:shadow-panel-lg active:scale-[0.99]"
            >
              <Icon :name="g.icon" :size="20" class="text-accent" />
              <span class="text-sm font-medium tracking-tight text-fg">{{ g.title }}</span>
              <span class="text-xs leading-relaxed text-muted">{{ g.desc }}</span>
            </NuxtLink>
          </div>
          <div v-else class="flex flex-col items-center gap-2 py-12 text-center">
            <Icon name="ph-magnifying-glass" :size="24" class="text-muted" />
            <p class="text-sm text-muted">No generators match your search.</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
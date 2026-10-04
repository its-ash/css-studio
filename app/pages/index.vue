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
  { to: '/cursor', title: 'Cursor & Selection', desc: 'Custom cursors and ::selection colors.', icon: 'ph-cursor' },
  { to: '/filter', title: 'Filter', desc: 'Blur, grayscale, contrast and duotone filter stacks.', icon: 'ph-funnel' },
  { to: '/spotlight', title: 'Spotlight', desc: 'Cursor-follow radial-gradient glow.', icon: 'ph-flashlight' },
  { to: '/noise', title: 'Noise & Grain', desc: 'Film grain, static and halftone overlays.', icon: 'ph-dots-nine' },
  { to: '/typescale', title: 'Type Scale', desc: 'Fluid clamp() typography scale.', icon: 'ph-text-t' },
  { to: '/palette', title: 'Color Tools', desc: 'Harmonies, contrast checker, formats.', icon: 'ph-palette' },
  { to: '/hover', title: 'Hover Effects', desc: 'Lift, glow, underline sweep, fill, tilt, shine hovers.', icon: 'ph-cursor-click' },
  { to: '/toggle', title: 'Toggles & Checkboxes', desc: 'Switches, checkboxes, radios and skeleton loaders.', icon: 'ph-toggle-left' },
  { to: '/input', title: 'Input Fields', desc: 'Outline, underline, floating label and glow inputs.', icon: 'ph-textbox' },
  { to: '/flip-card', title: 'Flip Card', desc: '3D hover flip cards with front/back faces.', icon: 'ph-rectangle' },
  { to: '/compare', title: 'Before / After', desc: 'Pure-CSS image comparison with split handle.', icon: 'ph-arrows-left-right' },
  { to: '/text-anim', title: 'Text Animations', desc: 'Typewriter, wave, glitch, blur-in, stagger.', icon: 'ph-text-aa' },
  { to: '/link', title: 'Link Underlines', desc: '10 animated underline micro-interactions.', icon: 'ph-link' },
  { to: '/squircle', title: 'Squircle', desc: 'iOS-style superellipse corner smoothing.', icon: 'ph-rectangle' },
  { to: '/accordion', title: 'Accordion', desc: 'Details/summary accordions with smooth animation.', icon: 'ph-list' },
  { to: '/chat', title: 'Chat Bubbles', desc: 'Sent/received bubbles, tails, typing dots.', icon: 'ph-chats' },
  { to: '/terminal', title: 'Terminal Window', desc: 'macOS-style terminal and code mockups.', icon: 'ph-terminal-window' },
  { to: '/hamburger', title: 'Hamburger Icons', desc: 'Animated menu-to-X morphs without JS.', icon: 'ph-list' },
  { to: '/avatar', title: 'Avatar Stack', desc: 'Overlapping groups, rings, +N badges.', icon: 'ph-users-three' },
  { to: '/pagination', title: 'Pagination', desc: 'Dots, arrows, pills and glow active states.', icon: 'ph-dots-three' },
  { to: '/timeline', title: 'Timeline', desc: 'Vertical timelines with animated lines.', icon: 'ph-clock-counter-clockwise' },
  { to: '/rating', title: 'Star Rating', desc: 'Stars, hearts and distribution bars.', icon: 'ph-star' },
  { to: '/orbit', title: '3D Orbit', desc: 'Rotating cubes, planets, gyros and spheres.', icon: 'ph-orbit' },
  { to: '/aurora', title: 'Aurora Background', desc: 'Aurora, starfield, sunset and moonlight scenes.', icon: 'ph-sparkle' },
  { to: '/table', title: 'Table Styles', desc: 'Zebra rows, sticky headers, rounded frames.', icon: 'ph-table' },
  { to: '/kbd', title: 'Kbd & Code Chips', desc: 'Keyboard keycaps and inline code chips.', icon: 'ph-keyboard' },
  { to: '/trail', title: 'Cursor Trail', desc: 'Sparkle trails and scroll progress indicators.', icon: 'ph-cursor-click' },
  { to: '/navbar', title: 'Navbar Builder', desc: 'Floating, underline, pill and sidebar navs.', icon: 'ph-list-magnifying-glass' },
  { to: '/toast', title: 'Toasts', desc: 'Variants, skins, timers and entrance animations.', icon: 'ph-bell' },
  { to: '/progress-bar', title: 'Progress Bar', desc: 'Gradient, striped, indeterminate progress.', icon: 'ph-activity' },
  { to: '/skeleton', title: 'Skeleton Loaders', desc: 'Shimmer, wave and pulse placeholders.', icon: 'ph-spiral' },
  { to: '/gradient-text', title: 'Gradient Text', desc: 'Flowing gradient and outline text.', icon: 'ph-text-aa' },
  { to: '/modal', title: 'Modal & Dialog', desc: 'Overlays, sheets and dialogs with animations.', icon: 'ph-browser' },
  { to: '/card', title: 'Card Styles', desc: 'Elevated, glass, gradient-border cards.', icon: 'ph-cards' },
  { to: '/wave', title: 'Wave Dividers', desc: 'Sine, zigzag, step and blob waves.', icon: 'ph-waves' },
  { to: '/svg-background', title: 'SVG Backgrounds', desc: 'Waves, blobs, peaks and low poly scenes.', icon: 'ph-grid-four' }
]

const route = useRoute()
const search = ref(typeof route.query.q === 'string' ? route.query.q.slice(0, 100) : '')

const faqs = [
  { q: 'Is CSS Studio free?', a: 'Yes. Every generator is completely free, runs entirely in your browser and requires no signup or account.' },
  { q: 'Does CSS Studio output real CSS?', a: 'Yes. Every effect is pure, production-ready HTML and CSS you can copy or download instantly — no frameworks, canvas or runtime dependencies.' },
  { q: 'How many CSS generators are available?', a: `${generators.length} tools covering gradients, shadows, glassmorphism, animations, scroll-driven effects, UI components, text effects, backgrounds and color utilities.` },
  { q: 'Is my work saved?', a: 'Your settings are saved locally in your browser, with undo/redo history and shareable links that encode the full state in the URL. Nothing is uploaded to a server.' },
  { q: 'Can I use the generated code in commercial projects?', a: 'Yes. The CSS you generate is yours to use in personal and commercial projects without attribution.' }
]
const filteredGenerators = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return generators
  return generators.filter((g) => g.title.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q))
})

const { open } = useCommandPalette()

function focusSearch() {
  document.getElementById('home-search')?.focus()
}


/** FAQPage + ItemList structured data for rich results on the dashboard. */
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a }
            }))
          },
          {
            '@type': 'ItemList',
            name: 'CSS Generators',
            itemListElement: generators.map((g, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: g.title,
              url: absUrl(g.to)
            }))
          }
        ]
      })
    }
  ]
})
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
            {{ generators.length }} free online CSS generators for gradients, box shadows, glassmorphism, animations, loaders, patterns and UI components. Tweak visually, copy pure CSS + HTML — no signup, nothing leaves your browser.
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

        <section aria-labelledby="faq-heading" class="mt-16 max-w-3xl">
          <h2 id="faq-heading" class="mb-4 text-xs font-medium tracking-wide text-muted uppercase">Frequently asked questions</h2>
          <div class="divide-y divide-line rounded-xl border border-line bg-panel">
            <details v-for="f in faqs" :key="f.q" class="group px-4 py-3">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-fg">
                <h3>{{ f.q }}</h3>
                <Icon name="ph-caret-down" :size="14" class="shrink-0 text-muted transition-transform duration-150 group-open:rotate-180" />
              </summary>
              <p class="mt-2 text-sm leading-relaxed text-muted">{{ f.a }}</p>
            </details>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
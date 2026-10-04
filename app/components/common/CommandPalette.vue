<script setup lang="ts">
import { useToasts } from '~/composables/useToast'
import { useCommandPalette } from '~/composables/useHotkeys'

const { toasts, dismiss } = useToasts()
const { paletteOpen, toggle } = useCommandPalette()
const colorMode = useColorMode()

interface PaletteCommand {
  id: string
  label: string
  icon: string
  run(): void
}

const query = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const listRef = ref<HTMLDivElement | null>(null)
const activeIndex = ref(0)

/**
 * Kept in sync with SidebarNav.vue's `nav` array — that component is the
 * source of truth for the full page set.
 */
const commands = computed<PaletteCommand[]>(() => {
  const nav: { to: string; label: string; icon: string }[] = [
    { to: '/', label: 'Dashboard', icon: 'ph-house' },
    { to: '/gradient', label: 'Gradient', icon: 'ph-drop' },
    { to: '/mesh', label: 'Mesh Gradient', icon: 'ph-circle-half' },
    { to: '/blob', label: 'Blob', icon: 'ph-scribble' },
    { to: '/pattern', label: 'Pattern', icon: 'ph-grid-four' },
    { to: '/shadow', label: 'Shadow', icon: 'ph-square-half' },
    { to: '/glass', label: 'Glass', icon: 'ph-drop-half' },
    { to: '/neumorphism', label: 'Neumorphism', icon: 'ph-circle-dashed' },
    { to: '/shape', label: 'Shape', icon: 'ph-triangle' },
    { to: '/border', label: 'Border', icon: 'ph-square' },
    { to: '/text', label: 'Text', icon: 'ph-text-aa' },
    { to: '/animation', label: 'Animation', icon: 'ph-sparkle' },
    { to: '/component', label: 'Component', icon: 'ph-cube' },
    { to: '/background', label: 'Background', icon: 'ph-layout' },
    { to: '/loader', label: 'Loader', icon: 'ph-spinner-gap' },
    { to: '/badge', label: 'Badge', icon: 'ph-tag' },
    { to: '/divider', label: 'Divider', icon: 'ph-ruler' },
    { to: '/scrollbar', label: 'Scrollbar', icon: 'ph-square-half' },
    { to: '/scroll-anim', label: 'Scroll Animations', icon: 'ph-arrow-bend-double-up-right' },
    { to: '/tooltip', label: 'Tooltip', icon: 'ph-chat-centered-text' },
    { to: '/marquee', label: 'Marquee', icon: 'ph-arrows-out-line-horizontal' },
    { to: '/var-font', label: 'Variable Font', icon: 'ph-text-t' },
    { to: '/text-ring', label: 'Text Ring', icon: 'ph-circle-dashed' },
    { to: '/scroll-snap', label: 'Scroll-snap', icon: 'ph-magnet' },
    { to: '/mask', label: 'Mask Studio', icon: 'ph-rectangle' },
    { to: '/clip', label: 'Clip-path', icon: 'ph-scissors' },
    { to: '/aspect-fit', label: 'Aspect & Fit', icon: 'ph-crop' },
    { to: '/marker-list', label: 'List Markers', icon: 'ph-list-bullets' },
    { to: '/conic-chart', label: 'Conic Chart', icon: 'ph-chart-pie-slice' },
    { to: '/filter', label: 'Filter', icon: 'ph-funnel' },
    { to: '/spotlight', label: 'Spotlight', icon: 'ph-flashlight' },
    { to: '/noise', label: 'Noise & Grain', icon: 'ph-dots-nine' },
    { to: '/typescale', label: 'Type Scale', icon: 'ph-text-t' },
    { to: '/hover', label: 'Hover Effects', icon: 'ph-cursor-click' },
    { to: '/toggle', label: 'Toggles & Checkboxes', icon: 'ph-toggle-left' },
    { to: '/input', label: 'Input Fields', icon: 'ph-textbox' },
    { to: '/flip-card', label: 'Flip Card', icon: 'ph-rectangle' },
    { to: '/compare', label: 'Before / After', icon: 'ph-arrows-left-right' },
    { to: '/text-anim', label: 'Text Animations', icon: 'ph-text-aa' },
    { to: '/link', label: 'Link Underlines', icon: 'ph-link' },
    { to: '/squircle', label: 'Squircle', icon: 'ph-rectangle' },
    { to: '/accordion', label: 'Accordion', icon: 'ph-list' },
    { to: '/chat', label: 'Chat Bubbles', icon: 'ph-chats' },
    { to: '/terminal', label: 'Terminal Window', icon: 'ph-terminal-window' },
    { to: '/hamburger', label: 'Hamburger Icons', icon: 'ph-list' },
    { to: '/avatar', label: 'Avatar Stack', icon: 'ph-users-three' },
    { to: '/pagination', label: 'Pagination', icon: 'ph-dots-three' },
    { to: '/timeline', label: 'Timeline', icon: 'ph-clock-counter-clockwise' },
    { to: '/rating', label: 'Star Rating', icon: 'ph-star' },
    { to: '/orbit', label: '3D Orbit', icon: 'ph-orbit' },
    { to: '/aurora', label: 'Aurora Background', icon: 'ph-sparkle' },
    { to: '/table', label: 'Table Styles', icon: 'ph-table' },
    { to: '/kbd', label: 'Kbd & Code Chips', icon: 'ph-keyboard' },
    { to: '/trail', label: 'Cursor Trail', icon: 'ph-cursor-click' },
    { to: '/navbar', label: 'Navbar Builder', icon: 'ph-list-magnifying-glass' },
    { to: '/toast', label: 'Toasts', icon: 'ph-bell' },
    { to: '/progress-bar', label: 'Progress Bar', icon: 'ph-activity' },
    { to: '/skeleton', label: 'Skeleton Loaders', icon: 'ph-spiral' },
    { to: '/gradient-text', label: 'Gradient Text', icon: 'ph-text-aa' },
    { to: '/modal', label: 'Modal & Dialog', icon: 'ph-browser' },
    { to: '/card', label: 'Card Styles', icon: 'ph-cards' },
    { to: '/wave', label: 'Wave Dividers', icon: 'ph-waves' },
    { to: '/svg-background', label: 'SVG Backgrounds', icon: 'ph-grid-four' },
    { to: '/palette', label: 'Color Tools', icon: 'ph-palette' }
  ]
  return nav.map((n) => ({
    id: `nav-${n.to}`,
    label: n.label,
    icon: n.icon,
    run: () => navigateTo(n.to)
  }))
})

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return commands.value
  return commands.value.filter((c) => c.label.toLowerCase().includes(q))
})

watch(filtered, () => {
  activeIndex.value = 0
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, filtered.value.length - 1)
    listRef.value?.querySelectorAll('button')[activeIndex.value]?.scrollIntoView({ block: 'nearest' })
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
    listRef.value?.querySelectorAll('button')[activeIndex.value]?.scrollIntoView({ block: 'nearest' })
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const cmd = filtered.value[activeIndex.value]
    if (cmd) {
      cmd.run()
      paletteOpen.value = false
    }
  } else if (e.key === 'Escape') {
    paletteOpen.value = false
  }
}

function openTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

function runCommand(cmd: PaletteCommand) {
  cmd.run()
  paletteOpen.value = false
}

useHotkeys(() => [
  { key: 'k', meta: true, handler: toggle },
  { key: 't', meta: true, handler: openTheme }
])

watch(paletteOpen, (open) => {
  if (open) {
    query.value = ''
    activeIndex.value = 0
    nextTick(() => inputEl.value?.focus())
  }
})
</script>

<template>
  <div>
    <!-- Trigger button -->
    <button
      class="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-3 h-8 text-sm text-muted transition-[color,border-color] duration-150 hover:text-fg hover:border-line-strong active:scale-[0.97]"
      aria-label="Open command palette"
      @click="toggle"
    >
      <Icon name="ph-magnifying-glass" :size="14" />
      <span>Search</span>
      <kbd class="ml-1 hidden sm:inline-flex items-center rounded border border-line bg-bg px-1.5 font-mono text-[10px] text-muted">⌘K</kbd>
    </button>

    <!-- Palette overlay -->
    <Teleport to="body">
      <Transition name="palette">
        <div
          v-if="paletteOpen"
          class="fixed inset-0 z-[90] flex items-start justify-center pt-[12vh] bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          @click.self="paletteOpen = false"
        >
          <div
            class="w-[min(92vw,560px)] rounded-xl border border-line bg-panel shadow-panel-lg overflow-hidden"
            @keydown="onKeydown"
          >
            <div class="flex items-center gap-2 border-b border-line px-4">
              <Icon name="ph-magnifying-glass" :size="16" class="text-muted" />
              <input
                ref="inputEl"
                v-model="query"
                type="text"
                placeholder="Type a command or search..."
                class="w-full bg-transparent py-3 text-sm text-fg outline-none placeholder:text-muted"
                aria-label="Search commands"
              />
              <kbd class="rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[10px] text-muted">esc</kbd>
            </div>
            <div ref="listRef" class="max-h-[320px] overflow-y-auto p-2">
              <div v-if="!filtered.length" class="px-3 py-6 text-center text-sm text-muted">
                No results for “{{ query }}”
              </div>
              <button
                v-for="(cmd, i) in filtered"
                :key="cmd.id"
                class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-100"
                :class="i === activeIndex ? 'bg-accent/12 text-fg' : 'text-muted hover:text-fg'"
                :data-index="i"
                @mouseenter="activeIndex = i"
                @click="runCommand(cmd)"
              >
                <Icon :name="cmd.icon" :size="16" />
                <span>{{ cmd.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.palette-enter-active,
.palette-leave-active {
  transition: opacity 150ms ease-out;
}
.palette-enter-from,
.palette-leave-to {
  opacity: 0;
}
.palette-enter-active > div {
  transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
}
.palette-enter-from > div {
  transform: scale(0.98);
}
</style>
<script setup lang="ts">
const route = useRoute()

const navEl = ref<HTMLElement | null>(null)
const activeEl = ref<HTMLElement | null>(null)

/** Sidebar remounts with each page shell, so its scroll offset is kept across navigations. */
const savedScroll = useState('sidebar:scroll', () => 0)
let container: HTMLElement | null = null
const onScroll = () => {
  if (container) savedScroll.value = container.scrollTop
}

/** Bring the active link into view without animating, only when it's outside the visible area. */
function revealActive() {
  const el = navEl.value?.querySelector<HTMLElement>('[aria-current="page"]') ?? null
  activeEl.value = el
  if (!el || !container) return
  const c = container.getBoundingClientRect()
  const r = el.getBoundingClientRect()
  if (r.top < c.top || r.bottom > c.bottom) {
    container.scrollTop += r.top - c.top - (c.height - r.height) / 2
  }
}

onMounted(() => {
  container = navEl.value?.closest<HTMLElement>('.overflow-y-auto') ?? null
  if (!container) return
  container.scrollTop = savedScroll.value
  revealActive()
  savedScroll.value = container.scrollTop
  container.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => container?.removeEventListener('scroll', onScroll))

watch(
  () => route.path,
  async () => {
    await nextTick()
    revealActive()
  }
)

const nav = [
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
  { to: '/cursor', label: 'Cursor & Selection', icon: 'ph-cursor' },
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
</script>

<template>
  <nav ref="navEl" class="flex flex-col gap-0.5 p-2" aria-label="Generators">
    <NuxtLink
      v-for="item in nav"
      :key="item.to"
      :to="item.to"
      class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-[background-color,color,transform] duration-150 active:scale-[0.98]"
      :class="route.path === item.to ? 'bg-accent/12 text-fg font-medium' : 'text-muted hover:text-fg hover:bg-line/25'"
      :aria-current="route.path === item.to ? 'page' : undefined"
    >
      <Icon :name="item.icon" :size="16" :class="route.path === item.to ? 'text-accent' : ''" />
      <span>{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>
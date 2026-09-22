<script setup lang="ts">
const route = useRoute()

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
  { to: '/cursor', label: 'Cursor & Selection', icon: 'ph-cursor' },
  { to: '/filter', label: 'Filter', icon: 'ph-funnel' },
  { to: '/spotlight', label: 'Spotlight', icon: 'ph-flashlight' },
  { to: '/noise', label: 'Noise & Grain', icon: 'ph-dots-nine' },
  { to: '/typescale', label: 'Type Scale', icon: 'ph-text-t' },
  { to: '/palette', label: 'Color Tools', icon: 'ph-palette' }
]
</script>

<template>
  <nav class="flex flex-col gap-0.5 p-2" aria-label="Generators">
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
<script setup lang="ts">
defineProps<{
  presets: { name: string; tags: string[] }[]
}>()

const emit = defineEmits<{ apply: [index: number] }>()
</script>

<template>
  <div
    class="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-center p-3"
    aria-label="Presets"
  >
    <div class="pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-xl border border-line bg-panel/90 p-1.5 shadow-panel-lg backdrop-blur-md">
      <button
        v-for="(p, i) in presets"
        :key="p.name"
        class="inline-flex items-center rounded-full border border-transparent px-2.5 py-1 text-[11px] text-muted transition-[transform,color,background-color] duration-150 hover:border-[var(--color-accent)]/40 hover:text-fg active:scale-[0.97]"
        :title="p.tags.join(', ')"
        @click="emit('apply', i)"
      >
        {{ p.name }}
      </button>
    </div>
  </div>
</template>
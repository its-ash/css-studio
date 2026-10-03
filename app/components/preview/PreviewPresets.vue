<script setup lang="ts">
defineProps<{
  presets: { name: string; tags: string[] }[]
}>()

const emit = defineEmits<{ apply: [index: number] }>()
</script>

<template>
  <div class="shrink-0 border-b border-line bg-panel px-2" aria-label="Presets">
    <div
      class="flex max-w-full items-center gap-0.5 flex-wrap"
      role="tablist"
    >
      <button
        v-for="(p, i) in presets"
        :key="p.name"
        class="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-transparent px-2.5 py-1 text-[11px] font-medium text-muted transition-[transform,color,background-color,border-color] duration-150 hover:border-accent/50 hover:text-fg active:scale-[0.97]"
        :title="p.tags.join(', ')"
        @click="emit('apply', i)"
      >
        {{ p.name }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  presets: { name: string; tags: string[] }[]
}>()

const emit = defineEmits<{ apply: [index: number] }>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="text-xs font-medium text-fg">Presets</span>
    <div class="flex flex-wrap gap-1.5">
      <button
        v-for="(p, i) in presets"
        :key="p.name"
        class="inline-flex items-center rounded-full border border-line bg-bg px-3 py-1.5 text-xs text-muted transition-[transform,color,background-color,border-color] duration-150 hover:border-accent/50 hover:text-fg active:scale-[0.97]"
        @click="emit('apply', i)"
      >
        {{ p.name }}
      </button>
    </div>
  </div>
</template>
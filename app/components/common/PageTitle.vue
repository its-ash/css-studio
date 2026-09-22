<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <section class="flex flex-col gap-1 mb-4">
    <div class="flex items-baseline justify-between">
      <h1 class="text-lg font-semibold text-fg tracking-tight">{{ title }}</h1>
      <slot name="side" />
    </div>
    <p v-if="description" class="text-sm text-muted leading-relaxed max-w-[65ch]">{{ description }}</p>
    <slot />
  </section>
</template>
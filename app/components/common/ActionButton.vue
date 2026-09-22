<script setup lang="ts">
withDefaults(defineProps<{ to?: string; label: string; icon?: string; disabled?: boolean }>(), { to: undefined, icon: undefined })
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    class="inline-flex items-center justify-center gap-1.5 rounded-lg border border-line bg-panel px-3 h-8 text-sm text-fg transition-[transform,background-color] ease-out duration-150 active:scale-[0.97] hover:bg-line/40 disabled:opacity-40 disabled:pointer-events-none"
  >
    <Icon v-if="icon" :name="icon" :size="15" class="text-muted" />
    <span>{{ label }}</span>
  </component>
</template>
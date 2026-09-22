<script setup lang="ts">
const props = defineProps<{ label?: string; placeholder?: string }>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <label class="flex flex-col gap-1.5">
    <span v-if="label" class="text-xs font-medium text-fg">{{ label }}</span>
    <input
      v-model="model"
      type="text"
      :placeholder="placeholder"
      class="h-9 w-full rounded-lg border border-line bg-bg px-2 text-sm text-fg transition-colors duration-150 hover:border-muted"
      :aria-label="label ?? 'Text input'"
    />
  </label>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{ label: string; suffix?: string; min?: number; max?: number }>(),
  { suffix: '', min: undefined, max: undefined }
)

const model = defineModel<number | string>({ required: true })
</script>

<template>
  <label class="flex flex-col gap-1.5">
    <span class="text-xs font-medium text-fg">{{ label }}</span>
    <input
      v-model="model"
      type="text"
      inputmode="numeric"
      class="h-9 w-full rounded-lg border border-line bg-bg px-2.5 font-mono text-sm text-fg transition-colors duration-150 hover:border-line-strong focus:border-accent/60"
      :aria-label="label"
    />
  </label>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string
    options: { value: string; label: string }[]
  }>(),
  { label: undefined }
)

const model = defineModel<string>({ required: true })
</script>

<template>
  <label v-if="label" class="flex flex-col gap-1.5">
    <span class="text-xs font-medium text-fg">{{ label }}</span>
    <select
      v-model="model"
      class="h-9 w-full rounded-lg border border-line bg-bg px-2 text-sm text-fg transition-colors duration-150 hover:border-muted"
      :aria-label="label"
    >
      <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
    </select>
  </label>
  <select
    v-else
    v-model="model"
    class="h-9 w-full rounded-lg border border-line bg-bg px-2 text-sm text-fg"
    aria-label="Select"
  >
    <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
  </select>
</template>
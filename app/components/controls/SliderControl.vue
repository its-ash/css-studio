<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string
    min?: number
    max?: number
    step?: number
    suffix?: string
    hint?: string
  }>(),
  { min: 0, max: 100, step: 1, suffix: '' }
)

const model = defineModel<number>({ required: true })

function onInput(e: Event) {
  model.value = Number((e.target as HTMLInputElement).value)
}
</script>

<template>
  <label class="flex flex-col gap-1.5">
    <span class="flex items-baseline justify-between">
      <span class="text-xs font-medium text-fg">{{ label }}</span>
      <span class="font-mono text-xs text-muted">{{ model }}{{ suffix }}</span>
    </span>
    <input
      type="range"
      :value="model"
      :min="min"
      :max="max"
      :step="step"
      class="w-full accent-[var(--color-accent)]"
      :aria-label="label"
      @input="onInput"
    />
  </label>
</template>
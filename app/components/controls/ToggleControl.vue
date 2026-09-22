<script setup lang="ts">
const props = defineProps<{
  label: string
  hint?: string
}>()

const model = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="flex cursor-pointer items-center justify-between gap-3">
    <span class="flex flex-col">
      <span class="text-xs font-medium text-fg">{{ label }}</span>
      <span v-if="hint" class="text-[11px] text-muted">{{ hint }}</span>
    </span>
    <button
      type="button"
      role="switch"
      :aria-checked="model"
      :aria-label="label"
      class="relative h-5 w-9 shrink-0 rounded-full border transition-colors duration-150 active:scale-[0.97]"
      :class="model ? 'bg-accent border-transparent' : 'bg-bg border-line'"
      @click="model = !model"
    >
      <span
        class="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-[#fffbeb] shadow transition-transform duration-150 ease-out"
        :class="model ? 'translate-x-4' : ''"
      />
    </button>
  </label>
</template>
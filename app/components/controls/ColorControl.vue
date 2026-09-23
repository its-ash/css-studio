<script setup lang="ts">
import { hexToHsl, hslToHex } from '~/utils/colors'

const props = withDefaults(
  defineProps<{
    label: string
    modelValue: string
    allowAlpha?: boolean
  }>(),
  { allowAlpha: false }
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

/** Native color input requires #rrggbb; accept any css color string and coerce. */
const hexValue = computed<string>(() => {
  const v = props.modelValue.trim()
  if (/^#[0-9a-fA-F]{6}$/.test(v)) return v
  if (/^#[0-9a-fA-F]{3}$/.test(v)) return hslToHex(hexToHsl(v))
  if (v.startsWith('hsl')) {
    const nums = v.match(/-?[\d.]+/g)
    if (nums && nums.length >= 3) {
      return hslToHex({ h: Number(nums[0]), s: Number(nums[1]), l: Number(nums[2]) })
    }
  }
  if (import.meta.client) {
    const probe = document.createElement('canvas').getContext('2d')
    if (probe) {
      probe.fillStyle = '#000000'
      probe.fillStyle = v
      const computedFill = probe.fillStyle
      if (typeof computedFill === 'string' && computedFill.startsWith('#')) return computedFill
    }
  }
  return '#000000'
})

function pick(ev: Event) {
  emit('update:modelValue', (ev.target as HTMLInputElement).value)
}
</script>

<template>
  <label class="flex items-center justify-between gap-3">
    <span class="flex flex-col gap-0.5">
      <span class="text-xs font-medium text-fg">{{ label }}</span>
      <span class="font-mono text-[11px] tracking-tight text-muted uppercase">{{ modelValue }}</span>
    </span>
    <span class="relative inline-block">
      <input
        type="color"
        :value="hexValue"
        class="h-8 w-12 cursor-pointer rounded-lg border border-line bg-bg p-0.5 transition-colors duration-150 hover:border-line-strong"
        :aria-label="label"
        @input="pick"
      />
    </span>
  </label>
</template>
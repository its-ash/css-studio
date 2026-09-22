<script setup lang="ts">
import { pushToast } from '~/composables/useToast'

const props = defineProps<{ text: string; label?: string; class?: string }>()

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text)
    pushToast('Copied to clipboard')
  } catch {
    pushToast('Copy failed', 'error')
  }
}
</script>

<template>
  <button
    class="inline-flex items-center gap-1.5 rounded-lg border border-line bg-panel px-3 h-8 text-sm font-medium text-fg transition-[transform,background-color,border-color] ease-out duration-150 active:scale-[0.97] hover:bg-line/30 hover:border-line-strong"
    :class="$props.class"
    @click="copy"
  >
    <Icon name="ph-copy" :size="15" class="text-muted" />
    <span>{{ label ?? 'Copy' }}</span>
  </button>
</template>
<script setup lang="ts">
import { useToasts } from '~/composables/useToast'

const { toasts, dismiss } = useToasts()
</script>

<template>
  <div class="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2" role="status" aria-live="polite">
    <TransitionGroup name="toast">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="pointer-events-auto flex items-center gap-2 rounded-lg border border-line bg-panel px-3 py-2 text-sm shadow-lg"
        @click="dismiss(t.id)"
      >
        <Icon
          :name="t.tone === 'error' ? 'ph-warning-circle' : t.tone === 'info' ? 'ph-info' : 'ph-check-circle'"
          :size="16"
          weight="fill"
          :class="t.tone === 'error' ? 'text-rose-400' : t.tone === 'info' ? 'text-sky-400' : 'text-accent'"
        />
        <span class="text-fg">{{ t.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 150ms ease-out, transform 150ms ease-out;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
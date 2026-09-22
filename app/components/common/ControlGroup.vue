<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string
    icon?: string
    collapsible?: boolean
    defaultOpen?: boolean
  }>(),
  { icon: undefined, defaultOpen: true }
)

const open = ref(props.defaultOpen)
const panelId = useId()
</script>

<template>
  <section class="rounded-xl border border-line bg-panel shadow-panel">
    <button
      v-if="collapsible"
      class="flex w-full items-center gap-2 px-4 py-3 text-left"
      :aria-expanded="open"
      :aria-controls="panelId"
      @click="open = !open"
    >
      <Icon v-if="icon" :name="icon" :size="16" class="text-muted" />
      <span class="text-sm font-medium text-fg">{{ label }}</span>
      <Icon
        name="ph-caret-down"
        :size="14"
        class="ml-auto text-muted transition-transform duration-200"
        :class="open ? '' : '-rotate-90'"
      />
    </button>
    <div v-else class="flex items-center gap-2 px-4 py-3">
      <Icon v-if="icon" :name="icon" :size="16" class="text-muted" />
      <span class="text-sm font-medium text-fg">{{ label }}</span>
    </div>
    <div v-show="!collapsible || open" :id="panelId" class="flex flex-col gap-4 px-4 pb-4">
      <slot />
    </div>
  </section>
</template>
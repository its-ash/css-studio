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
      class="flex w-full items-center gap-2 px-3.5 py-2.5 text-left transition-colors duration-150 hover:bg-line/15"
      :aria-expanded="open"
      :aria-controls="panelId"
      @click="open = !open"
    >
      <Icon v-if="icon" :name="icon" :size="15" class="text-muted" />
      <span class="text-[13px] font-medium tracking-tight text-fg">{{ label }}</span>
      <Icon
        name="ph-caret-down"
        :size="13"
        class="ml-auto text-muted transition-transform duration-150"
        :class="open ? '' : '-rotate-90'"
      />
    </button>
    <div v-else class="flex items-center gap-2 px-3.5 py-2.5">
      <Icon v-if="icon" :name="icon" :size="15" class="text-muted" />
      <span class="text-[13px] font-medium tracking-tight text-fg">{{ label }}</span>
    </div>
    <div v-show="!collapsible || open" :id="panelId" class="flex flex-col gap-3 px-3.5 pb-3.5">
      <slot />
    </div>
  </section>
</template>
<script setup lang="ts">
import { pushToast } from '~/composables/useToast'

const props = withDefaults(
  defineProps<{
    css: string
    html?: string
    vars?: Record<string, string>
    tailwind?: string
    filename?: string
  }>(),
  { html: undefined, vars: undefined, tailwind: undefined, filename: 'css-studio' }
)

type Tab = 'css' | 'html' | 'vars' | 'tailwind'
const tabs = computed<{ id: Tab; label: string; available: boolean }[]>(() => [
  { id: 'css', label: 'CSS', available: true },
  { id: 'html', label: 'HTML', available: !!props.html },
  { id: 'vars', label: 'Variables', available: !!props.vars },
  { id: 'tailwind', label: 'Tailwind', available: !!props.tailwind }
])
const active = ref<Tab>('css')
watch(
  () => [props.html, props.vars, props.tailwind],
  () => {
    if (!tabs.value.find((t) => t.id === active.value)?.available) active.value = 'css'
  }
)

const minified = ref(false)

const code = computed(() => {
  switch (active.value) {
    case 'css':
      return props.css
    case 'html':
      return props.html ?? ''
    case 'vars': {
      const entries = Object.entries(props.vars ?? {})
      if (!entries.length) return '/* No variables */'
      return `:root {\n${entries.map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`
    }
    case 'tailwind':
      return props.tailwind ?? ''
  }
})

const display = computed(() => (minified.value ? minifyCss(code.value) : code.value))

function minifyCss(input: string): string {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim()
}

async function copy() {
  try {
    await navigator.clipboard.writeText(display.value)
    pushToast(`${active.value.toUpperCase()} copied`)
  } catch {
    pushToast('Copy failed', 'error')
  }
}

function download() {
  const ext = active.value === 'html' ? 'html' : active.value === 'tailwind' ? 'txt' : 'css'
  const blob = new Blob([display.value], { type: 'text/plain' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `${props.filename}-${active.value}.${ext}`
  a.click()
  URL.revokeObjectURL(a.href)
  pushToast(`Downloaded ${props.filename}-${active.value}.${ext}`)
}
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-xl border border-line bg-panel shadow-panel">
    <div class="flex items-center justify-between gap-1 border-b border-line px-2">
      <div class="flex" role="tablist" aria-label="Code output">
        <button
          v-for="t in tabs.filter((t) => t.available)"
          :key="t.id"
          role="tab"
          :aria-selected="active === t.id"
          class="px-3 py-2.5 text-xs font-medium transition-colors duration-150"
          :class="active === t.id ? 'text-fg border-b-2 border-[var(--color-accent)]' : 'text-muted hover:text-fg'"
          @click="active = t.id"
        >
          {{ t.label }}
        </button>
      </div>
      <div class="flex items-center gap-1">
        <label class="flex cursor-pointer items-center gap-1.5 text-[11px] text-muted">
          <input v-model="minified" type="checkbox" class="h-3 w-3 accent-[var(--color-accent)]" />
          Minified
        </label>
        <button
          class="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors duration-100 hover:bg-line/40 hover:text-fg"
          aria-label="Copy code"
          title="Copy"
          @click="copy"
        >
          <Icon name="ph-copy" :size="14" />
        </button>
        <button
          class="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors duration-100 hover:bg-line/40 hover:text-fg"
          aria-label="Download code"
          title="Download"
          @click="download"
        >
          <Icon name="ph-download-simple" :size="14" />
        </button>
      </div>
     </div>
    <div class="max-h-64 overflow-auto p-4">
      <pre class="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-fg">{{ display }}</pre>
    </div>
  </div>
</template>
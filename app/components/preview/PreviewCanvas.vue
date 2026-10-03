<script setup lang="ts">
import { toPng } from 'html-to-image'
import { pushToast } from '~/composables/useToast'
import type { ComputedRef } from 'vue'
import { minifyCss } from '~/utils/css'

const props = withDefaults(
  defineProps<{
    title?: string
    filename?: string
    allowZoom?: boolean
    /** Every preset rendered from its exported HTML + CSS; enables the Variants view. */
    variants?: { name: string; css: string; html: string }[]
    /** Live CSS shown in the Code tab (with codeHtml/codeVars when a variants view is built). */
    codeCss?: string
    /** Live HTML shown in the Code tab. */
    codeHtml?: string
    /** CSS custom properties shown in the Code tab. */
    codeVars?: Record<string, string>
    /** Label for the Code tab, e.g. "Live state" or the picked variant's name. */
    codeTitle?: string
  }>(),
  {
    title: undefined,
    filename: 'css-studio-preview',
    allowZoom: true,
    variants: undefined,
    codeCss: undefined,
    codeHtml: undefined,
    codeVars: undefined,
    codeTitle: undefined
  }
)

const emit = defineEmits<{ 'apply-variant': [index: number] }>()

const shell = inject<ComputedRef<{ css: string; html: string; vars?: Record<string, string> }> | null>('editor:code', null)

type View = 'variants' | 'preview' | 'code'
/** Pages with presets open on the Variants grid; picking one jumps to the full preview. */
const view = ref<View>(props.variants?.length ? 'variants' : 'preview')
const modes = computed<{ v: View; label: string }[]>(() => [
  ...(props.variants?.length ? [{ v: 'variants' as const, label: `Variants · ${props.variants.length}` }] : []),
  { v: 'preview', label: 'Preview' },
  { v: 'code', label: 'Code' }
])
const applied = ref<number | null>(null)
/** Variant whose code the Code tab shows via its card's Code button; null = selected element. */
const shownVarIdx = ref<number | null>(null)

const liveCode = computed(() => ({
  css: props.codeCss ?? shell?.value.css ?? '',
  html: props.codeHtml ?? shell?.value.html ?? '',
  vars: props.codeVars ?? shell?.value.vars
}))

type CodeTab = 'css' | 'html' | 'vars'
const codeTab = ref<CodeTab>('css')
const codeSource = computed<{ css: string; html: string; vars?: Record<string, string>; name?: string }>(() => {
  const v = shownVarIdx.value !== null ? props.variants?.[shownVarIdx.value] : undefined
  if (v) return { ...v, vars: undefined }
  return { ...liveCode.value, name: props.codeTitle }
})
const codeName = computed(() => codeSource.value.name)
const codeTabs = computed<{ id: CodeTab; label: string }[]>(() => [
  { id: 'css', label: 'CSS' },
  ...(codeSource.value.html ? [{ id: 'html' as const, label: 'HTML' }] : []),
  ...(codeSource.value.vars && Object.keys(codeSource.value.vars).length ? [{ id: 'vars' as const, label: 'Variables' }] : [])
])
watch(codeTabs, (t) => {
  if (!t.some((x) => x.id === codeTab.value)) codeTab.value = 'css'
})

function setView(v: View) {
  if (v !== 'code') shownVarIdx.value = null
  view.value = v
}

function pickVariant(i: number) {
  applied.value = i
  shownVarIdx.value = null
  emit('apply-variant', i)
  view.value = 'preview'
}

function showVariantCode(i: number) {
  shownVarIdx.value = i
  codeTab.value = 'css'
  view.value = 'code'
}

const stageEl = ref<HTMLElement | null>(null)
const containerEl = ref<HTMLElement | null>(null)
const zoom = ref(1)
const fitToggles = ['fit', 50, 75, 100, 150] as const
type Fit = (typeof fitToggles)[number]
const fit = ref<Fit | number>('fit')

type Viewport = 'full' | 'desktop' | 'tablet' | 'mobile'
const viewport = ref<Viewport>('full')
const viewportWidths: Record<Viewport, string> = {
  full: '100%',
  desktop: '1280px',
  tablet: '768px',
  mobile: '375px'
}

const isFullscreen = ref(false)

function setFit(v: Fit | number) {
  fit.value = v
  zoom.value = v === 'fit' ? 1 : (v as number) / 100
}

function applyZoom(delta: number) {
  const next = Math.min(2, Math.max(0.5, zoom.value + delta))
  zoom.value = next
  fit.value = Math.round(next * 100)
}

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
}

function setViewport(v: Viewport) {
  viewport.value = v
}

const codeText = computed(() => {
  const src = codeSource.value
  if (codeTab.value === 'html') return src.html
  if (codeTab.value === 'css') return src.css
  const entries = Object.entries(src.vars ?? {})
  return entries.length ? `:root {\n${entries.map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}` : '/* No variables */'
})

const codeMinified = ref(false)
const codeDisplay = computed(() => (codeMinified.value && codeTab.value !== 'html' ? minifyCss(codeText.value) : codeText.value))

async function copyCode() {
  try {
    await navigator.clipboard.writeText(codeDisplay.value)
    pushToast(`${codeTab.value === 'vars' ? 'Variables' : codeTab.value.toUpperCase()} copied`)
  } catch {
    pushToast('Copy failed', 'error')
  }
}

function downloadCode() {
  const ext = codeTab.value === 'html' ? 'html' : 'css'
  const slug = codeName.value ? codeName.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'state'
  const name = `${props.filename}-${slug}-${codeTab.value}.${ext}`
  const blob = new Blob([codeDisplay.value], { type: 'text/plain' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = name
  a.click()
  URL.revokeObjectURL(a.href)
  pushToast(`Downloaded ${name}`)
}

async function exportPng() {
  if (!stageEl.value) return
  try {
    const dataUrl = await toPng(stageEl.value, { pixelRatio: 2 })
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `${props.filename}.png`
    a.click()
    pushToast('PNG exported')
  } catch {
    pushToast('PNG export failed', 'error')
  }
}

</script>

<template>
  <div
    class="flex min-h-0 flex-1 flex-col"
    :class="isFullscreen ? 'fixed inset-0 z-80 bg-bg' : ''"
  >
    <div class="flex h-10 shrink-0 items-center justify-between gap-2 border-b border-line px-4">
      <div class="flex items-center gap-1.5">
        <div class="flex items-center rounded-lg border border-line bg-bg p-0.5" role="tablist" aria-label="Preview mode">
          <button
            v-for="m in modes"
            :key="m.v"
            type="button"
            role="tab"
            :aria-selected="view === m.v"
            class="inline-flex h-6 items-center rounded-md px-2.5 text-xs font-medium transition-colors duration-150"
            :class="view === m.v ? 'bg-panel text-fg shadow-panel' : 'text-muted hover:text-fg'"
            @click="setView(m.v)"
          >
            {{ m.label }}
          </button>
        </div>
      </div>
      <div class="flex items-center gap-0.5">
        <button
          v-for="vp in [
            { v: 'full', icon: 'ph-monitor', label: 'Full' },
            { v: 'desktop', icon: 'ph-monitor', label: 'Desktop' },
            { v: 'tablet', icon: 'ph-device-tablet', label: 'Tablet' },
            { v: 'mobile', icon: 'ph-device-mobile-camera', label: 'Mobile' }
          ]"
          :key="vp.v"
          class="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors duration-100 hover:bg-line/30 hover:text-fg"
          :class="viewport === vp.v ? 'bg-accent/12 text-fg' : ''"
          :aria-label="`Preview at ${vp.label} size`"
          :title="vp.label"
          @click="setViewport(vp.v as Viewport)"
        >
          <Icon :name="vp.icon" :size="13" />
        </button>
        <span class="mx-1 h-4 w-px bg-line" aria-hidden="true"></span>
        <button
          class="inline-flex h-7 items-center rounded-md px-2 text-xs font-medium text-muted transition-colors duration-100 hover:bg-line/30 hover:text-fg"
          :class="fit === 'fit' ? 'bg-accent/12 text-fg' : ''"
          aria-label="Fit preview"
          @click="setFit('fit')"
        >
          Fit
        </button>
        <button
          v-for="z in [50, 75, 100, 150]"
          :key="z"
          class="inline-flex h-7 items-center rounded-md px-2 text-xs font-medium text-muted transition-colors duration-100 hover:bg-line/30 hover:text-fg"
          :class="fit === z ? 'bg-accent/12 text-fg' : ''"
          :aria-label="`Zoom ${z}%`"
          @click="setFit(z)"
        >
          {{ z }}%
        </button>
        <span class="mx-1 h-4 w-px bg-line" aria-hidden="true"></span>
        <button
          class="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors duration-100 hover:bg-line/30 hover:text-fg"
          aria-label="Export preview as PNG"
          title="Export PNG"
          @click="exportPng"
        >
          <Icon name="ph-download-simple" :size="14" />
        </button>
        <button
          class="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors duration-100 hover:bg-line/30 hover:text-fg"
          :aria-label="isFullscreen ? 'Exit fullscreen' : 'Fullscreen preview'"
          :title="isFullscreen ? 'Exit fullscreen' : 'Fullscreen'"
          @click="toggleFullscreen"
        >
          <Icon :name="isFullscreen ? 'ph-x' : 'ph-expand'" :size="14" />
        </button>
      </div>
    </div>
    <div ref="containerEl" class="flex min-h-0 flex-1 flex-col overflow-hidden" style="background-color: var(--color-bg)">
      <div v-if="view === 'variants' && variants?.length" class="min-h-0 flex-1 overflow-y-auto p-4">
        <ul class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
          <li v-for="(v, i) in variants" :key="v.name">
            <button
              type="button"
              class="group relative flex w-full flex-col overflow-hidden rounded-xl border bg-panel text-left transition-[border-color,transform] duration-150 hover:border-accent/60 active:scale-[0.98]"
              :class="applied === i ? 'border-accent' : 'border-line'"
              :aria-pressed="applied === i"
              @click="pickVariant(i)"
            >
              <VariantThumb :css="v.css" :html="v.html" />
              <span class="flex items-center justify-between gap-2 border-t border-line px-3 py-2 text-xs font-medium text-fg">
                <span class="truncate">{{ v.name }}</span>
                <Icon v-if="applied === i" name="ph-check-circle" :size="14" class="shrink-0 text-accent" />
              </span>
              <span
                class="absolute bottom-2 right-2 inline-flex h-6 items-center gap-1 rounded-md border border-line bg-panel px-2 text-[10px] font-medium text-muted opacity-0 shadow-panel transition-opacity duration-150 group-hover:opacity-100"
                @click.stop="showVariantCode(i)"
              >
                <Icon name="ph-code" :size="12" class="text-accent" />
                Code
              </span>
            </button>
          </li>
        </ul>
      </div>
      <div v-if="view === 'code'" class="flex min-h-0 flex-1 flex-col p-4">
        <div class="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-line bg-panel shadow-panel">
          <div class="flex items-center justify-between gap-1 border-b border-line px-2">
            <div class="flex" role="tablist" aria-label="Code output">
              <button
                v-for="t in codeTabs"
                :key="t.id"
                role="tab"
                :aria-selected="codeTab === t.id"
                class="px-3 py-2.5 text-xs font-medium transition-colors duration-150"
                :class="codeTab === t.id ? 'text-fg border-b-2 border-accent' : 'text-muted hover:text-fg'"
                @click="codeTab = t.id"
              >
                {{ t.label }}
              </button>
            </div>
            <div class="flex min-w-0 items-center gap-1">
              <span v-if="codeName" class="truncate text-[11px] text-muted">{{ codeName }}</span>
              <label class="flex cursor-pointer items-center gap-1.5 text-[11px] text-muted">
                <input v-model="codeMinified" type="checkbox" class="h-3 w-3 accent-accent" />
                Minified
              </label>
              <button
                class="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors duration-100 hover:bg-line/30 hover:text-fg"
                aria-label="Copy code"
                title="Copy"
                @click="copyCode"
              >
                <Icon name="ph-copy" :size="14" />
              </button>
              <button
                class="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors duration-100 hover:bg-line/30 hover:text-fg"
                aria-label="Download code"
                title="Download"
                @click="downloadCode"
              >
                <Icon name="ph-download-simple" :size="14" />
              </button>
            </div>
          </div>
          <pre class="min-h-0 flex-1 overflow-auto whitespace-pre-wrap break-words p-3.5 font-mono text-xs leading-relaxed text-fg">{{ codeDisplay || '/* Nothing selected */' }}</pre>
        </div>
      </div>
      <slot v-if="view === 'preview'" name="presets" />
      <div v-show="view === 'preview'" class="relative min-h-0 flex-1">
        <div class="absolute inset-0 flex items-center justify-center p-4 lg:p-6">
          <div
            ref="stageEl"
            class="relative flex max-h-full h-full min-w-0 flex-1 items-center justify-center overflow-hidden rounded-xl shadow-panel-lg transition-[width] duration-200 ease-out"
            :style="{
              width: viewportWidths[viewport],
              maxWidth: '100%',
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0, 8px 8px',
              backgroundColor: 'var(--color-panel)'
            }"
          >
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
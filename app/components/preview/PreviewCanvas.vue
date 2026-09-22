<script setup lang="ts">
import { toPng } from 'html-to-image'
import { pushToast } from '~/composables/useToast'

const props = withDefaults(
  defineProps<{
    title?: string
    filename?: string
    allowZoom?: boolean
  }>(),
  { title: undefined, filename: 'css-studio-preview', allowZoom: true }
)

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
    :class="isFullscreen ? 'fixed inset-0 z-[80] bg-bg' : ''"
  >
    <div class="flex h-10 shrink-0 items-center justify-between gap-2 border-b border-line px-4">
      <div class="flex items-center gap-1.5">
        <span v-if="title" class="text-xs font-medium tracking-tight text-muted">{{ title }}</span>
        <span class="flex-1"></span>
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
    <div ref="containerEl" class="relative min-h-0 flex-1 overflow-hidden" style="background-color: var(--color-bg)">
      <slot name="presets" />
      <div class="absolute inset-0 flex items-center justify-center p-6">
        <div
          ref="stageEl"
          class="relative flex max-h-full h-full items-center justify-center overflow-hidden rounded-xl shadow-panel-lg transition-[width] duration-200 ease-out"
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
</template>
<script setup lang="ts">
import { pushToast } from '~/composables/useToast'
import { compileBulmaTheme, loadGoogleFonts } from '~/utils/bulmaSass'
import { BULMA_GALLERY_HTML } from '~/utils/bulmaGallery'
import {
  BULMA_THEME_PRESETS,
  DEFAULT_BULMA_THEME,
  GOOGLE_FONTS,
  bestFitPrimaryForTheme,
  effectiveMode,
  generateBulmaPalette,
  suggestBodyFont,
  suggestedPalettesForTheme
} from '~/utils/generators/bulmaTheme'
import type { BulmaThemeState } from '~/utils/generators/bulmaTheme'

const LS_KEY = 'css-studio:state:bulma-theme'
const route = useRoute()

function loadState(): BulmaThemeState {
  const fromUrl = route.query
  const theme = fromUrl.theme as string | undefined
  const primary = fromUrl.primary as string | undefined
  const mode = fromUrl.mode as string | undefined
  const headingFont = fromUrl.headingFont as string | undefined
  const bodyFont = fromUrl.bodyFont as string | undefined

  const s: BulmaThemeState = { ...DEFAULT_BULMA_THEME }
  if (theme && BULMA_THEME_PRESETS.some((p) => p.key === theme)) s.theme = theme
  if (primary && /^#[0-9a-fA-F]{6}$/.test(primary)) {
    s.primary = primary
    s.primaryManual = true
  }
  if (mode === 'light' || mode === 'dark') s.mode = mode
  if (headingFont && GOOGLE_FONTS.includes(headingFont)) s.headingFont = headingFont
  if (bodyFont && GOOGLE_FONTS.includes(bodyFont)) {
    s.bodyFont = bodyFont
    s.bodyFontManual = true
  }
  if (theme || primary || mode || headingFont || bodyFont) return s

  if (import.meta.client) {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) {
      try {
        return { ...DEFAULT_BULMA_THEME, ...(JSON.parse(raw) as Partial<BulmaThemeState>) }
      } catch {
        /* corrupted state falls back to defaults */
      }
    }
  }
  // Fresh visit, no saved state: start with the primary color that best fits the default theme.
  s.primary = bestFitPrimaryForTheme(s.theme)
  return s
}

const state = ref<BulmaThemeState>(loadState())

const fontOptions = GOOGLE_FONTS.map((f) => ({ value: f, label: f }))
const themeOptions = BULMA_THEME_PRESETS.map((p) => ({ value: p.key, label: p.label }))

const suggestedPalettes = computed(() => suggestedPalettesForTheme(state.value.theme))
const selectedThemeLabel = computed(() => BULMA_THEME_PRESETS.find((p) => p.key === state.value.theme)?.label ?? state.value.theme)

function isActivePalette(color: string): boolean {
  return color.toLowerCase() === state.value.primary.toLowerCase()
}

const colorMode = useColorMode()

/** The theme engine's own dark mode follows the app's global theme toggle, so there's one switch, not two. */
watch(
  () => colorMode.value,
  (v) => {
    state.value.mode = v === 'dark' ? 'dark' : 'light'
  },
  { immediate: true }
)

function toggleGlobalTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const compiledCss = ref('')
const compileError = ref(false)
const compiling = ref(false)
const iframeRef = ref<HTMLIFrameElement | null>(null)

type PreviewViewport = 'desktop' | 'tablet' | 'mobile'
const PREVIEW_WIDTHS: Record<PreviewViewport, string> = {
  desktop: '1180px',
  tablet: '768px',
  mobile: '390px'
}
const previewViewport = ref<PreviewViewport>('desktop')

let saveTimer: ReturnType<typeof setTimeout> | null = null
watch(
  state,
  () => {
    if (!import.meta.client) return
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(state.value))
      } catch {
        /* storage full or unavailable */
      }
    }, 400)
  },
  { deep: true }
)

function syncStateToUrl() {
  if (!import.meta.client) return
  const params = new URLSearchParams({
    theme: state.value.theme,
    primary: state.value.primary,
    mode: state.value.mode,
    headingFont: state.value.headingFont,
    bodyFont: state.value.bodyFont
  })
  window.history.replaceState(window.history.state, '', `${route.path}?${params.toString()}`)
}

function iframeDoc(css: string, mode: 'light' | 'dark'): string {
  return `<!DOCTYPE html><html data-theme="${mode}"><head><meta charset="UTF-8" /><style>
* { box-sizing: border-box; }
body { margin: 0; padding: 1.5rem; }
.row-flex { display: flex; flex-wrap: wrap; gap: .75rem; }
.section-block { margin-bottom: 2.5rem; }
.section-title { text-transform: uppercase; font-size: .85rem; font-weight: 700; margin-bottom: .75rem; opacity: .6; }
</style>
<style id="theme-stylesheet">${css}</style>
</head><body>${BULMA_GALLERY_HTML}</body></html>`
}

let renderToken = 0
async function render() {
  const token = ++renderToken
  compiling.value = true
  const mode = effectiveMode(state.value.theme, state.value.mode)
  const palette = generateBulmaPalette(state.value.primary, mode)
  loadGoogleFonts([state.value.headingFont, state.value.bodyFont])

  try {
    const css = await compileBulmaTheme(state.value.theme, palette, state.value.headingFont, state.value.bodyFont)
    if (token !== renderToken) return
    compiledCss.value = css
    compileError.value = false
    if (iframeRef.value) iframeRef.value.srcdoc = iframeDoc(css, mode)
    syncStateToUrl()
  } catch (err) {
    if (token !== renderToken) return
    compileError.value = true
    console.error('Theme compile error:', err)
  } finally {
    if (token === renderToken) compiling.value = false
  }
}

watch(state, render, { deep: true })
onMounted(render)

function pickPalette(color: string) {
  state.value.primary = color
  state.value.primaryManual = true
}

function setPrimary(color: string) {
  state.value.primary = color
  state.value.primaryManual = true
}

function onThemeChange() {
  if (!state.value.primaryManual) {
    state.value.primary = bestFitPrimaryForTheme(state.value.theme)
  }
}

function onHeadingFontChange() {
  if (!state.value.bodyFontManual) {
    state.value.bodyFont = suggestBodyFont(state.value.headingFont)
  }
}

function onBodyFontChange() {
  state.value.bodyFontManual = true
}

async function copyCss() {
  try {
    await navigator.clipboard.writeText(compiledCss.value)
    pushToast('CSS copied')
  } catch {
    pushToast('Copy failed', 'error')
  }
}

function downloadCss() {
  const blob = new Blob([compiledCss.value], { type: 'text/css' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `theme-${state.value.theme}-${state.value.mode}.css`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

async function shareUrl() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    pushToast('Share link copied')
  } catch {
    pushToast('Could not copy link', 'error')
  }
}

function reset() {
  state.value = { ...DEFAULT_BULMA_THEME }
}

useSeoMeta({
  title: 'SCSS Theme Engine - CSS Studio',
  description: 'Live SCSS + Bulma theme engine: presets, palettes, font pairing and instant CSS export.',
  ogTitle: 'SCSS Theme Engine - CSS Studio',
  ogDescription: 'Live SCSS + Bulma theme engine: presets, palettes, font pairing and instant CSS export.',
  ogUrl: 'https://css-studio.itsash.in/css',
  twitterTitle: 'SCSS Theme Engine - CSS Studio',
  twitterDescription: 'Live SCSS + Bulma theme engine: presets, palettes, font pairing and instant CSS export.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/css' }] })
</script>

<template>
  <div class="flex min-h-dvh">
    <aside class="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-line bg-panel md:flex">
      <div class="flex h-14 shrink-0 items-center gap-2 border-b border-line px-4">
        <NuxtLink to="/" class="flex items-center gap-2 text-sm font-semibold tracking-tight text-fg">
          <Icon name="ph-paint-brush" :size="17" weight="duotone" class="text-accent" />
          CSS Studio
        </NuxtLink>
      </div>
      <div class="min-h-0 flex-1 overflow-y-auto">
        <SidebarNav />
      </div>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col lg:flex-row">
      <div class="flex min-w-0 flex-1 flex-col">
        <header class="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-line bg-panel/80 px-4 shadow-panel backdrop-blur-md">
          <h1 class="truncate text-sm font-medium text-fg">SCSS Theme Engine</h1>
          <div class="flex items-center gap-1">
            <button
              class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]"
              @click="copyCss"
            >
              <Icon name="ph-copy" :size="14" class="text-accent" />
              <span class="hidden md:inline">Copy CSS</span>
            </button>
            <button
              class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]"
              @click="downloadCss"
            >
              <Icon name="ph-download-simple" :size="14" />
              <span class="hidden md:inline">Download</span>
            </button>
            <button
              class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]"
              @click="shareUrl"
            >
              <Icon name="ph-share-network" :size="14" />
              <span class="hidden md:inline">Share</span>
            </button>
            <button
              class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]"
              @click="reset"
            >
              <Icon name="ph-arrow-counter-clockwise" :size="14" />
              <span class="hidden md:inline">Reset</span>
            </button>
            <span class="mx-1 hidden h-4 w-px bg-line sm:block" aria-hidden="true"></span>
            <button
              class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-[background-color,color] duration-150 hover:bg-line/30 hover:text-fg active:scale-[0.95]"
              :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
              :title="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
              @click="toggleGlobalTheme"
            >
              <Icon :name="colorMode.value === 'dark' ? 'ph-sun' : 'ph-moon'" :size="15" />
            </button>
            <CommandPalette />
          </div>
        </header>

        <div v-if="compileError" class="border-b border-line bg-rose-500/10 px-4 py-2 text-xs font-medium text-rose-400">
          Theme compile error — see console
        </div>

        <div class="flex h-10 shrink-0 items-center justify-between gap-2 border-b border-line bg-panel px-4">
          <span class="text-xs font-medium tracking-tight text-muted">Preview</span>
          <div class="flex items-center gap-0.5">
            <button
              v-for="vp in [
                { v: 'desktop', icon: 'ph-monitor', label: 'Desktop' },
                { v: 'tablet', icon: 'ph-device-tablet', label: 'Tablet' },
                { v: 'mobile', icon: 'ph-device-mobile-camera', label: 'Mobile' }
              ]"
              :key="vp.v"
              class="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-muted transition-colors duration-100 hover:bg-line/30 hover:text-fg"
              :class="previewViewport === vp.v ? 'bg-accent/12 text-fg' : ''"
              :aria-label="`Preview at ${vp.label} size`"
              :aria-pressed="previewViewport === vp.v"
              :title="vp.label"
              @click="previewViewport = vp.v as PreviewViewport"
            >
              <Icon :name="vp.icon" :size="13" />
              <span class="hidden sm:inline">{{ vp.label }}</span>
            </button>
          </div>
        </div>

        <main
          class="flex min-h-0 flex-1 justify-center overflow-auto p-4 transition-colors duration-150 lg:p-6"
          :class="colorMode.value === 'dark' ? 'bg-zinc-950' : 'bg-zinc-100'"
        >
          <div
            class="relative h-full w-full overflow-hidden rounded-xl border shadow-panel transition-[width] duration-200 ease-out"
            :style="{ width: PREVIEW_WIDTHS[previewViewport], maxWidth: '100%' }"
            :class="colorMode.value === 'dark' ? 'border-white/10 bg-black' : 'border-black/10 bg-white'"
          >
            <div
              v-if="compiling"
              class="absolute inset-0 z-10 flex items-center justify-center gap-2 backdrop-blur-sm"
              :class="colorMode.value === 'dark' ? 'bg-black/60 text-zinc-300' : 'bg-white/60 text-zinc-500'"
            >
              <Icon name="ph-spinner-gap" :size="18" class="animate-spin text-accent" />
              <span class="text-xs font-medium">Compiling theme…</span>
            </div>
            <iframe
              ref="iframeRef"
              title="Bulma theme preview"
              class="block h-full w-full border-0"
              sandbox="allow-same-origin"
            />
          </div>
        </main>
      </div>

      <aside class="flex w-full shrink-0 flex-col gap-3.5 border-t border-line bg-panel p-3.5 lg:w-95 lg:overflow-y-auto lg:border-l lg:border-t-0">
        <ControlGroup label="Fonts" icon="ph-text-aa">
          <SelectControl v-model="state.headingFont" label="Heading font" :options="fontOptions" @update:model-value="onHeadingFontChange" />
          <SelectControl v-model="state.bodyFont" label="Body font" :options="fontOptions" @update:model-value="onBodyFontChange" />
        </ControlGroup>

        <ControlGroup label="Theme" icon="ph-palette">
          <SelectControl v-model="state.theme" label="Style preset" :options="themeOptions" @update:model-value="onThemeChange" />
          <ColorControl :model-value="state.primary" label="Primary color" @update:model-value="setPrimary" />
        </ControlGroup>

        <ControlGroup label="Suggested palettes" icon="ph-sparkle">
          <p class="text-[11px] text-muted">Curated colors that suit the <span class="font-medium text-fg">{{ selectedThemeLabel }}</span> preset.</p>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="p in suggestedPalettes"
              :key="p.name"
              type="button"
              class="group flex flex-col items-center gap-1.5 rounded-lg p-1.5 transition-colors duration-150 hover:bg-line/20"
              :aria-label="`Use ${p.name}`"
              :aria-pressed="isActivePalette(p.color)"
              @click="pickPalette(p.color)"
            >
              <span
                class="aspect-square w-full rounded-lg border transition-transform duration-150 group-hover:scale-105 group-active:scale-95"
                :class="isActivePalette(p.color) ? 'border-accent ring-2 ring-accent ring-offset-2 ring-offset-panel' : 'border-line'"
                :style="{ background: p.color }"
              />
              <span class="line-clamp-1 w-full text-center text-[10px] leading-tight text-muted">{{ p.name }}</span>
            </button>
          </div>
        </ControlGroup>
      </aside>
    </div>
  </div>
</template>

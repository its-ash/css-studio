<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_HAMBURGER,
  PRESETS_HAMBURGER,
  BURGER_MORPHS,
  BURGER_BARS,
  BURGER_SHELLS,
  hamburgerCss,
  hamburgerHtml,
  hamburgerVars,
  burgerInk,
  normalizeHamburger,
  randomizeHamburger
} from '~/utils/generators/hamburger'
import type { BurgerMorph, HamburgerState } from '~/utils/generators/hamburger'
import { readableInk } from '~/utils/colors'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<HamburgerState>({
  id: 'hamburger',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_HAMBURGER)) as HamburgerState,
  randomize: randomizeHamburger,
  deserialize: (raw) => normalizeHamburger(raw as unknown as HamburgerState)
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => hamburgerCss(state.value))
const html = computed(() => hamburgerHtml(state.value))
const vars = computed(() => hamburgerVars(state.value))
const ink = computed(() => burgerInk(normalizeHamburger(state.value)))
const inkAdjusted = computed(() => ink.value.bar.toLowerCase() !== state.value.barColor.toLowerCase())

/** Every morph rendered with the current styling, each scoped under its own class prefix. */
const gallery = computed(() =>
  BURGER_MORPHS.map((m) => {
    const prefix = `burger-g-${m.value}`
    const s = { ...state.value, morph: m.value, shell: state.value.shell === 'labeled' ? 'rounded' : state.value.shell } as HamburgerState
    return { ...m, prefix, css: hamburgerCss(s, prefix), html: hamburgerHtml(s, prefix) }
  })
)
const demoStyle = computed(() => `<style>${css.value}\n${gallery.value.map((g) => g.css).join('\n')}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_HAMBURGER[i]!.state)) as HamburgerState
  pushHistory()
}

function useMorph(m: BurgerMorph) {
  state.value = { ...state.value, morph: m }
  pushHistory()
}

const openAll = ref(false)
const stage = ref<HTMLElement | null>(null)
watch(openAll, (v) => {
  stage.value?.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((el) => (el.checked = v))
})

/** Thumbnails sit on each preset's own page colour, the surface plain/outline buttons rely on. */
const stageWrap = (s: HamburgerState, inner: string) =>
  `<div style="display:grid;place-items:center;width:100%;height:100%;min-height:200px;border-radius:16px;background:${normalizeHamburger(s).pageBg}">${inner}</div>`

const variants = computed(() =>
  PRESETS_HAMBURGER.map((p) => ({ name: p.name, css: hamburgerCss(p.state), html: stageWrap(p.state, hamburgerHtml(p.state)) }))
)
</script>

<template>
  <EditorPageShell
    title="Hamburger Icons"
    description="Ten pure-CSS menu icon morphs with button shells, bar layouts and an optional label."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Hamburger preview" filename="css-studio-hamburger">
        <template #presets>
          <PreviewPresets :presets="PRESETS_HAMBURGER" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div ref="stage" class="flex w-full max-w-2xl flex-col items-center gap-10 p-6">
          <div class="flex w-full flex-col items-center gap-3 rounded-2xl border border-line py-10" :style="{ background: state.pageBg }">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="flex items-center justify-center" style="min-height: 76px" v-html="html"></div>
            <p class="text-center text-[11px]" :style="{ color: readableInk(state.pageBg, '#52525b', '#a1a1aa') }">Click, or Tab to it and press Space.</p>
          </div>

          <section class="w-full" aria-label="All morphs">
            <div class="mb-3 flex items-center justify-between">
              <h2 class="text-[11px] font-medium tracking-wide text-muted uppercase">All morphs</h2>
              <label class="flex cursor-pointer items-center gap-2 text-[11px] text-muted">
                <input v-model="openAll" type="checkbox" class="accent-accent" />
                Show open state
              </label>
            </div>
            <ul class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              <li
                v-for="g in gallery"
                :key="g.value"
                class="flex flex-col items-center gap-2.5 rounded-xl border bg-bg/40 p-2 transition-colors duration-150"
                :class="state.morph === g.value ? 'border-accent/70' : 'border-line'"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div class="flex h-20 w-full items-center justify-center rounded-lg" :style="{ background: state.pageBg }" v-html="g.html"></div>
                <button
                  type="button"
                  class="w-full rounded-md px-2 py-1 text-[11px] font-medium transition-[background-color,color] duration-150 active:scale-[0.97]"
                  :class="state.morph === g.value ? 'bg-secondary text-secondary-fg' : 'text-muted hover:bg-line/30 hover:text-fg'"
                  :aria-pressed="state.morph === g.value"
                  @click="useMorph(g.value)"
                >
                  {{ g.label }}
                </button>
              </li>
            </ul>
          </section>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Icon" icon="ph-list">
        <SelectControl v-model="state.morph" label="Morph" :options="BURGER_MORPHS" />
        <SelectControl v-model="state.shell" label="Button shell" :options="BURGER_SHELLS" />
        <SelectControl v-model="state.bars" label="Bar layout" :options="BURGER_BARS" />
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="n in [3, 2] as const"
            :key="n"
            type="button"
            class="h-9 rounded-lg border text-xs font-medium transition-colors duration-150"
            :class="state.lines === n ? 'border-accent/70 bg-accent/8 text-fg' : 'border-line text-muted hover:bg-line/15'"
            :aria-pressed="state.lines === n"
            @click="state.lines = n"
          >
            {{ n }} lines
          </button>
        </div>
        <ToggleControl v-model="state.accentOnOpen" label="Accent bars when open" />
      </ControlGroup>

      <ControlGroup label="Size & motion" icon="ph-sliders">
        <SliderControl v-model="state.size" label="Button size" :min="32" :max="64" suffix="px" />
        <SliderControl v-model="state.barWidth" label="Bar width" :min="14" :max="32" suffix="px" />
        <SliderControl v-model="state.barHeight" label="Bar height" :min="1" :max="5" suffix="px" />
        <SliderControl v-model="state.gap" label="Bar gap" :min="2" :max="10" suffix="px" />
        <SliderControl v-model="state.radius" label="Corner radius" :min="0" :max="24" suffix="px" />
        <SliderControl v-model="state.duration" label="Duration" :min="150" :max="700" :step="10" suffix="ms" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.barColor" label="Bars & label" @update:model-value="(v) => (state.barColor = v)" />
        <ColorControl :model-value="state.shellBg" label="Button background" @update:model-value="(v) => (state.shellBg = v)" />
        <ColorControl :model-value="state.pageBg" label="Page background" @update:model-value="(v) => (state.pageBg = v)" />
        <p v-if="inkAdjusted" class="text-[11px] leading-relaxed text-muted">
          Bars are too close to the background, so the export uses {{ ink.bar }} instead to keep 3:1 contrast.
        </p>
        <ColorControl :model-value="state.accent" label="Accent (hover, focus, open)" @update:model-value="(v) => (state.accent = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-hamburger" />
    </template>
  </EditorPageShell>
</template>

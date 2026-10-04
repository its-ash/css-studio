<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import { randomSeed } from '~/utils/rng'
import {
  DEFAULT_SVG_BG,
  PRESETS_SVG_BG,
  SVG_BG_KINDS,
  SVG_BG_POSITIONS,
  svgBgCss,
  svgBgHtml,
  svgBgVars,
  randomizeSvgBg
} from '~/utils/generators/svgBg'
import type { SvgBgState } from '~/utils/generators/svgBg'

const { state, randomize: rawRandomize, reset: rawReset, undo: rawUndo, redo: rawRedo, pushHistory, shareUrlRef } = useEditor<SvgBgState>({
  id: 'svg-background',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_SVG_BG)) as SvgBgState,
  randomize: randomizeSvgBg
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => svgBgCss(state.value))
const html = computed(() => svgBgHtml())
const vars = computed(() => svgBgVars(state.value))
const demoStyle = computed(() => `<style>.preview-svg-bg { display: grid; place-items: center; padding: 1.5rem; } .preview-svg-bg > div { width: 100%; max-width: 760px; } .preview-svg-bg .svg-bg { width: 100%; border-radius: 12px; } ${css.value}</style>`)

/** Slider edits reseed so every change renders a new composition; programmatic loads keep their seed. */
let lock = false
const locked = (fn: () => void) => () => {
  lock = true
  fn()
  nextTick(() => (lock = false))
}
const randomize = locked(rawRandomize)
const reset = locked(rawReset)
const undo = locked(rawUndo)
const redo = locked(rawRedo)

watch(
  () => [state.value.layers, state.value.complexity, state.value.amplitude, state.value.blur, state.value.width, state.value.height, state.value.position, state.value.kind],
  () => {
    if (!lock) state.value.seed = (randomSeed() % 99999) + 1
  }
)

function applyPreset(i: number) {
  lock = true
  nextTick(() => (lock = false))
  state.value = JSON.parse(JSON.stringify(PRESETS_SVG_BG[i]!.state)) as SvgBgState
  pushHistory()
}

const variants = computed(() => PRESETS_SVG_BG.map((p) => ({ name: p.name, css: `${svgBgCss(p.state)} .svg-bg { width: 100%; height: 100%; aspect-ratio: auto; }`, html: svgBgHtml() })))
</script>

<template>
  <EditorPageShell
    title="SVG Backgrounds"
    description="Generative SVG scenes: waves, blobs, peaks, low poly and gradients."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="SVG background preview" filename="css-studio-svg-background">
        <template #presets>
          <PreviewPresets :presets="PRESETS_SVG_BG" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="preview-svg-bg h-full w-full">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Scene" icon="ph-image">
        <SelectControl v-model="state.kind" label="Style" :options="SVG_BG_KINDS" />
        <SelectControl v-model="state.position" label="Anchor" :options="SVG_BG_POSITIONS" />
        <SliderControl v-model="state.layers" label="Layers" :min="1" :max="10" />
        <SliderControl v-model="state.complexity" label="Complexity" :min="2" :max="16" />
        <SliderControl v-model="state.amplitude" label="Amplitude" :min="0" :max="200" />
        <SliderControl v-if="['blurry-gradient', 'aurora', 'bokeh'].includes(state.kind)" v-model="state.blur" label="Blur" :min="0" :max="200" suffix="px" />
        <SliderControl v-model="state.seed" label="Seed" :min="1" :max="99999" />
      </ControlGroup>

      <ControlGroup label="Canvas" icon="ph-square-half">
        <SliderControl v-model="state.width" label="Width" :min="200" :max="2400" :step="10" suffix="px" />
        <SliderControl v-model="state.height" label="Height" :min="200" :max="2400" :step="10" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
        <ColorControl :model-value="state.c1" label="Color A" @update:model-value="(v) => (state.c1 = v)" />
        <ColorControl :model-value="state.c2" label="Color B" @update:model-value="(v) => (state.c2 = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-svg-background" />
    </template>
  </EditorPageShell>
</template>

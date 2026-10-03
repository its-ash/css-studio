<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_NOISE,
  PRESETS_NOISE,
  NOISE_KINDS,
  NOISE_BACKDROPS,
  NOISE_BLENDS,
  noiseCss,
  noiseHtml,
  noiseVars,
  normalizeNoise,
  randomizeNoise
} from '~/utils/generators/noise'
import type { NoiseState } from '~/utils/generators/noise'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<NoiseState>({
  id: 'noise',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_NOISE)) as NoiseState,
  randomize: randomizeNoise,
  deserialize: (raw) => normalizeNoise(raw as unknown as NoiseState)
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => noiseCss(state.value))
const html = computed(() => noiseHtml(state.value))
const vars = computed(() => noiseVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_NOISE[i]!.state)) as NoiseState
  pushHistory()
}

const variants = computed(() => PRESETS_NOISE.map((p) => ({ name: p.name, css: noiseCss(p.state), html: noiseHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Noise & Grain Generator"
    description="Pure-CSS grain, film, static, halftone, paper and scanline texture overlays."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" title="Noise preview" filename="css-studio-noise" @apply-variant="applyPreset">
        <template #presets>
          <PreviewPresets :presets="PRESETS_NOISE" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full items-center justify-center p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="w-full max-w-2xl" v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Texture" icon="ph-dots-nine">
        <SelectControl v-model="state.kind" label="Type" :options="NOISE_KINDS" />
        <SliderControl v-model="state.opacity" label="Strength" :min="5" :max="100" suffix="%" />
        <SliderControl v-model="state.size" label="Grain size" :min="0.5" :max="4" :step="0.25" suffix="x" />
        <SelectControl v-model="state.blend" label="Blend mode" :options="NOISE_BLENDS" />
        <ColorControl :model-value="state.noiseColor" label="Grain color" @update:model-value="(v) => (state.noiseColor = v)" />
        <ToggleControl v-model="state.animate" label="Animate grain" :hint="state.kind === 'static' ? 'Static always moves' : undefined" />
      </ControlGroup>

      <ControlGroup label="Backdrop" icon="ph-layout">
        <SelectControl v-model="state.backdrop" label="Backdrop" :options="NOISE_BACKDROPS" />
        <ColorControl :model-value="state.baseColor" label="Color 1" @update:model-value="(v) => (state.baseColor = v)" />
        <ColorControl v-if="state.backdrop === 'gradient'" :model-value="state.baseColor2" label="Color 2" @update:model-value="(v) => (state.baseColor2 = v)" />
        <ToggleControl v-model="state.content" label="Sample headline" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-noise" />
    </template>
  </EditorPageShell>
</template>

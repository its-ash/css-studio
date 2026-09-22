<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_NOISE,
  PRESETS_NOISE,
  NOISE_KINDS,
  noiseCss,
  noiseHtml,
  noisePreviewStyle,
  noiseVars,
  randomizeNoise
} from '~/utils/generators/noise'
import type { NoiseState } from '~/utils/generators/noise'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<NoiseState>({
  id: 'noise',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_NOISE)) as NoiseState,
  randomize: randomizeNoise
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => noiseCss(state.value))
const html = computed(() => noiseHtml())
const vars = computed(() => noiseVars(state.value))
const style = computed(() => noisePreviewStyle(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_NOISE[i]!.state)) as NoiseState
  pushHistory()
}

useHead({ title: 'Noise & Grain - CSS Studio' })
</script>

<template>
  <EditorPageShell
    title="Noise & Grain Generator"
    description="Pure-CSS film grain, static and halftone texture overlays."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Noise preview" filename="css-studio-noise">
        <template #presets>
          <PreviewPresets :presets="PRESETS_NOISE" @apply="applyPreset" />
        </template>
        <div class="h-[420px] w-full max-w-3xl rounded-xl" :style="style" aria-label="Noise preview"></div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Noise" icon="ph-dots-nine">
        <SelectControl v-model="state.kind" label="Type" :options="NOISE_KINDS" />
        <ColorControl :model-value="state.baseColor" label="Base color" @update:model-value="(v) => (state.baseColor = v)" />
        <ColorControl :model-value="state.noiseColor" label="Noise color" @update:model-value="(v) => (state.noiseColor = v)" />
        <SliderControl v-model="state.opacity" label="Opacity" :min="1" :max="50" suffix="%" />
        <SliderControl v-model="state.tileSize" label="Tile size" :min="2" :max="12" suffix="px" />
        <SliderControl v-if="state.kind === 'halftone'" v-model="state.density" label="Dot density" :min="10" :max="100" suffix="%" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-noise" />
    </template>
  </EditorPageShell>
</template>

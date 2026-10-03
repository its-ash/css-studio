<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_WAVE,
  PRESETS_WAVE,
  WAVE_SKINS,
  waveCss,
  waveHtml,
  waveVars,
  randomizeWave
} from '~/utils/generators/wave'
import type { WaveState } from '~/utils/generators/wave'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<WaveState>({
  id: 'wave',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_WAVE)) as WaveState,
  randomize: randomizeWave
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => waveCss(state.value))
const html = computed(() => waveHtml())
const vars = computed(() => waveVars(state.value))
const demoStyle = computed(() => `<style>.preview-wave { display: grid; place-items: center; height: 100%; } ${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_WAVE[i]!.state)) as WaveState
  pushHistory()
}


const variants = computed(() => PRESETS_WAVE.map((p) => ({ name: p.name, css: waveCss(p.state), html: waveHtml() })))
</script>

<template>
  <EditorPageShell
    title="Wave Dividers"
    description="Section wave shapes: sine, zigzag, steps and blobs."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Wave preview" filename="css-studio-wave">
        <template #presets>
          <PreviewPresets :presets="PRESETS_WAVE" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="preview-wave h-full w-full">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Wave" icon="ph-waves">
        <SelectControl v-model="state.skin" label="Shape" :options="WAVE_SKINS" />
        <SliderControl v-model="state.amplitude" label="Amplitude" :min="4" :max="40" suffix="px" />
        <SliderControl v-model="state.frequency" label="Frequency" :min="1" :max="8" />
        <SliderControl v-model="state.layers" label="Layers" :min="1" :max="3" />
        <SliderControl v-model="state.duration" label="Duration" :min="3" :max="24" :step="0.5" suffix="s" />
        <ToggleControl v-model="state.animated" label="Animate" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Wave" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-wave" />
    </template>
  </EditorPageShell>
</template>
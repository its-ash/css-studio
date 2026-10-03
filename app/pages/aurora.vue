<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_AURORA,
  PRESETS_AURORA,
  AURORA_KINDS,
  auroraCss,
  auroraHtml,
  auroraVars,
  randomizeAurora
} from '~/utils/generators/aurora'
import type { AuroraState } from '~/utils/generators/aurora'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<AuroraState>({
  id: 'aurora',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_AURORA)) as AuroraState,
  randomize: randomizeAurora
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => auroraCss(state.value))
const html = computed(() => auroraHtml())
const vars = computed(() => auroraVars(state.value))
const demoStyle = computed(() => `<style>.preview-aurora { display: grid; place-items: center; height: 100%; } ${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_AURORA[i]!.state)) as AuroraState
  pushHistory()
}


const variants = computed(() => PRESETS_AURORA.map((p) => ({ name: p.name, css: auroraCss(p.state), html: auroraHtml() })))
</script>

<template>
  <EditorPageShell
    title="Aurora & Sky Backgrounds"
    description="Animated aurora, stars, sunset and moonlight scenes."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Aurora preview" filename="css-studio-aurora">
        <template #presets>
          <PreviewPresets :presets="PRESETS_AURORA" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="preview-aurora h-full w-full">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Scene" icon="ph-sparkle">
        <SelectControl v-model="state.kind" label="Type" :options="AURORA_KINDS" />
        <SliderControl v-model="state.speed" label="Speed" :min="3" :max="30" :step="0.5" suffix="s" />
        <SliderControl v-model="state.width" label="Width" :min="320" :max="640" :step="10" suffix="px" />
        <SliderControl v-model="state.height" label="Height" :min="200" :max="400" :step="10" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="28" suffix="px" />
        <ToggleControl v-model="state.showStars" label="Stars" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.color1" label="Color 1" @update:model-value="(v) => (state.color1 = v)" />
        <ColorControl :model-value="state.color2" label="Color 2" @update:model-value="(v) => (state.color2 = v)" />
        <ColorControl :model-value="state.color3" label="Color 3" @update:model-value="(v) => (state.color3 = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-aurora" />
    </template>
  </EditorPageShell>
</template>
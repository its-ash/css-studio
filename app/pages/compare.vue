<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_COMPARE,
  PRESETS_COMPARE,
  compareCss,
  compareHtml,
  compareVars,
  randomizeCompare
} from '~/utils/generators/compare'
import type { CompareState } from '~/utils/generators/compare'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<CompareState>({
  id: 'compare',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_COMPARE)) as CompareState,
  randomize: randomizeCompare
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => compareCss(state.value))
const html = computed(() => compareHtml(state.value))
const vars = computed(() => compareVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_COMPARE[i]!.state)) as CompareState
  pushHistory()
}


const variants = computed(() => PRESETS_COMPARE.map((p) => ({ name: p.name, css: compareCss(p.state), html: compareHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Before / After Compare"
    description="Pure-CSS comparison slider with split handle."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Compare preview" filename="css-studio-compare">
        <template #presets>
          <PreviewPresets :presets="PRESETS_COMPARE" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl items-center justify-center p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Compare" icon="ph-arrows-left-right">
        <TextControl v-model="state.beforeLabel" label="Before label" />
        <TextControl v-model="state.afterLabel" label="After label" />
        <SliderControl v-model="state.split" label="Split position" :min="10" :max="90" suffix="%" />
        <SliderControl v-model="state.width" label="Width" :min="280" :max="520" :step="10" suffix="px" />
        <SliderControl v-model="state.height" label="Height" :min="180" :max="360" :step="10" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="24" suffix="px" />
        <SliderControl v-model="state.handleWidth" label="Handle width" :min="2" :max="8" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.beforeColor" label="Before" @update:model-value="(v) => (state.beforeColor = v)" />
        <ColorControl :model-value="state.afterColor" label="After" @update:model-value="(v) => (state.afterColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-compare" />
    </template>
  </EditorPageShell>
</template>
<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_PROGRESS_BAR,
  PRESETS_PROGRESS_BAR,
  progressBarCss,
  progressBarHtml,
  progressBarVars,
  randomizeProgressBar
} from '~/utils/generators/progressBar'
import type { ProgressBarState } from '~/utils/generators/progressBar'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<ProgressBarState>({
  id: 'progress-bar',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_PROGRESS_BAR)) as ProgressBarState,
  randomize: randomizeProgressBar
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => progressBarCss(state.value))
const html = computed(() => progressBarHtml(state.value))
const vars = computed(() => progressBarVars(state.value))
const demoStyle = computed(() => `<style>.preview-progress { display: grid; place-items: center; height: 100%; } ${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_PROGRESS_BAR[i]!.state)) as ProgressBarState
  pushHistory()
}


const variants = computed(() => PRESETS_PROGRESS_BAR.map((p) => ({ name: p.name, css: progressBarCss(p.state), html: progressBarHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Progress Bar Generator"
    description="Gradients, stripes, timers and indeterminate modes."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Progress preview" filename="css-studio-progress-bar">
        <template #presets>
          <PreviewPresets :presets="PRESETS_PROGRESS_BAR" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="preview-progress h-full w-full">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Progress" icon="ph-activity">
        <SliderControl v-if="!state.indeterminate" v-model="state.value" label="Value" :min="0" :max="100" suffix="%" />
        <SliderControl v-model="state.height" label="Height" :min="3" :max="26" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="999" suffix="px" />
        <ToggleControl v-model="state.gradient" label="Gradient fill" />
        <ToggleControl v-model="state.striped" label="Stripes" />
        <ToggleControl v-model="state.animated" label="Smooth transition" />
        <ToggleControl v-model="state.indeterminate" label="Indeterminate" />
        <ToggleControl v-model="state.showLabel" label="Show label" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Fill" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.trackColor" label="Track" @update:model-value="(v) => (state.trackColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-progress-bar" />
    </template>
  </EditorPageShell>
</template>
<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_SQUIRCLE,
  PRESETS_SQUIRCLE,
  squircleCss,
  squircleHtml,
  squircleVars,
  randomizeSquircle
} from '~/utils/generators/squircle'
import type { SquircleState } from '~/utils/generators/squircle'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<SquircleState>({
  id: 'squircle',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_SQUIRCLE)) as SquircleState,
  randomize: randomizeSquircle
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => squircleCss(state.value))
const html = computed(() => squircleHtml(state.value))
const vars = computed(() => squircleVars(state.value))
const demoStyle = computed(() => `<style>.preview-stack { display: flex; gap: 24px; } .preview-stack > div { position: relative; } ${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_SQUIRCLE[i]!.state)) as SquircleState
  pushHistory()
}


const variants = computed(() => PRESETS_SQUIRCLE.map((p) => ({ name: p.name, css: squircleCss(p.state), html: squircleHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Squircle Studio"
    description="iOS-style corner smoothing — pure CSS approximation."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Squircle preview" filename="css-studio-squircle">
        <template #presets>
          <PreviewPresets :presets="PRESETS_SQUIRCLE" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl items-center justify-center p-6">
          <div class="preview-stack" aria-label="Squircle comparison">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="html"></div>
          </div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Shape" icon="ph-rectangle">
        <SliderControl v-model="state.size" label="Size" :min="80" :max="240" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="80" suffix="px" />
        <SliderControl v-model="state.smoothing" label="Smoothing" :min="0" :max="1" :step="0.05" />
        <ToggleControl v-model="state.showRadiusComparison" label="Show plain radius comparison" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.bg" label="Squircle" @update:model-value="(v) => (state.bg = v)" />
        <ColorControl :model-value="state.accent" label="Plain" @update:model-value="(v) => (state.accent = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-squircle" />
    </template>
  </EditorPageShell>
</template>
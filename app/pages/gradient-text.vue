<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_GRADIENT_TEXT,
  PRESETS_GRADIENT_TEXT,
  gradientTextCss,
  gradientTextHtml,
  gradientTextVars,
  randomizeGradientText
} from '~/utils/generators/gradientText'
import type { GradientTextState } from '~/utils/generators/gradientText'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<GradientTextState>({
  id: 'gradient-text',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_GRADIENT_TEXT)) as GradientTextState,
  randomize: randomizeGradientText
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => gradientTextCss(state.value))
const html = computed(() => gradientTextHtml(state.value))
const vars = computed(() => gradientTextVars(state.value))
const demoStyle = computed(() => `<style>.preview-gt { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; height: 100%; } ${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_GRADIENT_TEXT[i]!.state)) as GradientTextState
  pushHistory()
}


const variants = computed(() => PRESETS_GRADIENT_TEXT.map((p) => ({ name: p.name, css: gradientTextCss(p.state), html: gradientTextHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Gradient Text"
    description="Flowing gradients and outline text — background-clip."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Gradient text preview" filename="css-studio-gradient-text">
        <template #presets>
          <PreviewPresets :presets="PRESETS_GRADIENT_TEXT" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="preview-gt h-full w-full">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Text" icon="ph-text-aa">
        <TextControl v-model="state.text" label="Content" />
        <SliderControl v-model="state.angle" label="Angle" :min="0" :max="360" suffix="°" />
        <SliderControl v-model="state.fontSize" label="Font size" :min="24" :max="72" suffix="px" />
        <SliderControl v-model="state.fontWeight" label="Weight" :min="300" :max="900" :step="100" />
        <ToggleControl v-model="state.animate" label="Animate flow" />
        <ToggleControl v-model="state.outline" label="Include outline variant" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.from" label="From" @update:model-value="(v) => (state.from = v)" />
        <ColorControl :model-value="state.to" label="To" @update:model-value="(v) => (state.to = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-gradient-text" />
    </template>
  </EditorPageShell>
</template>
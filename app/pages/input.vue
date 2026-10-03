<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_INPUT,
  PRESETS_INPUT,
  INPUT_SKINS,
  inputCss,
  inputHtml,
  inputVars,
  randomizeInput
} from '~/utils/generators/input'
import type { InputState } from '~/utils/generators/input'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<InputState>({
  id: 'input',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_INPUT)) as InputState,
  randomize: randomizeInput
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => inputCss(state.value))
const html = computed(() => inputHtml(state.value))
const vars = computed(() => inputVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_INPUT[i]!.state)) as InputState
  pushHistory()
}


const variants = computed(() => PRESETS_INPUT.map((p) => ({ name: p.name, css: inputCss(p.state), html: inputHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Input Field Studio"
    description="Styled text inputs with focus states — pure CSS."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Input preview" filename="css-studio-input">
        <template #presets>
          <PreviewPresets :presets="PRESETS_INPUT" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl flex-col items-center justify-center gap-8 p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
          <p class="max-w-xs text-center text-[11px] text-muted">Click into the field to preview the focus state.</p>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Field" icon="ph-textbox">
        <SelectControl v-model="state.skin" label="Skin" :options="INPUT_SKINS" />
        <TextControl v-model="state.label" label="Label" placeholder="Label" />
        <TextControl v-model="state.placeholder" label="Placeholder" placeholder="you@example.com" />
        <SliderControl v-model="state.width" label="Width" :min="160" :max="360" :step="10" suffix="px" />
        <SliderControl v-model="state.fontSize" label="Font size" :min="12" :max="18" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="24" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Focus accent" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.borderColor" label="Border" @update:model-value="(v) => (state.borderColor = v)" />
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-input" />
    </template>
  </EditorPageShell>
</template>
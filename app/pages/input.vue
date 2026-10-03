<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_INPUT,
  PRESETS_INPUT,
  INPUT_SKINS,
  INPUT_ICONS,
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

/** Index of the variant shown in the preview + Code tab; null = live editing state. */
const variantIdx = ref<number | null>(null)
const variantStates = computed(() => PRESETS_INPUT.map((p) => p.state))
/** Source for the Code tab: picked variant code or the live state's code. */
const previewState = computed<InputState>(() => (variantIdx.value === null ? state.value : variantStates.value[variantIdx.value]!))

const css = computed(() => inputCss(previewState.value))
const html = computed(() => inputHtml(previewState.value))
const vars = computed(() => inputVars(previewState.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)
const codeTitle = computed(() => (variantIdx.value === null ? 'Live state' : PRESETS_INPUT[variantIdx.value]!.name))

function applyPreset(i: number) {
  variantIdx.value = null
  state.value = JSON.parse(JSON.stringify(PRESETS_INPUT[i]!.state)) as InputState
  pushHistory()
}

function pickVariant(i: number) {
  variantIdx.value = i
}

/** Any control, undo or randomize edit drops back to the live state's code. */
watch(
  state,
  () => {
    variantIdx.value = null
  },
  { deep: true }
)

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
      <PreviewCanvas
        :variants="variants"
        :code-css="css"
        :code-html="html"
        :code-vars="vars"
        :code-title="codeTitle"
        title="Input preview"
        filename="css-studio-input"
        @apply-variant="pickVariant"
      >
        <template #presets>
          <PreviewPresets :presets="PRESETS_INPUT" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="flex h-full w-full items-center justify-center p-6" v-html="html"></div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Field" icon="ph-textbox">
        <SelectControl v-model="state.skin" label="Skin" :options="INPUT_SKINS" />
        <SelectControl
          v-model="state.icon"
          label="Leading icon"
          :options="INPUT_ICONS.map((v) => ({ value: v, label: v === 'none' ? 'None' : v[0]!.toUpperCase() + v.slice(1) }))"
        />
        <TextControl v-model="state.label" label="Label" placeholder="Label" />
        <TextControl v-model="state.placeholder" label="Placeholder" placeholder="you@example.com" />
        <SliderControl v-model="state.width" label="Width" :min="160" :max="360" :step="10" suffix="px" />
        <SliderControl v-model="state.fontSize" label="Font size" :min="12" :max="18" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="24" suffix="px" />
        <ToggleControl v-model="state.underlineSweep" label="Underline sweep on focus" :hint="state.skin === 'underline' ? 'Underline skin only' : 'Applies to underline skin'" />
        <ToggleControl v-model="state.error" label="Error state" hint="Uses :user-invalid — type invalid text to trigger" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Focus accent" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.borderColor" label="Border" @update:model-value="(v) => (state.borderColor = v)" />
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
      </ControlGroup>
    </template>

  </EditorPageShell>
</template>
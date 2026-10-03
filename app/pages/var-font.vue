<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  VAR_FONTS,
  DEFAULT_VAR_FONT,
  PRESETS_VAR_FONT,
  varFontCss,
  varFontHtml,
  varFontVars,
  randomizeVarFont
} from '~/utils/generators/scrollbar'
import type { VarFontState } from '~/utils/generators/scrollbar'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<VarFontState>({
  id: 'var-font',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_VAR_FONT)) as VarFontState,
  randomize: randomizeVarFont
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

/** Load the chosen variable font family from Google Fonts on demand. */
watch(
  () => state.value.family,
  (family) => {
    if (!import.meta.client) return
    const id = 'var-font-google-fonts'
    let link = document.getElementById(id) as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    const families = [...new Set(VAR_FONTS.map((f) => f.family))].map((f) => `family=${f.replace(/ /g, '+')}:opsz,slnt,wdth,wght@8..144,-10..0,50..150,100..900`).join('&')
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`
  },
  { immediate: true }
)

const css = computed(() => varFontCss(state.value))
const vars = computed(() => varFontVars(state.value))
const html = computed(() => varFontHtml(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)
const demoHtml = computed(() => html.value)

const fontOptions = VAR_FONTS.map((f) => ({ value: f.family, label: f.family }))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_VAR_FONT[i]!.state)) as VarFontState
  pushHistory()
}


const variants = computed(() => PRESETS_VAR_FONT.map((p) => ({ name: p.name, css: varFontCss(p.state), html: varFontHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Variable Font Playground"
    description="font-variation-settings: weight, optical size, slant and width."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Variable font preview" filename="css-studio-var-font">
        <template #presets>
          <PreviewPresets :presets="PRESETS_VAR_FONT" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="flex h-full w-full max-w-3xl items-center justify-center p-6" v-html="demoHtml"></div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Font" icon="ph-text-aa">
        <SelectControl v-model="state.family" label="Family" :options="fontOptions" />
        <TextControl v-model="state.text" label="Text" placeholder="Sample text" />
        <SliderControl v-model="state.size" label="Size" :min="20" :max="140" suffix="px" />
        <SliderControl v-model="state.lineHeight" label="Line height" :min="0.8" :max="2" :step="0.05" />
        <SliderControl v-model="state.tracking" label="Tracking" :min="-0.05" :max="0.3" :step="0.005" suffix="em" />
      </ControlGroup>

      <ControlGroup label="Axes" icon="ph-sliders-horizontal">
        <SliderControl v-model="state.weight" label="wght" :min="100" :max="900" :step="1" />
        <SliderControl v-model="state.opticalSize" label="opsz" :min="8" :max="144" suffix="pt" />
        <SliderControl v-model="state.slant" label="slnt" :min="-10" :max="0" suffix="°" />
        <SliderControl v-model="state.width" label="wdth" :min="50" :max="150" suffix="%" />
        <ToggleControl v-model="state.animateWeight" label="Animate weight" />
        <SliderControl v-if="state.animateWeight" v-model="state.weightDuration" label="Weight cycle" :min="1" :max="10" :step="0.5" suffix="s" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.color" label="Text" @update:model-value="(v) => (state.color = v)" />
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-var-font" />
    </template>
  </EditorPageShell>
</template>
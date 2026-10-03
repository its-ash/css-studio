<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_ACCORDION,
  PRESETS_ACCORDION,
  ACCORDION_SKINS,
  accordionCss,
  accordionHtml,
  accordionVars,
  randomizeAccordion
} from '~/utils/generators/accordion'
import type { AccordionState } from '~/utils/generators/accordion'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<AccordionState>({
  id: 'accordion',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_ACCORDION)) as AccordionState,
  randomize: randomizeAccordion
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => accordionCss(state.value))
const html = computed(() => accordionHtml())
const vars = computed(() => accordionVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_ACCORDION[i]!.state)) as AccordionState
  pushHistory()
}


const variants = computed(() => PRESETS_ACCORDION.map((p) => ({ name: p.name, css: accordionCss(p.state), html: accordionHtml() })))
</script>

<template>
  <EditorPageShell
    title="Accordion Builder"
    description="Accessible details/summary accordions with smooth animation."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Accordion preview" filename="css-studio-accordion">
        <template #presets>
          <PreviewPresets :presets="PRESETS_ACCORDION" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl items-start justify-center overflow-y-auto p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Accordion" icon="ph-list">
        <SelectControl v-model="state.skin" label="Skin" :options="ACCORDION_SKINS" />
        <SliderControl v-model="state.gap" label="Item gap" :min="0" :max="20" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="24" suffix="px" />
        <SliderControl v-model="state.duration" label="Duration" :min="120" :max="600" :step="10" suffix="ms" />
        <ToggleControl v-model="state.rotateIcon" label="Rotate + icon" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Accent" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
        <ColorControl :model-value="state.textColor" label="Text" @update:model-value="(v) => (state.textColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-accordion" />
    </template>
  </EditorPageShell>
</template>
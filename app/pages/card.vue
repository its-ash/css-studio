<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_CARD,
  PRESETS_CARD,
  CARD_SKINS,
  cardCss,
  cardHtml,
  cardVars,
  randomizeCard
} from '~/utils/generators/card'
import type { CardState } from '~/utils/generators/card'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<CardState>({
  id: 'card',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_CARD)) as CardState,
  randomize: randomizeCard
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => cardCss(state.value))
const html = computed(() => cardHtml(state.value))
const vars = computed(() => cardVars(state.value))
const demoStyle = computed(() => `<style>.preview-card { display: grid; place-items: center; height: 100%; } ${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_CARD[i]!.state)) as CardState
  pushHistory()
}


const variants = computed(() => PRESETS_CARD.map((p) => ({ name: p.name, css: cardCss(p.state), html: cardHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Card Styles"
    description="Elevated, glass, outline and gradient-border cards."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Card preview" filename="css-studio-card">
        <template #presets>
          <PreviewPresets :presets="PRESETS_CARD" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="preview-card h-full w-full">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Card" icon="ph-cards">
        <SelectControl v-model="state.skin" label="Skin" :options="CARD_SKINS" />
        <SliderControl v-model="state.width" label="Width" :min="220" :max="380" :step="10" suffix="px" />
        <SliderControl v-model="state.padding" label="Padding" :min="12" :max="32" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="28" suffix="px" />
        <ToggleControl v-model="state.hoverLift" label="Lift on hover" />
        <ToggleControl v-model="state.showImage" label="Image header" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Accent" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
        <ColorControl :model-value="state.textColor" label="Text" @update:model-value="(v) => (state.textColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-card" />
    </template>
  </EditorPageShell>
</template>
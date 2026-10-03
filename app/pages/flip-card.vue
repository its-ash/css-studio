<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_FLIP_CARD,
  PRESETS_FLIP_CARD,
  flipCardCss,
  flipCardHtml,
  flipCardVars,
  randomizeFlipCard
} from '~/utils/generators/flipCard'
import type { FlipCardState } from '~/utils/generators/flipCard'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<FlipCardState>({
  id: 'flip-card',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_FLIP_CARD)) as FlipCardState,
  randomize: randomizeFlipCard
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => flipCardCss(state.value))
const html = computed(() => flipCardHtml(state.value))
const vars = computed(() => flipCardVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_FLIP_CARD[i]!.state)) as FlipCardState
  pushHistory()
}


const variants = computed(() => PRESETS_FLIP_CARD.map((p) => ({ name: p.name, css: flipCardCss(p.state), html: flipCardHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Flip Card Studio"
    description="3D flip cards with front/back faces — no JavaScript."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Flip card preview" filename="css-studio-flip-card">
        <template #presets>
          <PreviewPresets :presets="PRESETS_FLIP_CARD" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl flex-col items-center justify-center gap-6 p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
          <p class="max-w-xs text-center text-[11px] text-muted">{{ state.trigger === 'hover' ? 'Hover the card to flip it.' : 'Card is locked in the flipped state.' }}</p>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Flip" icon="ph-rectangle">
        <div class="grid grid-cols-2 gap-2">
          <button type="button" class="h-9 rounded-lg border text-xs font-medium transition-colors duration-150" :class="state.direction === 'y' ? 'border-accent/70 bg-accent/8 text-fg' : 'border-line text-muted hover:bg-line/15'" :aria-pressed="state.direction === 'y'" @click="state.direction = 'y'">↔ Horizontal</button>
          <button type="button" class="h-9 rounded-lg border text-xs font-medium transition-colors duration-150" :class="state.direction === 'x' ? 'border-accent/70 bg-accent/8 text-fg' : 'border-line text-muted hover:bg-line/15'" :aria-pressed="state.direction === 'x'" @click="state.direction = 'x'">↕ Vertical</button>
        </div>
        <TextControl v-model="state.frontText" label="Front text" />
        <TextControl v-model="state.backText" label="Back text" />
        <SliderControl v-model="state.duration" label="Duration" :min="200" :max="1200" :step="50" suffix="ms" />
        <SliderControl v-model="state.perspective" label="Perspective" :min="400" :max="1600" :step="50" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Card" icon="ph-cards">
        <SliderControl v-model="state.width" label="Width" :min="160" :max="360" :step="10" suffix="px" />
        <SliderControl v-model="state.height" label="Height" :min="110" :max="260" :step="10" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="28" suffix="px" />
        <ColorControl :model-value="state.frontBg" label="Front" @update:model-value="(v) => (state.frontBg = v)" />
        <ColorControl :model-value="state.backBg" label="Back" @update:model-value="(v) => (state.backBg = v)" />
        <ColorControl :model-value="state.textColor" label="Text" @update:model-value="(v) => (state.textColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-flip-card" />
    </template>
  </EditorPageShell>
</template>
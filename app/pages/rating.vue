<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_RATING,
  PRESETS_RATING,
  RATING_SKINS,
  ratingCss,
  ratingHtml,
  ratingVars,
  randomizeRating
} from '~/utils/generators/rating'
import type { RatingState } from '~/utils/generators/rating'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<RatingState>({
  id: 'rating',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_RATING)) as RatingState,
  randomize: randomizeRating
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => ratingCss(state.value))
const html = computed(() => ratingHtml(state.value))
const vars = computed(() => ratingVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_RATING[i]!.state)) as RatingState
  pushHistory()
}


const variants = computed(() => PRESETS_RATING.map((p) => ({ name: p.name, css: ratingCss(p.state), html: ratingHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Star Rating"
    description="Stars, hearts and distribution bars — pure CSS."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Rating preview" filename="css-studio-rating">
        <template #presets>
          <PreviewPresets :presets="PRESETS_RATING" @apply="applyPreset" />
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
      <ControlGroup label="Rating" icon="ph-star">
        <SelectControl v-model="state.skin" label="Skin" :options="RATING_SKINS" />
        <SliderControl v-if="state.skin !== 'bars'" v-model="state.stars" label="Symbols" :min="3" :max="10" />
        <SliderControl v-if="state.skin !== 'bars'" v-model="state.rating" label="Rating" :min="0" :max="10" />
        <SliderControl v-if="state.skin !== 'bars'" v-model="state.size" label="Symbol size" :min="16" :max="48" suffix="px" />
        <SliderControl v-if="state.skin !== 'bars'" v-model="state.gap" label="Gap" :min="0" :max="12" suffix="px" />
        <ToggleControl v-if="state.skin !== 'bars'" v-model="state.hoverFill" label="Fill on hover" />
        <ToggleControl v-if="state.skin !== 'bars'" v-model="state.showValue" label="Show value" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Filled" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.emptyColor" label="Empty" @update:model-value="(v) => (state.emptyColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-rating" />
    </template>
  </EditorPageShell>
</template>
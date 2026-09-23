<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_FILTER,
  PRESETS_FILTER,
  filterCss,
  filterHtml,
  filterPreviewStyle,
  filterVars,
  randomizeFilter
} from '~/utils/generators/filter'
import type { FilterState } from '~/utils/generators/filter'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<FilterState>({
  id: 'filter',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_FILTER)) as FilterState,
  randomize: randomizeFilter
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => filterCss(state.value))
const html = computed(() => filterHtml())
const vars = computed(() => filterVars(state.value))
const style = computed(() => filterPreviewStyle(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_FILTER[i]!.state)) as FilterState
  pushHistory()
}

useSeoMeta({
  title: 'Filter - CSS Studio',
  description: 'Blur, grayscale, contrast and duotone filter stack builder.',
  ogTitle: 'Filter - CSS Studio',
  ogDescription: 'Blur, grayscale, contrast and duotone filter stack builder.',
  ogUrl: 'https://css-studio.itsash.in/filter',
  twitterTitle: 'Filter - CSS Studio',
  twitterDescription: 'Blur, grayscale, contrast and duotone filter stack builder.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/filter' }] })
</script>

<template>
  <EditorPageShell
    title="Filter Generator"
    description="Blur, grayscale, contrast and duotone filter stack builder."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Filter preview" filename="css-studio-filter">
        <template #presets>
          <PreviewPresets :presets="PRESETS_FILTER" @apply="applyPreset" />
        </template>
        <div class="flex h-[420px] w-full max-w-3xl items-center justify-center p-6">
          <div
            class="h-64 w-64 rounded-xl"
            :style="{
              ...style,
              backgroundImage: 'linear-gradient(135deg, #f43f5e 0%, #f97316 25%, #eab308 50%, #22d3ee 75%, #8b5cf6 100%)'
            }"
            aria-label="Filter preview"
          ></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Filter Stack" icon="ph-funnel">
        <SliderControl v-model="state.blur" label="Blur" :min="0" :max="20" suffix="px" />
        <SliderControl v-model="state.brightness" label="Brightness" :min="0" :max="200" suffix="%" />
        <SliderControl v-model="state.contrast" label="Contrast" :min="0" :max="200" suffix="%" />
        <SliderControl v-model="state.saturate" label="Saturate" :min="0" :max="300" suffix="%" />
        <SliderControl v-model="state.grayscale" label="Grayscale" :min="0" :max="100" suffix="%" />
        <SliderControl v-model="state.sepia" label="Sepia" :min="0" :max="100" suffix="%" />
        <SliderControl v-model="state.hueRotate" label="Hue rotate" :min="0" :max="360" suffix="deg" />
        <SliderControl v-model="state.invert" label="Invert" :min="0" :max="100" suffix="%" />
        <SliderControl v-model="state.opacity" label="Opacity" :min="0" :max="100" suffix="%" />
      </ControlGroup>

      <ControlGroup label="Duotone" icon="ph-drop-half">
        <ToggleControl v-model="state.useDuotone" label="Duotone overlay" />
        <template v-if="state.useDuotone">
          <ColorControl :model-value="state.duotoneShadow" label="Shadow color" @update:model-value="(v) => (state.duotoneShadow = v)" />
          <ColorControl :model-value="state.duotoneHighlight" label="Highlight color" @update:model-value="(v) => (state.duotoneHighlight = v)" />
        </template>
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-filter" />
    </template>
  </EditorPageShell>
</template>

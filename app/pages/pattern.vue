<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_PATTERN,
  PATTERN_ANIMATION_KINDS,
  PATTERN_KINDS,
  PRESETS_PATTERN,
  patternFullCss,
  patternKeyframes,
  patternPreviewStyle,
  patternVars,
  randomizePattern
} from '~/utils/generators/pattern'
import type { PatternState } from '~/utils/generators/pattern'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<PatternState>({
  id: 'pattern',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_PATTERN)) as PatternState,
  randomize: randomizePattern
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => patternFullCss(state.value))
const vars = computed(() => patternVars(state.value))
const style = computed(() => patternPreviewStyle(state.value))
const keyframesCss = computed(() => (state.value.animate ? `<style>${patternKeyframes(state.value)}</style>` : ''))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_PATTERN[i]!.state)) as PatternState
  pushHistory()
}

useSeoMeta({
  title: 'Pattern - CSS Studio',
  description: '12 tileable CSS-only patterns from repeating gradients.',
  ogTitle: 'Pattern - CSS Studio',
  ogDescription: '12 tileable CSS-only patterns from repeating gradients.',
  ogUrl: 'https://css-studio.itsash.in/pattern',
  twitterTitle: 'Pattern - CSS Studio',
  twitterDescription: '12 tileable CSS-only patterns from repeating gradients.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/pattern' }] })
</script>

<template>
  <EditorPageShell
    title="Pattern Generator"
    description="12 tileable CSS-only patterns from repeating gradients."
    :css="css"
    :html="`<div class=&quot;pattern&quot;></div>`"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Pattern preview" filename="css-studio-pattern">
        <template #presets>
          <PreviewPresets :presets="PRESETS_PATTERN" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="keyframesCss" aria-hidden="true"></div>
        <div class="h-80 w-full max-w-2xl rounded-xl" :style="style" aria-label="Pattern preview"></div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Pattern" icon="ph-grid-four">
        <SelectControl v-model="state.kind" label="Kind" :options="PATTERN_KINDS" />
        <SliderControl v-model="state.size" label="Tile size" :min="4" :max="80" suffix="px" />
        <SliderControl v-model="state.spacing" label="Spacing" :min="0" :max="40" suffix="px" />
        <SliderControl v-model="state.thickness" label="Thickness" :min="1" :max="12" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.color" label="Pattern color" @update:model-value="(v) => (state.color = v)" />
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
        <SliderControl v-model="state.opacity" label="Opacity" :min="10" :max="100" suffix="%" />
        <SliderControl v-model="state.rotation" label="Rotation" :min="0" :max="360" suffix="°" />
      </ControlGroup>

      <ControlGroup label="Animation" icon="ph-sparkle">
        <ToggleControl v-model="state.animate" label="Animate pattern" />
        <template v-if="state.animate">
          <SelectControl v-model="state.animationKind" label="Animation type" :options="PATTERN_ANIMATION_KINDS" />
          <SliderControl v-model="state.animationDuration" label="Duration" :min="0.5" :max="15" :step="0.5" suffix="s" />
          <SelectControl
            v-model="state.animationDirection"
            label="Direction"
            :options="[
              { value: 'normal', label: 'Normal' },
              { value: 'alternate', label: 'Alternate' },
              { value: 'reverse', label: 'Reverse' },
              { value: 'alternate-reverse', label: 'Alternate Reverse' }
            ]"
          />
        </template>
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" html="<div class=&quot;pattern&quot;></div>" :vars="vars" filename="css-studio-pattern" />
    </template>
  </EditorPageShell>
</template>
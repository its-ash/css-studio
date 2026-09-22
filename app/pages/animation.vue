<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_ANIMATION,
  ANIMATION_KINDS,
  EASINGS,
  PRESETS_ANIMATION,
  animationCss,
  animationPreviewStyle,
  animationShorthand,
  keyframesFor,
  randomizeAnimation
} from '~/utils/generators/animation'
import type { AnimationState } from '~/utils/generators/animation'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<AnimationState>({
  id: 'animation',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_ANIMATION)) as AnimationState,
  randomize: randomizeAnimation
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => animationCss(state.value))
const style = computed(() => animationPreviewStyle(state.value))
const keyframes = computed(() => keyframesFor(state.value.kind, state.value.distance))

/** Injected into the preview via a scoped style element so keyframes animate. */
const keyframesStyle = computed(() => `<style>${keyframes.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_ANIMATION[i]!.state)) as AnimationState
  pushHistory()
}

useHead({ title: 'Animation - CSS Studio' })
</script>

<template>
  <EditorPageShell
    title="Animation Generator"
    description="Visual keyframe builder with timing controls."
    :css="css"
    :html="`<div class=&quot;animated&quot;>Content</div>`"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Animation preview" filename="css-studio-animation">
        <template #presets>
          <PreviewPresets :presets="PRESETS_ANIMATION" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="keyframesStyle" aria-hidden="true"></div>
        <div class="flex h-[420px] w-full max-w-3xl items-center justify-center">
          <div
            class="flex h-24 w-24 items-center justify-center rounded-xl bg-accent/20 text-sm font-medium text-fg"
            :style="style"
            aria-label="Animation preview"
          >
            Box
          </div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Animation" icon="ph-sparkle">
        <SelectControl v-model="state.kind" label="Kind" :options="ANIMATION_KINDS" />
        <SliderControl v-model="state.duration" label="Duration" :min="0.1" :max="10" :step="0.1" suffix="s" />
        <SliderControl v-model="state.delay" label="Delay" :min="0" :max="5" :step="0.1" suffix="s" />
        <SelectControl v-model="state.easing" label="Easing" :options="EASINGS.map((e) => ({ value: e.value, label: e.label }))" />
        <SliderControl v-model="state.distance" label="Distance" :min="4" :max="120" suffix="px" />
        <SelectControl
          v-model="state.iteration"
          label="Iterations"
          :options="[
            { value: 'infinite', label: 'Infinite' },
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '5', label: '5' }
          ]"
        />
        <SelectControl
          v-model="state.direction"
          label="Direction"
          :options="[
            { value: 'normal', label: 'Normal' },
            { value: 'alternate', label: 'Alternate' },
            { value: 'reverse', label: 'Reverse' },
            { value: 'alternate-reverse', label: 'Alternate Reverse' }
          ]"
        />
        <SelectControl
          v-model="state.fillMode"
          label="Fill mode"
          :options="[
            { value: 'none', label: 'None' },
            { value: 'forwards', label: 'Forwards' },
            { value: 'backwards', label: 'Backwards' },
            { value: 'both', label: 'Both' }
          ]"
        />
      </ControlGroup>

      <ControlGroup label="Keyframes" icon="ph-code">
        <pre class="max-h-40 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-bg p-3 font-mono text-[11px] leading-relaxed text-muted">{{ keyframes }}</pre>
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" html="<div class=&quot;animated&quot;>Content</div>" filename="css-studio-animation" />
    </template>
  </EditorPageShell>
</template>
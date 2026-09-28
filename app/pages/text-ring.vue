<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_TEXT_RING,
  PRESETS_TEXT_RING,
  textRingCss,
  textRingHtml,
  textRingKeyframes,
  textRingVars,
  randomizeTextRing
} from '~/utils/generators/scrollbar'
import type { TextRingState } from '~/utils/generators/scrollbar'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<TextRingState>({
  id: 'text-ring',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_TEXT_RING)) as TextRingState,
  randomize: randomizeTextRing
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => textRingCss(state.value))
const vars = computed(() => textRingVars(state.value))
const html = computed(() => textRingHtml(state.value))
const keyframesStyle = computed(() => `<style>${textRingKeyframes()}</style>`)
const demoStyle = computed(() => `<style>${css.value}</style>`)
const demoHtml = computed(() => html.value)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_TEXT_RING[i]!.state)) as TextRingState
  pushHistory()
}

useSeoMeta({
  title: 'Circular Text Ring - CSS Studio',
  description: 'Rotating text-on-a-circle badge in pure CSS with spin controls.',
  ogTitle: 'Circular Text Ring - CSS Studio',
  ogDescription: 'Rotating text-on-a-circle badge in pure CSS with spin controls.',
  ogUrl: 'https://css-studio.itsash.in/text-ring',
  twitterTitle: 'Circular Text Ring - CSS Studio',
  twitterDescription: 'Rotating text-on-a-circle badge in pure CSS with spin controls.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/text-ring' }] })
</script>

<template>
  <EditorPageShell
    title="Circular Text Ring"
    description="Rotating text-on-a-circle badge in pure CSS."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Text ring preview" filename="css-studio-text-ring">
        <template #presets>
          <PreviewPresets :presets="PRESETS_TEXT_RING" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="keyframesStyle" aria-hidden="true"></div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-3xl items-center justify-center p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="demoHtml"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Spin" icon="ph-arrows-clockwise">
        <ToggleControl v-model="state.spin" label="Spin" />
        <template v-if="state.spin">
          <SliderControl v-model="state.spinDuration" label="Duration" :min="4" :max="40" suffix="s" />
          <div class="grid grid-cols-2 gap-2">
            <button
              type="button"
              class="h-9 rounded-lg border text-xs font-medium transition-colors duration-150"
              :class="state.spinDirection === 'normal' ? 'border-accent/70 bg-accent/8 text-fg' : 'border-line text-muted hover:bg-line/15'"
              :aria-pressed="state.spinDirection === 'normal'"
              @click="state.spinDirection = 'normal'"
            >
              ↻ Clockwise
            </button>
            <button
              type="button"
              class="h-9 rounded-lg border text-xs font-medium transition-colors duration-150"
              :class="state.spinDirection === 'reverse' ? 'border-accent/70 bg-accent/8 text-fg' : 'border-line text-muted hover:bg-line/15'"
              :aria-pressed="state.spinDirection === 'reverse'"
              @click="state.spinDirection = 'reverse'"
            >
              ↺ Reverse
            </button>
          </div>
        </template>
      </ControlGroup>

      <ControlGroup label="Content" icon="ph-text-t">
        <TextControl v-model="state.text" label="Text" placeholder="RING TEXT" />
        <SliderControl v-model="state.repeatText" label="Repeats" :min="1" :max="6" />
        <ToggleControl v-model="state.uppercase" label="Uppercase" />
        <ToggleControl v-model="state.centerIcon" label="Center mark" />
      </ControlGroup>

      <ControlGroup label="Style" icon="ph-circle-dashed">
        <SliderControl v-model="state.size" label="Diameter" :min="140" :max="400" :step="10" suffix="px" />
        <SliderControl v-model="state.fontSize" label="Font size" :min="8" :max="24" suffix="px" />
        <SliderControl v-model="state.fontWeight" label="Weight" :min="300" :max="900" :step="100" />
        <SliderControl v-model="state.letterSpacing" label="Tracking" :min="0" :max="10" suffix="px" />
        <ColorControl :model-value="state.color" label="Text" @update:model-value="(v) => (state.color = v)" />
        <ColorControl :model-value="state.ringColor" label="Ring / center" @update:model-value="(v) => (state.ringColor = v)" />
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-text-ring" />
    </template>
  </EditorPageShell>
</template>
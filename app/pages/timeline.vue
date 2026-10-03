<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_TIMELINE,
  PRESETS_TIMELINE,
  TIMELINE_STYLES,
  timelineCss,
  timelineHtml,
  timelineVars,
  randomizeTimeline
} from '~/utils/generators/timeline'
import type { TimelineState } from '~/utils/generators/timeline'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<TimelineState>({
  id: 'timeline',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_TIMELINE)) as TimelineState,
  randomize: randomizeTimeline
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => timelineCss(state.value))
const html = computed(() => timelineHtml(state.value))
const vars = computed(() => timelineVars(state.value))
const demoStyle = computed(() => `<style>.preview-timeline { display: flex; justify-content: center; height: 100%; overflow: auto; } .preview-timeline > div { width: 100%; max-width: 560px; } ${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_TIMELINE[i]!.state)) as TimelineState
  pushHistory()
}


const variants = computed(() => PRESETS_TIMELINE.map((p) => ({ name: p.name, css: timelineCss(p.state), html: timelineHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Timeline Builder"
    description="Vertical timelines with dots, cards and animated lines."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Timeline preview" filename="css-studio-timeline">
        <template #presets>
          <PreviewPresets :presets="PRESETS_TIMELINE" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="preview-timeline h-full w-full">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Timeline" icon="ph-clock-counter-clockwise">
        <SelectControl v-model="state.style" label="Style" :options="TIMELINE_STYLES" />
        <SliderControl v-model="state.dotSize" label="Dot size" :min="8" :max="24" suffix="px" />
        <SliderControl v-model="state.lineWidth" label="Line width" :min="1" :max="5" suffix="px" />
        <SliderControl v-model="state.gap" label="Item gap" :min="10" :max="48" suffix="px" />
        <SliderControl v-model="state.radius" label="Card radius" :min="0" :max="24" suffix="px" />
        <ToggleControl v-model="state.animatedLine" label="Animate the line" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Accent" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.bg" label="Card bg" @update:model-value="(v) => (state.bg = v)" />
        <ColorControl :model-value="state.textColor" label="Text" @update:model-value="(v) => (state.textColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-timeline" />
    </template>
  </EditorPageShell>
</template>
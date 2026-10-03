<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_MARQUEE,
  PRESETS_MARQUEE,
  marqueeCss,
  marqueeHtml,
  marqueeKeyframes,
  marqueeVars,
  randomizeMarquee
} from '~/utils/generators/scrollbar'
import type { MarqueeState } from '~/utils/generators/scrollbar'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<MarqueeState>({
  id: 'marquee',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_MARQUEE)) as MarqueeState,
  randomize: randomizeMarquee
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => marqueeCss(state.value))
const vars = computed(() => marqueeVars(state.value))
const html = computed(() => marqueeHtml(state.value))
const keyframesStyle = computed(() => `<style>${marqueeKeyframes()}</style>`)
const demoStyle = computed(() => `<style>${css.value}</style>`)
const demoHtml = computed(() => html.value)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_MARQUEE[i]!.state)) as MarqueeState
  pushHistory()
}


const variants = computed(() => PRESETS_MARQUEE.map((p) => ({ name: p.name, css: marqueeCss(p.state), html: marqueeHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Marquee Builder"
    description="Infinite scrolling ticker in pure CSS — no JavaScript."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Marquee preview" filename="css-studio-marquee">
        <template #presets>
          <PreviewPresets :presets="PRESETS_MARQUEE" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="keyframesStyle" aria-hidden="true"></div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="flex w-full max-w-3xl flex-col items-center justify-center gap-6" v-html="demoHtml"></div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Motion" icon="ph-arrows-out-line-horizontal">
        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            class="h-9 rounded-lg border text-xs font-medium transition-colors duration-150"
            :class="state.direction === 'left' ? 'border-accent/70 bg-accent/8 text-fg' : 'border-line text-muted hover:bg-line/15'"
            :aria-pressed="state.direction === 'left'"
            @click="state.direction = 'left'"
          >
            ◀ Left
          </button>
          <button
            type="button"
            class="h-9 rounded-lg border text-xs font-medium transition-colors duration-150"
            :class="state.direction === 'right' ? 'border-accent/70 bg-accent/8 text-fg' : 'border-line text-muted hover:bg-line/15'"
            :aria-pressed="state.direction === 'right'"
            @click="state.direction = 'right'"
          >
            Right ▶
          </button>
        </div>
        <SliderControl v-model="state.duration" label="Duration (speed)" :min="4" :max="60" suffix="s" />
        <SliderControl v-model="state.repeat" label="Repeats" :min="2" :max="12" />
        <ToggleControl v-model="state.pauseOnHover" label="Pause on hover" />
      </ControlGroup>

      <ControlGroup label="Style" icon="ph-paint-brush">
        <TextControl v-model="state.text" label="Text" placeholder="Marquee text" />
        <SliderControl v-model="state.fontSize" label="Font size" :min="10" :max="48" suffix="px" />
        <SliderControl v-model="state.fontWeight" label="Weight" :min="300" :max="900" :step="100" />
        <SliderControl v-model="state.gap" label="Gap" :min="8" :max="120" suffix="px" />
        <ToggleControl v-model="state.uppercase" label="Uppercase" />
        <ToggleControl v-model="state.mono" label="Monospace" />
        <ColorControl :model-value="state.color" label="Text" @update:model-value="(v) => (state.color = v)" />
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
      </ControlGroup>

      <ControlGroup label="Extras" icon="ph-sparkle">
        <ToggleControl v-model="state.edgeFade" label="Edge fade" />
        <SliderControl v-model="state.rotate" label="Tilt" :min="-6" :max="6" suffix="°" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-marquee" />
    </template>
  </EditorPageShell>
</template>
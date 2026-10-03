<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  SCROLL_KINDS,
  DEFAULT_SCROLL_ANIM,
  PRESETS_SCROLL_ANIM,
  scrollAnimCss,
  scrollAnimHtml,
  scrollAnimKeyframes,
  scrollAnimVars,
  randomizeScrollAnim
} from '~/utils/generators/scrollbar'
import type { ScrollAnimState, ScrollTimeline } from '~/utils/generators/scrollbar'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<ScrollAnimState>({
  id: 'scroll-anim',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_SCROLL_ANIM)) as ScrollAnimState,
  randomize: randomizeScrollAnim
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => scrollAnimCss(state.value))
const vars = computed(() => scrollAnimVars(state.value))
const keyframes = computed(() => scrollAnimKeyframes(state.value))
const keyframesStyle = computed(() => `<style>${keyframes.value}</style>`)

/** Live inline style for the demo card in the preview scroller. Maps the state kind to the injected keyframe name. */
function previewAnimStyle(s: ScrollAnimState): Record<string, string> {
  const keyframeName: Record<ScrollAnimState['kind'], string> = {
    'progress-bar': 'grow-x',
    'progress-ring': 'spin-ring',
    'read-indicator': 'read-progress',
    'reveal-up': 'reveal-up',
    'reveal-left': 'reveal-left',
    'reveal-scale': 'reveal-scale',
    'reveal-blur': 'reveal-blur',
    parallax: 'parallax',
    rotate: 'spin-y',
    'count-numbers': 'count-up'
  }
  const st: Record<string, string> = {
    animation: `${keyframeName[s.kind]} linear both`,
    'animation-timeline': 'view()',
    'animation-range': `view(${s.viewStart}% ${s.viewEnd}%)`
  }
  if (s.kind === 'progress-ring') st['transform-origin'] = '50% 50%'
  return st
}

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_SCROLL_ANIM[i]!.state)) as ScrollAnimState
  pushHistory()
}

function setTimeline(t: ScrollTimeline) {
  const kinds = SCROLL_KINDS.filter((k) => k.timeline === t)
  if (!kinds.some((k) => k.value === state.value.kind)) {
    state.value.target = t === 'scroll' ? '.progress-bar' : '.reveal'
    state.value.kind = t === 'scroll' ? 'progress-bar' : 'reveal-up'
  }
  state.value.timeline = t
}


const variants = computed(() => PRESETS_SCROLL_ANIM.map((p) => ({ name: p.name, css: scrollAnimCss(p.state), html: scrollAnimHtml() })))
</script>

<template>
  <EditorPageShell
    title="Scroll-driven Animations"
    description="CSS scroll() and view() timeline animations without JavaScript."
    :css="css"
    :html="scrollAnimHtml()"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Scroll animation preview" filename="css-studio-scroll-anim">
        <template #presets>
          <PreviewPresets :presets="PRESETS_SCROLL_ANIM" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="keyframesStyle" aria-hidden="true"></div>
        <!--
          The stage scrolls; a scroll() timeline animates from page scroll and a
          view() timeline animates as the demo card crosses the scroller.
        -->
        <div class="h-105 w-full max-w-3xl overflow-y-auto rounded-xl border border-line bg-bg p-4" data-scroll-stage>
          <div class="h-2 w-full overflow-hidden rounded-full bg-line/40">
            <div
              class="h-full origin-left rounded-full"
              :style="{ background: state.accent, animation: `grow-x linear both`, animationTimeline: 'scroll(nearest)', width: '100%' }"
            ></div>
          </div>
          <p class="mt-3 text-center text-[11px] text-muted">Scroll inside this box — the bar tracks your scroll.</p>
          <div class="my-8 flex flex-col gap-3">
            <div
              v-for="i in 6"
              :key="i"
              class="flex h-24 items-center justify-center rounded-xl border border-line bg-panel text-xs text-muted"
            >
              Demo section {{ i }}
            </div>
          </div>
          <div
            class="mx-auto flex h-24 w-64 items-center justify-center rounded-xl text-sm font-medium"
            :style="{
              background: state.accent,
              color: state.kind === 'read-indicator' ? '#fff' : '#0b0f0e',
              ...previewAnimStyle(state)
            }"
            aria-label="Scroll-driven element preview"
          >
            {{ state.kind }}
          </div>
          <div class="my-8 flex flex-col gap-3">
            <div
              v-for="i in 4"
              :key="i"
              class="flex h-16 items-center justify-center rounded-lg border border-line bg-panel text-[11px] text-muted"
            >Keep scrolling</div>
          </div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Timeline" icon="ph-arrow-bend-double-up-right">
        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            class="h-9 rounded-lg border px-2 text-xs font-medium transition-colors duration-150"
            :class="state.timeline === 'scroll' ? 'border-accent/70 bg-accent/8 text-fg' : 'border-line text-muted hover:bg-line/15'"
            :aria-pressed="state.timeline === 'scroll'"
            @click="setTimeline('scroll')"
          >
            scroll()
          </button>
          <button
            type="button"
            class="h-9 rounded-lg border text-xs font-medium transition-colors duration-150"
            :class="state.timeline === 'view' ? 'border-accent/70 bg-accent/8 text-fg' : 'border-line'"
            :aria-pressed="state.timeline === 'view'"
            @click="setTimeline('view')"
          >
            view()
          </button>
        </div>
        <SelectControl v-model="state.kind" label="Effect" :options="SCROLL_KINDS" />
        <TextControl v-model="state.target" label="Target selector" placeholder=".progress-bar" />
        <template v-if="state.timeline === 'view'">
          <SliderControl v-model="state.viewStart" label="Range start" :min="0" :max="80" suffix="%" />
          <SliderControl v-model="state.viewEnd" label="Range end" :min="20" :max="100" suffix="%" />
        </template>
        <template v-else>
          <SliderControl v-model="state.rangeStart" label="Range start" :min="0" :max="50" suffix="%" />
          <SliderControl v-model="state.rangeEnd" label="Range end" :min="50" :max="100" suffix="%" />
        </template>
      </ControlGroup>

      <ControlGroup label="Style" icon="ph-paint-brush">
        <ColorControl :model-value="state.accent" label="Accent" @update:model-value="(v) => (state.accent = v)" />
        <SliderControl v-model="state.distance" label="Distance" :min="8" :max="160" suffix="px" />
        <SliderControl v-model="state.rotate" label="Rotation" :min="45" :max="360" suffix="°" />
      </ControlGroup>

      <ControlGroup label="Keyframes" icon="ph-code">
        <pre class="max-h-40 overflow-auto whitespace-pre wrap-break-word rounded-lg bg-bg p-3 font-mono text-[11px] leading-relaxed text-muted">{{ keyframes }}</pre>
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="scrollAnimHtml()" :vars="vars" filename="css-studio-scroll-anim" />
    </template>
  </EditorPageShell>
</template>
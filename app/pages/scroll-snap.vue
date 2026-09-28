<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  SNAP_TYPES,
  SNAP_ALIGNS,
  DEFAULT_SCROLL_SNAP,
  PRESETS_SCROLL_SNAP,
  scrollSnapCss,
  scrollSnapHtml,
  scrollSnapVars,
  randomizeScrollSnap
} from '~/utils/generators/scrollSnap'
import type { ScrollSnapState } from '~/utils/generators/scrollSnap'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<ScrollSnapState>({
  id: 'scroll-snap',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_SCROLL_SNAP)) as ScrollSnapState,
  randomize: randomizeScrollSnap
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => scrollSnapCss(state.value))
const vars = computed(() => scrollSnapVars(state.value))
const html = computed(() => scrollSnapHtml(state.value))
const demoStyle = computed(() => `<style>${css.value}\n.carousel > * { width: ${state.value.cardWidth}px; height: ${state.value.cardHeight}px; border-radius: ${state.value.radius}px; background: ${state.value.accent}; color: #04140e; font-weight: 700; display: grid; place-items: center; font-size: 18px; }</style>`)
const demoHtml = computed(() => html.value)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_SCROLL_SNAP[i]!.state)) as ScrollSnapState
  pushHistory()
}

useSeoMeta({
  title: 'Scroll-snap Carousel - CSS Studio',
  description: 'scroll-snap-type and scroll-snap-align carousel builder.',
  ogTitle: 'Scroll-snap Carousel - CSS Studio',
  ogDescription: 'scroll-snap-type and scroll-snap-align carousel builder.',
  ogUrl: 'https://css-studio.itsash.in/scroll-snap',
  twitterTitle: 'Scroll-snap Carousel - CSS Studio',
  twitterDescription: 'scroll-snap-type and scroll-snap-align carousel builder.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/scroll-snap' }] })
</script>

<template>
  <EditorPageShell
    title="Scroll-snap Carousel"
    description="Magnetic snap points in pure CSS."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Scroll-snap preview" filename="css-studio-scroll-snap">
        <template #presets>
          <PreviewPresets :presets="PRESETS_SCROLL_SNAP" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-3xl items-center justify-center p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="demoHtml"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Snapping" icon="ph-magnet">
        <SelectControl v-model="state.snapType" label="Type" :options="SNAP_TYPES" />
        <SelectControl v-model="state.snapAlign" label="Align" :options="SNAP_ALIGNS" />
        <div class="grid grid-cols-2 gap-2">
          <button type="button" class="h-9 rounded-lg border text-xs font-medium transition-colors duration-150" :class="state.axis === 'x' ? 'border-accent/70 bg-accent/8 text-fg' : 'border-line text-muted hover:bg-line/15'" :aria-pressed="state.axis === 'x'" @click="state.axis = 'x'">Horizontal</button>
          <button type="button" class="h-9 rounded-lg border text-xs font-medium transition-colors duration-150" :class="state.axis === 'y' ? 'border-accent/70 bg-accent/8 text-fg' : 'border-line text-muted hover:bg-line/15'" :aria-pressed="state.axis === 'y'" @click="state.axis = 'y'">Vertical</button>
        </div>
      </ControlGroup>

      <ControlGroup label="Cards" icon="ph-cards">
        <SliderControl v-model="state.cards" label="Count" :min="2" :max="12" />
        <SliderControl v-model="state.cardWidth" label="Card width" :min="120" :max="360" :step="10" suffix="px" />
        <SliderControl v-model="state.cardHeight" label="Card height" :min="100" :max="280" :step="10" suffix="px" />
        <SliderControl v-model="state.gap" label="Gap" :min="0" :max="64" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="32" suffix="px" />
        <ColorControl :model-value="state.accent" label="Card color" @update:model-value="(v) => (state.accent = v)" />
      </ControlGroup>

      <ControlGroup label="Extras" icon="ph-sparkle">
        <ToggleControl v-model="state.edgeFade" label="Edge fade" />
        <ToggleControl v-model="state.hideScrollbar" label="Hide scrollbar" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-scroll-snap" />
    </template>
  </EditorPageShell>
</template>
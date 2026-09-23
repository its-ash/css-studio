<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_SPOTLIGHT,
  PRESETS_SPOTLIGHT,
  SPOTLIGHT_SHAPES,
  spotlightCss,
  spotlightHtml,
  spotlightVars,
  randomizeSpotlight
} from '~/utils/generators/spotlight'
import type { SpotlightState } from '~/utils/generators/spotlight'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<SpotlightState>({
  id: 'spotlight',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_SPOTLIGHT)) as SpotlightState,
  randomize: randomizeSpotlight
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => spotlightCss(state.value))
const html = computed(() => spotlightHtml())
const vars = computed(() => spotlightVars(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_SPOTLIGHT[i]!.state)) as SpotlightState
  pushHistory()
}

const stageEl = ref<HTMLElement | null>(null)
function onMouseMove(e: MouseEvent) {
  const el = stageEl.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--y', `${e.clientY - rect.top}px`)
}

useSeoMeta({
  title: 'Spotlight - CSS Studio',
  description: 'Cursor-follow spotlight hover effect using CSS radial-gradient and custom properties.',
  ogTitle: 'Spotlight - CSS Studio',
  ogDescription: 'Cursor-follow spotlight hover effect using CSS radial-gradient and custom properties.',
  ogUrl: 'https://css-studio.itsash.in/spotlight',
  twitterTitle: 'Spotlight - CSS Studio',
  twitterDescription: 'Cursor-follow spotlight hover effect using CSS radial-gradient and custom properties.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/spotlight' }] })
</script>

<template>
  <EditorPageShell
    title="Spotlight Generator"
    description="Cursor-follow spotlight hover effect using CSS radial-gradient and custom properties."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Spotlight preview" filename="css-studio-spotlight">
        <template #presets>
          <PreviewPresets :presets="PRESETS_SPOTLIGHT" @apply="applyPreset" />
        </template>
        <component :is="'style'">{{ css }}</component>
        <div
          ref="stageEl"
          class="spotlight flex h-[420px] w-full max-w-3xl items-center justify-center rounded-xl"
          aria-label="Spotlight preview — move mouse over this area"
          @mousemove="onMouseMove"
        >
          <p class="pointer-events-none text-sm text-muted">Move your mouse over this panel</p>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Spotlight" icon="ph-flashlight">
        <SelectControl v-model="state.shape" label="Shape" :options="SPOTLIGHT_SHAPES" />
        <ColorControl :model-value="state.color" label="Color" @update:model-value="(v) => (state.color = v)" />
        <ColorControl :model-value="state.surface" label="Surface color" @update:model-value="(v) => (state.surface = v)" />
        <SliderControl v-model="state.size" label="Size" :min="100" :max="600" suffix="px" />
        <SliderControl v-model="state.intensity" label="Intensity" :min="5" :max="100" suffix="%" />
        <SliderControl v-model="state.fadeEdge" label="Fade edge" :min="30" :max="100" suffix="%" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-spotlight" />
    </template>
  </EditorPageShell>
</template>

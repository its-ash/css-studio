<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_LOADER,
  PRESETS_LOADER,
  LOADER_KINDS,
  loaderCss,
  loaderHtml,
  loaderVars,
  randomizeLoader
} from '~/utils/generators/loader'
import type { LoaderState } from '~/utils/generators/loader'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<LoaderState>({
  id: 'loader',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_LOADER)) as LoaderState,
  randomize: randomizeLoader
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => loaderCss(state.value))
const html = computed(() => loaderHtml(state.value))
const vars = computed(() => loaderVars(state.value))

const showsSpans = computed(() =>
  ['dots', 'bars', 'wave', 'orbit', 'ripple'].includes(state.value.kind)
)
const spanCount = computed(() => {
  if (state.value.kind === 'dots') return 3
  if (state.value.kind === 'bars' || state.value.kind === 'wave') return 5
  if (state.value.kind === 'orbit' || state.value.kind === 'ripple') return 2
  return 3
})

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_LOADER[i]!.state)) as LoaderState
  pushHistory()
}

useSeoMeta({
  title: 'Loader - CSS Studio',
  description: 'CSS-only spinners, progress bars and skeleton shimmer.',
  ogTitle: 'Loader - CSS Studio',
  ogDescription: 'CSS-only spinners, progress bars and skeleton shimmer.',
  ogUrl: 'https://css-studio.itsash.in/loader',
  twitterTitle: 'Loader - CSS Studio',
  twitterDescription: 'CSS-only spinners, progress bars and skeleton shimmer.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/loader' }] })
</script>

<template>
  <EditorPageShell
    title="Loader Generator"
    description="CSS-only spinners, progress bars and skeleton shimmer."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Loader preview" filename="css-studio-loader">
        <template #presets>
          <PreviewPresets :presets="PRESETS_LOADER" @apply="applyPreset" />
        </template>
        <div class="flex h-[420px] w-full max-w-3xl items-center justify-center">
          <component :is="'style'">{{ css }}</component>
          <div v-if="state.kind === 'progress'" :class="`loader-${state.kind}`" aria-label="Loader preview">
            <div :class="`loader-${state.kind}-bar`"></div>
          </div>
          <div v-else-if="showsSpans" :class="`loader-${state.kind}`" aria-label="Loader preview">
            <span v-for="i in spanCount" :key="i"></span>
          </div>
          <div v-else :class="`loader-${state.kind}`" aria-label="Loader preview"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Loader" icon="ph-spinner-gap">
        <SelectControl v-model="state.kind" label="Type" :options="LOADER_KINDS" />
        <ColorControl :model-value="state.color" label="Color" @update:model-value="(v) => (state.color = v)" />
        <ColorControl
          v-if="state.kind === 'spinner' || state.kind === 'progress' || state.kind === 'skeleton'"
          :model-value="state.trackColor"
          label="Track color"
          @update:model-value="(v) => (state.trackColor = v)"
        />
        <SliderControl v-model="state.size" label="Size" :min="16" :max="120" suffix="px" />
        <SliderControl
          v-if="state.kind === 'spinner' || state.kind === 'ring' || state.kind === 'progress' || state.kind === 'ripple'"
          v-model="state.thickness"
          label="Thickness"
          :min="1"
          :max="12"
          suffix="px"
        />
        <SliderControl v-model="state.speed" label="Speed" :min="0.2" :max="3" :step="0.1" suffix="s" />
        <SliderControl v-if="state.kind === 'progress'" v-model="state.progress" label="Progress" :min="0" :max="100" suffix="%" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-loader" />
    </template>
  </EditorPageShell>
</template>

<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import { DEFAULT_GLASS, PRESETS_GLASS, glassCss, glassHtml, glassPreviewStyle, glassVars, randomizeGlass } from '~/utils/generators/glass'
import type { GlassState } from '~/utils/generators/glass'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<GlassState>({
  id: 'glass',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_GLASS)) as GlassState,
  randomize: randomizeGlass
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => glassCss(state.value))
const vars = computed(() => glassVars(state.value))
const style = computed(() => glassPreviewStyle(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_GLASS[i]!.state)) as GlassState
  pushHistory()
}

useSeoMeta({
  title: 'Glassmorphism - CSS Studio',
  description: 'backdrop-filter frosted panels with border and glow controls.',
  ogTitle: 'Glassmorphism - CSS Studio',
  ogDescription: 'backdrop-filter frosted panels with border and glow controls.',
  ogUrl: 'https://css-studio.itsash.in/glass',
  twitterTitle: 'Glassmorphism - CSS Studio',
  twitterDescription: 'backdrop-filter frosted panels with border and glow controls.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/glass' }] })
</script>

<template>
  <EditorPageShell
    title="Glassmorphism Generator"
    description="backdrop-filter frosted panels with border and glow controls."
    :css="css"
    :html="glassHtml()"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Glass preview" filename="css-studio-glass">
        <template #presets>
          <PreviewPresets :presets="PRESETS_GLASS" @apply="applyPreset" />
        </template>
        <div
          class="relative flex h-[420px] w-full max-w-3xl items-center justify-center overflow-hidden rounded-xl"
          :style="{
            backgroundImage: 'linear-gradient(120deg, #f43f5e, #f97316, #eab308, #22d3ee, #8b5cf6)',
          }"
        >
          <div :style="style" class="flex items-center justify-center text-sm font-medium text-white" aria-label="Glass panel preview">
            Glassmorphism
          </div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Glass" icon="ph-drop-half">
        <ColorControl :model-value="state.bg" label="Tint color" @update:model-value="(v) => (state.bg = v)" />
        <SliderControl v-model="state.bgOpacity" label="Tint opacity" :min="0" :max="60" suffix="%" />
        <SliderControl v-model="state.blur" label="Backdrop blur" :min="0" :max="40" suffix="px" />
        <SliderControl v-model="state.saturate" label="Saturate" :min="50" :max="250" suffix="%" />
        <SliderControl v-model="state.brightness" label="Brightness" :min="50" :max="180" suffix="%" />
        <SliderControl v-model="state.radius" label="Border radius" :min="0" :max="48" suffix="px" />
        <SliderControl v-model="state.borderOpacity" label="Border opacity" :min="0" :max="100" suffix="%" />
        <ToggleControl v-model="state.innerGlow" label="Inner glow" />
        <SliderControl v-model="state.width" label="Width" :min="120" :max="640" suffix="px" />
        <SliderControl v-model="state.height" label="Height" :min="80" :max="480" suffix="px" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="glassHtml()" :vars="vars" filename="css-studio-glass" />
    </template>
  </EditorPageShell>
</template>
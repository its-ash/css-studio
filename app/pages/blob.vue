<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_BLOB,
  PRESETS_BLOB,
  blobCss,
  blobHtml,
  blobVars,
  blobPreviewStyle,
  blobBackground,
  blobKeyframes,
  randomizeBlob
} from '~/utils/generators/blob'
import type { BlobState } from '~/utils/generators/blob'
import { hslToHex, hexToHsl } from '~/utils/colors'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<BlobState>({
  id: 'blob',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_BLOB)) as BlobState,
  randomize: randomizeBlob
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => blobCss(state.value))
const vars = computed(() => blobVars(state.value))
const style = computed(() => blobPreviewStyle(state.value))
const background = computed(() => blobBackground(state.value))
const keyframesStyle = computed(() => {
  const kf = blobKeyframes(state.value)
  return kf ? `<style>${kf}</style>` : ''
})

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_BLOB[i]!.state)) as BlobState
  pushHistory()
}

useSeoMeta({
  title: 'Blob - CSS Studio',
  description: 'Organic CSS blobs built from border-radius, with gradients, shadows and morphing animation.',
  ogTitle: 'Blob - CSS Studio',
  ogDescription: 'Organic CSS blobs built from border-radius, with gradients, shadows and morphing animation.',
  ogUrl: 'https://css-studio.itsash.in/blob',
  twitterTitle: 'Blob - CSS Studio',
  twitterDescription: 'Organic CSS blobs built from border-radius, with gradients, shadows and morphing animation.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/blob' }] })
</script>

<template>
  <EditorPageShell
    title="Blob Generator"
    description="Organic CSS blobs built from border-radius, with gradients, shadows and morphing animation."
    :css="css"
    :html="blobHtml()"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Blob preview" filename="css-studio-blob">
        <template #presets>
          <PreviewPresets :presets="PRESETS_BLOB" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="keyframesStyle" aria-hidden="true"></div>
        <div class="relative flex h-[420px] w-full max-w-3xl items-center justify-center">
          <div
            :style="{
              position: 'absolute',
              left: `${state.posX}%`,
              top: `${state.posY}%`,
              ...style
            }"
            aria-label="Blob preview"
          />
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Shape" icon="ph-scribble">
        <SliderControl v-model="state.width" label="Width" :min="60" :max="640" suffix="px" />
        <SliderControl v-model="state.height" label="Height" :min="60" :max="640" suffix="px" />
        <SliderControl v-model="state.radiusCount" label="Radius Corners" :min="2" :max="8" :step="2" />
        <SliderControl v-model="state.distortion" label="Distortion" :min="0" :max="80" suffix="%" />
        <SliderControl v-model="state.rotation" label="Rotation" :min="0" :max="360" suffix="°" />
        <SliderControl v-model="state.scale" label="Scale" :min="20" :max="200" suffix="%" />
        <SliderControl v-model="state.posX" label="Position X" :min="0" :max="100" suffix="%" />
        <SliderControl v-model="state.posY" label="Position Y" :min="0" :max="100" suffix="%" />
      </ControlGroup>

      <ControlGroup label="Fill" icon="ph-paint-bucket">
        <ToggleControl v-model="state.gradient.enabled" label="Gradient fill" />
        <template v-if="state.gradient.enabled">
          <SliderControl v-model="state.gradient.angle" label="Gradient angle" :min="0" :max="360" suffix="°" />
          <div v-for="(stop, i) in state.gradient.stops" :key="i" class="flex items-center gap-2">
            <ColorControl
              :model-value="hslToHex({ h: stop.h, s: stop.s, l: stop.l })"
              :label="`Color ${i + 1}`"
              @update:model-value="(v) => { const c = hexToHsl(v); state.gradient.stops[i] = { ...stop, ...c } }"
            />
          </div>
        </template>
        <ColorControl v-else :model-value="state.fill" label="Fill color" @update:model-value="(v) => (state.fill = v)" />
        <SliderControl v-model="state.opacity" label="Opacity" :min="0" :max="100" suffix="%" />
        <SliderControl v-model="state.blur" label="Blur" :min="0" :max="60" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Shadow & Border" icon="ph-square-half">
        <ToggleControl v-model="state.shadow.enabled" label="Shadow" />
        <template v-if="state.shadow.enabled">
          <SliderControl v-model="state.shadow.x" label="Shadow X" :min="-40" :max="40" suffix="px" />
          <SliderControl v-model="state.shadow.y" label="Shadow Y" :min="-40" :max="40" suffix="px" />
          <SliderControl v-model="state.shadow.blur" label="Shadow blur" :min="0" :max="120" suffix="px" />
          <ColorControl :model-value="state.shadow.color" label="Shadow color" @update:model-value="(v) => (state.shadow.color = v)" />
        </template>
        <ToggleControl v-model="state.border.enabled" label="Border" />
        <template v-if="state.border.enabled">
          <SliderControl v-model="state.border.width" label="Border width" :min="1" :max="12" suffix="px" />
          <ColorControl :model-value="state.border.color" label="Border color" @update:model-value="(v) => (state.border.color = v)" />
        </template>
      </ControlGroup>

      <ControlGroup label="Animation" icon="ph-sparkle">
        <ToggleControl v-model="state.animate" label="Animate morph" />
        <template v-if="state.animate">
          <SliderControl v-model="state.animationSpeed" label="Speed" :min="1" :max="11" />
          <SelectControl
            v-model="state.animationDirection"
            label="Direction"
            :options="[
              { value: 'normal', label: 'Normal' },
              { value: 'alternate', label: 'Alternate' },
              { value: 'reverse', label: 'Reverse' }
            ]"
          />
          <SliderControl v-model="state.animationIntensity" label="Intensity" :min="0" :max="100" suffix="%" />
        </template>
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="blobHtml()" :vars="vars" filename="css-studio-blob" />
    </template>
  </EditorPageShell>
</template>
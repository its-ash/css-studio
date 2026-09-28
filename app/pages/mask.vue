<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  MASK_KINDS,
  DEFAULT_MASK,
  PRESETS_MASK,
  maskFullCss,
  maskHtml,
  maskPreviewStyle,
  maskVars,
  randomizeMask
} from '~/utils/generators/mask'
import type { MaskState } from '~/utils/generators/mask'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<MaskState>({
  id: 'mask',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_MASK)) as MaskState,
  randomize: randomizeMask
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => maskFullCss(state.value))
const vars = computed(() => maskVars(state.value))
const style = computed(() => maskPreviewStyle(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_MASK[i]!.state)) as MaskState
  pushHistory()
}

useSeoMeta({
  title: 'Mask Studio - CSS Studio',
  description: 'mask-image fades, holes, stripes and dot grids in pure CSS.',
  ogTitle: 'Mask Studio - CSS Studio',
  ogDescription: 'mask-image fades, holes, stripes and dot grids in pure CSS.',
  ogUrl: 'https://css-studio.itsash.in/mask',
  twitterTitle: 'Mask Studio - CSS Studio',
  twitterDescription: 'mask-image fades, holes, stripes and dot grids in pure CSS.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/mask' }] })
</script>

<template>
  <EditorPageShell
    title="Mask Studio"
    description="mask-image: fades, holes, stripes and dot grids."
    :css="css"
    :html="maskHtml(state)"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Mask preview" filename="css-studio-mask">
        <template #presets>
          <PreviewPresets :presets="PRESETS_MASK" @apply="applyPreset" />
        </template>
        <div class="flex h-full w-full max-w-3xl items-center justify-center">
          <div class="h-56 w-80" :style="style" aria-label="Mask preview"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Mask" icon="ph-rectangle">
        <SelectControl v-model="state.kind" label="Kind" :options="MASK_KINDS" />
        <SliderControl v-if="state.kind === 'linear'" v-model="state.angle" label="Angle" :min="0" :max="360" suffix="°" />
        <SliderControl v-if="state.kind === 'linear'" v-model="state.extent" label="Fade width" :min="5" :max="100" suffix="%" />
        <ToggleControl v-if="state.kind === 'linear'" v-model="state.invert" label="Invert fade" />
        <template v-if="state.kind === 'radial' || state.kind === 'radial-inverse'">
          <SliderControl v-model="state.radius" label="Radius" :min="10" :max="95" suffix="%" />
          <SliderControl v-model="state.softness" label="Softness" :min="0" :max="50" suffix="%" />
        </template>
        <template v-if="state.kind === 'stripe'">
          <SliderControl v-model="state.angle" label="Angle" :min="0" :max="180" suffix="°" />
          <SliderControl v-model="state.stripeWidth" label="Stripe width" :min="1" :max="24" suffix="px" />
          <SliderControl v-model="state.stripeGap" label="Gap" :min="0" :max="24" suffix="px" />
        </template>
        <template v-if="state.kind === 'dots'">
          <SliderControl v-model="state.dotSize" label="Dot size" :min="2" :max="16" suffix="px" />
          <SliderControl v-model="state.stripeGap" label="Spacing" :min="2" :max="24" suffix="px" />
        </template>
        <ToggleControl v-if="state.kind === 'stripe' || state.kind === 'dots'" :model-value="state.repeat !== 'no-repeat'" label="Repeat tile" @update:model-value="(v) => (state.repeat = v ? 'repeat' : 'no-repeat')" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Surface" @update:model-value="(v) => (state.accent = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="maskHtml(state)" :vars="vars" filename="css-studio-mask" />
    </template>
  </EditorPageShell>
</template>
<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_GRADIENT,
  GRADIENT_TYPES,
  PRESETS_GRADIENT,
  gradientCss,
  gradientFullCss,
  gradientHtml,
  gradientVars,
  gradientPreviewStyle,
  gradientKeyframesHtml,
  randomizeGradient,
  reverseGradient
} from '~/utils/generators/gradient'
import type { GradientState, GradientStop } from '~/utils/generators/gradient'
import { hexToHsl, hslToHex } from '~/utils/colors'

function hexToStopPatch(hex: string): Partial<GradientStop> {
  const { h, s, l } = hexToHsl(hex)
  return { h, s, l }
}

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<GradientState>({
  id: 'gradient',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_GRADIENT)) as GradientState,
  randomize: randomizeGradient
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => gradientFullCss(state.value))
const vars = computed(() => gradientVars(state.value))
const previewStyle = computed(() => gradientPreviewStyle(state.value))
const keyframesStyle = computed(() => gradientKeyframesHtml(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_GRADIENT[i]!.state)) as GradientState
  pushHistory()
}

function reverse() {
  state.value = reverseGradient(state.value)
}

function addStop() {
  const stops = [...state.value.stops]
  const last = stops[stops.length - 1]
  stops.push({ h: last.h, s: last.s, l: last.l, a: 100, pos: Math.min(100, last.pos + 25), locked: false })
  state.value = { ...state.value, stops }
}

function removeStop(i: number) {
  if (state.value.stops.length <= 2) return
  const stops = state.value.stops.filter((_, idx) => idx !== i)
  state.value = { ...state.value, stops }
}

function updateStop(i: number, patch: Partial<GradientStop>) {
  const stops = state.value.stops.map((s, idx) => (idx === i ? { ...s, ...patch } : s))
  state.value = { ...state.value, stops }
}

useSeoMeta({
  title: 'Gradient - CSS Studio',
  description: 'Linear, radial, conic and repeating gradients with color stops and presets.',
  ogTitle: 'Gradient - CSS Studio',
  ogDescription: 'Linear, radial, conic and repeating gradients with color stops and presets.',
  ogUrl: 'https://css-studio.itsash.in/gradient',
  twitterTitle: 'Gradient - CSS Studio',
  twitterDescription: 'Linear, radial, conic and repeating gradients with color stops and presets.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/gradient' }] })
</script>

<template>
  <EditorPageShell
    title="Gradient Generator"
    description="Linear, radial, conic and repeating gradients with color stops and presets."
    :css="css"
    :html="gradientHtml()"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Gradient preview" filename="css-studio-gradient">
        <template #presets>
          <PreviewPresets :presets="PRESETS_GRADIENT" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="keyframesStyle" aria-hidden="true"></div>
        <div class="h-80 w-full max-w-2xl rounded-xl" :style="previewStyle" aria-label="Gradient preview"></div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Type & Direction" icon="ph-drop">
        <SelectControl v-model="state.type" label="Type" :options="GRADIENT_TYPES" />
        <SliderControl v-if="state.type.includes('linear') || state.type.includes('conic')" v-model="state.angle" label="Angle" :min="0" :max="360" suffix="°" />
        <template v-if="state.type.includes('radial') || state.type.includes('conic')">
          <SliderControl v-model="state.pos.x" label="Position X" :min="0" :max="100" suffix="%" />
          <SliderControl v-model="state.pos.y" label="Position Y" :min="0" :max="100" suffix="%" />
        </template>
        <SelectControl v-if="state.type.includes('radial')" v-model="state.shape" label="Shape" :options="[{ value: 'circle', label: 'Circle' }, { value: 'ellipse', label: 'Ellipse' }]" />
        <SelectControl v-if="state.type.includes('radial')" v-model="state.size" label="Size" :options="[{ value: 'closest-side', label: 'Closest Side' }, { value: 'farthest-side', label: 'Farthest Side' }, { value: 'closest-corner', label: 'Closest Corner' }, { value: 'farthest-corner', label: 'Farthest Corner' }]" />
      </ControlGroup>

      <ControlGroup label="Color Stops" icon="ph-palette">
        <div v-for="(stop, i) in state.stops" :key="i" class="flex flex-col gap-2.5 rounded-lg border border-line bg-bg p-3 transition-colors duration-150">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-fg">Stop {{ i + 1 }}</span>
            <div class="flex items-center gap-1">
              <button
                class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-line/30 hover:text-fg"
                :aria-label="`Lock stop ${i + 1}`"
                @click="updateStop(i, { locked: !stop.locked })"
              >
                <Icon :name="stop.locked ? 'ph-lock-simple-fill' : 'ph-lock-simple'" :size="13" />
              </button>
              <button
                class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-rose-500/10 hover:text-rose-400 disabled:opacity-30 disabled:hover:bg-transparent"
                :disabled="state.stops.length <= 2"
                :aria-label="`Remove stop ${i + 1}`"
                @click="removeStop(i)"
              >
                <Icon name="ph-x" :size="13" />
              </button>
            </div>
          </div>
          <ColorControl :model-value="hslToHex({ h: stop.h, s: stop.s, l: stop.l })" :label="`Stop ${i + 1} color`" @update:model-value="(v) => updateStop(i, hexToStopPatch(v))" />
          <SliderControl :model-value="stop.pos" label="Position" :min="0" :max="100" suffix="%" @update:model-value="(v) => updateStop(i, { pos: v })" />
          <SliderControl :model-value="stop.a" label="Alpha" :min="0" :max="100" @update:model-value="(v) => updateStop(i, { a: v })" />
        </div>
        <button
          class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-dashed border-line text-xs font-medium text-muted transition-[color,border-color] duration-150 hover:border-accent/60 hover:text-fg"
          @click="addStop"
        >
          <Icon name="ph-plus" :size="13" /> Add stop
        </button>
        <button
          class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg text-xs text-muted transition-colors duration-150 hover:text-fg"
          @click="reverse"
        >
          <Icon name="ph-arrows-left-right" :size="13" /> Reverse gradient
        </button>
      </ControlGroup>

      <ControlGroup label="Animation" icon="ph-sparkle">
        <ToggleControl v-model="state.animate" label="Animate gradient" />
        <template v-if="state.animate">
          <SelectControl
            v-model="state.animationKind"
            label="Animation type"
            :options="[
              { value: 'pan', label: 'Pan' },
              { value: 'rotate', label: 'Hue Rotate' },
              { value: 'pulse', label: 'Pulse' },
              { value: 'shift', label: 'Shift' }
            ]"
          />
          <SliderControl v-model="state.animationDuration" label="Duration" :min="1" :max="15" :step="0.5" suffix="s" />
          <SelectControl
            v-model="state.animationDirection"
            label="Direction"
            :options="[
              { value: 'normal', label: 'Normal' },
              { value: 'alternate', label: 'Alternate' },
              { value: 'reverse', label: 'Reverse' },
              { value: 'alternate-reverse', label: 'Alternate Reverse' }
            ]"
          />
        </template>
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="gradientHtml()" :vars="vars" filename="css-studio-gradient" />
    </template>
  </EditorPageShell>
</template>
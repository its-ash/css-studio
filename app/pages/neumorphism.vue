<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_NEUMORPH,
  PRESETS_NEUMORPH,
  NEU_LAYOUTS,
  NEU_SHAPES,
  neumorphCss,
  neumorphHtml,
  neumorphVars,
  neuShades,
  normalizeNeumorph,
  randomizeNeumorph
} from '~/utils/generators/neumorph'
import type { NeumorphicState } from '~/utils/generators/neumorph'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<NeumorphicState>({
  id: 'neumorphism',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_NEUMORPH)) as NeumorphicState,
  randomize: randomizeNeumorph,
  deserialize: (raw) => normalizeNeumorph(raw as unknown as NeumorphicState)
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => neumorphCss(state.value))
const html = computed(() => neumorphHtml(state.value))
const vars = computed(() => neumorphVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)
const shades = computed(() => neuShades(normalizeNeumorph(state.value)))

/** Switching shades to manual starts from the current auto values instead of stale ones. */
watch(
  () => state.value.autoShades,
  (auto) => {
    if (!auto) state.value = { ...state.value, ...shades.value }
  }
)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_NEUMORPH[i]!.state)) as NeumorphicState
  pushHistory()
}

const variants = computed(() => PRESETS_NEUMORPH.map((p) => ({ name: p.name, css: neumorphCss(p.state), html: neumorphHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Neumorphism Generator"
    description="Soft-UI surfaces with flat, concave, convex and pressed shapes lit from one light source."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" title="Neumorphism preview" filename="css-studio-neumorphism" @apply-variant="applyPreset">
        <template #presets>
          <PreviewPresets :presets="PRESETS_NEUMORPH" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full items-center justify-center p-6" :style="{ background: state.base }">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="w-full max-w-xl" v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Shape" icon="ph-circle-dashed">
        <SelectControl v-model="state.layout" label="Demo layout" :options="NEU_LAYOUTS" />
        <SelectControl v-model="state.shape" label="Surface shape" :options="NEU_SHAPES" />
        <SliderControl v-model="state.radius" label="Corner radius" :min="0" :max="80" suffix="px" />
        <template v-if="state.layout === 'tile' || state.layout === 'thermostat' || state.layout === 'knob'">
          <SliderControl v-model="state.width" label="Width" :min="120" :max="420" suffix="px" />
        </template>
        <SliderControl v-if="state.layout === 'tile'" v-model="state.height" label="Height" :min="120" :max="420" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Light" icon="ph-sun">
        <SliderControl v-model="state.angle" label="Light from (0 = top)" :min="0" :max="359" suffix="°" />
        <SliderControl v-model="state.distance" label="Distance" :min="2" :max="32" suffix="px" />
        <SliderControl v-model="state.blur" label="Blur" :min="4" :max="64" suffix="px" />
        <SliderControl v-model="state.intensity" label="Shadow intensity" :min="4" :max="50" suffix="%" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.base" label="Base" @update:model-value="(v) => (state.base = v)" />
        <ColorControl :model-value="state.accent" label="Accent (active, focus)" @update:model-value="(v) => (state.accent = v)" />
        <ToggleControl v-model="state.autoShades" label="Derive shadows from base" />
        <template v-if="!state.autoShades">
          <ColorControl :model-value="state.light" label="Light shadow" @update:model-value="(v) => (state.light = v)" />
          <ColorControl :model-value="state.dark" label="Dark shadow" @update:model-value="(v) => (state.dark = v)" />
        </template>
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-neumorphism" />
    </template>
  </EditorPageShell>
</template>

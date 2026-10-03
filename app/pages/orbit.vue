<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_ORBIT,
  PRESETS_ORBIT,
  ORBIT_KINDS,
  orbitCss,
  orbitHtml,
  orbitVars,
  randomizeOrbit
} from '~/utils/generators/orbit'
import type { OrbitState } from '~/utils/generators/orbit'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<OrbitState>({
  id: 'orbit',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_ORBIT)) as OrbitState,
  randomize: randomizeOrbit
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => orbitCss(state.value))
const html = computed(() => orbitHtml(state.value))
const vars = computed(() => orbitVars(state.value))
const demoStyle = computed(() => `<style>.orbit-stage { display: grid; place-items: center; width: 100%; height: 100%; } ${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_ORBIT[i]!.state)) as OrbitState
  pushHistory()
}


const variants = computed(() => PRESETS_ORBIT.map((p) => ({ name: p.name, css: orbitCss(p.state), html: orbitHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="3D Orbit Studio"
    description="Cubes, orbits, gyros and spheres — preserve-3d only."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Orbit preview" filename="css-studio-orbit">
        <template #presets>
          <PreviewPresets :presets="PRESETS_ORBIT" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl items-center justify-center">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Motion" icon="ph-orbit">
        <SelectControl v-model="state.kind" label="Type" :options="ORBIT_KINDS" />
        <SliderControl v-model="state.duration" label="Duration" :min="2" :max="20" :step="0.5" suffix="s" />
        <SliderControl v-model="state.size" label="Size" :min="80" :max="200" suffix="px" />
        <SliderControl v-model="state.spinX" label="Tilt" :min="-40" :max="10" suffix="°" />
        <SliderControl v-if="state.kind === 'planet'" v-model="state.satellites" label="Satellites" :min="1" :max="6" />
        <ToggleControl v-model="state.pauseOnHover" label="Pause on hover" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Primary" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.secondary" label="Secondary" @update:model-value="(v) => (state.secondary = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-orbit" />
    </template>
  </EditorPageShell>
</template>
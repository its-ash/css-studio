<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import { DEFAULT_NEUMORPH, PRESETS_NEUMORPH, neumorphCss, neumorphHtml, neumorphPreviewStyle, neumorphVars, randomizeNeumorph } from '~/utils/generators/neumorph'
import type { NeumorphicState } from '~/utils/generators/neumorph'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<NeumorphicState>({
  id: 'neumorphism',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_NEUMORPH)) as NeumorphicState,
  randomize: randomizeNeumorph
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => neumorphCss(state.value))
const vars = computed(() => neumorphVars(state.value))
const style = computed(() => neumorphPreviewStyle(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_NEUMORPH[i]!.state)) as NeumorphicState
  pushHistory()
}

useHead({ title: 'Neumorphism - CSS Studio' })
</script>

<template>
  <EditorPageShell
    title="Neumorphism Generator"
    description="Soft-UI dual shadows computed from a virtual light source."
    :css="css"
    :html="neumorphHtml()"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Neumorphism preview" filename="css-studio-neumorphism">
        <template #presets>
          <PreviewPresets :presets="PRESETS_NEUMORPH" @apply="applyPreset" />
        </template>
        <div
          class="flex h-[420px] w-full max-w-3xl items-center justify-center rounded-xl"
          :style="{ backgroundColor: state.base }"
        >
          <div :style="style" aria-label="Neumorphic shape preview"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Surface" icon="ph-circle-dashed">
        <ColorControl :model-value="state.base" label="Base color" @update:model-value="(v) => (state.base = v)" />
        <ColorControl :model-value="state.light" label="Light shadow" @update:model-value="(v) => (state.light = v)" />
        <ColorControl :model-value="state.dark" label="Dark shadow" @update:model-value="(v) => (state.dark = v)" />
      </ControlGroup>

      <ControlGroup label="Light & Depth" icon="ph-sun">
        <SliderControl v-model="state.angle" label="Light angle" :min="0" :max="360" suffix="°" />
        <SliderControl v-model="state.distance" label="Distance" :min="2" :max="32" suffix="px" />
        <SliderControl v-model="state.blur" label="Blur" :min="4" :max="64" suffix="px" />
        <SliderControl v-model="state.radius" label="Border radius" :min="0" :max="80" suffix="px" />
        <SliderControl v-model="state.intensity" label="Intensity" :min="10" :max="100" suffix="%" />
        <ToggleControl v-model="state.inset" label="Inset" />
        <SliderControl v-model="state.width" label="Width" :min="80" :max="480" suffix="px" />
        <SliderControl v-model="state.height" label="Height" :min="80" :max="480" suffix="px" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="neumorphHtml()" :vars="vars" filename="css-studio-neumorphism" />
    </template>
  </EditorPageShell>
</template>
<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import { DEFAULT_SHAPE, SHAPE_KINDS, PRESETS_SHAPE, shapeCss, shapeStyle, shapeVars, randomizeShape } from '~/utils/generators/shape'
import type { ShapeState } from '~/utils/generators/shape'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<ShapeState>({
  id: 'shape',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_SHAPE)) as ShapeState,
  randomize: randomizeShape
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => shapeCss(state.value))
const vars = computed(() => shapeVars(state.value))
const style = computed(() => shapeStyle(state.value.kind, state.value.size, state.value.color, state.value.radius))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_SHAPE[i]!.state)) as ShapeState
  pushHistory()
}

useHead({ title: 'Shape - CSS Studio' })
</script>

<template>
  <EditorPageShell
    title="CSS Shape Generator"
    description="16 pure-CSS shapes using border tricks, clip-path and border-radius."
    :css="css"
    :html="`<div class=&quot;shape&quot;></div>`"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Shape preview" filename="css-studio-shape">
        <template #presets>
          <PreviewPresets :presets="PRESETS_SHAPE" @apply="applyPreset" />
        </template>
        <div class="flex h-[420px] w-full max-w-3xl items-center justify-center">
          <div :style="style" aria-label="Shape preview"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Shape" icon="ph-triangle">
        <SelectControl v-model="state.kind" label="Kind" :options="SHAPE_KINDS" />
        <SliderControl v-model="state.size" label="Size" :min="24" :max="400" suffix="px" />
        <SliderControl v-if="state.kind === 'speech-bubble'" v-model="state.radius" label="Corner radius" :min="0" :max="48" suffix="px" />
        <ColorControl :model-value="state.color" label="Fill color" @update:model-value="(v) => (state.color = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" html="<div class=&quot;shape&quot;></div>" :vars="vars" filename="css-studio-shape" />
    </template>
  </EditorPageShell>
</template>
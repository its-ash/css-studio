<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_PATTERN,
  PATTERN_KINDS,
  PRESETS_PATTERN,
  patternFullCss,
  patternPreviewStyle,
  patternVars,
  randomizePattern
} from '~/utils/generators/pattern'
import type { PatternState } from '~/utils/generators/pattern'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<PatternState>({
  id: 'pattern',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_PATTERN)) as PatternState,
  randomize: randomizePattern
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => patternFullCss(state.value))
const vars = computed(() => patternVars(state.value))
const style = computed(() => patternPreviewStyle(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_PATTERN[i]!.state)) as PatternState
  pushHistory()
}

useHead({ title: 'Pattern - CSS Studio' })
</script>

<template>
  <EditorPageShell
    title="Pattern Generator"
    description="12 tileable CSS-only patterns from repeating gradients."
    :css="css"
    :html="`<div class=&quot;pattern&quot;></div>`"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Pattern preview" filename="css-studio-pattern">
        <template #presets>
          <PreviewPresets :presets="PRESETS_PATTERN" @apply="applyPreset" />
        </template>
        <div class="h-80 w-full max-w-2xl rounded-xl" :style="style" aria-label="Pattern preview"></div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Pattern" icon="ph-grid-four">
        <SelectControl v-model="state.kind" label="Kind" :options="PATTERN_KINDS" />
        <SliderControl v-model="state.size" label="Tile size" :min="4" :max="80" suffix="px" />
        <SliderControl v-model="state.spacing" label="Spacing" :min="0" :max="40" suffix="px" />
        <SliderControl v-model="state.thickness" label="Thickness" :min="1" :max="12" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.color" label="Pattern color" @update:model-value="(v) => (state.color = v)" />
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
        <SliderControl v-model="state.opacity" label="Opacity" :min="10" :max="100" suffix="%" />
        <SliderControl v-model="state.rotation" label="Rotation" :min="0" :max="360" suffix="°" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" html="<div class=&quot;pattern&quot;></div>" :vars="vars" filename="css-studio-pattern" />
    </template>
  </EditorPageShell>
</template>
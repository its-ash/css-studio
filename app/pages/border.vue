<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_BORDER,
  PRESETS_BORDER,
  borderCss,
  borderHtml,
  borderVars,
  borderPreviewStyle,
  borderKeyframesHtml,
  randomizeBorder
} from '~/utils/generators/border'
import type { BorderState } from '~/utils/generators/border'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<BorderState>({
  id: 'border',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_BORDER)) as BorderState,
  randomize: randomizeBorder
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => borderCss(state.value))
const vars = computed(() => borderVars(state.value))
const style = computed(() => borderPreviewStyle(state.value))
const keyframesStyle = computed(() => borderKeyframesHtml(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_BORDER[i]!.state)) as BorderState
  pushHistory()
}

useHead({ title: 'Border - CSS Studio' })
</script>

<template>
  <EditorPageShell
    title="Border Generator"
    description="Solid, gradient, animated, and glow borders with per-side and corner controls."
    :css="css"
    :html="borderHtml()"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Border preview" filename="css-studio-border">
        <template #presets>
          <PreviewPresets :presets="PRESETS_BORDER" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="keyframesStyle" aria-hidden="true"></div>
        <div class="flex h-[400px] w-full max-w-2xl items-center justify-center">
          <div class="h-48 w-72" :style="style" aria-label="Border preview"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Border" icon="ph-square">
        <SelectControl
          v-model="state.effect"
          label="Effect"
          :options="[
            { value: 'none', label: 'Plain' },
            { value: 'gradient', label: 'Gradient' },
            { value: 'animated', label: 'Animated Gradient' },
            { value: 'glow', label: 'Glow' }
          ]"
        />
        <template v-if="state.effect === 'none' || state.effect === 'glow'">
          <SelectControl
            v-model="state.style"
            label="Style"
            :options="[
              { value: 'solid', label: 'Solid' },
              { value: 'dashed', label: 'Dashed' },
              { value: 'dotted', label: 'Dotted' },
              { value: 'double', label: 'Double' }
            ]"
          />
        </template>
        <SliderControl v-model="state.width" label="Width" :min="1" :max="12" suffix="px" />
        <ColorControl :model-value="state.color" label="Border color" @update:model-value="(v) => state.color = v" />
        <ColorControl :model-value="state.surface" label="Surface" @update:model-value="(v) => state.surface = v" />
      </ControlGroup>

      <ControlGroup v-if="state.effect === 'gradient' || state.effect === 'animated'" label="Gradient" icon="ph-drop">
        <ColorControl :model-value="state.gradientFrom" label="From" @update:model-value="(v) => state.gradientFrom = v" />
        <ColorControl :model-value="state.gradientTo" label="To" @update:model-value="(v) => state.gradientTo = v" />
        <SliderControl v-model="state.gradientAngle" label="Angle" :min="0" :max="360" suffix="°" />
      </ControlGroup>

      <ControlGroup v-if="state.effect === 'glow'" label="Glow" icon="ph-sparkle">
        <ColorControl :model-value="state.glowColor" label="Glow color" @update:model-value="(v) => state.glowColor = v" />
        <SliderControl v-model="state.glowBlur" label="Glow blur" :min="0" :max="60" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Corners" icon="ph-rectangle">
        <ToggleControl v-model="state.individualCorners" label="Individual corners" />
        <template v-if="state.individualCorners">
          <SliderControl v-model="state.radiusTL" label="Top Left" :min="0" :max="48" suffix="px" />
          <SliderControl v-model="state.radiusTR" label="Top Right" :min="0" :max="48" suffix="px" />
          <SliderControl v-model="state.radiusBR" label="Bottom Right" :min="0" :max="48" suffix="px" />
          <SliderControl v-model="state.radiusBL" label="Bottom Left" :min="0" :max="48" suffix="px" />
        </template>
        <template v-else>
          <SliderControl v-model="state.radius" label="Border radius" :min="0" :max="999" suffix="px" />
        </template>
      </ControlGroup>

      <ControlGroup label="Per-Side Width" icon="ph-rectangle">
        <ToggleControl v-model="state.perSide" label="Individual sides" />
        <template v-if="state.perSide">
          <SliderControl v-model="state.widthT" label="Top" :min="0" :max="12" suffix="px" />
          <SliderControl v-model="state.widthR" label="Right" :min="0" :max="12" suffix="px" />
          <SliderControl v-model="state.widthB" label="Bottom" :min="0" :max="12" suffix="px" />
          <SliderControl v-model="state.widthL" label="Left" :min="0" :max="12" suffix="px" />
        </template>
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="borderHtml()" :vars="vars" filename="css-studio-border" />
    </template>
  </EditorPageShell>
</template>
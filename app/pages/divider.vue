<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_DIVIDER,
  PRESETS_DIVIDER,
  DIVIDER_KINDS,
  dividerCss,
  dividerHtml,
  dividerPreviewStyle,
  dividerVars,
  randomizeDivider
} from '~/utils/generators/divider'
import type { DividerState } from '~/utils/generators/divider'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<DividerState>({
  id: 'divider',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_DIVIDER)) as DividerState,
  randomize: randomizeDivider
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => dividerCss(state.value))
const html = computed(() => dividerHtml())
const vars = computed(() => dividerVars(state.value))
const style = computed(() => dividerPreviewStyle(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_DIVIDER[i]!.state)) as DividerState
  pushHistory()
}

useHead({ title: 'Divider - CSS Studio' })
</script>

<template>
  <EditorPageShell
    title="Divider Generator"
    description="Gradient-fade, dashed, dotted, double and zigzag section dividers."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Divider preview" filename="css-studio-divider">
        <template #presets>
          <PreviewPresets :presets="PRESETS_DIVIDER" @apply="applyPreset" />
        </template>
        <div class="flex h-[420px] w-full max-w-3xl flex-col items-center justify-center gap-6 p-6">
          <div class="text-sm text-muted">Section above</div>
          <hr class="border-0" :style="style" aria-label="Divider preview" />
          <div class="text-sm text-muted">Section below</div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Divider" icon="ph-ruler">
        <SelectControl v-model="state.kind" label="Type" :options="DIVIDER_KINDS" />
        <ColorControl :model-value="state.color" label="Color" @update:model-value="(v) => (state.color = v)" />
        <SliderControl v-model="state.width" label="Width" :min="80" :max="600" suffix="px" />
        <SliderControl
          v-if="state.kind !== 'zigzag'"
          v-model="state.thickness"
          label="Thickness"
          :min="1"
          :max="8"
          suffix="px"
        />
        <SliderControl v-if="state.kind === 'zigzag'" v-model="state.zigzagSize" label="Zigzag size" :min="6" :max="30" suffix="px" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-divider" />
    </template>
  </EditorPageShell>
</template>

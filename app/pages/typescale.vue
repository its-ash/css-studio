<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_TYPESCALE,
  PRESETS_TYPESCALE,
  typeScaleCss,
  typeScaleHtml,
  typeScaleVars,
  typeScalePreviewSizes,
  randomizeTypeScale
} from '~/utils/generators/typescale'
import type { TypeScaleState } from '~/utils/generators/typescale'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<TypeScaleState>({
  id: 'typescale',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_TYPESCALE)) as TypeScaleState,
  randomize: randomizeTypeScale
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => typeScaleCss(state.value))
const html = computed(() => typeScaleHtml(state.value))
const vars = computed(() => typeScaleVars(state.value))
const sizes = computed(() => typeScalePreviewSizes(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_TYPESCALE[i]!.state)) as TypeScaleState
  pushHistory()
}

useHead({ title: 'Type Scale - CSS Studio' })
</script>

<template>
  <EditorPageShell
    title="Type Scale Generator"
    description="Fluid clamp() typography scale from a min/max viewport and ratio."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Type scale preview" filename="css-studio-typescale">
        <template #presets>
          <PreviewPresets :presets="PRESETS_TYPESCALE" @apply="applyPreset" />
        </template>
        <div class="flex h-[420px] w-full max-w-2xl flex-col justify-center gap-3 overflow-y-auto p-6">
          <div v-for="step in sizes" :key="step.name" class="flex items-baseline gap-3">
            <span class="w-12 shrink-0 font-mono text-[10px] text-muted">{{ step.label }}</span>
            <span class="truncate font-semibold text-fg" :style="{ fontSize: step.clamp }">Aa Bb Cc</span>
            <span class="ml-auto shrink-0 font-mono text-[10px] text-muted">{{ step.minPx }}–{{ step.maxPx }}px</span>
          </div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Viewport" icon="ph-device-tablet">
        <SliderControl v-model="state.minViewport" label="Min viewport" :min="320" :max="768" suffix="px" />
        <SliderControl v-model="state.maxViewport" label="Max viewport" :min="960" :max="1920" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Scale" icon="ph-text-t">
        <SliderControl v-model="state.minBase" label="Min base size" :min="12" :max="20" suffix="px" />
        <SliderControl v-model="state.maxBase" label="Max base size" :min="14" :max="24" suffix="px" />
        <SliderControl v-model="state.minRatio" label="Min ratio" :min="1.1" :max="1.8" :step="0.01" />
        <SliderControl v-model="state.maxRatio" label="Max ratio" :min="1.1" :max="1.8" :step="0.01" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-typescale" />
    </template>
  </EditorPageShell>
</template>

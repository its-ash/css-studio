<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_SKELETON,
  PRESETS_SKELETON,
  SKELETON_SKINS,
  SKELETON_LAYOUTS,
  skeletonCss,
  skeletonHtml,
  skeletonVars,
  randomizeSkeleton
} from '~/utils/generators/skeleton'
import type { SkeletonState } from '~/utils/generators/skeleton'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<SkeletonState>({
  id: 'skeleton',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_SKELETON)) as SkeletonState,
  randomize: randomizeSkeleton
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => skeletonCss(state.value))
const html = computed(() => skeletonHtml(state.value))
const vars = computed(() => skeletonVars(state.value))
const demoStyle = computed(() => `<style>.preview-skeleton { display: grid; place-items: center; height: 100%; overflow: auto; } ${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_SKELETON[i]!.state)) as SkeletonState
  pushHistory()
}


const variants = computed(() => PRESETS_SKELETON.map((p) => ({ name: p.name, css: skeletonCss(p.state), html: skeletonHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Skeleton Loaders"
    description="Shimmer, wave and pulse loading placeholders."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Skeleton preview" filename="css-studio-skeleton">
        <template #presets>
          <PreviewPresets :presets="PRESETS_SKELETON" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="preview-skeleton h-full w-full">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Skeleton" icon="ph-spiral">
        <SelectControl v-model="state.skin" label="Skin" :options="SKELETON_SKINS" />
        <SelectControl v-model="state.layout" label="Layout" :options="SKELETON_LAYOUTS" />
        <SliderControl v-if="state.layout !== 'card'" v-model="state.rows" label="Rows" :min="2" :max="6" />
        <SliderControl v-model="state.duration" label="Duration" :min="600" :max="3000" :step="50" suffix="ms" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="20" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.baseColor" label="Base" @update:model-value="(v) => (state.baseColor = v)" />
        <ColorControl :model-value="state.accent" label="Highlight" @update:model-value="(v) => (state.accent = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-skeleton" />
    </template>
  </EditorPageShell>
</template>
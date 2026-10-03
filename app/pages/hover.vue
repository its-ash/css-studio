<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_HOVER,
  PRESETS_HOVER,
  HOVER_KINDS,
  hoverCss,
  hoverHtml,
  hoverVars,
  randomizeHover
} from '~/utils/generators/hover'
import type { HoverState } from '~/utils/generators/hover'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<HoverState>({
  id: 'hover',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_HOVER)) as HoverState,
  randomize: randomizeHover
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => hoverCss(state.value))
const html = computed(() => hoverHtml())
const vars = computed(() => hoverVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_HOVER[i]!.state)) as HoverState
  pushHistory()
}


const variants = computed(() => PRESETS_HOVER.map((p) => ({ name: p.name, css: hoverCss(p.state), html: hoverHtml() })))
</script>

<template>
  <EditorPageShell
    title="Hover Effects"
    description="Pure-CSS hover micro-interactions for buttons and cards."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Hover preview" filename="css-studio-hover">
        <template #presets>
          <PreviewPresets :presets="PRESETS_HOVER" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl flex-col items-center justify-center gap-8 p-6">
          <button class="hover-demo" type="button" aria-label="Hover effect preview">Hover me</button>
          <p class="max-w-xs text-center text-[11px] text-muted">Move your cursor over the button to preview the {{ state.kind.replace('-', ' ') }} effect.</p>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Effect" icon="ph-cursor-click">
        <SelectControl v-model="state.kind" label="Type" :options="HOVER_KINDS" />
        <SliderControl v-model="state.duration" label="Duration" :min="80" :max="600" :step="10" suffix="ms" />
        <SliderControl v-model="state.distance" label="Intensity" :min="2" :max="12" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="24" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Accent" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
        <ColorControl :model-value="state.textColor" label="Text" @update:model-value="(v) => (state.textColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-hover" />
    </template>
  </EditorPageShell>
</template>
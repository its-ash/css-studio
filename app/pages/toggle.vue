<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_TOGGLE,
  PRESETS_TOGGLE,
  TOGGLE_KINDS,
  toggleCss,
  toggleHtml,
  toggleVars,
  randomizeToggle
} from '~/utils/generators/toggle'
import type { ToggleState } from '~/utils/generators/toggle'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<ToggleState>({
  id: 'toggle',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_TOGGLE)) as ToggleState,
  randomize: randomizeToggle
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => toggleCss(state.value))
const html = computed(() => toggleHtml(state.value))
const vars = computed(() => toggleVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_TOGGLE[i]!.state)) as ToggleState
  pushHistory()
}


const variants = computed(() => PRESETS_TOGGLE.map((p) => ({ name: p.name, css: toggleCss(p.state), html: toggleHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Toggle & Checkbox Studio"
    description="Custom switches, checkboxes, radios and skeletons — no JS."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Toggle preview" filename="css-studio-toggle">
        <template #presets>
          <PreviewPresets :presets="PRESETS_TOGGLE" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl flex-col items-center justify-center gap-8 p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
          <p class="max-w-xs text-center text-[11px] text-muted">Click the control to toggle it. Tab to it to check focus styles.</p>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Control" icon="ph-toggle-left">
        <SelectControl v-model="state.kind" label="Type" :options="TOGGLE_KINDS" />
        <SliderControl v-model="state.width" label="Width" :min="20" :max="60" suffix="px" />
        <SliderControl v-if="state.kind === 'switch'" v-model="state.height" label="Height" :min="14" :max="36" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="999" suffix="px" />
        <ToggleControl v-model="state.glow" label="Glow when active" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Active color" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.offTrack" label="Off / border" @update:model-value="(v) => (state.offTrack = v)" />
        <ColorControl :model-value="state.knob" label="Knob / check" @update:model-value="(v) => (state.knob = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-toggle" />
    </template>
  </EditorPageShell>
</template>
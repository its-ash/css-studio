<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_TERMINAL,
  PRESETS_TERMINAL,
  TERMINAL_SKINS,
  terminalCss,
  terminalHtml,
  terminalVars,
  randomizeTerminal
} from '~/utils/generators/terminal'
import type { TerminalState } from '~/utils/generators/terminal'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<TerminalState>({
  id: 'terminal',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_TERMINAL)) as TerminalState,
  randomize: randomizeTerminal
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => terminalCss(state.value))
const html = computed(() => terminalHtml(state.value))
const vars = computed(() => terminalVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_TERMINAL[i]!.state)) as TerminalState
  pushHistory()
}


const variants = computed(() => PRESETS_TERMINAL.map((p) => ({ name: p.name, css: terminalCss(p.state), html: terminalHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Terminal Window"
    description="macOS-style terminal mockups — traffic lights included."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Terminal preview" filename="css-studio-terminal">
        <template #presets>
          <PreviewPresets :presets="PRESETS_TERMINAL" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-3xl items-center justify-center p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Window" icon="ph-terminal-window">
        <SelectControl v-model="state.skin" label="Skin" :options="TERMINAL_SKINS" />
        <TextControl v-model="state.title" label="Title" />
        <SliderControl v-model="state.fontSize" label="Font size" :min="10" :max="18" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="24" suffix="px" />
        <ToggleControl v-model="state.showGrid" label="Background grid" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.bg" label="Body" @update:model-value="(v) => (state.bg = v)" />
        <ColorControl :model-value="state.titleBar" label="Title bar" @update:model-value="(v) => (state.titleBar = v)" />
        <ColorControl :model-value="state.promptColor" label="Prompt" @update:model-value="(v) => (state.promptColor = v)" />
        <ColorControl :model-value="state.commandColor" label="Command" @update:model-value="(v) => (state.commandColor = v)" />
        <ColorControl :model-value="state.outputColor" label="Output" @update:model-value="(v) => (state.outputColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-terminal" />
    </template>
  </EditorPageShell>
</template>
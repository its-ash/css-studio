<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_TABLE,
  PRESETS_TABLE,
  TABLE_SKINS,
  tableCss,
  tableHtml,
  tableVars,
  randomizeTable
} from '~/utils/generators/table'
import type { TableState } from '~/utils/generators/table'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<TableState>({
  id: 'table',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_TABLE)) as TableState,
  randomize: randomizeTable
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => tableCss(state.value))
const html = computed(() => tableHtml())
const vars = computed(() => tableVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_TABLE[i]!.state)) as TableState
  pushHistory()
}


const variants = computed(() => PRESETS_TABLE.map((p) => ({ name: p.name, css: tableCss(p.state), html: tableHtml() })))
</script>

<template>
  <EditorPageShell
    title="Table Styles"
    description="Zebra rows, sticky headers, rounded frames and glow."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Table preview" filename="css-studio-table">
        <template #presets>
          <PreviewPresets :presets="PRESETS_TABLE" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl items-start justify-center overflow-y-auto p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Table" icon="ph-table">
        <SelectControl v-model="state.skin" label="Skin" :options="TABLE_SKINS" />
        <SliderControl v-model="state.fontSize" label="Font size" :min="11" :max="17" suffix="px" />
        <SliderControl v-model="state.paddingY" label="Row padding" :min="6" :max="20" suffix="px" />
        <SliderControl v-model="state.radius" label="Frame radius" :min="0" :max="20" suffix="px" />
        <ToggleControl v-model="state.rowHover" label="Hover highlight" />
        <ToggleControl v-model="state.stickyHeader" label="Sticky header" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Accent" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
        <ColorControl :model-value="state.textColor" label="Text" @update:model-value="(v) => (state.textColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-table" />
    </template>
  </EditorPageShell>
</template>
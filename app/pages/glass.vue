<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_GLASS,
  PRESETS_GLASS,
  GLASS_BACKDROPS,
  GLASS_INKS,
  GLASS_LAYOUTS,
  GLASS_STYLES,
  glassCss,
  glassHtml,
  glassVars,
  normalizeGlass,
  randomizeGlass
} from '~/utils/generators/glass'
import type { GlassState } from '~/utils/generators/glass'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<GlassState>({
  id: 'glass',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_GLASS)) as GlassState,
  randomize: randomizeGlass,
  deserialize: (raw) => normalizeGlass(raw as unknown as GlassState)
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => glassCss(state.value))
const html = computed(() => glassHtml(state.value))
const vars = computed(() => glassVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_GLASS[i]!.state)) as GlassState
  pushHistory()
}

const variants = computed(() => PRESETS_GLASS.map((p) => ({ name: p.name, css: glassCss(p.state), html: glassHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Glassmorphism Generator"
    description="Frosted, liquid, acrylic and clear glass components over photo and colour backdrops."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" title="Glass preview" filename="css-studio-glass" @apply-variant="applyPreset">
        <template #presets>
          <PreviewPresets :presets="PRESETS_GLASS" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full items-center justify-center p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="w-full max-w-3xl" v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Component" icon="ph-layout">
        <SelectControl v-model="state.layout" label="Layout" :options="GLASS_LAYOUTS" />
        <SelectControl v-model="state.backdrop" label="Backdrop" :options="GLASS_BACKDROPS" />
        <SliderControl v-model="state.width" label="Width" :min="260" :max="720" :step="10" suffix="px" />
        <SliderControl v-model="state.radius" label="Corner radius" :min="0" :max="48" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Glass" icon="ph-drop-half">
        <SelectControl v-model="state.style" label="Material" :options="GLASS_STYLES" />
        <ColorControl :model-value="state.tint" label="Tint" @update:model-value="(v) => (state.tint = v)" />
        <SliderControl v-model="state.tintOpacity" label="Tint opacity" :min="0" :max="80" suffix="%" />
        <SliderControl v-model="state.blur" label="Backdrop blur" :min="0" :max="48" suffix="px" />
        <SliderControl v-model="state.saturate" label="Saturate" :min="50" :max="250" suffix="%" />
        <SliderControl v-model="state.brightness" label="Brightness" :min="50" :max="160" suffix="%" />
        <SliderControl v-model="state.grain" label="Grain" :min="0" :max="80" suffix="%" />
      </ControlGroup>

      <ControlGroup label="Edges & depth" icon="ph-square-half">
        <SliderControl v-if="state.style !== 'liquid'" v-model="state.border" label="Border opacity" :min="0" :max="100" suffix="%" />
        <ToggleControl v-if="state.style !== 'liquid'" v-model="state.edgeHighlight" label="Edge highlight" />
        <SliderControl v-model="state.shadow" label="Shadow" :min="0" :max="100" suffix="%" />
      </ControlGroup>

      <ControlGroup label="Content" icon="ph-palette">
        <SelectControl v-model="state.ink" label="Text color" :options="GLASS_INKS" />
        <ColorControl :model-value="state.accent" label="Button accent" @update:model-value="(v) => (state.accent = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-glass" />
    </template>
  </EditorPageShell>
</template>

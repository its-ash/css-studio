<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_SHADOW,
  PRESETS_SHADOW,
  SHADOW_MODES,
  normalizeShadow,
  randomizeShadow,
  shadowCss,
  shadowHtml,
  shadowVars,
  smoothLayers
} from '~/utils/generators/shadow'
import type { ShadowState } from '~/utils/generators/shadow'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<ShadowState>({
  id: 'shadow',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_SHADOW)) as ShadowState,
  randomize: randomizeShadow,
  deserialize: (raw) => normalizeShadow(raw as unknown as ShadowState)
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => shadowCss(state.value))
const html = computed(() => shadowHtml(state.value))
const vars = computed(() => shadowVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_SHADOW[i]!.state)) as ShadowState
  pushHistory()
}

/** Turns the current auto-generated stack into editable layers. */
function detach() {
  state.value = { ...state.value, mode: 'custom', layers: smoothLayers(normalizeShadow(state.value)) }
  pushHistory()
}

function addLayer() {
  state.value = { ...state.value, layers: [...state.value.layers, { x: 0, y: 10, blur: 20, spread: 0, color: '#00000040', inset: false }] }
}

function removeLayer(i: number) {
  if (state.value.layers.length <= 1) return
  state.value = { ...state.value, layers: state.value.layers.filter((_, idx) => idx !== i) }
}

function updateLayer(i: number, patch: Partial<ShadowState['layers'][number]>) {
  state.value = { ...state.value, layers: state.value.layers.map((l, idx) => (idx === i ? { ...l, ...patch } : l)) }
}

const variants = computed(() => PRESETS_SHADOW.map((p) => ({ name: p.name, css: shadowCss(p.state), html: shadowHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Shadow Generator"
    description="Smooth layered box shadows, custom shadow stacks and text shadows."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" title="Shadow preview" filename="css-studio-shadow" @apply-variant="applyPreset">
        <template #presets>
          <PreviewPresets :presets="PRESETS_SHADOW" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full items-center justify-center p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="w-full max-w-2xl" v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Type" icon="ph-square-half">
        <SelectControl v-model="state.mode" label="Mode" :options="SHADOW_MODES" />
        <TextControl v-if="state.mode === 'text'" v-model="state.text" label="Text" />
        <SliderControl v-else v-model="state.radius" label="Card radius" :min="0" :max="48" suffix="px" />
        <ToggleControl v-if="state.mode !== 'text'" v-model="state.hoverLift" label="Lift on hover" />
      </ControlGroup>

      <ControlGroup v-if="state.mode === 'smooth'" label="Smooth shadow" icon="ph-stack">
        <SliderControl v-model="state.elevation" label="Elevation" :min="2" :max="96" suffix="px" />
        <SliderControl v-model="state.steps" label="Layers" :min="1" :max="8" />
        <SliderControl v-model="state.softness" label="Softness" :min="0.5" :max="4" :step="0.25" suffix="x" />
        <SliderControl v-model="state.darkness" label="Darkness" :min="4" :max="80" suffix="%" />
        <SliderControl v-model="state.angle" label="Light from (0 = top)" :min="0" :max="359" suffix="°" />
        <ColorControl :model-value="state.shadowColor" label="Shadow tint" @update:model-value="(v) => (state.shadowColor = v)" />
        <button
          type="button"
          class="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-line text-xs font-medium text-muted transition-colors duration-150 hover:border-accent/60 hover:text-fg active:scale-[0.98]"
          @click="detach"
        >
          <Icon name="ph-pencil-simple" :size="13" /> Edit as custom layers
        </button>
      </ControlGroup>

      <ControlGroup v-else label="Layers" icon="ph-stack">
        <div v-for="(layer, i) in state.layers" :key="i" class="flex flex-col gap-2.5 rounded-lg border border-line bg-bg p-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-fg">Layer {{ i + 1 }}</span>
            <button
              class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-rose-500/10 hover:text-rose-400 disabled:opacity-30 disabled:hover:bg-transparent"
              :disabled="state.layers.length <= 1"
              :aria-label="`Remove layer ${i + 1}`"
              @click="removeLayer(i)"
            >
              <Icon name="ph-x" :size="13" />
            </button>
          </div>
          <SliderControl :model-value="layer.x" label="X" :min="-60" :max="60" suffix="px" @update:model-value="(v) => updateLayer(i, { x: v })" />
          <SliderControl :model-value="layer.y" label="Y" :min="-60" :max="60" suffix="px" @update:model-value="(v) => updateLayer(i, { y: v })" />
          <SliderControl :model-value="layer.blur" label="Blur" :min="0" :max="160" suffix="px" @update:model-value="(v) => updateLayer(i, { blur: v })" />
          <SliderControl v-if="state.mode === 'custom'" :model-value="layer.spread" label="Spread" :min="-30" :max="60" suffix="px" @update:model-value="(v) => updateLayer(i, { spread: v })" />
          <ColorControl :model-value="layer.color" :label="`Layer ${i + 1} color`" @update:model-value="(v) => updateLayer(i, { color: v })" />
          <ToggleControl v-if="state.mode === 'custom'" :model-value="layer.inset" label="Inset" @update:model-value="(v) => updateLayer(i, { inset: v })" />
        </div>
        <button
          class="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-dashed border-line text-xs font-medium text-muted transition-[color,border-color] duration-150 hover:border-accent/60 hover:text-fg"
          @click="addLayer"
        >
          <Icon name="ph-plus" :size="13" /> Add layer
        </button>
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.surface" :label="state.mode === 'text' ? 'Text color' : 'Card surface'" @update:model-value="(v) => (state.surface = v)" />
        <ColorControl :model-value="state.stage" label="Background" @update:model-value="(v) => (state.stage = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-shadow" />
    </template>
  </EditorPageShell>
</template>

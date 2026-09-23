<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  BLEND_MODES,
  PRESETS_BACKGROUND,
  makeLayer,
  layersBackground,
  layersCss,
  randomizeLayers
} from '~/utils/generators/layers'
import type { Layer, LayerKind } from '~/utils/generators/layers'

const LAYER_KINDS: { value: LayerKind; label: string }[] = [
  { value: 'color', label: 'Solid Color' },
  { value: 'gradient', label: 'Gradient' },
  { value: 'pattern', label: 'Pattern' },
  { value: 'glow', label: 'Glow' },
  { value: 'blur', label: 'Blur Wash' }
]

function defaultLayers(): Layer[] {
  return PRESETS_BACKGROUND[0]!.build()
}

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<{ layers: Layer[] }>({
  id: 'background',
  defaultState: { layers: defaultLayers() },
  randomize: (s, rng) => ({ layers: randomizeLayers(s.layers, rng) })
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => layersCss(state.value.layers))
const style = computed(() => layersBackground(state.value.layers).style)
const html = computed(() => `<div class="layer-stack"></div>`)

function applyPreset(i: number) {
  state.value = { layers: PRESETS_BACKGROUND[i]!.build() }
  pushHistory()
}

function addLayer(kind: LayerKind) {
  state.value = { layers: [...state.value.layers, makeLayer(kind, LAYER_KINDS.find((k) => k.value === kind)?.label ?? kind)] }
  pushHistory()
}

function removeLayer(id: string) {
  if (state.value.layers.length <= 1) return
  state.value = { layers: state.value.layers.filter((l) => l.id !== id) }
  pushHistory()
}

function updateLayer(id: string, patch: Partial<Layer>) {
  state.value = { layers: state.value.layers.map((l) => (l.id === id ? { ...l, ...patch } : l)) }
}

function moveLayer(id: string, dir: -1 | 1) {
  const idx = state.value.layers.findIndex((l) => l.id === id)
  const next = idx + dir
  if (idx < 0 || next < 0 || next >= state.value.layers.length) return
  const layers = [...state.value.layers]
  ;[layers[idx], layers[next]] = [layers[next]!, layers[idx]!]
  state.value = { layers }
  pushHistory()
}

useSeoMeta({
  title: 'Background - CSS Studio',
  description: 'Layered gradients, patterns and glows composited into one background.',
  ogTitle: 'Background - CSS Studio',
  ogDescription: 'Layered gradients, patterns and glows composited into one background.',
  ogUrl: 'https://css-studio.itsash.in/background',
  twitterTitle: 'Background - CSS Studio',
  twitterDescription: 'Layered gradients, patterns and glows composited into one background.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/background' }] })
</script>

<template>
  <EditorPageShell
    title="Background Generator"
    description="Layered gradients, patterns and glows composited into one background."
    :css="css"
    :html="html"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Background preview" filename="css-studio-background">
        <template #presets>
          <PreviewPresets :presets="PRESETS_BACKGROUND" @apply="applyPreset" />
        </template>
        <div class="h-[420px] w-full max-w-3xl rounded-xl" :style="style" aria-label="Background preview"></div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Layers" icon="ph-stack">
        <div v-for="(layer, i) in state.layers" :key="layer.id" class="flex flex-col gap-2.5 rounded-lg border border-line bg-bg p-3 transition-colors duration-150">
          <div class="flex items-center justify-between">
            <span class="truncate text-xs font-medium text-fg">{{ layer.name }} · {{ layer.kind }}</span>
            <div class="flex items-center gap-1">
              <button
                class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-line/30 hover:text-fg disabled:opacity-30 disabled:hover:bg-transparent"
                :disabled="i === 0"
                aria-label="Move layer up"
                @click="moveLayer(layer.id, -1)"
              >
                <Icon name="ph-arrow-up" :size="12" />
              </button>
              <button
                class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-line/30 hover:text-fg disabled:opacity-30 disabled:hover:bg-transparent"
                :disabled="i === state.layers.length - 1"
                aria-label="Move layer down"
                @click="moveLayer(layer.id, 1)"
              >
                <Icon name="ph-arrow-down" :size="12" />
              </button>
              <button
                class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-rose-500/10 hover:text-rose-400 disabled:opacity-30 disabled:hover:bg-transparent"
                :disabled="state.layers.length <= 1"
                :aria-label="`Remove ${layer.name}`"
                @click="removeLayer(layer.id)"
              >
                <Icon name="ph-x" :size="13" />
              </button>
            </div>
          </div>
          <ToggleControl :model-value="layer.visible" label="Visible" @update:model-value="(v) => updateLayer(layer.id, { visible: v })" />
          <ColorControl
            v-if="layer.kind === 'color' || layer.kind === 'glow' || layer.kind === 'blur'"
            :model-value="layer.color"
            label="Color"
            @update:model-value="(v) => updateLayer(layer.id, { color: v })"
          />
          <template v-if="layer.kind === 'glow' || layer.kind === 'blur'">
            <SliderControl :model-value="layer.x" label="X position" :min="0" :max="100" suffix="%" @update:model-value="(v) => updateLayer(layer.id, { x: v })" />
            <SliderControl :model-value="layer.y" label="Y position" :min="0" :max="100" suffix="%" @update:model-value="(v) => updateLayer(layer.id, { y: v })" />
          </template>
          <SliderControl :model-value="layer.opacity" label="Opacity" :min="0" :max="100" suffix="%" @update:model-value="(v) => updateLayer(layer.id, { opacity: v })" />
          <SelectControl
            :model-value="layer.blend"
            label="Blend mode"
            :options="BLEND_MODES.map((b) => ({ value: b, label: b }))"
            @update:model-value="(v) => updateLayer(layer.id, { blend: v })"
          />
        </div>

        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="k in LAYER_KINDS"
            :key="k.value"
            class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-dashed border-line px-2 text-xs text-muted transition-colors duration-150 hover:border-accent/60 hover:text-fg"
            @click="addLayer(k.value)"
          >
            <Icon name="ph-plus" :size="12" /> {{ k.label }}
          </button>
        </div>
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" filename="css-studio-background" />
    </template>
  </EditorPageShell>
</template>

<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import { DEFAULT_SHADOW, PRESETS_SHADOW, shadowCss, shadowHtml, shadowPreviewStyle, shadowVars, randomizeShadow, shadowValue } from '~/utils/generators/shadow'
import type { ShadowState } from '~/utils/generators/shadow'

const colorMode = useColorMode()

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<ShadowState>({
  id: 'shadow',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_SHADOW)) as ShadowState,
  randomize: randomizeShadow
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

/** Light-surface presets that should swap to dark in dark mode. */
const LIGHT_SURFACES = new Set(['#ffffff', '#f8f6f0'])

const displayState = computed<ShadowState>(() => {
  const s = state.value
  if (s.kind !== 'box') return s
  const isDark = colorMode.value === 'dark'
  const surfaceIsLight = LIGHT_SURFACES.has(s.surface.toLowerCase())
  if (isDark && surfaceIsLight) {
    return { ...s, surface: '#1a1a20', textColor: '#f4f4f5' }
  }
  if (!isDark && !surfaceIsLight && s.surface === '#1a1a20') {
    return { ...s, surface: '#ffffff', textColor: '#18181b' }
  }
  return s
})

const css = computed(() => shadowCss(displayState.value))
const vars = computed(() => shadowVars(displayState.value))
const style = computed(() => shadowPreviewStyle(displayState.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_SHADOW[i]!.state)) as ShadowState
  pushHistory()
}

function addLayer() {
  state.value = {
    ...state.value,
    layers: [...state.value.layers, { x: 0, y: 10, blur: 20, spread: 0, color: '#00000040', inset: false }]
  }
}

function removeLayer(i: number) {
  if (state.value.layers.length <= 1) return
  state.value = { ...state.value, layers: state.value.layers.filter((_, idx) => idx !== i) }
}

function updateLayer(i: number, patch: Partial<ShadowState['layers'][number]>) {
  state.value = {
    ...state.value,
    layers: state.value.layers.map((l, idx) => (idx === i ? { ...l, ...patch } : l))
  }
}

useHead({ title: 'Shadow - CSS Studio' })
</script>

<template>
  <EditorPageShell
    title="Shadow Generator"
    description="Layered box and text shadows with inset support."
    :css="css"
    :html="shadowHtml(state)"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Shadow preview" filename="css-studio-shadow">
        <template #presets>
          <PreviewPresets :presets="PRESETS_SHADOW" @apply="applyPreset" />
        </template>
        <div class="flex h-[420px] w-full max-w-3xl items-center justify-center">
          <div v-if="state.kind === 'text'" class="text-6xl font-bold tracking-tight" :style="style" aria-label="Text shadow preview">
            Shadow
          </div>
          <div v-else class="h-40 w-64" :style="style" aria-label="Box shadow preview"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Type" icon="ph-square-half">
        <SelectControl
          v-model="state.kind"
          label="Shadow type"
          :options="[
            { value: 'box', label: 'Box Shadow' },
            { value: 'text', label: 'Text Shadow' }
          ]"
        />
        <template v-if="state.kind === 'box'">
          <SliderControl v-model="state.radius" label="Border radius" :min="0" :max="48" suffix="px" />
          <ColorControl :model-value="state.surface" label="Surface" @update:model-value="(v) => (state.surface = v)" />
        </template>
        <template v-else>
          <ColorControl :model-value="state.textColor" label="Text color" @update:model-value="(v) => (state.textColor = v)" />
        </template>
      </ControlGroup>

      <ControlGroup label="Layers" icon="ph-stack">
        <div v-for="(layer, i) in state.layers" :key="i" class="flex flex-col gap-2 rounded-lg border border-line bg-bg p-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-fg">Layer {{ i + 1 }}</span>
            <button
              class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted hover:text-rose-400 disabled:opacity-30"
              :disabled="state.layers.length <= 1"
              :aria-label="`Remove layer ${i + 1}`"
              @click="removeLayer(i)"
            >
              <Icon name="ph-x" :size="13" />
            </button>
          </div>
          <SliderControl :model-value="layer.x" label="X" :min="-60" :max="60" suffix="px" @update:model-value="(v) => updateLayer(i, { x: v })" />
          <SliderControl :model-value="layer.y" label="Y" :min="-60" :max="60" suffix="px" @update:model-value="(v) => updateLayer(i, { y: v })" />
          <SliderControl :model-value="layer.blur" label="Blur" :min="0" :max="120" suffix="px" @update:model-value="(v) => updateLayer(i, { blur: v })" />
          <SliderControl v-if="state.kind === 'box'" :model-value="layer.spread" label="Spread" :min="-30" :max="60" suffix="px" @update:model-value="(v) => updateLayer(i, { spread: v })" />
          <ColorControl :model-value="layer.color" :label="`Layer ${i + 1} color`" @update:model-value="(v) => updateLayer(i, { color: v })" />
          <ToggleControl v-if="state.kind === 'box'" :model-value="layer.inset" label="Inset" @update:model-value="(v) => updateLayer(i, { inset: v })" />
        </div>
        <button
          class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-dashed border-line text-xs text-muted transition-colors duration-150 hover:border-[var(--color-accent)]/50 hover:text-fg"
          @click="addLayer"
        >
          <Icon name="ph-plus" :size="13" /> Add layer
        </button>
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="shadowHtml(displayState)" :vars="vars" filename="css-studio-shadow" />
    </template>
  </EditorPageShell>
</template>
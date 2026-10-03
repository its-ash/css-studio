<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_FILTER,
  PRESETS_FILTER,
  PHOTO_OPTIONS,
  TINT_BLENDS,
  filterCss,
  filterHtml,
  filterVars,
  normalizeFilter,
  randomizeFilter
} from '~/utils/generators/filter'
import type { FilterState } from '~/utils/generators/filter'
import { photoAlt, photoUrl } from '~/utils/demo'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<FilterState>({
  id: 'filter',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_FILTER)) as FilterState,
  randomize: randomizeFilter,
  deserialize: (raw) => normalizeFilter(raw as unknown as FilterState)
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => filterCss(state.value))
const html = computed(() => filterHtml(state.value))
const vars = computed(() => filterVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

const compare = ref(true)
const split = ref(50)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_FILTER[i]!.state)) as FilterState
  pushHistory()
}

const variants = computed(() => PRESETS_FILTER.map((p) => ({ name: p.name, css: filterCss(p.state), html: filterHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Filter Generator"
    description="Photo filter stacks, tints, duotone and vignette in pure CSS."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" title="Filter preview" filename="css-studio-filter" @apply-variant="applyPreset">
        <template #presets>
          <PreviewPresets :presets="PRESETS_FILTER" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex w-full max-w-2xl flex-col items-center gap-4 p-6">
          <div class="relative w-full" :style="{ maxWidth: '40rem' }">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="html"></div>
            <div
              v-if="compare"
              class="pointer-events-none absolute inset-0 overflow-hidden"
              :style="{ clipPath: `inset(0 ${100 - split}% 0 0)`, borderRadius: `${state.radius}px` }"
            >
              <img :src="photoUrl(state.photo)" :alt="photoAlt(state.photo)" class="block h-full w-full object-cover" />
              <span class="absolute left-3 top-3 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">Original</span>
            </div>
            <div
              v-if="compare"
              class="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_0_1px_rgb(0_0_0/0.2)]"
              :style="{ left: `${split}%` }"
              aria-hidden="true"
            ></div>
          </div>
          <div class="flex w-full items-center gap-3" :style="{ maxWidth: '40rem' }">
            <label class="flex items-center gap-2 text-xs text-muted">
              <input v-model="compare" type="checkbox" class="accent-accent" />
              Compare with original
            </label>
            <input
              v-if="compare"
              v-model.number="split"
              type="range"
              min="0"
              max="100"
              class="flex-1 accent-accent"
              aria-label="Comparison split position"
            />
          </div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Photo" icon="ph-image">
        <SelectControl v-model="state.photo" label="Sample photo" :options="PHOTO_OPTIONS" />
        <SliderControl v-model="state.radius" label="Corner radius" :min="0" :max="40" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Filter stack" icon="ph-funnel">
        <SliderControl v-model="state.brightness" label="Brightness" :min="0" :max="200" suffix="%" />
        <SliderControl v-model="state.contrast" label="Contrast" :min="0" :max="200" suffix="%" />
        <SliderControl v-model="state.saturate" label="Saturate" :min="0" :max="300" suffix="%" />
        <SliderControl v-model="state.grayscale" label="Grayscale" :min="0" :max="100" suffix="%" />
        <SliderControl v-model="state.sepia" label="Sepia" :min="0" :max="100" suffix="%" />
        <SliderControl v-model="state.hueRotate" label="Hue rotate" :min="0" :max="360" suffix="deg" />
        <SliderControl v-model="state.blur" label="Blur" :min="0" :max="20" suffix="px" />
        <SliderControl v-model="state.invert" label="Invert" :min="0" :max="100" suffix="%" />
        <SliderControl v-model="state.opacity" label="Opacity" :min="0" :max="100" suffix="%" />
      </ControlGroup>

      <ControlGroup label="Overlays" icon="ph-drop-half">
        <ToggleControl v-model="state.useDuotone" label="Duotone" hint="Replaces the tint layer" />
        <template v-if="state.useDuotone">
          <ColorControl :model-value="state.duotoneShadow" label="Shadow color" @update:model-value="(v) => (state.duotoneShadow = v)" />
          <ColorControl :model-value="state.duotoneHighlight" label="Highlight color" @update:model-value="(v) => (state.duotoneHighlight = v)" />
        </template>
        <template v-else>
          <ColorControl :model-value="state.tint" label="Tint color" @update:model-value="(v) => (state.tint = v)" />
          <SliderControl v-model="state.tintOpacity" label="Tint strength" :min="0" :max="100" suffix="%" />
          <SelectControl v-model="state.tintBlend" label="Tint blend mode" :options="TINT_BLENDS" />
        </template>
        <SliderControl v-model="state.vignette" label="Vignette" :min="0" :max="100" suffix="%" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-filter" />
    </template>
  </EditorPageShell>
</template>

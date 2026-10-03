<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_CONIC_CHART,
  PRESETS_CONIC_CHART,
  conicChartCss,
  conicChartHtml,
  conicChartVars,
  conicGradient,
  conicTotal,
  randomizeConicChart
} from '~/utils/generators/conicChart'
import type { ConicChartState, ConicSlice } from '~/utils/generators/conicChart'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<ConicChartState>({
  id: 'conic-chart',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_CONIC_CHART)) as ConicChartState,
  randomize: randomizeConicChart
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => conicChartCss(state.value))
const vars = computed(() => conicChartVars(state.value))
const html = computed(() => conicChartHtml(state.value))
const demoStyle = computed(() => `<style>${css.value}\n.conic-legend > span::before { background: var(--legend-color); }</style>`)
const demoHtml = computed(() => html.value)
const gradient = computed(() => conicGradient(state.value))
const total = computed(() => conicTotal(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_CONIC_CHART[i]!.state)) as ConicChartState
  pushHistory()
}

function addSlice() {
  const palette = ['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#f43f5e', '#22d3ee']
  state.value = { ...state.value, slices: [...state.value.slices, { label: `Slice ${state.value.slices.length + 1}`, value: 10, color: palette[state.value.slices.length % palette.length]! }] }
}

function removeSlice(i: number) {
  if (state.value.slices.length <= 1) return
  state.value = { ...state.value, slices: state.value.slices.filter((_, idx) => idx !== i) }
}

function updateSlice(i: number, patch: Partial<ConicSlice>) {
  state.value = { ...state.value, slices: state.value.slices.map((sl, idx) => (idx === i ? { ...sl, ...patch } : sl)) }
}


const variants = computed(() => PRESETS_CONIC_CHART.map((p) => ({ name: p.name, css: conicChartCss(p.state), html: conicChartHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Conic Chart Builder"
    description="Pie and donut charts from conic-gradient — data in, CSS out."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Conic chart preview" filename="css-studio-conic-chart">
        <template #presets>
          <PreviewPresets :presets="PRESETS_CONIC_CHART" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-3xl items-center justify-center p-4">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="demoHtml"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Shape" icon="ph-chart-pie-slice">
        <SliderControl v-model="state.size" label="Diameter" :min="140" :max="400" :step="10" suffix="px" />
        <SliderControl v-model="state.inner" label="Inner hole" :min="0" :max="85" suffix="%" />
        <SliderControl v-model="state.startAngle" label="Start angle" :min="0" :max="360" suffix="°" />
        <SliderControl v-model="state.gap" label="Slice gap" :min="0" :max="6" :step="0.5" suffix="°" />
        <TextControl v-if="state.inner > 0" v-model="state.centerLabel" label="Center label" placeholder="100%" />
      </ControlGroup>

      <ControlGroup label="Slices" icon="ph-puzzle-piece">
        <div v-for="(sl, i) in state.slices" :key="i" class="flex items-center gap-1.5 rounded-lg border border-line bg-bg p-2">
          <span
            class="h-4 w-4 shrink-0 rounded"
            :style="{ background: sl.color }"
            aria-hidden="true"
          ></span>
          <input
            :value="sl.label"
            class="h-7 min-w-0 flex-1 rounded-md border border-line bg-panel px-2 text-xs text-fg transition-colors duration-150 focus:border-accent/60"
            :aria-label="`Slice ${i + 1} label`"
            @input="updateSlice(i, { label: ($event.target as HTMLInputElement).value })"
          />
          <input
            type="number"
            :value="sl.value"
            min="0"
            max="100"
            class="h-7 w-16 rounded-md border border-line bg-panel px-2 font-mono text-xs text-fg"
            :aria-label="`Slice ${i + 1} value`"
            @input="updateSlice(i, { value: Math.max(0, Number(($event.target as HTMLInputElement).value) || 0) })"
          />
          <span class="w-8 text-right font-mono text-[10px] text-muted">{{ Math.round((sl.value / total) * 100) }}%</span>
          <button
            class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-rose-500/10 hover:text-rose-400 disabled:opacity-30"
            :disabled="state.slices.length <= 1"
            :aria-label="`Remove slice ${i + 1}`"
            @click="state = { ...state, slices: state.slices.filter((_, idx) => idx !== i) }"
          >
            <Icon name="ph-x" :size="12" />
          </button>
        </div>
        <div class="flex gap-2">
          <button type="button" class="h-8 flex-1 rounded-lg border border-line text-xs font-medium text-muted transition-colors duration-150 hover:bg-line/15 hover:text-fg" @click="state = { ...state, slices: [...state.slices, { label: `Slice ${state.slices.length + 1}`, value: 10, color: '#52525b' }] }">Add slice</button>
          <button type="button" class="h-8 rounded-lg border border-line px-3 text-xs font-medium text-muted transition-colors duration-150 hover:bg-line/15 hover:text-fg" @click="state = { ...state, slices: state.slices.map((x) => ({ ...x, color: '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0') })) }">Shuffle colors</button>
        </div>
        <p class="font-mono text-[10px] leading-relaxed text-muted">{{ gradient }}</p>
      </ControlGroup>

      <ControlGroup label="Style" icon="ph-palette">
        <ToggleControl v-model="state.legend" label="Legend" />
        <ColorControl :model-value="state.textColor" label="Text" @update:model-value="(v) => (state.textColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-conic-chart" />
    </template>
  </EditorPageShell>
</template>
<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  MARKER_STYLES,
  DEFAULT_MARKER_LIST,
  PRESETS_MARKER_LIST,
  markerListCss,
  markerListHtml,
  markerListVars,
  randomizeMarkerList
} from '~/utils/generators/markerList'
import type { MarkerListState } from '~/utils/generators/markerList'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<MarkerListState>({
  id: 'marker-list',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_MARKER_LIST)) as MarkerListState,
  randomize: randomizeMarkerList
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => markerListCss(state.value))
const vars = computed(() => markerListVars(state.value))
const html = computed(() => markerListHtml(state.value))
const demoStyle = computed(() => `<style>${css.value}\n.marker-list li::before { counter-increment: none; } .marker-list { counter-reset: list-item calc(${state.value.counterStart} - 1); }</style>`)
const demoHtml = computed(() => html.value)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_MARKER_LIST[i]!.state)) as MarkerListState
  pushHistory()
}

function addItem() {
  state.value = { ...state.value, items: [...state.value.items, 'New list item'] }
}

function removeItem(i: number) {
  if (state.value.items.length <= 1) return
  state.value = { ...state.value, items: state.value.items.filter((_, idx) => idx !== i) }
}

function updateItem(i: number, v: string) {
  state.value = { ...state.value, items: state.value.items.map((it, idx) => (idx === i ? v : it)) }
}


const variants = computed(() => PRESETS_MARKER_LIST.map((p) => ({ name: p.name, css: markerListCss(p.state), html: markerListHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="::marker List Builder"
    description="Custom bullets, glyphs and numbered lists in pure CSS."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="List preview" filename="css-studio-marker-list">
        <template #presets>
          <PreviewPresets :presets="PRESETS_MARKER_LIST" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl items-center justify-center p-4">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="demoHtml"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Marker" icon="ph-list-bullets">
        <SelectControl v-model="state.marker" label="Style" :options="MARKER_STYLES" />
        <ColorControl :model-value="state.markerColor" label="Marker color" @update:model-value="(v) => (state.markerColor = v)" />
        <ToggleControl v-model="state.showCounter" label="Show counter" />
        <SliderControl v-if="state.showCounter || state.marker === 'counter'" v-model="state.counterStart" label="Start at" :min="1" :max="99" />
      </ControlGroup>

      <ControlGroup label="Type" icon="ph-text-aa">
        <SliderControl v-model="state.fontSize" label="Font size" :min="11" :max="24" suffix="px" />
        <SliderControl v-model="state.fontWeight" label="Weight" :min="300" :max="800" :step="100" />
        <SliderControl v-model="state.gap" label="Item gap" :min="4" :max="32" suffix="px" />
        <SliderControl v-model="state.padding" label="Padding" :min="8" :max="48" suffix="px" />
        <ColorControl :model-value="state.textColor" label="Text" @update:model-value="(v) => (state.textColor = v)" />
      </ControlGroup>

      <ControlGroup label="Items" icon="ph-list-checks">
        <div v-for="(item, i) in state.items" :key="i" class="flex items-center gap-1.5">
          <input
            :value="item"
            class="h-8 w-full rounded-lg border border-line bg-bg px-2.5 text-xs text-fg transition-colors duration-150 hover:border-line-strong focus:border-accent/60"
            :aria-label="`List item ${i + 1}`"
            @input="updateItem(i, ($event.target as HTMLInputElement).value)"
          />
          <button
            class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-rose-500/10 hover:text-rose-400 disabled:opacity-30"
            :disabled="state.items.length <= 1"
            :aria-label="`Remove item ${i + 1}`"
            @click="removeItem(i)"
          >
            <Icon name="ph-x" :size="13" />
          </button>
        </div>
        <button type="button" class="h-8 w-full rounded-lg border border-line text-xs font-medium text-muted transition-colors duration-150 hover:bg-line/15 hover:text-fg" @click="addItem">Add item</button>
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-marker-list" />
    </template>
  </EditorPageShell>
</template>
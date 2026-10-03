<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_PAGINATION,
  PRESETS_PAGINATION,
  PAGINATION_KINDS,
  paginationCss,
  paginationHtml,
  paginationVars,
  randomizePagination
} from '~/utils/generators/pagination'
import type { PaginationState } from '~/utils/generators/pagination'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<PaginationState>({
  id: 'pagination',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_PAGINATION)) as PaginationState,
  randomize: randomizePagination
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => paginationCss(state.value))
const html = computed(() => paginationHtml(state.value))
const vars = computed(() => paginationVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_PAGINATION[i]!.state)) as PaginationState
  pushHistory()
}


const variants = computed(() => PRESETS_PAGINATION.map((p) => ({ name: p.name, css: paginationCss(p.state), html: paginationHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Pagination Builder"
    description="Dots, arrows, number pills and active glow states."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Pagination preview" filename="css-studio-pagination">
        <template #presets>
          <PreviewPresets :presets="PRESETS_PAGINATION" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl flex-col items-center justify-center gap-8 p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
          <p class="max-w-xs text-center text-[11px] text-muted">Hover the buttons to preview hover states.</p>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Pagination" icon="ph-dots-three">
        <SelectControl v-model="state.kind" label="Style" :options="PAGINATION_KINDS" />
        <SliderControl v-model="state.pages" label="Pages" :min="3" :max="12" />
        <SliderControl v-model="state.active" label="Active page" :min="1" :max="12" />
        <SliderControl v-model="state.size" label="Button size" :min="24" :max="52" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="999" suffix="px" />
        <SliderControl v-model="state.gap" label="Gap" :min="2" :max="16" suffix="px" />
        <ToggleControl v-model="state.glow" label="Glow active" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Active" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.bg" label="Buttons" @update:model-value="(v) => (state.bg = v)" />
        <ColorControl :model-value="state.textColor" label="Text" @update:model-value="(v) => (state.textColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-pagination" />
    </template>
  </EditorPageShell>
</template>
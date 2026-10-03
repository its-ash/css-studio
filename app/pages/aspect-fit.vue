<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  FIT_KINDS,
  RATIO_PRESETS,
  DEFAULT_ASPECT_FIT,
  PRESETS_ASPECT_FIT,
  aspectFitCss,
  aspectFitHtml,
  aspectFitVars,
  aspectRatioValue,
  randomizeAspectFit
} from '~/utils/generators/aspectFit'
import type { AspectFitState } from '~/utils/generators/aspectFit'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<AspectFitState>({
  id: 'aspect-fit',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_ASPECT_FIT)) as AspectFitState,
  randomize: randomizeAspectFit
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => aspectFitCss(state.value))
const vars = computed(() => aspectFitVars(state.value))
const ratio = computed(() => aspectRatioValue(state.value))

/** 8x5 checker SVG placeholder standing in for a real image. */
const imgDataUrl = computed(() => {
  const w = Math.round(state.value.imageWidth)
  const h = Math.round(state.value.imageHeight)
  const cell = Math.max(16, Math.round(Math.min(w, h) / 8))
  let rects = ''
  for (let r = 0; r * cell < h; r++) {
    for (let c = 0; c * cell < w; c++) {
      if ((r + c) % 2 === 0) rects += `<rect x='${c * cell}' y='${r * cell}' width='${cell}' height='${cell}' fill='%233f3f46'/>`
    }
  }
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'%3E%3Crect width='${w}' height='${h}' fill='%2318181b'/%3E%3Cg%3E${rects}%3C/g%3E%3C/svg%3E`
})

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_ASPECT_FIT[i]!.state)) as AspectFitState
  pushHistory()
}

function setRatio(w: number, h: number) {
  state.value.ratioW = w
  state.value.ratioH = h
}


const variants = computed(() => PRESETS_ASPECT_FIT.map((p) => ({ name: p.name, css: aspectFitCss(p.state), html: aspectFitHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Aspect Ratio & Object Fit"
    description="aspect-ratio frames and object-fit behavior, side by side."
    :css="css"
    :html="aspectFitHtml(state)"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Aspect & fit preview" filename="css-studio-aspect-fit">
        <template #presets>
          <PreviewPresets :presets="PRESETS_ASPECT_FIT" @apply="applyPreset" />
        </template>
        <div class="flex h-full w-full max-w-3xl flex-col items-center justify-center gap-4">
          <div class="grid grid-cols-5 gap-2 text-center text-[10px] text-muted">
            <div v-for="f in FIT_KINDS" :key="f.value" class="flex flex-col items-center gap-1.5">
              <div
                class="overflow-hidden border border-line bg-panel"
                :style="{
                  aspectRatio: ratio,
                  width: '88px',
                  borderRadius: `${state.radius}px`
                }"
              >
                <img :src="imgDataUrl" alt="" class="h-full w-full" :style="{ objectFit: f.value }" />
              </div>
              <span :class="state.fit === f.value ? 'font-medium text-fg' : ''">{{ f.label }}</span>
            </div>
          </div>
          <p class="text-[11px] text-muted">Selected: <span class="font-mono text-fg">{{ state.fit }}</span> · ratio <span class="font-mono text-fg">{{ ratio }}</span></p>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Frame" icon="ph-crop">
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="r in RATIO_PRESETS"
            :key="r.label"
            type="button"
            class="inline-flex h-8 items-center rounded-full border px-2.5 text-[11px] font-medium transition-colors duration-150"
            :class="Math.abs(state.ratioW / state.ratioH - r.w / r.h) < 0.01 ? 'border-accent/70 bg-accent/8 text-fg' : 'border-line text-muted hover:bg-line/15'"
            :aria-pressed="Math.abs(state.ratioW / state.ratioH - r.w / r.h) < 0.01"
            @click="setRatio(r.w, r.h)"
          >
            {{ r.label }}
          </button>
        </div>
        <SliderControl v-model="state.ratioW" label="Ratio W" :min="0.5" :max="24" :step="0.5" />
        <SliderControl v-model="state.ratioH" label="Ratio H" :min="0.5" :max="16" :step="0.5" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="40" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Image & fit" icon="ph-image">
        <SelectControl v-model="state.fit" label="object-fit" :options="FIT_KINDS" />
        <SliderControl v-model="state.imageWidth" label="Image width" :min="120" :max="560" :step="10" suffix="px" />
        <SliderControl v-model="state.imageHeight" label="Image height" :min="80" :max="400" :step="10" suffix="px" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="aspectFitHtml(state)" :vars="vars" filename="css-studio-aspect-fit" />
    </template>
  </EditorPageShell>
</template>
<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  CLIP_KINDS,
  DEFAULT_CLIP,
  PRESETS_CLIP,
  clipCss,
  clipHtml,
  clipPolygonPoints,
  clipPreviewStyle,
  clipVars,
  addPoint,
  removePoint,
  setPoint,
  randomizeClip
} from '~/utils/generators/clip'
import type { ClipState } from '~/utils/generators/clip'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<ClipState>({
  id: 'clip',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_CLIP)) as ClipState,
  randomize: randomizeClip
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => clipCss(state.value))
const vars = computed(() => clipVars(state.value))
const style = computed(() => clipPreviewStyle(state.value))
const points = computed(() => clipPolygonPoints(state.value))

const stage = ref<HTMLElement | null>(null)
const dragging = ref<number | null>(null)

function onPointerDown(index: number, e: PointerEvent) {
  dragging.value = index
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (dragging.value === null || !stage.value) return
  const rect = stage.value.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  state.value = setPoint(state.value, dragging.value, x, y)
}

function onPointerUp() {
  if (dragging.value !== null) pushHistory()
  dragging.value = null
}

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_CLIP[i]!.state)) as ClipState
  pushHistory()
}


const variants = computed(() => PRESETS_CLIP.map((p) => ({ name: p.name, css: clipCss(p.state), html: clipHtml() })))
</script>

<template>
  <EditorPageShell
    title="Clip-path Editor"
    description="Draggable clip-path shapes with live CSS export."
    :css="css"
    :html="clipHtml()"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Clip-path preview" filename="css-studio-clip">
        <template #presets>
          <PreviewPresets :presets="PRESETS_CLIP" @apply="applyPreset" />
        </template>
        <div class="flex h-full w-full max-w-3xl items-center justify-center">
          <div
            ref="stage"
            class="relative h-70 w-70 rounded-xl border border-line bg-panel"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
          >
            <div class="h-full w-full" :style="style" aria-label="Clip-path preview"></div>
            <template v-if="state.kind === 'polygon' && state.showGuides">
              <svg class="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                <polygon :points="points.map((p) => `${p.x},${p.y}`).join(' ')" fill="none" stroke="rgba(52, 211, 153, .6)" stroke-width="2" style="vector-effect: non-scaling-stroke" />
              </svg>
              <button
                v-for="(p, i) in points"
                :key="i"
                class="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-bg bg-accent shadow-panel active:cursor-grabbing"
                :style="{ left: `${p.x}%`, top: `${p.y}%` }"
                :aria-label="`Point ${i + 1}`"
                @pointerdown.stop="onPointerDown(i, $event)"
              ></button>
            </template>
          </div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Shape" icon="ph-scissors">
        <SelectControl v-model="state.kind" label="Kind" :options="CLIP_KINDS" />
        <template v-if="state.kind === 'polygon'">
          <ToggleControl v-model="state.showGuides" label="Show handles" />
          <div class="flex items-center gap-2">
            <button type="button" class="h-8 flex-1 rounded-lg border border-line text-xs font-medium text-muted transition-colors duration-150 hover:bg-line/15 hover:text-fg" @click="state = addPoint(state)">Add point</button>
            <button type="button" class="h-8 flex-1 rounded-lg border border-line text-xs font-medium text-muted transition-colors duration-150 hover:bg-line/15 hover:text-fg disabled:opacity-40" :disabled="state.points.length <= 6" @click="state = removePoint(state, state.points.length / 2 - 1)">Remove last</button>
          </div>
        </template>
        <template v-if="state.kind === 'circle' || state.kind === 'ellipse'">
          <SliderControl v-model="state.circleR" label="Radius" :min="5" :max="50" suffix="%" />
          <SliderControl v-model="state.circleX" label="Center X" :min="0" :max="100" suffix="%" />
          <SliderControl v-model="state.circleY" label="Center Y" :min="0" :max="100" suffix="%" />
        </template>
        <template v-if="state.kind === 'inset'">
          <SliderControl v-model="state.inset[0]" label="Top" :min="0" :max="120" suffix="px" />
          <SliderControl v-model="state.inset[1]" label="Right" :min="0" :max="120" suffix="px" />
          <SliderControl v-model="state.inset[2]" label="Bottom" :min="0" :max="120" suffix="px" />
          <SliderControl v-model="state.inset[3]" label="Left" :min="0" :max="120" suffix="px" />
          <SliderControl v-model="state.round" label="Rounding" :min="0" :max="60" suffix="px" />
        </template>
        <ColorControl :model-value="state.accent" label="Fill" @update:model-value="(v) => (state.accent = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="clipHtml()" :vars="vars" filename="css-studio-clip" />
    </template>
  </EditorPageShell>
</template>
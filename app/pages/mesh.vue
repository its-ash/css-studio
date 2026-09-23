<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_MESH_GRADIENT,
  PRESETS_MESH_GRADIENT,
  meshGradientFullCss,
  meshGradientHtml,
  meshGradientVars,
  meshGradientPreviewStyle,
  meshGradientCss,
  addMeshPoint,
  removeMeshPoint,
  updateMeshPoint,
  randomizeMeshGradient
} from '~/utils/generators/meshGradient'
import type { MeshGradientState } from '~/utils/generators/meshGradient'
import { hslToHex, hexToHsl } from '~/utils/colors'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<MeshGradientState>({
  id: 'mesh',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_MESH_GRADIENT)) as MeshGradientState,
  randomize: randomizeMeshGradient
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => meshGradientFullCss(state.value))
const vars = computed(() => meshGradientVars(state.value))
const previewStyle = computed(() => meshGradientPreviewStyle(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_MESH_GRADIENT[i]!.state)) as MeshGradientState
  pushHistory()
}

const canvasEl = ref<HTMLElement | null>(null)
const draggingId = ref<string | null>(null)

function onPointerDown(e: PointerEvent, pointId: string) {
  draggingId.value = pointId
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!draggingId.value || !canvasEl.value) return
  const rect = canvasEl.value.getBoundingClientRect()
  const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
  const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))
  state.value = updateMeshPoint(state.value, draggingId.value, { x: Math.round(x), y: Math.round(y) })
}

function onPointerUp() {
  if (draggingId.value) {
    pushHistory()
    draggingId.value = null
  }
}

function addPoint() {
  state.value = addMeshPoint(state.value)
  pushHistory()
}

function removePoint(id: string) {
  state.value = removeMeshPoint(state.value, id)
  pushHistory()
}

useSeoMeta({
  title: 'Mesh Gradient - CSS Studio',
  description: 'Draggable color points composited into layered radial gradients.',
  ogTitle: 'Mesh Gradient - CSS Studio',
  ogDescription: 'Draggable color points composited into layered radial gradients.',
  ogUrl: 'https://css-studio.itsash.in/mesh',
  twitterTitle: 'Mesh Gradient - CSS Studio',
  twitterDescription: 'Draggable color points composited into layered radial gradients.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/mesh' }] })
</script>

<template>
  <EditorPageShell
    title="Mesh Gradient Generator"
    description="Draggable color points composited into layered radial gradients."
    :css="css"
    :html="meshGradientHtml()"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Mesh gradient preview" filename="css-studio-mesh">
        <template #presets>
          <PreviewPresets :presets="PRESETS_MESH_GRADIENT" @apply="applyPreset" />
        </template>
        <div
          ref="canvasEl"
          class="relative h-[400px] w-full max-w-3xl cursor-crosshair overflow-hidden rounded-xl"
          :style="previewStyle"
          aria-label="Mesh gradient canvas"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
        >
          <div
            v-for="p in state.points"
            :key="p.id"
            class="absolute flex h-6 w-6 cursor-grab items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform active:cursor-grabbing active:scale-110"
            :style="{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: hslToHex({ h: p.h, s: p.s, l: p.l })
            }"
            :aria-label="`Drag point at ${Math.round(p.x)}%, ${Math.round(p.y)}%`"
            @pointerdown="(e) => onPointerDown(e, p.id)"
          >
            <button
              class="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
              :aria-label="`Remove point ${p.id}`"
              @click.stop="removePoint(p.id)"
            >
              <Icon name="ph-x" :size="9" />
            </button>
          </div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Points" icon="ph-circle">
        <p class="text-[11px] text-muted">Drag the colored dots on the canvas to reposition. Click + to add more.</p>
        <button
          class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-dashed border-line text-xs font-medium text-muted transition-[color,border-color] duration-150 hover:border-accent/60 hover:text-fg"
          @click="addPoint"
        >
          <Icon name="ph-plus" :size="13" /> Add point
        </button>
        <div v-for="p in state.points" :key="p.id" class="flex flex-col gap-2.5 rounded-lg border border-line bg-bg p-3 transition-colors duration-150">
          <div class="flex items-center justify-between">
            <span class="flex items-center gap-2 text-xs font-medium text-fg">
              <span class="h-4 w-4 rounded-full border border-white/30" :style="{ backgroundColor: hslToHex({ h: p.h, s: p.s, l: p.l }) }"></span>
              Point {{ state.points.indexOf(p) + 1 }}
            </span>
            <button
              class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-rose-500/10 hover:text-rose-400 disabled:opacity-30 disabled:hover:bg-transparent"
              :disabled="state.points.length <= 2"
              :aria-label="`Remove point`"
              @click="removePoint(p.id)"
            >
              <Icon name="ph-x" :size="13" />
            </button>
          </div>
          <ColorControl :model-value="hslToHex({ h: p.h, s: p.s, l: p.l })" label="Color" @update:model-value="(v) => { const c = hexToHsl(v); state = updateMeshPoint(state, p.id, c) }" />
          <SliderControl :model-value="p.x" label="Position X" :min="0" :max="100" suffix="%" @update:model-value="(v) => state = updateMeshPoint(state, p.id, { x: v })" />
          <SliderControl :model-value="p.y" label="Position Y" :min="0" :max="100" suffix="%" @update:model-value="(v) => state = updateMeshPoint(state, p.id, { y: v })" />
          <SliderControl :model-value="p.radius" label="Spread" :min="20" :max="100" suffix="%" @update:model-value="(v) => state = updateMeshPoint(state, p.id, { radius: v })" />
          <SliderControl :model-value="p.a" label="Alpha" :min="0" :max="100" @update:model-value="(v) => state = updateMeshPoint(state, p.id, { a: v })" />
        </div>
      </ControlGroup>

      <ControlGroup label="Surface" icon="ph-image">
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => state.bg = v" />
        <SliderControl v-model="state.blur" label="Blur" :min="0" :max="40" suffix="px" />
        <SliderControl v-model="state.opacity" label="Opacity" :min="10" :max="100" suffix="%" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="meshGradientHtml()" :vars="vars" filename="css-studio-mesh" />
    </template>
  </EditorPageShell>
</template>
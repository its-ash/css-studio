<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_TRAIL,
  PRESETS_TRAIL,
  TRAIL_MODES,
  TRAIL_KINDS,
  PROGRESS_KINDS,
  normalizeTrail,
  randomizeTrail,
  trailCss,
  trailDemoCss,
  trailDemoHtml,
  trailHtml,
  trailVars
} from '~/utils/generators/trail'
import type { TrailState } from '~/utils/generators/trail'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<TrailState>({
  id: 'trail',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_TRAIL)) as TrailState,
  randomize: randomizeTrail,
  deserialize: (raw) => normalizeTrail(raw as unknown as TrailState)
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => trailCss(state.value))
const html = computed(() => trailHtml(state.value))
const vars = computed(() => trailVars(state.value))
const isTrail = computed(() => state.value.mode === 'trail')
const isFollower = computed(() => isTrail.value && state.value.trailKind === 'follower')

/*
 * The exported snippet uses position:fixed and viewport coordinates. Inside the editor the stage has a
 * transformed ancestor, so the live demo pins elements absolutely and converts to stage coordinates.
 */
const demoStyle = computed(
  () => `<style>${css.value}
.live-stage .trail-dot, .live-stage .cursor-follower, .live-stage .scroll-progress { position: absolute; }
.live-stage .scroll-progress { animation: none; }</style>`
)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_TRAIL[i]!.state)) as TrailState
  pushHistory()
}

const CONFETTI = computed(() => [state.value.accent, state.value.accent2, '#f59e0b', '#f43f5e', '#a78bfa'])
const rnd = (a: number, b: number) => a + Math.random() * (b - a)

const stageEl = ref<HTMLElement | null>(null)
let last = { x: -999, y: -999 }
let alive = 0

/** Mirrors the exported script, in stage-relative coordinates. */
function onPointerMove(e: PointerEvent) {
  const el = stageEl.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left
  const y = e.clientY - r.top
  if (isFollower.value) {
    target.x = x
    target.y = y
    follower.value?.classList.add('is-visible')
    return
  }
  const s = state.value
  if (alive >= s.trailCount || Math.hypot(x - last.x, y - last.y) < s.spacing) return
  const d = document.createElement('div')
  d.className = 'trail-dot'
  d.style.setProperty('--x', `${x}px`)
  d.style.setProperty('--y', `${y}px`)
  if (s.trailKind === 'comet') d.style.setProperty('--a', `${Math.atan2(y - last.y, x - last.x)}rad`)
  if (s.trailKind === 'star' || s.trailKind === 'confetti') d.style.setProperty('--r', `${rnd(0, 360)}deg`)
  if (s.trailKind === 'star') {
    d.style.setProperty('--dx', `${rnd(-16, 16)}px`)
    d.style.setProperty('--dy', `${rnd(-16, 16)}px`)
  }
  if (s.trailKind === 'confetti') {
    d.style.setProperty('--c', CONFETTI.value[Math.floor(Math.random() * CONFETTI.value.length)]!)
    d.style.setProperty('--dx', `${rnd(-30, 30)}px`)
  }
  if (s.trailKind === 'bubble') d.style.setProperty('--dx', `${rnd(-12, 12)}px`)
  last = { x, y }
  el.appendChild(d)
  alive++
  d.addEventListener(
    'animationend',
    () => {
      d.remove()
      alive--
    },
    { once: true }
  )
}

const follower = ref<HTMLElement | null>(null)
const target = { x: 260, y: 160 }
const pos = { x: 260, y: 160 }
let raf = 0
function tick() {
  pos.x += (target.x - pos.x) * 0.18
  pos.y += (target.y - pos.y) * 0.18
  if (follower.value) follower.value.style.transform = `translate(${pos.x}px, ${pos.y}px)`
  raf = requestAnimationFrame(tick)
}
watch(
  isFollower,
  (on) => {
    if (import.meta.client) {
      cancelAnimationFrame(raf)
      if (on) raf = requestAnimationFrame(tick)
    }
  },
  { immediate: true }
)
onBeforeUnmount(() => cancelAnimationFrame(raf))

const scrollEl = ref<HTMLElement | null>(null)
function onScroll() {
  const el = scrollEl.value
  if (!el) return
  el.parentElement?.style.setProperty('--progress', (el.scrollTop / (el.scrollHeight - el.clientHeight || 1)).toFixed(4))
}

const PARAGRAPHS = [
  'Our CI pipeline had grown to 41 minutes. Most of it was waiting: cold caches, serial test shards and a Docker layer that rebuilt on every commit.',
  'We started by measuring. A week of traces showed three steps accounted for 70 percent of the wall clock, and none of them were the tests themselves.',
  'Moving dependency installs into a cached base image saved nine minutes on its own. Splitting the suite into eight shards balanced by historical runtime saved another twelve.',
  'The last win was boring: we deleted 340 snapshot tests nobody had looked at in a year. They were slow, flaky and caught nothing the type checker missed.',
  'Today a typical pull request goes green in 19 minutes. The next target is under ten, which means caching the end-to-end browser images too.',
  'If you take one thing from this: measure before you parallelise. Our first guess about the bottleneck was wrong, and so was our second.'
]

const variants = computed(() => PRESETS_TRAIL.map((p) => ({ name: p.name, css: trailDemoCss(p.state), html: trailDemoHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Cursor Trail & Scroll Progress"
    description="Nine cursor trails and seven scroll-driven reading progress indicators."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" title="Trail preview" filename="css-studio-trail" @apply-variant="applyPreset">
        <template #presets>
          <PreviewPresets :presets="PRESETS_TRAIL" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full items-center justify-center p-6">
          <div
            v-if="isTrail"
            ref="stageEl"
            class="live-stage relative h-105 w-full max-w-2xl cursor-crosshair overflow-hidden rounded-2xl border border-line"
            :style="{ background: `radial-gradient(80% 60% at 30% 20%, color-mix(in srgb, ${state.accent} 8%, ${state.stage}), ${state.stage})` }"
            aria-label="Move the pointer here to preview the cursor trail"
            @pointermove="onPointerMove"
            @pointerleave="follower?.classList.remove('is-visible')"
          >
            <div v-if="isFollower" ref="follower" class="cursor-follower"></div>
            <span class="pointer-events-none absolute bottom-4 left-5 text-xs opacity-60" :style="{ color: state.stage === '#0c0c0e' ? '#a1a1aa' : undefined }">
              Move the pointer here to draw
            </span>
          </div>
          <div
            v-else
            class="live-stage relative h-105 w-full max-w-2xl overflow-hidden rounded-2xl border border-line"
            :style="{ background: state.stage }"
          >
            <div class="scroll-progress"></div>
            <div ref="scrollEl" class="h-full overflow-y-auto px-14 py-10" :class="state.progressKind === 'side-rail' ? 'pl-16' : ''" @scroll="onScroll">
              <article class="mx-auto max-w-prose" :style="{ color: state.stage === '#0c0c0e' ? '#e4e4e7' : '#27272a' }">
                <h3 class="mb-4 text-2xl font-semibold tracking-tight">How we cut build times in half</h3>
                <p v-for="(t, i) in [...PARAGRAPHS, ...PARAGRAPHS]" :key="i" class="mb-4 text-[15px] leading-relaxed opacity-80">{{ t }}</p>
              </article>
            </div>
          </div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Effect" icon="ph-cursor-click">
        <SelectControl v-model="state.mode" label="Type" :options="TRAIL_MODES" />
        <SelectControl v-if="isTrail" v-model="state.trailKind" label="Trail style" :options="TRAIL_KINDS" />
        <SelectControl v-else v-model="state.progressKind" label="Indicator" :options="PROGRESS_KINDS" />
      </ControlGroup>

      <ControlGroup v-if="isTrail" label="Trail" icon="ph-sparkle">
        <SliderControl v-model="state.size" label="Particle size" :min="4" :max="18" suffix="px" />
        <template v-if="!isFollower">
          <SliderControl v-model="state.fadeMs" label="Lifetime" :min="300" :max="1600" :step="50" suffix="ms" />
          <SliderControl v-model="state.spacing" label="Spacing" :min="2" :max="40" suffix="px" />
          <SliderControl v-model="state.trailCount" label="Max particles" :min="4" :max="80" />
        </template>
        <ToggleControl v-else v-model="state.blend" label="Invert what's underneath" />
      </ControlGroup>

      <ControlGroup v-else label="Indicator" icon="ph-arrow-bend-double-up-right">
        <SliderControl v-model="state.barHeight" :label="state.progressKind === 'circle' ? 'Ring thickness' : 'Thickness'" :min="2" :max="10" suffix="px" />
        <SliderControl v-if="state.progressKind === 'circle' || state.progressKind === 'side-dot'" v-model="state.dotSize" label="Size" :min="8" :max="18" suffix="px" />
        <SliderControl v-if="state.progressKind === 'segments'" v-model="state.segments" label="Segments" :min="2" :max="12" />
        <ToggleControl v-if="state.progressKind === 'circle'" v-model="state.showPercent" label="Show percent" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Accent" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.accent2" label="Second accent" @update:model-value="(v) => (state.accent2 = v)" />
        <ColorControl :model-value="state.stage" label="Page background" @update:model-value="(v) => (state.stage = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-trail" />
    </template>
  </EditorPageShell>
</template>

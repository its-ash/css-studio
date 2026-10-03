<script setup lang="ts">
/**
 * Renders exported HTML + CSS inside a shadow root so each variant's selectors, ids and keyframes
 * stay isolated, then scales a fixed 640x420 stage down to the card width.
 */
const props = defineProps<{ css: string; html: string }>()

const STAGE_W = 640
const STAGE_H = 420
const MAX_ZOOM = 2.6

const host = ref<HTMLElement | null>(null)
const scale = ref(0.4)
let root: ShadowRoot | null = null
let ro: ResizeObserver | null = null

/** Strips scripts and inline handlers; generator output is trusted but presets may come from shared URLs. */
const clean = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, '')

function render() {
  if (!root) return
  root.innerHTML = `<style>
:host { all: initial; display: block; }
.stage {
  position: relative;
  width: ${STAGE_W}px;
  height: ${STAGE_H}px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  color: var(--color-fg, #fafafa);
  font-family: Geist, system-ui, -apple-system, sans-serif;
  font-size: 14px;
  transform-origin: 0 0;
}
.stage *, .stage *::before, .stage *::after { box-sizing: border-box; }
.fit {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px;
  transform-origin: 50% 50%;
}
${props.css.replace(/<\/style/gi, '')}
</style><div class="stage" style="transform: scale(${scale.value})"><div class="fit">${clean(props.html)}</div></div>`
  requestAnimationFrame(fitContent)
}

/** Zooms small components (badges, toggles, keycaps) up so they read at thumbnail size. */
function fitContent() {
  const fit = root?.querySelector<HTMLElement>('.fit')
  if (!fit) return
  const base = fit.getBoundingClientRect()
  let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity
  for (const el of Array.from(fit.querySelectorAll<HTMLElement>('*'))) {
    const rc = el.getBoundingClientRect()
    if (!rc.width || !rc.height) continue
    l = Math.min(l, rc.left); t = Math.min(t, rc.top); r = Math.max(r, rc.right); b = Math.max(b, rc.bottom)
  }
  if (!Number.isFinite(l) || !base.width) return
  const k = base.width / STAGE_W
  const w = (r - l) / k
  const h = (b - t) / k
  const z = Math.max(0.6, Math.min(MAX_ZOOM, (STAGE_W * 0.86) / w, (STAGE_H * 0.82) / h))
  // Re-centre the content's bounding box (e.g. a toast pinned to a corner) before zooming.
  const tx = -z * ((l + r) / 2 - (base.left + base.width / 2)) / k
  const ty = -z * ((t + b) / 2 - (base.top + base.height / 2)) / k
  if (Math.abs(z - 1) > 0.05 || Math.abs(tx) > 8 || Math.abs(ty) > 8) fit.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${z.toFixed(3)})`
}

onMounted(() => {
  if (!host.value) return
  root = host.value.attachShadow({ mode: 'open' })
  ro = new ResizeObserver(([e]) => {
    const w = e?.contentRect.width ?? 0
    if (w) scale.value = w / STAGE_W
  })
  ro.observe(host.value)
  render()
})

onBeforeUnmount(() => ro?.disconnect())

watch(() => [props.css, props.html, scale.value], render)
</script>

<template>
  <div ref="host" class="pointer-events-none w-full overflow-hidden" :style="{ aspectRatio: `${STAGE_W} / ${STAGE_H}` }" />
</template>

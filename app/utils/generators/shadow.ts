import { hexToRgb, readableInk } from '../colors'

export type ShadowMode = 'smooth' | 'custom' | 'text'

export interface ShadowLayer {
  x: number
  y: number
  blur: number
  spread: number
  color: string
  inset: boolean
}

export interface ShadowState {
  mode: ShadowMode
  elevation: number
  steps: number
  softness: number
  darkness: number
  angle: number
  shadowColor: string
  layers: ShadowLayer[]
  radius: number
  surface: string
  stage: string
  text: string
  hoverLift: boolean
}

export const SHADOW_MODES: { value: ShadowMode; label: string }[] = [
  { value: 'smooth', label: 'Smooth (auto layers)' },
  { value: 'custom', label: 'Custom layers' },
  { value: 'text', label: 'Text shadow' }
]

export const DEFAULT_SHADOW: ShadowState = {
  mode: 'smooth',
  elevation: 24,
  steps: 5,
  softness: 2,
  darkness: 18,
  angle: 0,
  shadowColor: '#0f172a',
  layers: [{ x: 0, y: 18, blur: 40, spread: -12, color: '#00000059', inset: false }],
  radius: 16,
  surface: '#ffffff',
  stage: '#eef0f4',
  text: 'Shadow',
  hoverLift: false
}

const HEX = /^#[0-9a-f]{6}$/i

/** Accepts states saved before modes existed (kind: box | text). */
export function normalizeShadow(raw: ShadowState): ShadowState {
  const legacy = (raw as { kind?: string }).kind
  const s: ShadowState = { ...DEFAULT_SHADOW, ...raw }
  if (!SHADOW_MODES.some((m) => m.value === s.mode)) s.mode = legacy === 'text' ? 'text' : legacy === 'box' ? 'custom' : 'smooth'
  if (!Array.isArray(s.layers) || !s.layers.length) s.layers = DEFAULT_SHADOW.layers
  s.steps = Math.min(8, Math.max(1, Math.round(s.steps)))
  return s
}

const rgba = (hex: string, a: number) => {
  if (!HEX.test(hex)) return `rgb(0 0 0 / ${a.toFixed(3)})`
  const { r, g, b } = hexToRgb(hex)
  return `rgb(${r} ${g} ${b} / ${+a.toFixed(3)})`
}

/**
 * Layered shadow where each step doubles offset and blur, so the stack falls off like real light.
 * `angle` is where light comes from (0 = top, clockwise); shadows fall the opposite way.
 */
export function smoothLayers(s: ShadowState): ShadowLayer[] {
  const n = s.steps
  const rad = (s.angle * Math.PI) / 180
  const dx = -Math.sin(rad)
  const dy = Math.cos(rad)
  const alpha = (s.darkness / 100) * (1.6 / Math.sqrt(n))
  return Array.from({ length: n }, (_, i) => {
    const off = (s.elevation * 2 ** i) / 2 ** (n - 1)
    return {
      x: +(dx * off).toFixed(1),
      y: +(dy * off).toFixed(1),
      blur: +(off * s.softness).toFixed(1),
      spread: 0,
      color: rgba(s.shadowColor, Math.min(1, alpha * (1 - (i / n) * 0.35))),
      inset: false
    }
  })
}

export function shadowValue(layers: ShadowLayer[], kind: 'box' | 'text' = 'box'): string {
  return layers
    .map((l) => `${l.inset && kind === 'box' ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px${kind === 'box' ? ` ${l.spread}px` : ''} ${l.color}`)
    .join(',\n    ')
}

function activeLayers(s: ShadowState) {
  return s.mode === 'smooth' ? smoothLayers(s) : s.layers
}

export function shadowCss(raw: ShadowState): string {
  const s = normalizeShadow(raw)
  const stageInk = readableInk(s.stage)
  if (s.mode === 'text') {
    return `.shadow-stage {
  display: grid;
  place-items: center;
  min-height: 20rem;
  padding: 3rem;
  border-radius: 20px;
  background: ${s.stage};
}

.text-shadow {
  margin: 0;
  color: ${s.surface};
  font: 800 clamp(3rem, 9vw, 6rem)/1 system-ui, -apple-system, 'Segoe UI', sans-serif;
  letter-spacing: -0.04em;
  text-shadow:
    ${shadowValue(s.layers, 'text')};
}`
  }
  const layers = activeLayers(s)
  const lifted = s.mode === 'smooth' ? smoothLayers({ ...s, elevation: s.elevation * 1.8 }) : layers.map((l) => ({ ...l, y: l.y * 1.6, blur: l.blur * 1.5 }))
  const ink = readableInk(s.surface)
  const hover = s.hoverLift
    ? `

/* Fades in a deeper shadow on a pseudo-element: opacity animates on the compositor, box-shadow would repaint. */
.shadow-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow:
    ${shadowValue(lifted)};
  opacity: 0;
  transition: opacity 200ms ease-out;
  pointer-events: none;
}

@media (hover: hover) and (pointer: fine) {
  .shadow-card:hover {
    translate: 0 -3px;
  }

  .shadow-card:hover::after {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .shadow-card,
  .shadow-card::after {
    transition-duration: 1ms;
  }
}`
    : ''
  return `.shadow-stage {
  display: grid;
  place-items: center;
  min-height: 20rem;
  padding: 3rem;
  border-radius: 20px;
  background: ${s.stage};
  color: ${stageInk};
}

.shadow-card {
  position: relative;
  display: grid;
  gap: 0.5rem;
  width: min(20rem, 100%);
  padding: 1.75rem;
  border-radius: ${s.radius}px;
  background: ${s.surface};
  color: ${ink};
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  box-shadow:
    ${shadowValue(layers)};${s.hoverLift ? '\n  transition: translate 200ms ease-out;' : ''}
}

.shadow-card h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.shadow-card p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.7;
}${hover}`
}

export function shadowHtml(raw: ShadowState): string {
  const s = normalizeShadow(raw)
  const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  if (s.mode === 'text') return `<div class="shadow-stage">\n  <h2 class="text-shadow">${esc(s.text || 'Shadow')}</h2>\n</div>`
  const desc = s.mode === 'smooth' ? `${s.steps} stacked layers fall off the way real light does.` : 'Hand-tuned shadow layers.'
  return `<div class="shadow-stage">
  <article class="shadow-card">
    <h3>Quarterly report</h3>
    <p>${desc}</p>
  </article>
</div>`
}

export function shadowVars(raw: ShadowState): Record<string, string> {
  const s = normalizeShadow(raw)
  return { '--shadow-radius': `${s.radius}px`, '--shadow': shadowValue(activeLayers(s), s.mode === 'text' ? 'text' : 'box').replace(/\n\s*/g, ' ') }
}

export function randomizeShadow(s: ShadowState, rng: import('../rng').Rng): ShadowState {
  const base = normalizeShadow(s)
  if (base.mode !== 'smooth') {
    const layers = Array.from({ length: rng.int(1, 3) }, () => ({
      x: Math.round(rng.range(-12, 12)),
      y: Math.round(rng.range(4, 32)),
      blur: Math.round(rng.range(10, 60)),
      spread: Math.round(rng.range(-14, 4)),
      color: rng.pick(['#00000040', '#0f766e55', '#1e293b55', '#4338ca44']),
      inset: false
    }))
    return { ...base, layers }
  }
  return {
    ...base,
    elevation: Math.round(rng.range(6, 48)),
    steps: rng.int(3, 7),
    softness: rng.pick([1.5, 2, 2.5, 3]),
    darkness: Math.round(rng.range(10, 30)),
    angle: rng.pick([0, 0, 330, 30]),
    shadowColor: rng.pick(['#0f172a', '#1e1b4b', '#3f1d0b', '#022c22'])
  }
}

const p = (o: Partial<ShadowState>): ShadowState => ({ ...DEFAULT_SHADOW, ...o })
const L = (x: number, y: number, blur: number, spread: number, color: string, inset = false): ShadowLayer => ({ x, y, blur, spread, color, inset })
const longText = (n: number, color: string) => Array.from({ length: n }, (_, i) => L(i + 1, i + 1, 0, 0, color))

export const PRESETS_SHADOW: { name: string; tags: string[]; state: ShadowState }[] = [
  { name: 'Smooth Medium', tags: ['smooth'], state: p({}) },
  { name: 'Smooth Subtle', tags: ['smooth'], state: p({ elevation: 8, steps: 4, darkness: 12 }) },
  { name: 'Smooth Large', tags: ['smooth'], state: p({ elevation: 48, steps: 6, darkness: 22, softness: 2.5 }) },
  { name: 'Floating', tags: ['smooth'], state: p({ elevation: 64, steps: 7, darkness: 16, softness: 3, hoverLift: true }) },
  { name: 'Crisp', tags: ['smooth'], state: p({ elevation: 12, steps: 3, softness: 1, darkness: 24 }) },
  { name: 'Indigo Tint', tags: ['smooth', 'tinted'], state: p({ shadowColor: '#3730a3', stage: '#eef2ff', darkness: 26, elevation: 32 }) },
  { name: 'Warm Tint', tags: ['smooth', 'tinted'], state: p({ shadowColor: '#7c2d12', stage: '#fdf4ec', surface: '#fffaf5', darkness: 22 }) },
  { name: 'Side Light', tags: ['smooth'], state: p({ angle: 300, elevation: 28 }) },
  { name: 'Dark UI', tags: ['smooth', 'dark'], state: p({ stage: '#0c0c0e', surface: '#1c1c21', shadowColor: '#000000', darkness: 60, elevation: 28 }) },
  { name: 'Hover Lift', tags: ['interactive'], state: p({ hoverLift: true, elevation: 10, steps: 4 }) },
  { name: 'Material 2dp', tags: ['custom'], state: p({ mode: 'custom', layers: [L(0, 1, 3, 0, '#0000001f'), L(0, 1, 2, 0, '#0000003d')] }) },
  { name: 'Material 8dp', tags: ['custom'], state: p({ mode: 'custom', layers: [L(0, 8, 10, 1, '#00000024'), L(0, 3, 14, 2, '#0000001f'), L(0, 5, 5, -3, '#00000033')] }) },
  { name: 'Hard Offset', tags: ['custom', 'brutal'], state: p({ mode: 'custom', radius: 6, stage: '#fef3c7', surface: '#ffffff', layers: [L(6, 6, 0, 0, '#111111')] }) },
  { name: 'Neon Halo', tags: ['custom', 'glow'], state: p({ mode: 'custom', radius: 20, stage: '#09090b', surface: '#111114', layers: [L(0, 0, 8, 1, '#34d399aa'), L(0, 0, 32, 4, '#34d39966'), L(0, 0, 80, 12, '#34d39933')] }) },
  { name: 'Inset Well', tags: ['custom', 'inset'], state: p({ mode: 'custom', surface: '#f1f3f7', layers: [L(0, 2, 6, 0, '#0000002e', true), L(0, -1, 0, 0, '#ffffffcc', true)] }) },
  { name: 'Focus Ring', tags: ['custom'], state: p({ mode: 'custom', layers: [L(0, 0, 0, 3, '#6366f155'), L(0, 0, 0, 1, '#6366f1'), L(0, 10, 24, -8, '#0000003a')] }) },
  { name: 'Long Text', tags: ['text'], state: p({ mode: 'text', stage: '#0f766e', surface: '#ffffff', layers: longText(18, '#0b5d56') }) },
  { name: 'Retro 3D', tags: ['text'], state: p({ mode: 'text', stage: '#fde68a', surface: '#f43f5e', layers: [L(3, 3, 0, 0, '#111111'), L(6, 6, 0, 0, '#38bdf8'), L(9, 9, 0, 0, '#111111')] }) },
  { name: 'Neon Text', tags: ['text', 'glow'], state: p({ mode: 'text', stage: '#09090b', surface: '#f0abfc', layers: [L(0, 0, 4, 0, '#f0abfc'), L(0, 0, 16, 0, '#d946ef'), L(0, 0, 48, 0, '#a21caf')] }) },
  { name: 'Embossed', tags: ['text'], state: p({ mode: 'text', stage: '#d4d4d8', surface: '#d4d4d8', layers: [L(-1, -1, 0, 0, '#ffffff'), L(2, 2, 3, 0, '#00000040')] }) }
]

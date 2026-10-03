import { hslToHex, mixHex, readableInk } from '../colors'

export type NeuShape = 'flat' | 'concave' | 'convex' | 'pressed'
export type NeuLayout = 'thermostat' | 'buttons' | 'knob' | 'tile'

export interface NeumorphicState {
  base: string
  accent: string
  shape: NeuShape
  layout: NeuLayout
  angle: number
  distance: number
  blur: number
  radius: number
  intensity: number
  autoShades: boolean
  light: string
  dark: string
  width: number
  height: number
}

export const NEU_SHAPES: { value: NeuShape; label: string }[] = [
  { value: 'flat', label: 'Flat' },
  { value: 'concave', label: 'Concave' },
  { value: 'convex', label: 'Convex' },
  { value: 'pressed', label: 'Pressed (inset)' }
]

export const NEU_LAYOUTS: { value: NeuLayout; label: string }[] = [
  { value: 'thermostat', label: 'Thermostat card' },
  { value: 'buttons', label: 'Button row' },
  { value: 'knob', label: 'Dial knob' },
  { value: 'tile', label: 'Single tile' }
]

export const DEFAULT_NEUMORPH: NeumorphicState = {
  base: '#e4e7ee',
  accent: '#10b981',
  shape: 'flat',
  layout: 'thermostat',
  angle: 315,
  distance: 12,
  blur: 28,
  radius: 28,
  intensity: 18,
  autoShades: true,
  light: '#ffffff',
  dark: '#c3c8d4',
  width: 280,
  height: 280
}

const HEX = /^#[0-9a-f]{6}$/i

/** Accepts states saved before shapes/layouts existed (boolean inset, light-angle convention). */
export function normalizeNeumorph(raw: NeumorphicState): NeumorphicState {
  const legacy = raw as NeumorphicState & { inset?: boolean }
  const s = { ...DEFAULT_NEUMORPH, ...raw }
  if (!NEU_SHAPES.some((o) => o.value === s.shape)) s.shape = legacy.inset ? 'pressed' : 'flat'
  if (!NEU_LAYOUTS.some((o) => o.value === s.layout)) s.layout = 'thermostat'
  if (!HEX.test(s.base)) s.base = DEFAULT_NEUMORPH.base
  if (raw.autoShades === undefined && legacy.light) s.autoShades = false
  return s
}

/** Shadow colours: either user picked, or derived from the base so the surface always reads as one material. */
export function neuShades(s: NeumorphicState): { light: string; dark: string } {
  if (!s.autoShades && HEX.test(s.light) && HEX.test(s.dark)) return { light: s.light, dark: s.dark }
  const k = s.intensity / 100
  const darkBase = readableInk(s.base) !== '#18181b'
  return {
    light: mixHex(s.base, '#ffffff', darkBase ? k * 0.22 : Math.min(0.9, k * 3)),
    dark: mixHex(s.base, '#000000', darkBase ? Math.min(0.85, k * 1.6) : k)
  }
}

/** `angle` is where light comes from, using CSS gradient angles (0 = top, 90 = right, clockwise). */
function offset(angle: number, d: number) {
  const r = (angle * Math.PI) / 180
  return { x: Math.round(Math.sin(r) * d), y: Math.round(-Math.cos(r) * d) }
}

function shadow(s: NeumorphicState, d: number, blur: number, inset: boolean) {
  const { light, dark } = neuShades(s)
  const o = offset(s.angle, d)
  const i = inset ? 'inset ' : ''
  return inset
    ? `${i}${-o.x}px ${-o.y}px ${blur}px ${dark}, ${i}${o.x}px ${o.y}px ${blur}px ${light}`
    : `${-o.x}px ${-o.y}px ${blur}px ${dark}, ${o.x}px ${o.y}px ${blur}px ${light}`
}

function surface(s: NeumorphicState): string {
  const lift = mixHex(s.base, '#ffffff', 0.06)
  const sink = mixHex(s.base, '#000000', 0.05)
  if (s.shape === 'concave') return `linear-gradient(${s.angle}deg, ${lift}, ${sink})`
  if (s.shape === 'convex') return `linear-gradient(${s.angle}deg, ${sink}, ${lift})`
  return s.base
}

export function neumorphCss(raw: NeumorphicState): string {
  const s = normalizeNeumorph(raw)
  const ink = readableInk(s.base, '#3f4656', '#e8eaf0')
  const muted = mixHex(ink, s.base, 0.4)
  const pressed = s.shape === 'pressed'
  const small = Math.max(3, Math.round(s.distance / 2.2))
  const smallBlur = Math.max(6, Math.round(s.blur / 2.2))
  const r = Math.min(s.radius, 999)

  const layoutCss: Record<NeuLayout, string> = {
    thermostat: `.neu-card {
  display: grid;
  gap: 1.25rem;
  width: ${s.width}px;
  max-width: 100%;
  padding: 1.75rem;
}

.neu-label {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${muted};
}

.neu-value {
  margin: 0;
  font-size: 3rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.03em;
}

.neu-row {
  display: flex;
  gap: 0.75rem;
}`,
    buttons: `.neu-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem;
}`,
    knob: `.neu-knob {
  position: relative;
  display: grid;
  place-items: center;
  width: ${Math.min(s.width, 260)}px;
  aspect-ratio: 1;
  border-radius: 50%;
}

.neu-knob-cap {
  display: grid;
  place-items: center;
  width: 62%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${s.base};
  box-shadow: ${shadow(s, small, smallBlur, true)};
  font-size: 1.75rem;
  font-weight: 600;
}

.neu-knob::after {
  content: '';
  position: absolute;
  top: 9%;
  left: 50%;
  width: 6px;
  height: 6px;
  margin-left: -3px;
  border-radius: 50%;
  background: ${s.accent};
  box-shadow: 0 0 8px ${s.accent};
}`,
    tile: `.neu-tile {
  display: grid;
  place-items: center;
  width: ${s.width}px;
  height: ${s.height}px;
  max-width: 100%;
}`
  }

  return `.neu-surface {
  display: grid;
  place-items: center;
  gap: 2rem;
  padding: 3.5rem 2.5rem;
  border-radius: 24px;
  background: ${s.base};
  color: ${ink};
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

.neu {
  border: 0;
  border-radius: ${r}px;
  background: ${surface(s)};
  box-shadow: ${shadow(s, s.distance, s.blur, pressed)};
  color: inherit;
}

${layoutCss[s.layout]}

.neu-btn {
  display: inline-grid;
  place-items: center;
  min-width: 3.25rem;
  height: 3.25rem;
  padding: 0 1.1rem;
  border-radius: ${Math.min(r, 18)}px;
  background: ${s.base};
  box-shadow: ${shadow(s, small, smallBlur, false)};
  color: inherit;
  font: inherit;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: box-shadow 160ms ease-out, color 160ms ease-out;
}

.neu-btn:active,
.neu-btn[aria-pressed='true'] {
  box-shadow: ${shadow(s, small, smallBlur, true)};
  color: ${s.accent};
}

.neu-btn:focus-visible {
  outline: 2px solid ${s.accent};
  outline-offset: 3px;
}

@media (prefers-contrast: more) {
  .neu,
  .neu-btn {
    box-shadow: none;
    outline: 1px solid ${muted};
  }
}`
}

export function neumorphHtml(raw: NeumorphicState): string {
  const s = normalizeNeumorph(raw)
  const body: Record<NeuLayout, string> = {
    thermostat: `  <div class="neu neu-card">
    <p class="neu-label">Living room</p>
    <p class="neu-value">21.5&deg;</p>
    <div class="neu-row">
      <button class="neu-btn" type="button" aria-label="Lower temperature">&minus;</button>
      <button class="neu-btn" type="button" aria-pressed="true">Auto</button>
      <button class="neu-btn" type="button" aria-label="Raise temperature">+</button>
    </div>
  </div>`,
    buttons: `  <div class="neu-row">
    <button class="neu-btn" type="button">Previous</button>
    <button class="neu-btn" type="button" aria-pressed="true">Play</button>
    <button class="neu-btn" type="button">Next</button>
  </div>`,
    knob: `  <div class="neu neu-knob" role="img" aria-label="Volume dial at 68 percent">
    <span class="neu-knob-cap">68</span>
  </div>`,
    tile: `  <div class="neu neu-tile"></div>`
  }
  return `<div class="neu-surface">\n${body[s.layout]}\n</div>`
}

export function neumorphVars(raw: NeumorphicState): Record<string, string> {
  const s = normalizeNeumorph(raw)
  const { light, dark } = neuShades(s)
  return {
    '--neu-base': s.base,
    '--neu-light': light,
    '--neu-dark': dark,
    '--neu-distance': `${s.distance}px`,
    '--neu-blur': `${s.blur}px`,
    '--neu-radius': `${s.radius}px`
  }
}

export function randomizeNeumorph(s: NeumorphicState, rng: import('../rng').Rng): NeumorphicState {
  const dark = rng.chance(0.3)
  const h = Math.round(rng.range(0, 360))
  return {
    ...normalizeNeumorph(s),
    base: hslToHex({ h, s: rng.range(6, 22), l: dark ? rng.range(12, 18) : rng.range(84, 92) }),
    accent: hslToHex({ h: (h + 150) % 360, s: 70, l: 50 }),
    shape: rng.pick(NEU_SHAPES.map((o) => o.value)),
    angle: rng.pick([315, 315, 45, 225, 135]),
    distance: Math.round(rng.range(8, 18)),
    blur: Math.round(rng.range(18, 40)),
    radius: rng.pick([16, 24, 28, 36]),
    intensity: dark ? Math.round(rng.range(30, 45)) : Math.round(rng.range(12, 22)),
    autoShades: true
  }
}

const p = (o: Partial<NeumorphicState>): NeumorphicState => ({ ...DEFAULT_NEUMORPH, ...o })

export const PRESETS_NEUMORPH: { name: string; tags: string[]; state: NeumorphicState }[] = [
  { name: 'Classic Soft', tags: ['light'], state: p({}) },
  { name: 'Concave Card', tags: ['light'], state: p({ shape: 'concave' }) },
  { name: 'Convex Card', tags: ['light'], state: p({ shape: 'convex', accent: '#6366f1' }) },
  { name: 'Pressed Well', tags: ['inset'], state: p({ shape: 'pressed', distance: 8, blur: 18 }) },
  { name: 'Media Controls', tags: ['buttons'], state: p({ layout: 'buttons', accent: '#f43f5e' }) },
  { name: 'Volume Dial', tags: ['knob'], state: p({ layout: 'knob', shape: 'convex', radius: 999 }) },
  { name: 'Dark Slate', tags: ['dark'], state: p({ base: '#2b2e36', intensity: 40, accent: '#34d399' }) },
  { name: 'Dark Dial', tags: ['dark', 'knob'], state: p({ base: '#1f2128', intensity: 42, layout: 'knob', shape: 'concave', accent: '#f59e0b' }) },
  { name: 'Dark Buttons', tags: ['dark', 'buttons'], state: p({ base: '#24262d', intensity: 40, layout: 'buttons', accent: '#38bdf8' }) },
  { name: 'Warm Sand', tags: ['warm'], state: p({ base: '#e9e1d4', accent: '#c2410c', radius: 36 }) },
  { name: 'Mint Pad', tags: ['cool'], state: p({ base: '#d8eadf', accent: '#059669', shape: 'concave' }) },
  { name: 'Rose Clay', tags: ['warm'], state: p({ base: '#f1dada', accent: '#be123c', layout: 'buttons' }) },
  { name: 'Ocean Foam', tags: ['cool'], state: p({ base: '#d7e6ef', accent: '#0369a1', layout: 'knob', shape: 'convex' }) },
  { name: 'Lavender', tags: ['cool'], state: p({ base: '#e3e0f0', accent: '#7c3aed', shape: 'convex' }) },
  { name: 'Floating Orb', tags: ['tile'], state: p({ base: '#d6e4ee', layout: 'tile', radius: 999, width: 220, height: 220, distance: 20, blur: 50, shape: 'convex' }) },
  { name: 'Soft Square', tags: ['tile'], state: p({ layout: 'tile', radius: 32, width: 220, height: 220, shape: 'concave' }) },
  { name: 'Deep Press', tags: ['tile', 'inset'], state: p({ base: '#e8e6e0', layout: 'tile', shape: 'pressed', radius: 40, width: 240, height: 240, distance: 14, blur: 36 }) },
  { name: 'Bottom Light', tags: ['angle'], state: p({ angle: 135, accent: '#0ea5e9' }) }
]

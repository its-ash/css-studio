import { hexToRgb, hslToHex, readableInk } from '../colors'
import { photoAlt, photoUrl } from '../demo'
import type { PhotoKey } from '../demo'

export type GlassStyle = 'frosted' | 'liquid' | 'acrylic' | 'clear'
export type GlassLayout = 'card' | 'creditcard' | 'player' | 'weather' | 'login' | 'notification' | 'stats' | 'nav'
export type GlassBackdrop = 'aurora' | 'sunset' | 'ocean' | 'midnight' | 'city' | 'fjord' | 'valley'
export type GlassInk = 'auto' | 'light' | 'dark'

export interface GlassState {
  style: GlassStyle
  layout: GlassLayout
  backdrop: GlassBackdrop
  tint: string
  tintOpacity: number
  blur: number
  saturate: number
  brightness: number
  radius: number
  border: number
  edgeHighlight: boolean
  shadow: number
  grain: number
  ink: GlassInk
  accent: string
  width: number
}

export const GLASS_STYLES: { value: GlassStyle; label: string }[] = [
  { value: 'frosted', label: 'Frosted' },
  { value: 'liquid', label: 'Liquid (specular)' },
  { value: 'acrylic', label: 'Acrylic (grain)' },
  { value: 'clear', label: 'Clear' }
]

export const GLASS_LAYOUTS: { value: GlassLayout; label: string }[] = [
  { value: 'card', label: 'Profile card' },
  { value: 'creditcard', label: 'Credit card' },
  { value: 'player', label: 'Music player' },
  { value: 'weather', label: 'Weather widget' },
  { value: 'login', label: 'Sign-in form' },
  { value: 'notification', label: 'Notifications' },
  { value: 'stats', label: 'Stat tile' },
  { value: 'nav', label: 'Navigation bar' }
]

export const GLASS_BACKDROPS: { value: GlassBackdrop; label: string }[] = [
  { value: 'aurora', label: 'Aurora' },
  { value: 'sunset', label: 'Sunset' },
  { value: 'ocean', label: 'Ocean' },
  { value: 'midnight', label: 'Midnight' },
  { value: 'city', label: 'Photo: city' },
  { value: 'fjord', label: 'Photo: fjord' },
  { value: 'valley', label: 'Photo: valley' }
]

export const GLASS_INKS: { value: GlassInk; label: string }[] = [
  { value: 'auto', label: 'Auto' },
  { value: 'light', label: 'Light text' },
  { value: 'dark', label: 'Dark text' }
]

export const DEFAULT_GLASS: GlassState = {
  style: 'frosted',
  layout: 'card',
  backdrop: 'aurora',
  tint: '#ffffff',
  tintOpacity: 14,
  blur: 18,
  saturate: 160,
  brightness: 105,
  radius: 24,
  border: 30,
  edgeHighlight: true,
  shadow: 40,
  grain: 0,
  ink: 'auto',
  accent: '#ffffff',
  width: 340
}

const HEX = /^#[0-9a-f]{6}$/i
const pick = <T extends string>(v: unknown, list: { value: T }[], fb: T): T => (list.some((o) => o.value === v) ? (v as T) : fb)

/** Maps the previous single-panel state (bg, bgOpacity, borderOpacity, innerGlow) onto the new model. */
export function normalizeGlass(raw: GlassState): GlassState {
  const legacy = raw as GlassState & { bg?: string; bgOpacity?: number; borderOpacity?: number; innerGlow?: boolean }
  const s: GlassState = { ...DEFAULT_GLASS, ...raw }
  if (legacy.bg && !raw.tint) s.tint = legacy.bg
  if (legacy.bgOpacity !== undefined && raw.tintOpacity === undefined) s.tintOpacity = legacy.bgOpacity
  if (legacy.borderOpacity !== undefined && raw.border === undefined) s.border = legacy.borderOpacity
  if (legacy.innerGlow !== undefined && raw.edgeHighlight === undefined) s.edgeHighlight = legacy.innerGlow
  s.style = pick(s.style, GLASS_STYLES, 'frosted')
  s.layout = pick(s.layout, GLASS_LAYOUTS, 'card')
  s.backdrop = pick(s.backdrop, GLASS_BACKDROPS, 'aurora')
  s.ink = pick(s.ink, GLASS_INKS, 'auto')
  if (!HEX.test(s.tint)) s.tint = '#ffffff'
  if (!HEX.test(s.accent)) s.accent = '#ffffff'
  return s
}

const rgba = (hex: string, a: number) => {
  const { r, g, b } = hexToRgb(hex)
  return `rgb(${r} ${g} ${b} / ${+a.toFixed(3)})`
}

const PHOTO_BACKDROPS: Partial<Record<GlassBackdrop, PhotoKey>> = { city: 'city', fjord: 'fjord', valley: 'valley' }

/** Colour fields with two orbs behind the panel edges so blur and refraction have something to work on. */
function backdropCss(b: GlassBackdrop): { bg: string; orbs: [string, string] | null } {
  const photo = PHOTO_BACKDROPS[b]
  if (photo) return { bg: `#111 url('${photoUrl(photo, 1400, 900)}') center / cover`, orbs: null }
  const fields: Record<string, { bg: string; orbs: [string, string] }> = {
    aurora: {
      bg: 'radial-gradient(45% 55% at 18% 25%, #f43f5e, transparent 70%), radial-gradient(40% 50% at 85% 20%, #8b5cf6, transparent 70%), radial-gradient(55% 60% at 60% 95%, #06b6d4, transparent 70%), #120a24',
      orbs: ['linear-gradient(135deg, #fb7185, #a855f7)', 'linear-gradient(135deg, #22d3ee, #3b82f6)']
    },
    sunset: {
      bg: 'radial-gradient(50% 60% at 20% 20%, #fb923c, transparent 70%), radial-gradient(45% 55% at 85% 35%, #ec4899, transparent 70%), radial-gradient(60% 50% at 50% 100%, #7c3aed, transparent 70%), #2a0f1f',
      orbs: ['linear-gradient(135deg, #fde047, #f97316)', 'linear-gradient(135deg, #f472b6, #9333ea)']
    },
    ocean: {
      bg: 'radial-gradient(50% 60% at 15% 30%, #14b8a6, transparent 70%), radial-gradient(45% 55% at 85% 25%, #3b82f6, transparent 70%), radial-gradient(60% 50% at 55% 100%, #22d3ee, transparent 70%), #04202b',
      orbs: ['linear-gradient(135deg, #5eead4, #0ea5e9)', 'linear-gradient(135deg, #818cf8, #1d4ed8)']
    },
    midnight: {
      bg: 'radial-gradient(40% 50% at 25% 30%, #4338ca, transparent 70%), radial-gradient(35% 45% at 80% 70%, #0e7490, transparent 70%), #05060c',
      orbs: ['linear-gradient(135deg, #6366f1, #312e81)', 'linear-gradient(135deg, #14b8a6, #164e63)']
    }
  }
  return fields[b] ?? fields.aurora!
}

function inkFor(s: GlassState): string {
  if (s.ink === 'light') return '#ffffff'
  if (s.ink === 'dark') return '#18181b'
  return s.tintOpacity >= 45 && readableInk(s.tint) === '#18181b' ? '#18181b' : '#ffffff'
}

function surfaceCss(s: GlassState): { body: string; before: string } {
  const tintA = s.style === 'clear' ? Math.min(s.tintOpacity, 8) : s.style === 'acrylic' ? Math.max(s.tintOpacity, 22) : s.tintOpacity
  const blur = s.style === 'clear' ? Math.min(s.blur, 6) : s.blur
  const sat = s.style === 'liquid' ? Math.max(s.saturate, 180) : s.saturate
  const filter = `blur(${blur}px) saturate(${sat}%) brightness(${s.brightness}%)`
  const sh = s.shadow / 100
  const drop = sh ? `0 ${Math.round(8 + sh * 24)}px ${Math.round(24 + sh * 56)}px rgb(0 0 0 / ${(0.1 + sh * 0.3).toFixed(2)})` : ''
  const border = s.style === 'liquid' ? 0 : s.border / 100
  const liquidInset = 'inset 0 1px 1px rgb(255 255 255 / 0.55), inset 0 -1px 1px rgb(255 255 255 / 0.18), inset 0 0 0 1px rgb(255 255 255 / 0.12)'
  const shadows = [s.style === 'liquid' ? liquidInset : '', drop].filter(Boolean).join(', ')
  const body = `  background: ${rgba(s.tint, tintA / 100)};
  -webkit-backdrop-filter: ${filter};
  backdrop-filter: ${filter};
  border: 1px solid ${rgba('#ffffff', border)};${shadows ? `\n  box-shadow: ${shadows};` : ''}`
  const grainA = s.style === 'acrylic' ? Math.max(s.grain, 30) : s.grain
  const grain = grainA
    ? `radial-gradient(circle at 23% 31%, rgb(255 255 255 / 0.5) 0.6px, transparent 1px) 0 0 / 3px 3px,
    radial-gradient(circle at 71% 77%, rgb(0 0 0 / 0.45) 0.6px, transparent 1px) 0 0 / 5px 5px,
    radial-gradient(circle at 41% 63%, rgb(255 255 255 / 0.4) 0.6px, transparent 1px) 0 0 / 7px 7px`
    : ''
  const sheen = s.style === 'liquid' ? 'linear-gradient(135deg, rgb(255 255 255 / 0.32), transparent 38%, transparent 70%, rgb(255 255 255 / 0.1))' : ''
  const layers = [sheen, grain].filter(Boolean)
  const before = layers.length
    ? `.glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: ${layers.join(',\n    ')};
  opacity: ${grainA && !sheen ? (grainA / 100).toFixed(2) : 1};
  mix-blend-mode: ${sheen ? 'screen' : 'overlay'};
  pointer-events: none;
}`
    : ''
  return { body, before }
}

function layoutCss(s: GlassState, ink: string, muted: string, faint: string): string {
  const r = s.radius
  const inner = Math.max(6, r - 10)
  const btn = `display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding: 0 1.1rem;
  border: 1px solid ${faint};
  border-radius: ${Math.min(inner, 999)}px;
  color: inherit;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;`
  const shared = `.glass-btn {
  ${btn}
  background: ${rgba(ink === '#ffffff' ? '#ffffff' : '#000000', 0.08)};
  transition: background-color 150ms ease-out, scale 120ms ease-out;
}

.glass-btn.primary {
  border-color: transparent;
  background: ${s.accent};
  color: ${readableInk(s.accent)};
}

.glass-btn:active {
  scale: 0.97;
}

.glass-btn:focus-visible,
.glass-input:focus-visible {
  outline: 2px solid ${ink};
  outline-offset: 2px;
}

.glass-muted {
  color: ${muted};
}`
  const L: Record<GlassLayout, string> = {
    card: `.glass-avatar {
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, ${rgba('#ffffff', 0.5)}, ${rgba('#ffffff', 0.1)});
  box-shadow: inset 0 0 0 1px ${faint};
  font-weight: 700;
}

.glass-name {
  margin: 0.75rem 0 0;
  font-size: 1.25rem;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.glass-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 1.25rem 0;
  padding: 0.9rem 0;
  border-block: 1px solid ${faint};
  text-align: center;
}

.glass-stats div {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.15rem;
}

.glass-stats dt,
.glass-stats dd {
  margin: 0;
}

.glass-stats strong {
  display: block;
  font-size: 1.1rem;
}

.glass-stats span {
  font-size: 0.75rem;
  color: ${muted};
}

.glass-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}`,
    creditcard: `.glass.creditcard {
  aspect-ratio: 1.586;
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  padding: 1.5rem 1.6rem;
}

.cc-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.cc-chip {
  align-self: center;
  width: 2.75rem;
  height: 2rem;
  border-radius: 6px;
  background:
    linear-gradient(90deg, transparent 32%, rgb(0 0 0 / 0.18) 32% 34%, transparent 34% 66%, rgb(0 0 0 / 0.18) 66% 68%, transparent 68%),
    linear-gradient(0deg, transparent 45%, rgb(0 0 0 / 0.18) 45% 55%, transparent 55%),
    linear-gradient(135deg, #fde68a, #d97706);
}

.cc-number {
  margin: 0 0 0.9rem;
  font: 600 1.2rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: 0.12em;
}

.cc-foot {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  font-weight: 600;
}

.cc-foot small {
  display: block;
  margin-bottom: 0.15rem;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${muted};
}`,
    player: `.player-art {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 11;
  object-fit: cover;
  border-radius: ${inner}px;
  box-shadow: 0 12px 30px rgb(0 0 0 / 0.3);
}

.player-title {
  margin: 1rem 0 0.1rem;
  font-size: 1.1rem;
  font-weight: 650;
}

.player-track {
  height: 0.3rem;
  margin: 1rem 0 0.4rem;
  border-radius: 999px;
  background: linear-gradient(90deg, ${ink} 38%, ${faint} 38%);
}

.player-times {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  color: ${muted};
}

.player-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;
  margin-top: 0.75rem;
}

.player-controls button {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  border-radius: 50%;
  background: none;
  color: inherit;
  cursor: pointer;
}

.player-controls button::before {
  content: '';
  width: 1.1rem;
  height: 1rem;
  background: currentColor;
}

.player-controls .prev::before {
  clip-path: polygon(0 0, 12% 0, 12% 45%, 56% 0, 56% 45%, 100% 0, 100% 100%, 56% 55%, 56% 100%, 12% 55%, 12% 100%, 0 100%);
  rotate: 180deg;
}

.player-controls .next::before {
  clip-path: polygon(0 0, 44% 45%, 44% 0, 88% 45%, 88% 0, 100% 0, 100% 100%, 88% 100%, 88% 55%, 44% 100%, 44% 55%, 0 100%);
}

.player-controls .play {
  width: 3.5rem;
  height: 3.5rem;
  background: ${ink};
  color: ${ink === '#ffffff' ? '#18181b' : '#ffffff'};
}

.player-controls .play::before {
  width: 0.9rem;
  height: 1.1rem;
  background: linear-gradient(90deg, currentColor 35%, transparent 35% 65%, currentColor 65%);
}`,
    weather: `.wx-place {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.wx-temp {
  margin: 0.25rem 0 0;
  font-size: 4rem;
  font-weight: 250;
  line-height: 1;
  letter-spacing: -0.04em;
}

.wx-hours {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 1.25rem 0 0;
  padding: 0.9rem 0 0;
  border-top: 1px solid ${faint};
  list-style: none;
  text-align: center;
  font-size: 0.85rem;
}

.wx-hours span {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.72rem;
  color: ${muted};
}`,
    login: `.glass-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 650;
  letter-spacing: -0.02em;
}

.glass-field {
  display: grid;
  gap: 0.4rem;
  margin-top: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
}

.glass-input {
  height: 2.75rem;
  padding: 0 0.85rem;
  border: 1px solid ${faint};
  border-radius: ${inner}px;
  background: ${rgba(ink === '#ffffff' ? '#ffffff' : '#000000', 0.08)};
  color: inherit;
  font: inherit;
  font-size: 0.95rem;
  font-weight: 400;
}

.glass-input::placeholder {
  color: ${muted};
}

.glass.login .glass-btn {
  width: 100%;
  margin-top: 1.25rem;
}`,
    notification: `.glass-stack {
  display: grid;
  gap: 0.6rem;
  width: min(${s.width + 40}px, 100%);
}

.glass.note {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.25rem 0.75rem;
  padding: 0.9rem 1rem;
}

.note-icon {
  grid-row: span 2;
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 10px;
  background: ${s.accent};
  color: ${readableInk(s.accent)};
  font-weight: 700;
}

.note-title {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 650;
}

.note-time {
  font-size: 0.75rem;
  color: ${muted};
}

.note-text {
  grid-column: 2 / 4;
  margin: 0;
  font-size: 0.85rem;
  color: ${muted};
}`,
    stats: `.stat-label {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${muted};
}

.stat-value {
  margin: 0.4rem 0 0.2rem;
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}

.stat-delta {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: ${rgba('#22c55e', 0.22)};
  font-size: 0.75rem;
  font-weight: 600;
}

.stat-bars {
  display: flex;
  align-items: end;
  gap: 0.35rem;
  height: 4.5rem;
  margin-top: 1.25rem;
}

.stat-bars span {
  flex: 1;
  height: var(--h);
  border-radius: 4px 4px 2px 2px;
  background: ${rgba(ink === '#ffffff' ? '#ffffff' : '#000000', 0.25)};
}

.stat-bars span:last-child {
  background: ${s.accent};
}`,
    nav: `.glass.nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: min(${Math.max(s.width, 640)}px, 100%);
  padding: 0.6rem 0.6rem 0.6rem 1.25rem;
}

.nav-logo {
  font-weight: 750;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 1.25rem;
  margin: 0 auto 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.9rem;
}

.nav-links a {
  color: ${muted};
  text-decoration: none;
}

.nav-links a[aria-current='page'],
.nav-links a:hover {
  color: ${ink};
}`
  }
  return `${shared}\n\n${L[s.layout]}`
}

export function glassCss(raw: GlassState): string {
  const s = normalizeGlass(raw)
  const ink = inkFor(s)
  const muted = ink === '#ffffff' ? 'rgb(255 255 255 / 0.72)' : 'rgb(24 24 27 / 0.68)'
  const faint = ink === '#ffffff' ? 'rgb(255 255 255 / 0.22)' : 'rgb(24 24 27 / 0.16)'
  const bd = backdropCss(s.backdrop)
  const surf = surfaceCss(s)
  const edge =
    s.edgeHighlight && s.style !== 'liquid'
      ? `/* Light catching the top-left edge: gradient ring cut out with mask-composite. */
.glass::after {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: linear-gradient(135deg, rgb(255 255 255 / 0.7), rgb(255 255 255 / 0.05) 40%, rgb(255 255 255 / 0.05) 70%, rgb(255 255 255 / 0.35));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  pointer-events: none;
}`
      : ''
  const orbs = bd.orbs
    ? `

.glass-scene::before,
.glass-scene::after {
  content: '';
  position: absolute;
  z-index: -1;
  border-radius: 50%;
}

.glass-scene::before {
  width: 13rem;
  height: 13rem;
  top: calc(50% - 10rem);
  left: calc(50% - 13rem);
  background: ${bd.orbs[0]};
}

.glass-scene::after {
  width: 10rem;
  height: 10rem;
  bottom: calc(50% - 9rem);
  right: calc(50% - 11rem);
  background: ${bd.orbs[1]};
}`
    : ''

  return `.glass-scene {
  position: relative;
  isolation: isolate;
  display: grid;
  place-items: ${s.layout === 'nav' ? 'start center' : 'center'};
  min-height: 28rem;
  padding: 3rem 1.5rem;
  overflow: hidden;
  border-radius: 24px;
  background: ${bd.bg};
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
}${orbs}

.glass {
  position: relative;
  width: min(${s.width}px, 100%);
  padding: 1.5rem;
  border-radius: ${s.layout === 'nav' ? Math.min(s.radius, 999) : s.radius}px;
  color: ${ink};
${surf.body}
}

${surf.before}

${edge}

/* Without backdrop-filter support, or when the user asks for less transparency, go near-solid. */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass { background: ${rgba(ink === '#ffffff' ? '#18181b' : '#ffffff', 0.85)}; }
}

@media (prefers-reduced-transparency: reduce) {
  .glass {
    background: ${rgba(ink === '#ffffff' ? '#18181b' : '#ffffff', 0.92)};
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}

@media (prefers-contrast: more) {
  .glass { border-color: ${ink}; }
}

${layoutCss(s, ink, muted, faint)}`.replace(/\n{3,}/g, '\n\n')
}

export function glassHtml(raw: GlassState): string {
  const s = normalizeGlass(raw)
  const L: Record<GlassLayout, string> = {
    card: `  <article class="glass">
    <div class="glass-avatar" aria-hidden="true">MC</div>
    <h2 class="glass-name">Maya Chen</h2>
    <p class="glass-muted" style="margin:0.15rem 0 0">Product designer · Lisbon</p>
    <dl class="glass-stats">
      <div><dt><span>Projects</span></dt><dd><strong>48</strong></dd></div>
      <div><dt><span>Followers</span></dt><dd><strong>2.1k</strong></dd></div>
      <div><dt><span>Following</span></dt><dd><strong>312</strong></dd></div>
    </dl>
    <div class="glass-actions">
      <button class="glass-btn primary" type="button">Follow</button>
      <button class="glass-btn" type="button">Message</button>
    </div>
  </article>`,
    creditcard: `  <div class="glass creditcard" role="img" aria-label="Northwind Bank card ending 5512">
    <div class="cc-top"><span>Northwind</span><span class="glass-muted">Platinum</span></div>
    <span class="cc-chip" aria-hidden="true"></span>
    <p class="cc-number">4821 7730 0193 5512</p>
    <div class="cc-foot">
      <div><small>Card holder</small>Maya Chen</div>
      <div><small>Expires</small>09/29</div>
    </div>
  </div>`,
    player: `  <article class="glass" aria-label="Now playing">
    <img class="player-art" src="${photoUrl('valley', 640, 440)}" alt="${photoAlt('valley')}" width="640" height="440" />
    <h2 class="player-title">Slow Morning</h2>
    <p class="glass-muted" style="margin:0">Lumen Fields</p>
    <div class="player-track" role="progressbar" aria-label="Playback position" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="player-times"><span>1:24</span><span>3:51</span></div>
    <div class="player-controls">
      <button class="prev" type="button" aria-label="Previous track"></button>
      <button class="play" type="button" aria-label="Pause"></button>
      <button class="next" type="button" aria-label="Next track"></button>
    </div>
  </article>`,
    weather: `  <article class="glass" aria-label="Weather in Lisbon">
    <p class="wx-place">Lisbon</p>
    <p class="wx-temp">21&deg;</p>
    <p style="margin:0.4rem 0 0">Partly cloudy</p>
    <p class="glass-muted" style="margin:0.15rem 0 0">H 24&deg; · L 15&deg;</p>
    <ul class="wx-hours">
      <li><span>Now</span>21&deg;</li>
      <li><span>15:00</span>22&deg;</li>
      <li><span>16:00</span>22&deg;</li>
      <li><span>17:00</span>21&deg;</li>
      <li><span>18:00</span>19&deg;</li>
    </ul>
  </article>`,
    login: `  <form class="glass login" action="#">
    <h2 class="glass-title">Welcome back</h2>
    <p class="glass-muted" style="margin:0.3rem 0 0">Sign in to your Northwind workspace.</p>
    <label class="glass-field">Email
      <input class="glass-input" type="email" placeholder="name@company.com" autocomplete="email" />
    </label>
    <label class="glass-field">Password
      <input class="glass-input" type="password" autocomplete="current-password" />
    </label>
    <button class="glass-btn primary" type="submit">Sign in</button>
  </form>`,
    notification: `  <div class="glass-stack">
    <div class="glass note">
      <span class="note-icon" aria-hidden="true">N</span>
      <p class="note-title">Deploy finished</p>
      <span class="note-time">now</span>
      <p class="note-text">dashboard@a3f9c2 is live on production.</p>
    </div>
    <div class="glass note">
      <span class="note-icon" aria-hidden="true">C</span>
      <p class="note-title">Design review</p>
      <span class="note-time">9:41</span>
      <p class="note-text">Starts in 10 minutes in Room 4B.</p>
    </div>
  </div>`,
    stats: `  <article class="glass">
    <p class="stat-label">Monthly revenue</p>
    <p class="stat-value">$48,210</p>
    <span class="stat-delta">+12.4% vs last month</span>
    <div class="stat-bars" role="img" aria-label="Revenue for the last 8 months, rising">
      <span style="--h:38%"></span><span style="--h:52%"></span><span style="--h:44%"></span><span style="--h:61%"></span>
      <span style="--h:57%"></span><span style="--h:70%"></span><span style="--h:66%"></span><span style="--h:88%"></span>
    </div>
  </article>`,
    nav: `  <nav class="glass nav" aria-label="Main">
    <span class="nav-logo">Northwind</span>
    <ul class="nav-links">
      <li><a href="#" aria-current="page">Product</a></li>
      <li><a href="#">Pricing</a></li>
      <li><a href="#">Docs</a></li>
      <li><a href="#">Changelog</a></li>
    </ul>
    <a class="glass-btn primary" href="#" style="text-decoration:none">Sign in</a>
  </nav>`
  }
  return `<div class="glass-scene">\n${L[s.layout]}\n</div>`
}

export function glassVars(raw: GlassState): Record<string, string> {
  const s = normalizeGlass(raw)
  return {
    '--glass-tint': rgba(s.tint, s.tintOpacity / 100),
    '--glass-blur': `${s.blur}px`,
    '--glass-radius': `${s.radius}px`
  }
}

export function randomizeGlass(s: GlassState, rng: import('../rng').Rng): GlassState {
  const h = Math.floor(rng.range(0, 360))
  const dark = rng.chance(0.25)
  return {
    ...normalizeGlass(s),
    style: rng.pick(GLASS_STYLES.map((o) => o.value)),
    layout: rng.pick(GLASS_LAYOUTS.map((o) => o.value)),
    backdrop: rng.pick(GLASS_BACKDROPS.map((o) => o.value)),
    tint: dark ? '#0b0b10' : rng.chance(0.7) ? '#ffffff' : hslToHex({ h, s: 70, l: 65 }),
    tintOpacity: dark ? Math.round(rng.range(30, 50)) : Math.round(rng.range(8, 24)),
    blur: Math.round(rng.range(10, 30)),
    saturate: Math.round(rng.range(130, 200)),
    radius: rng.pick([16, 20, 24, 28]),
    border: Math.round(rng.range(15, 45)),
    edgeHighlight: rng.chance(0.7),
    shadow: Math.round(rng.range(20, 60)),
    accent: rng.chance(0.5) ? '#ffffff' : hslToHex({ h: (h + 180) % 360, s: 80, l: 60 })
  }
}

const p = (o: Partial<GlassState>): GlassState => ({ ...DEFAULT_GLASS, ...o })

export const PRESETS_GLASS: { name: string; tags: string[]; state: GlassState }[] = [
  { name: 'Profile Card', tags: ['card'], state: p({}) },
  { name: 'Credit Card', tags: ['card'], state: p({ layout: 'creditcard', width: 380, radius: 20, backdrop: 'sunset', tintOpacity: 16 }) },
  { name: 'Liquid Player', tags: ['liquid'], state: p({ layout: 'player', style: 'liquid', width: 300, radius: 32, backdrop: 'ocean', tintOpacity: 10, blur: 22 }) },
  { name: 'Weather Widget', tags: ['widget'], state: p({ layout: 'weather', width: 320, radius: 28, backdrop: 'fjord', tintOpacity: 18, blur: 24 }) },
  { name: 'Sign In Panel', tags: ['form'], state: p({ layout: 'login', width: 360, backdrop: 'city', tint: '#0b0b10', tintOpacity: 38, blur: 24, border: 18, accent: '#ffffff' }) },
  { name: 'Notifications', tags: ['ios'], state: p({ layout: 'notification', width: 340, radius: 20, backdrop: 'valley', tintOpacity: 22, blur: 24, accent: '#10b981', edgeHighlight: false }) },
  { name: 'Revenue Tile', tags: ['dashboard'], state: p({ layout: 'stats', width: 320, backdrop: 'midnight', tint: '#0b0b10', tintOpacity: 35, accent: '#34d399', border: 18 }) },
  { name: 'Floating Nav', tags: ['nav'], state: p({ layout: 'nav', radius: 999, backdrop: 'aurora', tintOpacity: 12, accent: '#ffffff', width: 640 }) },
  { name: 'Liquid Card', tags: ['liquid'], state: p({ style: 'liquid', radius: 32, backdrop: 'sunset', tintOpacity: 8, blur: 20 }) },
  { name: 'Liquid Weather', tags: ['liquid', 'widget'], state: p({ layout: 'weather', style: 'liquid', radius: 36, backdrop: 'valley', tintOpacity: 8, width: 320 }) },
  { name: 'Acrylic Login', tags: ['acrylic', 'form'], state: p({ layout: 'login', style: 'acrylic', backdrop: 'aurora', tintOpacity: 24, grain: 40, width: 360 }) },
  { name: 'Acrylic Stats', tags: ['acrylic'], state: p({ layout: 'stats', style: 'acrylic', backdrop: 'ocean', tintOpacity: 26, grain: 45, accent: '#fde047', width: 320 }) },
  { name: 'Clear Card', tags: ['clear'], state: p({ style: 'clear', backdrop: 'fjord', border: 45, shadow: 20 }) },
  { name: 'Dark Glass', tags: ['dark'], state: p({ tint: '#09090b', tintOpacity: 45, border: 14, backdrop: 'city', accent: '#a78bfa' }) },
  { name: 'Light Frost', tags: ['light'], state: p({ layout: 'login', tint: '#ffffff', tintOpacity: 62, ink: 'dark', backdrop: 'ocean', accent: '#0f766e', width: 360, edgeHighlight: false, border: 60 }) },
  { name: 'Emerald Tint', tags: ['tinted'], state: p({ layout: 'stats', tint: '#34d399', tintOpacity: 18, border: 40, backdrop: 'midnight', accent: '#a7f3d0', width: 320 }) },
  { name: 'Rose Credit Card', tags: ['tinted', 'card'], state: p({ layout: 'creditcard', tint: '#f43f5e', tintOpacity: 20, backdrop: 'midnight', width: 380, radius: 18 }) },
  { name: 'Sunset Player', tags: ['player'], state: p({ layout: 'player', backdrop: 'sunset', width: 300, radius: 28, tintOpacity: 16 }) }
]

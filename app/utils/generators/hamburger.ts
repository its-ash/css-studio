import { contrastRatio, hslToHex, readableInk } from '../colors'

export type BurgerMorph = 'x' | 'squeeze' | 'spin' | 'elastic' | 'slide' | 'arrow-left' | 'arrow-right' | 'chevron' | 'minus' | 'plus'
export type BurgerBars = 'equal' | 'stagger' | 'short-middle' | 'offset'
export type BurgerShell = 'plain' | 'circle' | 'rounded' | 'outline' | 'labeled'

export interface HamburgerState {
  lines: 2 | 3
  morph: BurgerMorph
  bars: BurgerBars
  shell: BurgerShell
  accentOnOpen: boolean
  accent: string
  barColor: string
  shellBg: string
  pageBg: string
  size: number
  barWidth: number
  barHeight: number
  gap: number
  radius: number
  duration: number
}

export const BURGER_MORPHS: { value: BurgerMorph; label: string }[] = [
  { value: 'x', label: 'Cross' },
  { value: 'squeeze', label: 'Squeeze' },
  { value: 'spin', label: 'Spin' },
  { value: 'elastic', label: 'Elastic' },
  { value: 'slide', label: 'Slide out' },
  { value: 'arrow-left', label: 'Arrow left' },
  { value: 'arrow-right', label: 'Arrow right' },
  { value: 'chevron', label: 'Chevron' },
  { value: 'minus', label: 'Minus' },
  { value: 'plus', label: 'Plus' }
]

export const BURGER_BARS: { value: BurgerBars; label: string }[] = [
  { value: 'equal', label: 'Equal' },
  { value: 'stagger', label: 'Stagger' },
  { value: 'short-middle', label: 'Short middle' },
  { value: 'offset', label: 'Offset' }
]

export const BURGER_SHELLS: { value: BurgerShell; label: string }[] = [
  { value: 'plain', label: 'Plain' },
  { value: 'circle', label: 'Circle' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'outline', label: 'Outline' },
  { value: 'labeled', label: 'With label' }
]

export const DEFAULT_HAMBURGER: HamburgerState = {
  lines: 3,
  morph: 'squeeze',
  bars: 'equal',
  shell: 'rounded',
  accentOnOpen: false,
  accent: '#10b981',
  barColor: '#fafafa',
  shellBg: '#27272a',
  pageBg: '#18181b',
  size: 48,
  barWidth: 22,
  barHeight: 2,
  gap: 5,
  radius: 12,
  duration: 360
}

const pick = <T extends string>(v: unknown, list: { value: T }[], fb: T): T => (list.some((o) => o.value === v) ? (v as T) : fb)

/** Accepts states saved by the previous version (morphTo, no shell/bars). */
export function normalizeHamburger(raw: HamburgerState): HamburgerState {
  const legacy = (raw as { morphTo?: string }).morphTo
  const fromLegacy = legacy === 'arrow' ? 'arrow-left' : legacy
  const { morphTo: _drop, ...rest } = raw as HamburgerState & { morphTo?: string }
  return {
    ...DEFAULT_HAMBURGER,
    ...rest,
    lines: raw.lines === 2 ? 2 : 3,
    morph: pick(raw.morph ?? fromLegacy, BURGER_MORPHS, 'squeeze'),
    bars: pick(raw.bars, BURGER_BARS, 'equal'),
    shell: pick(raw.shell, BURGER_SHELLS, 'rounded')
  }
}

const HEX = /^#[0-9a-f]{6}$/i
const readable = (fg: string, bg: string, min = 3) => !HEX.test(fg) || !HEX.test(bg) || contrastRatio(fg, bg) >= min

/** What actually sits behind the bars: the button fill, or the page for plain/outline buttons. */
export function burgerSurface(s: HamburgerState): string {
  return s.shell === 'plain' || s.shell === 'outline' ? s.pageBg : s.shellBg
}

/**
 * Bars need 3:1 against their surface (WCAG non-text contrast). If the chosen colour would vanish,
 * fall back to near-black or near-white rather than ship an invisible button.
 */
export function burgerInk(s: HamburgerState): { bar: string; open: string } {
  const bg = burgerSurface(s)
  const bar = readable(s.barColor, bg) ? s.barColor : readableInk(bg, '#18181b', '#fafafa')
  return { bar, open: readable(s.accent, bg) ? s.accent : bar }
}

const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)'
const ELASTIC = 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'

/** Closed-state width (scale) and alignment (-1 left, 0 center, 1 right) per bar for each layout. */
const LAYOUTS: Record<BurgerBars, Record<'top' | 'mid' | 'bot', [number, number]>> = {
  equal: { top: [1, 0], mid: [1, 0], bot: [1, 0] },
  stagger: { top: [1, 0], mid: [0.72, 1], bot: [0.45, 1] },
  'short-middle': { top: [1, 0], mid: [0.6, 0], bot: [1, 0] },
  offset: { top: [0.6, -1], mid: [1, 0], bot: [0.6, 1] }
}

/**
 * Bars keep one transform-origin across states (so nothing jumps); alignment is done with translate:
 * a bar scaled to k around origin o needs tx = (1 - k) * W * (align - o) / 2.
 */
function barLayout(s: HamburgerState, origin: number, d: number): Record<'top' | 'mid' | 'bot', string> {
  const L = LAYOUTS[s.bars]
  const one = ([k, align]: [number, number], y: number) => {
    const tx = Math.round((1 - k) * s.barWidth * (align - origin) * 50) / 100
    return `translate: ${tx}px ${y}px;${k === 1 ? '' : `\n  scale: ${k} 1;`}`
  }
  return { top: one(L.top, -d), mid: one(L.mid, 0), bot: one(L.bot, d) }
}

interface Open {
  top: string
  bot: string
  mid?: string
  icon?: string
  origin?: string
}

function openState(s: HamburgerState): Open {
  const x: Open = { top: 'translate: 0 0;\n  rotate: 45deg;\n  scale: 1 1;', bot: 'translate: 0 0;\n  rotate: -45deg;\n  scale: 1 1;', mid: 'opacity: 0;\n  scale: 0 1;' }
  switch (s.morph) {
    case 'spin':
      return { ...x, icon: 'rotate: 180deg;' }
    case 'slide':
      return { ...x, mid: 'opacity: 0;\n  translate: 140% 0;' }
    case 'arrow-left':
    case 'arrow-right': {
      const left = s.morph === 'arrow-left'
      const deg = left ? 40 : -40
      return {
        top: `translate: 0 0;\n  rotate: ${-deg}deg;\n  scale: 0.55 1;`,
        bot: `translate: 0 0;\n  rotate: ${deg}deg;\n  scale: 0.55 1;`,
        mid: 'translate: 0 0;\n  scale: 1 1;',
        origin: left ? '0 50%' : '100% 50%'
      }
    }
    case 'chevron':
      return {
        top: 'translate: -21% 0;\n  rotate: 45deg;\n  scale: 0.6 1;',
        bot: 'translate: 21% 0;\n  rotate: -45deg;\n  scale: 0.6 1;',
        mid: 'opacity: 0;\n  scale: 0 1;'
      }
    case 'minus':
      return { top: 'translate: 0 0;\n  scale: 1 1;', bot: 'translate: 0 0;\n  scale: 1 1;', mid: 'translate: 0 0;\n  scale: 1 1;' }
    case 'plus':
      return { top: 'translate: 0 0;\n  rotate: 90deg;\n  scale: 1 1;', bot: 'translate: 0 0;\n  scale: 1 1;', mid: 'translate: 0 0;\n  scale: 1 1;' }
    default:
      return x
  }
}

function shellCss(s: HamburgerState): string {
  const base = `  background: ${s.shellBg};\n  border-radius: ${s.radius}px;`
  switch (s.shell) {
    case 'plain':
      return `  background: transparent;\n  border-radius: ${s.radius}px;`
    case 'circle':
      return `  background: ${s.shellBg};\n  border-radius: 50%;`
    case 'outline':
      return `  background: transparent;\n  border-radius: ${s.radius}px;\n  box-shadow: inset 0 0 0 1.5px color-mix(in srgb, ${burgerInk(s).bar} 32%, transparent);`
    case 'labeled':
      return `  width: auto;\n  padding-inline: ${Math.round(s.size * 0.32)}px ${Math.round(s.size * 0.4)}px;\n  gap: 10px;\n  background: ${s.shellBg};\n  border-radius: 999px;`
    default:
      return base
  }
}

/**
 * `prefix` scopes every class + keyframe so several variants can coexist on one page.
 * Uses individual transform properties (translate/rotate/scale) so each phase can be timed separately.
 */
export function hamburgerCss(raw: HamburgerState, prefix = 'burger'): string {
  const s = normalizeHamburger(raw)
  const d = s.lines === 3 ? s.gap + s.barHeight : (s.gap + s.barHeight) / 2
  const D = s.duration
  const H = Math.round(D / 2)
  const ease = s.morph === 'elastic' ? ELASTIC : EASE
  const open = openState(s)
  const layout = barLayout(s, s.morph === 'arrow-left' ? -1 : s.morph === 'arrow-right' ? 1 : 0, d)
  const squeeze = s.morph === 'squeeze'
  const props = (delayRotate: number, delayTranslate: number, dur: number) =>
    `translate ${dur}ms ${ease} ${delayTranslate}ms, rotate ${dur}ms ${ease} ${delayRotate}ms, scale ${dur}ms ${ease} ${delayTranslate}ms, opacity ${dur}ms ${ease}, background-color ${D}ms ${ease}`
  const closeTransition = squeeze ? props(0, H, H) : props(0, 0, D)
  const openTransition = squeeze ? props(H, 0, H) : props(0, 0, D)
  const on = `.burger-input:checked + .burger`
  const origin = open.origin ? `\n  transform-origin: ${open.origin};` : ''
  const ink = burgerInk(s)
  const color = s.accentOnOpen ? `\n\n${on} .burger-bar {\n  background: ${ink.open};\n}` : ''
  const labeled = s.shell === 'labeled'

  const css = `.burger-input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.burger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${s.size}px;
  height: ${s.size}px;
  color: ${ink.bar};
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
${shellCss(s)}
  transition: background-color 160ms ease-out, scale 120ms ease-out;
}

@media (hover: hover) and (pointer: fine) {
  .burger:hover {
    background-color: color-mix(in srgb, ${s.accent} ${s.shell === 'plain' || s.shell === 'outline' ? 14 : 22}%, ${s.shell === 'plain' || s.shell === 'outline' ? 'transparent' : s.shellBg});
  }
}

.burger:active {
  scale: 0.94;
}

.burger-input:focus-visible + .burger {
  outline: 2px solid ${s.accent};
  outline-offset: 3px;
}

.burger-icon {
  position: relative;
  flex: none;
  width: ${s.barWidth}px;
  height: ${s.barWidth}px;
  transition: rotate ${D}ms ${ease};
}

.burger-bar {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: ${s.barHeight}px;
  margin-top: ${-s.barHeight / 2}px;
  border-radius: ${s.barHeight}px;
  background: currentColor;${origin}
  transition: ${closeTransition};
}

.burger-top {
  ${layout.top}
}

${s.lines === 3 && layout.mid !== 'translate: 0px 0px;' ? `.burger-mid {\n  ${layout.mid}\n}\n\n` : ''}.burger-bot {
  ${layout.bot}
}

${on} .burger-bar {
  transition: ${openTransition};
}

${on} .burger-top {
  ${open.top}
}

${s.lines === 3 && open.mid ? `${on} .burger-mid {\n  ${open.mid}\n}\n\n` : ''}${on} .burger-bot {
  ${open.bot}
}${open.icon ? `\n\n${on} .burger-icon {\n  ${open.icon}\n}` : ''}${color}${
    labeled
      ? `

.burger-text {
  display: grid;
  font: 500 14px/1 system-ui, -apple-system, 'Segoe UI', sans-serif;
  letter-spacing: 0.01em;
}

.burger-text > span {
  grid-area: 1 / 1;
  transition: opacity ${H}ms ease-out, translate ${H}ms ease-out;
}

.burger-text > span + span,
${on} .burger-text > span:first-child {
  opacity: 0;
  translate: 0 4px;
}

${on} .burger-text > span + span {
  opacity: 1;
  translate: 0 0;
}`
      : ''
  }

@media (prefers-reduced-motion: reduce) {
  .burger-bar,
  .burger-icon,
  .burger-text > span {
    transition-duration: 140ms !important;
    transition-delay: 0s !important;
    transition-timing-function: ease-out !important;
  }

  ${on} .burger-icon {
    rotate: none;
  }
}`
  return prefix === 'burger' ? css : css.replace(/\.burger/g, `.${prefix}`)
}

export function hamburgerHtml(raw: HamburgerState, prefix = 'burger'): string {
  const s = normalizeHamburger(raw)
  const bars = (s.lines === 3 ? ['top', 'mid', 'bot'] : ['top', 'bot'])
    .map((b) => `\n      <span class="${prefix}-bar ${prefix}-${b}"></span>`)
    .join('')
  const text = s.shell === 'labeled' ? `\n    <span class="${prefix}-text" aria-hidden="true"><span>Menu</span><span>Close</span></span>` : ''
  return `<input class="${prefix}-input" type="checkbox" id="${prefix}-toggle" aria-label="Toggle navigation menu" aria-controls="site-menu" />
<label class="${prefix}" for="${prefix}-toggle">
    <span class="${prefix}-icon" aria-hidden="true">${bars}
    </span>${text}
</label>`
}

export function hamburgerVars(raw: HamburgerState): Record<string, string> {
  const s = normalizeHamburger(raw)
  return {
    '--burger-accent': s.accent,
    '--burger-bar': s.barColor,
    '--burger-shell': s.shellBg,
    '--burger-duration': `${s.duration}ms`
  }
}

export function randomizeHamburger(s: HamburgerState, rng: import('../rng').Rng): HamburgerState {
  const h = Math.floor(rng.range(0, 360))
  return {
    ...normalizeHamburger(s),
    lines: rng.chance(0.75) ? 3 : 2,
    morph: rng.pick(BURGER_MORPHS.map((m) => m.value)),
    bars: rng.pick(BURGER_BARS.map((m) => m.value)),
    shell: rng.pick(BURGER_SHELLS.map((m) => m.value)),
    accentOnOpen: rng.chance(0.4),
    accent: hslToHex({ h, s: 80, l: 55 }),
    barColor: hslToHex({ h, s: 15, l: 96 }),
    shellBg: hslToHex({ h, s: 12, l: 17 }),
    pageBg: rng.chance(0.3) ? '#ffffff' : hslToHex({ h, s: 10, l: 8 }),
    size: rng.pick([40, 44, 48, 52]),
    barWidth: rng.pick([18, 20, 22, 24]),
    barHeight: rng.pick([2, 2, 3]),
    gap: rng.pick([4, 5, 6]),
    radius: rng.pick([8, 12, 16]),
    duration: rng.pick([260, 320, 360, 440])
  }
}

const p = (o: Partial<HamburgerState>): HamburgerState => ({ ...DEFAULT_HAMBURGER, ...o })

export const PRESETS_HAMBURGER: { name: string; tags: string[]; state: HamburgerState }[] = [
  { name: 'Squeeze', tags: ['classic'], state: p({}) },
  { name: 'Classic Cross', tags: ['classic'], state: p({ morph: 'x', shell: 'plain' }) },
  { name: 'Spin Circle', tags: ['motion'], state: p({ morph: 'spin', shell: 'circle', accentOnOpen: true }) },
  { name: 'Elastic Pop', tags: ['playful'], state: p({ morph: 'elastic', shell: 'circle', shellBg: '#7c3aed', accent: '#fde047', duration: 520 }) },
  { name: 'Slide Away', tags: ['motion'], state: p({ morph: 'slide', shell: 'outline' }) },
  { name: 'Back Arrow', tags: ['arrow'], state: p({ morph: 'arrow-left', shell: 'plain', bars: 'equal' }) },
  { name: 'Forward Arrow', tags: ['arrow'], state: p({ morph: 'arrow-right', shell: 'rounded', shellBg: '#1e293b' }) },
  { name: 'Chevron Drop', tags: ['dropdown'], state: p({ morph: 'chevron', shell: 'outline', lines: 3 }) },
  { name: 'Minus Fold', tags: ['minimal'], state: p({ morph: 'minus', shell: 'plain', accentOnOpen: true }) },
  { name: 'Plus Toggle', tags: ['minimal'], state: p({ morph: 'plus', lines: 2, shell: 'circle', accentOnOpen: true }) },
  { name: 'Stagger Bars', tags: ['editorial'], state: p({ bars: 'stagger', morph: 'x', shell: 'plain' }) },
  { name: 'Offset Bars', tags: ['editorial'], state: p({ bars: 'offset', morph: 'squeeze', shell: 'outline' }) },
  { name: 'Two Lines', tags: ['minimal'], state: p({ lines: 2, gap: 6, morph: 'x', shell: 'plain', barWidth: 20 }) },
  { name: 'Menu Pill', tags: ['labeled'], state: p({ shell: 'labeled', morph: 'squeeze', barWidth: 16, gap: 3, size: 44 }) },
  { name: 'Light Pill', tags: ['labeled', 'light'], state: p({ shell: 'labeled', barColor: '#18181b', shellBg: '#f4f4f5', accent: '#2563eb', barWidth: 16, gap: 3, size: 44 }) },
  { name: 'Bold Square', tags: ['bold'], state: p({ barHeight: 3, gap: 5, radius: 6, shellBg: '#fafafa', barColor: '#09090b', accent: '#f59e0b', morph: 'x' }) },
  { name: 'Light Page', tags: ['light'], state: p({ shell: 'plain', morph: 'x', barColor: '#18181b', pageBg: '#ffffff', accent: '#2563eb' }) },
  { name: 'Light Outline', tags: ['light'], state: p({ shell: 'outline', morph: 'squeeze', barColor: '#0f172a', pageBg: '#f8fafc', accent: '#0f766e' }) },
  { name: 'Neon', tags: ['neon'], state: p({ shell: 'outline', barColor: '#22d3ee', accent: '#22d3ee', morph: 'spin', barHeight: 3 }) }
]

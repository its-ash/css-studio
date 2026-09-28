export interface ScrollbarState {
  width: number
  trackColor: string
  thumbColor: string
  thumbHoverColor: string
  radius: number
  rounded: boolean
  useFirefox: boolean
}

export const DEFAULT_SCROLLBAR: ScrollbarState = {
  width: 10,
  trackColor: '#18181b',
  thumbColor: '#3f3f46',
  thumbHoverColor: '#52525b',
  radius: 999,
  rounded: true,
  useFirefox: true
}

export function scrollbarCss(s: ScrollbarState): string {
  const radius = s.rounded ? `${s.radius}px` : '0px'
  const lines = [
    `.scroll-area::-webkit-scrollbar {`,
    `  width: ${s.width}px;`,
    `  height: ${s.width}px;`,
    `}`,
    ``,
    `.scroll-area::-webkit-scrollbar-track {`,
    `  background: ${s.trackColor};`,
    `  border-radius: ${radius};`,
    `}`,
    ``,
    `.scroll-area::-webkit-scrollbar-thumb {`,
    `  background: ${s.thumbColor};`,
    `  border-radius: ${radius};`,
    `}`,
    ``,
    `.scroll-area::-webkit-scrollbar-thumb:hover {`,
    `  background: ${s.thumbHoverColor};`,
    `}`
  ]
  if (s.useFirefox) {
    lines.push(``, `.scroll-area {`, `  scrollbar-width: thin;`, `  scrollbar-color: ${s.thumbColor} ${s.trackColor};`, `}`)
  }
  return lines.join('\n')
}

export function scrollbarHtml(): string {
  return `<div class="scroll-area">\n  <!-- scrollable content -->\n</div>`
}

export function scrollbarVars(s: ScrollbarState): Record<string, string> {
  return {
    '--scrollbar-width': `${s.width}px`,
    '--scrollbar-track': s.trackColor,
    '--scrollbar-thumb': s.thumbColor,
    '--scrollbar-thumb-hover': s.thumbHoverColor
  }
}

export function randomizeScrollbar(s: ScrollbarState, rng: import('../rng').Rng): ScrollbarState {
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    width: Math.round(rng.range(6, 16)),
    trackColor: `hsl(${h} 15% 12%)`,
    thumbColor: `hsl(${h} 30% 35%)`,
    thumbHoverColor: `hsl(${h} 40% 45%)`,
    rounded: rng.chance(0.7)
  }
}

export const PRESETS_SCROLLBAR: { name: string; tags: string[]; state: ScrollbarState }[] = [
  { name: 'Zinc Thin', tags: ['dark', 'minimal'], state: { ...DEFAULT_SCROLLBAR } },
  { name: 'Emerald Accent', tags: ['brand'], state: { ...DEFAULT_SCROLLBAR, thumbColor: '#10b981', thumbHoverColor: '#34d399', trackColor: '#0a0a0b' } },
  { name: 'Square Edge', tags: ['mono'], state: { ...DEFAULT_SCROLLBAR, rounded: false, width: 12, thumbColor: '#52525b', trackColor: '#18181b' } },
  { name: 'Wide Light', tags: ['light'], state: { ...DEFAULT_SCROLLBAR, width: 14, trackColor: '#f4f4f5', thumbColor: '#d4d4d8', thumbHoverColor: '#a1a1aa' } },
  { name: 'Hairline', tags: ['minimal'], state: { ...DEFAULT_SCROLLBAR, width: 5, thumbColor: '#3f3f46', trackColor: 'transparent' } },
  { name: 'Ocean', tags: ['cool'], state: { ...DEFAULT_SCROLLBAR, thumbColor: '#0ea5e9', thumbHoverColor: '#38bdf8', trackColor: '#0c1a24' } },
  { name: 'Violet Glow', tags: ['brand', 'playful'], state: { ...DEFAULT_SCROLLBAR, thumbColor: '#8b5cf6', thumbHoverColor: '#a78bfa', trackColor: '#150f24' } },
  { name: 'Invisible Track', tags: ['minimal', 'dark'], state: { ...DEFAULT_SCROLLBAR, trackColor: 'transparent', thumbColor: '#3f3f4680', width: 8 } }
]

// ---------------------------------------------------------------------------
// Scroll-driven animations (CSS animation-timeline)
// ---------------------------------------------------------------------------

export type ScrollDriveKind =
  | 'progress-bar' | 'progress-ring' | 'read-indicator' | 'reveal-up' | 'reveal-left' | 'reveal-scale' | 'reveal-blur' | 'parallax' | 'rotate' | 'count-numbers'

export type ScrollTimeline = 'scroll' | 'view'

export interface ScrollAnimState {
  kind: ScrollDriveKind
  timeline: ScrollTimeline
  /** view() inset in percent, e.g. entry range start. */
  viewStart: number
  viewEnd: number
  rangeStart: number
  rangeEnd: number
  target: string
  accent: string
  bg: string
  width: number
  /** px of parallax shift / reveal distance */
  distance: number
  /** rotation degrees for rotate kind */
  rotate: number
}

export const SCROLL_KINDS: { value: ScrollDriveKind; label: string; timeline: ScrollTimeline }[] = [
  { value: 'progress-bar', label: 'Progress Bar', timeline: 'scroll' },
  { value: 'progress-ring', label: 'Progress Ring', timeline: 'scroll' },
  { value: 'read-indicator', label: 'Read Indicator', timeline: 'scroll' },
  { value: 'reveal-up', label: 'Reveal Up', timeline: 'view' },
  { value: 'reveal-left', label: 'Reveal Left', timeline: 'view' },
  { value: 'reveal-scale', label: 'Reveal Scale', timeline: 'view' },
  { value: 'reveal-blur', label: 'Reveal Blur', timeline: 'view' },
  { value: 'parallax', label: 'Parallax', timeline: 'view' },
  { value: 'rotate', label: 'Rotate on Scroll', timeline: 'view' },
  { value: 'count-numbers', label: 'Count Numbers', timeline: 'view' }
]

export const DEFAULT_SCROLL_ANIM: ScrollAnimState = {
  kind: 'progress-bar',
  timeline: 'scroll',
  viewStart: 10,
  viewEnd: 90,
  rangeStart: 0,
  rangeEnd: 100,
  target: '.progress-bar',
  accent: '#10b981',
  bg: '#09090b',
  width: 4,
  distance: 48,
  rotate: 90
}

export function clampPercent(n: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, n))
}

/** The animation-range / timeline value for the current state. */
export function scrollAnimRangeValue(s: ScrollAnimState): string {
  if (s.timeline === 'view') {
    return `view(${clampPercent(s.viewStart)}% ${clampPercent(s.viewEnd)}%)`
  }
  if (s.rangeStart === 0 && s.rangeEnd === 100) return 'scroll()'
  return `scroll() ${clampPercent(s.rangeStart)}% ${clampPercent(s.rangeEnd)}%`
}

export function scrollAnimKeyframes(s: ScrollAnimState): string {
  const d = Math.max(0, s.distance)
  switch (s.kind) {
    case 'progress-bar':
      return `@keyframes grow-x {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}`
    case 'read-indicator':
      return `@keyframes read-progress {
  from { width: 0%; }
  to { width: 100%; }
}`
    case 'progress-ring':
      return `@keyframes spin-ring {
  from { transform: rotate(-90deg); }
  to { transform: rotate(270deg); }
}`
    case 'count-numbers':
      return `@keyframes count-up {
  from { transform: translateY(0); }
  to { transform: translateY(0); }
}`
    case 'reveal-up':
      return `@keyframes reveal-up {
  from { opacity: 0; transform: translateY(${d}px); }
  to { opacity: 1; transform: translateY(0); }
}`
    case 'reveal-left':
      return `@keyframes reveal-left {
  from { opacity: 0; transform: translateX(${d}px); }
  to { opacity: 1; transform: translateX(0); }
}`
    case 'reveal-scale':
      return `@keyframes reveal-scale {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}`
    case 'reveal-blur':
      return `@keyframes reveal-blur {
  from { opacity: 0; filter: blur(12px); }
  to { opacity: 1; filter: blur(0); }
}`
    case 'parallax':
      return `@keyframes parallax {
  from { transform: translateY(${Math.round(d / 2)}px); }
  to { transform: translateY(-${Math.round(d / 2)}px); }
}`
    case 'rotate':
      return `@keyframes spin-y {
  from { transform: rotateY(0deg); }
  to { transform: rotateY(${s.rotate}deg); }
}`
    default:
      return ''
  }
}

/** The generator-facing CSS export: target selector + animation + timeline. */
export function scrollAnimCss(s: ScrollAnimState): string {
  const keyframes = scrollAnimKeyframes(s)
  const lines: string[] = []
  lines.push(`${s.target} {`)
  if (s.kind === 'progress-bar' || s.kind === 'read-indicator' || s.kind === 'progress-ring') {
    lines.push(`  transform-origin: ${s.kind === 'progress-ring' ? '50% 50%' : '0 50%'};`)
  }
  lines.push(`  animation: scroll-${s.kind} linear both;`)
  lines.push(`  animation-timeline: ${s.timeline === 'view' ? 'view()' : 'scroll()'};`)
  if (s.timeline === 'view' || s.rangeStart !== 0 || s.rangeEnd !== 100) {
    lines.push(`  animation-range: ${scrollAnimRangeValue(s)};`)
  }
  lines.push(`}`)
  if (keyframes) lines.push('', keyframes)
  return lines.join('\n')
}

export function scrollAnimHtml(): string {
  return `<div class="progress-bar"></div>`
}

export function scrollAnimVars(s: ScrollAnimState): Record<string, string> {
  return {
    '--scroll-accent': s.accent,
    '--scroll-bg': s.bg,
    '--scroll-distance': `${s.distance}px`
  }
}

export function randomizeScrollAnim(s: ScrollAnimState, rng: import('../rng').Rng): ScrollAnimState {
  const kind = rng.pick(SCROLL_KINDS.map((k) => k.value))
  const meta = SCROLL_KINDS.find((k) => k.value === kind)!
  const palette = ['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#f43f5e', '#22d3ee']
  const target = kind === 'progress-bar' ? '.progress-bar' : kind === 'read-indicator' ? '.read-indicator' : kind === 'progress-ring' ? '.ring' : kind === 'rotate' ? '.rotator' : kind === 'parallax' ? '.parallax' : '.reveal'
  return {
    ...s,
    kind,
    timeline: meta.timeline,
    target,
    accent: rng.pick(palette),
    distance: Math.round(rng.range(24, 96)),
    rotate: Math.round(rng.range(45, 270)),
    viewStart: rng.pick([0, 5, 10]),
    viewEnd: rng.pick([85, 90, 100]),
    rangeStart: 0,
    rangeEnd: 100
  }
}

export const PRESETS_SCROLL_ANIM: { name: string; tags: string[]; state: ScrollAnimState }[] = [
  { name: 'Top Progress Bar', tags: ['progress'], state: { ...DEFAULT_SCROLL_ANIM, kind: 'progress-bar', target: '.progress-bar', accent: '#10b981', width: 4 } },
  { name: 'Read Indicator', tags: ['progress', 'thin'], state: { ...DEFAULT_SCROLL_ANIM, kind: 'read-indicator', target: '.read-indicator', accent: '#0ea5e9', width: 3 } },
  { name: 'Reveal Up', tags: ['view', 'reveal'], state: { ...DEFAULT_SCROLL_ANIM, kind: 'reveal-up', timeline: 'view', target: '.reveal', distance: 48, viewStart: 5, viewEnd: 90 } },
  { name: 'Scale In', tags: ['view', 'reveal'], state: { ...DEFAULT_SCROLL_ANIM, kind: 'reveal-scale', timeline: 'view', target: '.reveal', viewStart: 10, viewEnd: 90 } },
  { name: 'Blur In', tags: ['view', 'reveal', 'smooth'], state: { ...DEFAULT_SCROLL_ANIM, kind: 'reveal-blur', timeline: 'view', target: '.reveal', viewStart: 0, viewEnd: 80 } },
  { name: 'Parallax Float', tags: ['view', 'parallax'], state: { ...DEFAULT_SCROLL_ANIM, kind: 'parallax', timeline: 'view', target: '.parallax', distance: 80, viewStart: 0, viewEnd: 100 } },
  { name: 'Scroll Rotate', tags: ['view', 'rotate'], state: { ...DEFAULT_SCROLL_ANIM, kind: 'rotate', timeline: 'view', target: '.rotator', rotate: 180, viewStart: 0, viewEnd: 100 } },
  { name: 'Count Stats', tags: ['view', 'numbers'], state: { ...DEFAULT_SCROLL_ANIM, kind: 'count-numbers', timeline: 'view', target: '.stat', viewStart: 10, viewEnd: 90 } }
]

// ---------------------------------------------------------------------------
// Tooltip builder (pure CSS, pseudo-element based)
// ---------------------------------------------------------------------------

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'
export type TooltipSkin = 'solid' | 'outline' | 'glass' | 'inverted' | 'success' | 'danger'
export type TooltipTrigger = 'hover' | 'focus'

export interface TooltipState {
  text: string
  position: TooltipPosition
  skin: TooltipSkin
  trigger: TooltipTrigger
  offset: number
  padding: number
  radius: number
  arrow: boolean
  fontSize: number
  maxWidth: number
  color: string
  bg: string
  animate: boolean
}

export const TOOLTIP_POSITIONS: { value: TooltipPosition; label: string }[] = [
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' }
]

export const TOOLTIP_SKINS: { value: TooltipSkin; label: string }[] = [
  { value: 'solid', label: 'Solid' },
  { value: 'outline', label: 'Outline' },
  { value: 'glass', label: 'Glass' },
  { value: 'inverted', label: 'Inverted' },
  { value: 'success', label: 'Success' },
  { value: 'danger', label: 'Danger' }
]

export const DEFAULT_TOOLTIP: TooltipState = {
  text: 'Tooltip text',
  position: 'top',
  skin: 'solid',
  trigger: 'hover',
  offset: 8,
  padding: 6,
  radius: 8,
  arrow: true,
  fontSize: 13,
  maxWidth: 220,
  color: '#fafafa',
  bg: '#18181b',
  animate: true
}

const SKIN_OVERRIDES: Record<TooltipSkin, { bg: string | null; color: string | null }> = {
  solid: { bg: null, color: null },
  outline: { bg: 'transparent', color: 'var(--tooltip-bg)' },
  glass: { bg: 'rgba(24, 24, 27, .72)', color: null },
  inverted: { bg: '#fafafa', color: '#18181b' },
  success: { bg: '#052e26', color: '#34d399' },
  danger: { bg: '#2b0409', color: '#fb7185' }
}

export function tooltipCss(s: TooltipState): string {
  const bg = SKIN_OVERRIDES[s.skin].bg ?? s.bg
  const color = SKIN_OVERRIDES[s.skin].color ?? s.color
  const o = Math.max(0, s.offset)
  const pad = Math.max(2, s.padding)
  const arrow = Math.max(6, Math.round(s.fontSize * 0.45))

  const arrowPos: Record<TooltipPosition, string> = {
    top: `bottom: calc(100% + ${o}px); left: 50%; transform: translateX(-50%);`,
    bottom: `top: calc(100% + ${o}px); left: 50%; transform: translateX(-50%);`,
    left: `right: calc(100% + ${o}px); top: 50%; transform: translateY(-50%);`,
    right: `left: calc(100% + ${o}px); top: 50%; transform: translateY(-50%);`
  }

  const arrowBorder: Record<TooltipPosition, [string, string]> = {
    top: [`border-color: ${bg} transparent transparent transparent`, `top: -${arrow}px`],
    bottom: [`border-color: transparent transparent ${bg} transparent`, `bottom: -${arrow}px`],
    left: [`border-color: transparent transparent transparent ${bg}`, `left: -${arrow}px`],
    right: [`border-color: transparent ${bg} transparent transparent`, `right: -${arrow}px`]
  }

  const arrowCss = s.arrow
    ? `
.tooltip[data-tip]::after {
  content: "";
  position: absolute;
  ${arrowBorder[s.position][1]};
  border-width: ${arrow}px;
  border-style: solid;
  ${arrowBorder[s.position][0]};
  pointer-events: none;
}`
    : ''

  const triggerSel = s.trigger === 'focus' ? ':focus-visible' : ':hover'
  const shift: Record<TooltipPosition, string> = {
    top: 'translateY(2px)',
    bottom: 'translateY(-2px)',
    left: 'translateX(2px)',
    right: 'translateX(-2px)'
  }
  const unshift: Record<TooltipPosition, string> = {
    top: 'translateY(0)',
    bottom: 'translateY(0)',
    left: 'translateX(0)',
    right: 'translateX(0)'
  }
  const animCss = s.animate
    ? `
  opacity: 0;
  ${shift[s.position]};
  transition: opacity 160ms ease-out, transform 160ms ease-out;
`
    : ''

  return `.tooltip {
  position: relative;
}
.tooltip[data-tip]::before {
  content: attr(data-tip);
  position: absolute;
  z-index: 10;
  ${arrowPosCss(s, o)}
  max-width: ${s.maxWidth}px;
  padding: ${s.padding}px 10px;
  border-radius: ${s.radius}px;
  font-size: ${s.fontSize}px;
  line-height: 1.4;
  white-space: normal;
  text-align: center;
  pointer-events: none;
  background: ${bg};
  color: ${color};
  ${s.skin === 'outline' ? `box-shadow: 0 0 0 1px ${s.bg};` : ''}
  ${s.skin === 'glass' ? 'backdrop-filter: blur(8px);' : ''}
  ${animCss ? animCss.trim() : ''}
}
${arrowCss}
.tooltip[data-tip]${triggerSel}::before {
  opacity: 1;
  ${s.animate ? unshift[s.position] + ';' : ''}
}
@media (prefers-reduced-motion: reduce) {
  .tooltip[data-tip]::before { transition: opacity 120ms ease; transform: none; }
}`
}

function arrowPosCss(s: TooltipState, o: number): string {
  switch (s.position) {
    case 'top': return `bottom: calc(100% + ${o}px); left: 50%; margin-left: 0; transform: translateX(-50%);`
    case 'bottom': return `top: calc(100% + ${o}px); left: 50%; transform: translateX(-50%);`
    case 'left': return `right: calc(100% + ${o}px); top: 50%; transform: translateY(-50%);`
    case 'right': return `left: calc(100% + ${o}px); top: 50%; transform: translateY(-50%);`
  }
}

export function tooltipHtml(): string {
  return `<button class="tooltip" data-tip="Tooltip text">Hover me</button>`
}

export function tooltipVars(s: TooltipState): Record<string, string> {
  return {
    '--tooltip-bg': s.bg,
    '--tooltip-color': s.color,
    '--tooltip-offset': `${s.offset}px`,
    '--tooltip-radius': `${s.radius}px`
  }
}

export function randomizeTooltip(s: TooltipState, rng: import('../rng').Rng): TooltipState {
  const texts = ['Save changes', 'Keyboard shortcuts', 'Copied to clipboard', 'Beta feature', 'Double-click to edit', 'Filter by status', 'Share this view', 'Required field']
  const palette: [string, string][] = [
    ['#fafafa', '#18181b'],
    ['#02120c', '#34d399'],
    ['#2b0409', '#fb7185'],
    ['#0c1a24', '#7dd3fc'],
    ['#150f24', '#c4b5fd'],
    ['#18181b', '#fbbf24']
  ]
  const pair = rng.pick(palette)
  return {
    ...s,
    text: rng.pick(texts),
    position: rng.pick(['top', 'bottom', 'left', 'right'] as const),
    skin: rng.pick(['solid', 'outline', 'glass', 'inverted', 'success', 'danger'] as const),
    arrow: rng.chance(0.75),
    radius: rng.pick([0, 6, 8, 999]),
    color: pair[1]!,
    bg: pair[0]!,
    animate: rng.chance(0.8)
  }
}

export const PRESETS_TOOLTIP: { name: string; tags: string[]; state: TooltipState }[] = [
  { name: 'Dark Solid', tags: ['dark'], state: { ...DEFAULT_TOOLTIP } },
  { name: 'Light Inverted', tags: ['light'], state: { ...DEFAULT_TOOLTIP, skin: 'inverted', bg: '#fafafa', color: '#18181b' } },
  { name: 'Outline', tags: ['mono'], state: { ...DEFAULT_TOOLTIP, skin: 'outline', radius: 0, bg: '#e4e4e7', color: '#18181b' } },
  { name: 'Glass', tags: ['frosted'], state: { ...DEFAULT_TOOLTIP, skin: 'glass' } },
  { name: 'Success Tip', tags: ['semantic'], state: { ...DEFAULT_TOOLTIP, skin: 'success', text: 'Saved successfully' } },
  { name: 'Danger Tip', tags: ['semantic'], state: { ...DEFAULT_TOOLTIP, skin: 'danger', text: 'Cannot delete this item' } },
  { name: 'Focus Only', tags: ['a11y'], state: { ...DEFAULT_TOOLTIP, trigger: 'focus', text: 'Press Enter to submit' } },
  { name: 'Pill Left', tags: ['placement'], state: { ...DEFAULT_TOOLTIP, position: 'left', radius: 999, text: 'Keyboard: ⌘K' } }
]

// ---------------------------------------------------------------------------
// Marquee builder (infinite horizontal scroll)
// ---------------------------------------------------------------------------

export type MarqueeDirection = 'left' | 'right'
export type MarqueeContent = 'text' | 'logos'

export interface MarqueeState {
  text: string
  direction: MarqueeDirection
  duration: number
  gap: number
  fontSize: number
  fontWeight: number
  uppercase: boolean
  mono: boolean
  color: string
  bg: string
  pauseOnHover: boolean
  repeat: number
  edgeFade: boolean
  rotate: number
}

export const DEFAULT_MARQUEE: MarqueeState = {
  text: 'Free • Pure CSS • No JavaScript • Copy & Paste',
  direction: 'left',
  duration: 20,
  gap: 48,
  fontSize: 16,
  fontWeight: 600,
  uppercase: false,
  mono: false,
  color: '#e4e4e7',
  bg: '#09090b',
  pauseOnHover: true,
  repeat: 4,
  edgeFade: true,
  rotate: 0
}

export function marqueeCss(s: MarqueeState): string {
  const track = s.mono ? '"JetBrains Mono", ui-monospace, monospace' : 'inherit'
  const dir = s.direction === 'right' ? 'reverse' : 'normal'
  return `.marquee {
  overflow: hidden;
  ${s.rotate !== 0 ? `transform: rotate(${s.rotate}deg);` : ''}
  ${s.edgeFade ? `mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);` : ''}
  background: ${s.bg};
}
.marquee-track {
  display: flex;
  gap: ${s.gap}px;
  width: max-content;
  animation: marquee-scroll ${s.duration}s linear infinite;
  animation-direction: ${dir};
}
.marquee-track > span {
  font-size: ${s.fontSize}px;
  font-weight: ${s.fontWeight};
  font-family: ${track};
  ${s.uppercase ? 'text-transform: uppercase;' : ''}
  letter-spacing: ${s.uppercase ? '.08em' : '0'};
  color: ${s.color};
  white-space: nowrap;
}
${s.pauseOnHover ? `.marquee:hover .marquee-track {
  animation-play-state: paused;
}` : ''}
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}`.replace('s.weight()', `${s.fontWeight}`)
}

export function marqueeKeyframes(): string {
  return `@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}`
}

export function marqueeHtml(s: MarqueeState): string {
  const item = `<span>${s.text.replace(/</g, '&lt;')}</span>`
  const items = Array.from({ length: Math.max(2, s.repeat) }, () => item).join('')
  return `<div class="marquee">\n  <div class="marquee-track">${items}</div>\n</div>`
}

export function marqueeVars(s: MarqueeState): Record<string, string> {
  return {
    '--marquee-duration': `${s.duration}s`,
    '--marquee-gap': `${s.gap}px`,
    '--marquee-color': s.color,
    '--marquee-bg': s.bg
  }
}

export function randomizeMarquee(s: MarqueeState, rng: import('../rng').Rng): MarqueeState {
  const texts = [
    'Free • Pure CSS • No JavaScript',
    'New drop — 12 tileable patterns',
    'Open Source • MIT License',
    'Fast • Accessible • Responsive',
    'Made with CSS Studio',
    'Now with scroll-driven animations'
  ]
  const palette: [string, string][] = [
    ['#e4e4e7', '#09090b'],
    ['#34d399', '#02120c'],
    ['#fbbf24', '#1c1917'],
    ['#7dd3fc', '#0c1a24'],
    ['#c4b5fd', '#150f24']
  ]
  const pair = rng.pick(palette)
  return {
    ...s,
    text: rng.pick(texts),
    direction: rng.chance(0.7) ? 'left' : 'right',
    duration: Math.round(rng.range(8, 30)),
    gap: rng.pick([24, 32, 48, 64]),
    fontSize: Math.round(rng.range(12, 28)),
    fontWeight: rng.pick([400, 500, 600, 700, 800]),
    uppercase: rng.chance(0.5),
    mono: rng.chance(0.25),
    color: pair[0]!,
    bg: pair[1]!,
    pauseOnHover: rng.chance(0.7),
    edgeFade: rng.chance(0.7),
    rotate: rng.pick([0, 0, 0, -3, 2])
  }
}

export const PRESETS_MARQUEE: { name: string; tags: string[]; state: MarqueeState }[] = [
  { name: 'Studio Ticker', tags: ['dark'], state: { ...DEFAULT_MARQUEE } },
  { name: 'Retro Reverse', tags: ['mono'], state: { ...DEFAULT_MARQUEE, direction: 'right', mono: true, uppercase: true, gap: 32, duration: 14 } },
  { name: 'Mint Ribbon', tags: ['brand'], state: { ...DEFAULT_MARQUEE, text: 'Now available — CSS Studio v2', color: '#052e26', bg: '#34d399', fontWeight: 700, duration: 16 } },
  { name: 'Slow Drift', tags: ['calm'], state: { ...DEFAULT_MARQUEE, duration: 40, gap: 80, fontSize: 13, fontWeight: 400, color: '#a1a1aa' } },
  { name: 'Hazard Tape', tags: ['bold'], state: { ...DEFAULT_MARQUEE, text: 'UNDER CONSTRUCTION — DO NOT CROSS', uppercase: true, fontWeight: 800, bg: '#f59e0b', color: '#1c1917', duration: 10, rotate: -2 } },
  { name: 'Tilted News', tags: ['editorial'], state: { ...DEFAULT_MARQUEE, text: 'Breaking: CSS can do that', rotate: 2, fontSize: 18, duration: 18 } },
  { name: 'Pulse Dot', tags: ['minimal'], state: { ...DEFAULT_MARQUEE, text: 'All systems operational', color: '#34d399', fontSize: 12, mono: true, gap: 24, duration: 24 } },
  { name: 'Big Type', tags: ['display'], state: { ...DEFAULT_MARQUEE, text: 'SCROLL INFINITY', uppercase: true, fontWeight: 900, fontSize: 32, duration: 30, gap: 64 } }
]

// ---------------------------------------------------------------------------
// Variable font playground (font-variation-settings)
// ---------------------------------------------------------------------------

export interface VarFontState {
  text: string
  family: string
  weight: number
  /** optical size (opsz) axis, if supported */
  opticalSize: number
  /** slant (slnt), negative = lean left */
  slant: number
  /** custom axis name + value pairs are beyond scope; width axis: */
  width: number
  size: number
  color: string
  bg: string
  lineHeight: number
  tracking: number
  animateWeight: boolean
  weightDuration: number
}

export const VAR_FONTS = [
  { family: 'Roboto Flex', axes: 'wght 100-900, opsz 8-144, slnt 0-10' },
  { family: 'Inter', axes: 'wght 100-900, opsz 14-32' },
  { family: 'Fraunces', axes: 'wght 100-900, opsz 9-144, SOFT 0-100' },
  { family: 'Raleway', axes: 'wght 100-900' }
]

export const DEFAULT_VAR_FONT: VarFontState = {
  text: 'Variable',
  family: 'Roboto Flex',
  weight: 400,
  opticalSize: 24,
  slant: 0,
  width: 100,
  size: 72,
  color: '#e4e4e7',
  bg: '#09090b',
  lineHeight: 1.1,
  tracking: 0,
  animateWeight: false,
  weightDuration: 4
}

export function varFontCss(s: VarFontState): string {
  const axes: string[] = [`'wght' ${s.weight}`]
  if (s.opticalSize !== 24) axes.push(`'opsz' ${s.opticalSize}`)
  if (s.slant !== 0) axes.push(`'slnt' ${s.slant}`)
  if (s.width !== 100) axes.push(`'wdth' ${s.width}`)
  const anim = s.animateWeight
    ? `
  animation: vf-weight ${s.weightDuration}s ease-in-out infinite alternate;
`
    : ''
  const otherAxes = axes.filter((a) => !a.startsWith(`'wght'`))
  const from = axesCss(s, 100)
  const to = otherAxes.length ? `'wght' 900, ${otherAxes.join(', ')}` : `'wght' 900`
  const keyframes = s.animateWeight
    ? `

@keyframes vf-weight {
  from { font-variation-settings: ${from}; }
  to { font-variation-settings: ${to}; }
}`
    : ''
  return `.variable-font {
  font-family: "${s.family}", sans-serif;
  font-variation-settings: ${axes.join(', ')};
  font-size: ${s.size}px;
  line-height: ${s.lineHeight};
  letter-spacing: ${s.tracking}em;
  color: ${s.color};
  background: ${s.bg};${anim ? anim.trimEnd() : ''}
}${keyframes}`
}

function axesCss(s: VarFontState, weight: number): string {
  const list: string[] = [`'wght' ${weight}`]
  if (s.opticalSize !== 24) list.push(`'opsz' ${s.opticalSize}`)
  if (s.slant !== 0) list.push(`'slnt' ${s.slant}`)
  if (s.width !== 100) list.push(`'wdth' ${s.width}`)
  return list.join(', ')
}

export function varFontHtml(s: VarFontState): string {
  return `<p class="variable-font">${s.text.replace(/</g, '&lt;')}</p>`
}

export function varFontVars(s: VarFontState): Record<string, string> {
  return {
    '--vf-weight': `${s.weight}`,
    '--vf-size': `${s.size}px`
  }
}

export function randomizeVarFont(s: VarFontState, rng: import('../rng').Rng): VarFontState {
  const words = ['Fluid', 'Variable', 'Optical', 'Weights', 'Axes', 'Responsive', 'Dynamic', 'Kinetic']
  return {
    ...s,
    text: rng.pick(words),
    family: rng.pick(VAR_FONTS.map((f) => f.family)),
    weight: Math.round(rng.range(100, 900) / 50) * 50,
    opticalSize: Math.round(rng.range(14, 144)),
    slant: rng.chance(0.4) ? 0 : Math.round(rng.range(-10, 0)),
    width: rng.chance(0.5) ? 100 : Math.round(rng.range(75, 125)),
    size: Math.round(rng.range(40, 110)),
    animateWeight: rng.chance(0.4),
    weightDuration: Math.round(rng.range(2, 6))
  }
}

export const PRESETS_VAR_FONT: { name: string; tags: string[]; state: VarFontState }[] = [
  { name: 'Feather', tags: ['light'], state: { ...DEFAULT_VAR_FONT, weight: 100, opticalSize: 144, tracking: .01 } },
  { name: 'Black Poster', tags: ['heavy'], state: { ...DEFAULT_VAR_FONT, weight: 900, opticalSize: 144, size: 96 } },
  { name: 'Animated Weight', tags: ['animated'], state: { ...DEFAULT_VAR_FONT, text: 'Fluid Type', animateWeight: true, weightDuration: 3, size: 88 } },
  { name: 'Condensed', tags: ['width'], state: { ...DEFAULT_VAR_FONT, text: 'NARROW', width: 62.5, weight: 700, size: 90 } },
  { name: 'Expanded', tags: ['width'], state: { ...DEFAULT_VAR_FONT, text: 'WIDE', width: 151, weight: 500, size: 64 } },
  { name: 'Optical Max', tags: ['opsz'], state: { ...DEFAULT_VAR_FONT, text: 'Display', opticalSize: 144, weight: 600, size: 84 } },
  { name: 'Optical Min', tags: ['opsz'], state: { ...DEFAULT_VAR_FONT, text: 'caption text', opticalSize: 8, weight: 400, size: 20, tracking: .02 } },
  { name: 'Slanted', tags: ['slnt'], state: { ...DEFAULT_VAR_FONT, text: 'Lean Back', slant: -10, weight: 500 } }
]

// ---------------------------------------------------------------------------
// Circular text ring (rotating text on a circle)
// ---------------------------------------------------------------------------

export interface TextRingState {
  text: string
  size: number
  radius: number
  fontSize: number
  fontWeight: number
  letterSpacing: number
  uppercase: boolean
  color: string
  ringColor: string
  bg: string
  spin: boolean
  spinDuration: number
  spinDirection: 'normal' | 'reverse'
  centerIcon: boolean
  repeatText: number
}

export const DEFAULT_TEXT_RING: TextRingState = {
  text: 'PURE CSS • NO JS • ',
  size: 260,
  radius: 100,
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: 2,
  uppercase: true,
  color: '#e4e4e7',
  ringColor: '#10b981',
  bg: '#09090b',
  spin: true,
  spinDuration: 14,
  spinDirection: 'normal',
  centerIcon: true,
  repeatText: 3
}

export function textRingCss(s: TextRingState): string {
  const radius = Math.max(20, Math.round(s.radius))
  return `.text-ring {
  position: relative;
  width: ${s.size}px;
  height: ${s.size}px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: ${s.bg};
  ${s.ringColor ? `border: 2px solid ${s.ringColor};` : ''}
}
.text-ring-spin {
  position: absolute;
  inset: 0;
  ${s.spin ? `animation: ring-spin ${s.spinDuration}s linear infinite;
  animation-direction: ${s.spinDirection};` : ''}
}
.text-ring-spin > span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
  font-size: ${s.fontSize}px;
  font-weight: ${s.fontWeight};
  letter-spacing: ${s.letterSpacing}px;
  ${s.uppercase ? 'text-transform: uppercase;' : ''}
  color: ${s.color};
  line-height: 1;
  pointer-events: none;
}
.text-ring-center {
  position: relative;
  z-index: 1;
  color: ${s.ringColor};
}
@media (prefers-reduced-motion: reduce) {
  .text-ring-spin { animation: none; }
}`
}

export function textRingKeyframes(): string {
  return `@keyframes ring-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`
}

export function textRingHtml(s: TextRingState): string {
  const full = Array.from({ length: Math.max(1, Math.round(s.repeatText)) }, () => s.text.trim()).join(' ')
  const chars = [...full]
  const radius = Math.max(20, Math.round(s.radius))
  const step = 360 / Math.max(1, chars.length)
  const spans = chars
    .map((ch, i) => `<span style="transform: rotate(${(step * i).toFixed(2)}deg) translate(${radius}px, -50%)">${ch === ' ' ? '&nbsp;' : ch}</span>`)
    .join('')
  return `<div class="text-ring">
  <div class="text-ring-spin" aria-hidden="true">${spans}</div>
  <span class="text-ring-center">${s.centerIcon ? '◆' : s.text.slice(0, 2).toUpperCase()}</span>
</div>`
}

export function textRingVars(s: TextRingState): Record<string, string> {
  return {
    '--ring-size': `${s.size}px`,
    '--ring-radius': `${s.radius}px`,
    '--ring-color': s.ringColor
  }
}

export function randomizeTextRing(s: TextRingState, rng: import('../rng').Rng): TextRingState {
  const texts = ['MADE WITH CSS STUDIO', 'SCROLL • EXPLORE • CREATE', 'PURE CSS RING', 'OPEN SOURCE TOOLS', 'BUILD • SHIP • REPEAT']
  const accents = ['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#f43f5e', '#22d3ee']
  return {
    ...s,
    text: rng.pick(texts),
    size: rng.pick([200, 240, 280, 320]),
    fontSize: Math.round(rng.range(10, 20)),
    fontWeight: rng.pick([400, 500, 600, 700, 800]),
    letterSpacing: Math.round(rng.range(0, 6)),
    uppercase: rng.chance(0.8),
    color: rng.pick(['#e4e4e7', '#a1a1aa', ...accents]),
    ringColor: rng.pick(accents),
    spin: rng.chance(0.75),
    spinDuration: Math.round(rng.range(8, 30)),
    spinDirection: rng.chance(0.7) ? 'normal' : 'reverse',
    centerIcon: rng.chance(0.6)
  }
}

export const PRESETS_TEXT_RING: { name: string; tags: string[]; state: TextRingState }[] = [
  { name: 'Studio Seal', tags: ['brand'], state: { ...DEFAULT_TEXT_RING } },
  { name: 'Slow Spin', tags: ['calm'], state: { ...DEFAULT_TEXT_RING, spinDuration: 30, fontSize: 12 } },
  { name: 'Fast Badge', tags: ['playful'], state: { ...DEFAULT_TEXT_RING, text: 'CSS ONLY', size: 200, spinDuration: 8, ringColor: '#f59e0b' } },
  { name: 'Reverse Spin', tags: ['direction'], state: { ...DEFAULT_TEXT_RING, spinDirection: 'reverse', ringColor: '#0ea5e9' } },
  { name: 'Static Stamp', tags: ['still'], state: { ...DEFAULT_TEXT_RING, spin: false, centerIcon: false, text: 'EST 2026' } },
  { name: 'Big Ring', tags: ['display'], state: { ...DEFAULT_TEXT_RING, size: 340, radius: 130, fontSize: 16, fontWeight: 800, letterSpacing: 4 } },
  { name: 'Violet Orbit', tags: ['color'], state: { ...DEFAULT_TEXT_RING, ringColor: '#8b5cf6', color: '#c4b5fd', bg: '#150f24' } },
  { name: 'Hairline Ring', tags: ['minimal'], state: { ...DEFAULT_TEXT_RING, ringColor: '#3f3f46', fontSize: 11, fontWeight: 400, letterSpacing: 1 } }
]

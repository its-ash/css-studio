export type FlipDirection = 'x' | 'y'
export type FlipTrigger = 'hover' | 'always'

export interface FlipCardState {
  direction: FlipDirection
  trigger: FlipTrigger
  frontBg: string
  backBg: string
  frontText: string
  backText: string
  textColor: string
  width: number
  height: number
  radius: number
  duration: number
  perspective: number
}

export const DEFAULT_FLIP_CARD: FlipCardState = {
  direction: 'y',
  trigger: 'hover',
  frontBg: '#18181b',
  backBg: '#10b981',
  frontText: 'Hover me',
  backText: 'Hello!',
  textColor: '#fafafa',
  width: 240,
  height: 160,
  radius: 16,
  duration: 600,
  perspective: 900
}

export function flipCardCss(s: FlipCardState): string {
  const rotate = s.direction === 'y' ? 'rotateY(180deg)' : 'rotateX(180deg)'
  const hoverSel = s.trigger === 'hover' ? '.flip-card:hover ' : '.flip-card.flipped '
  return `.flip-card {
  width: ${s.width}px;
  height: ${s.height}px;
  perspective: ${s.perspective}px;
  cursor: pointer;
}

.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform ${s.duration}ms cubic-bezier(0.4, 0, 0.2, 1);
}

${hoverSel}.flip-inner {
  transform: ${rotate};
}

.flip-face {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  border-radius: ${s.radius}px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  font-weight: 700;
  color: ${s.textColor};
}

.flip-front {
  background: ${s.frontBg};
  border: 1px solid ${s.textColor}22;
}

.flip-back {
  background: ${s.backBg};
  transform: ${rotate};
}`
}

export function flipCardHtml(s: FlipCardState): string {
  return `<div class="flip-card">
  <div class="flip-inner">
    <div class="flip-face flip-front">${s.frontText}</div>
    <div class="flip-face flip-back">${s.backText}</div>
  </div>
</div>`
}

export function flipCardVars(s: FlipCardState): Record<string, string> {
  return {
    '--flip-duration': `${s.duration}ms`,
    '--flip-front': s.frontBg,
    '--flip-back': s.backBg
  }
}

export function randomizeFlipCard(s: FlipCardState, rng: import('../rng').Rng): FlipCardState {
  const h1 = Math.floor(rng.range(0, 360))
  const h2 = Math.floor(rng.range(0, 360))
  return {
    ...s,
    direction: rng.chance(0.6) ? 'y' : 'x',
    frontBg: `hsl(${h1} 15% 11%)`,
    backBg: `hsl(${h2} 70% 50%)`,
    width: Math.round(rng.range(200, 300)),
    height: Math.round(rng.range(140, 200)),
    radius: rng.pick([0, 12, 16, 24]),
    duration: Math.round(rng.range(400, 900)),
    perspective: Math.round(rng.range(600, 1200))
  }
}

export const PRESETS_FLIP_CARD: { name: string; tags: string[]; state: FlipCardState }[] = [
  { name: 'Emerald Reveal', tags: ['brand'], state: { ...DEFAULT_FLIP_CARD } },
  { name: 'Vertical Flip', tags: ['3d'], state: { ...DEFAULT_FLIP_CARD, direction: 'x', backBg: '#8b5cf6' } },
  { name: 'Neon Back', tags: ['glow', 'neon'], state: { ...DEFAULT_FLIP_CARD, backBg: '#22d3ee', frontBg: '#083344', frontText: '011010' } },
  { name: 'Fast Flip', tags: ['snappy'], state: { ...DEFAULT_FLIP_CARD, duration: 350, backBg: '#f59e0b' } },
  { name: 'Deep Perspective', tags: ['3d', 'dramatic'], state: { ...DEFAULT_FLIP_CARD, perspective: 1400, duration: 800, backBg: '#f43f5e' } },
  { name: 'Square Tile', tags: ['grid'], state: { ...DEFAULT_FLIP_CARD, width: 180, height: 180, radius: 0, backBg: '#0ea5e9' } },
  { name: 'Always Flipped', tags: ['static'], state: { ...DEFAULT_FLIP_CARD, trigger: 'always', backBg: '#10b981' } },
  { name: 'Light Card', tags: ['light'], state: { ...DEFAULT_FLIP_CARD, frontBg: '#f4f4f5', backBg: '#18181b', textColor: '#fafafa' } }
]
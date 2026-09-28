export type SnapAxis = 'x' | 'y'
export type SnapType = 'x mandatory' | 'x proximity' | 'y mandatory' | 'y proximity' | 'none'
export type SnapAlign = 'start' | 'center' | 'end'

export interface ScrollSnapState {
  axis: 'x' | 'y'
  snapType: 'mandatory' | 'proximity' | 'none'
  snapAlign: SnapAlign
  cards: number
  gap: number
  cardWidth: number
  cardHeight: number
  radius: number
  accent: string
  bg: string
  hideScrollbar: boolean
  edgeFade: boolean
}

export const SNAP_TYPES: { value: ScrollSnapState['snapType']; label: string }[] = [
  { value: 'mandatory', label: 'Mandatory' },
  { value: 'proximity', label: 'Proximity' },
  { value: 'none', label: 'None (free scroll)' }
]

export const SNAP_ALIGNS: { value: SnapAlign; label: string }[] = [
  { value: 'start', label: 'Start' },
  { value: 'center', label: 'Center' },
  { value: 'end', label: 'End' }
]

export const DEFAULT_SCROLL_SNAP: ScrollSnapState = {
  axis: 'x',
  snapType: 'mandatory',
  snapAlign: 'center',
  cards: 6,
  gap: 16,
  cardWidth: 220,
  cardHeight: 140,
  radius: 12,
  accent: '#10b981',
  bg: '#09090b',
  hideScrollbar: true,
  edgeFade: true
}

export function scrollSnapCss(s: ScrollSnapState): string {
  const type = s.snapType === 'none' ? 'none' : `${s.axis} ${s.snapType}`
  return `.carousel {
  display: flex;
  gap: ${s.gap}px;
  ${s.axis === 'x' ? `overflow-x: auto;` : `flex-direction: column; overflow-y: auto;`}
  scroll-snap-type: ${type};
  background: ${s.bg};
  border-radius: ${s.radius}px;
  padding: ${Math.round(s.gap / 2)}px;
  ${s.edgeFade ? `mask-image: linear-gradient(${s.axis === 'x' ? '90deg' : '180deg'}, transparent, #000 6%, #000 94%, transparent);` : ''}
}
.carousel > * {
  scroll-snap-align: ${s.snapAlign};
  flex: 0 0 auto;
}
.carousel::-webkit-scrollbar {
  ${s.hideScrollbar ? 'display: none;' : 'height: 6px;'}
}
.carousel {
  ${s.hideScrollbar ? 'scrollbar-width: none;' : 'scrollbar-width: thin;'}
}`
}

export function scrollSnapHtml(s: ScrollSnapState): string {
  const cards = Array.from({ length: Math.max(2, s.cards) }, (_, i) => `  <div class="snap-card">${i + 1}</div>`).join('\n')
  return `<div class="carousel">\n${cards}\n</div>`
}

export function scrollSnapVars(s: ScrollSnapState): Record<string, string> {
  return {
    '--snap-gap': `${s.gap}px`,
    '--snap-accent': s.accent
  }
}

export function randomizeScrollSnap(s: ScrollSnapState, rng: import('../rng').Rng): ScrollSnapState {
  return {
    ...s,
    axis: rng.chance(0.75) ? 'x' : 'y',
    snapType: rng.pick(['mandatory', 'mandatory', 'proximity', 'none'] as const),
    snapAlign: rng.pick(['start', 'center', 'end'] as const),
    cards: Math.round(rng.range(4, 10)),
    gap: rng.pick([0, 12, 16, 24, 32]),
    cardWidth: Math.round(rng.range(160, 320)),
    cardHeight: Math.round(rng.range(110, 220)),
    radius: rng.pick([0, 8, 12, 20]),
    accent: rng.pick(['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#f43f5e', '#22d3ee'])
  }
}

export const PRESETS_SCROLL_SNAP: { name: string; tags: string[]; state: ScrollSnapState }[] = [
  { name: 'Snap Center', tags: ['carousel'], state: { ...DEFAULT_SCROLL_SNAP } },
  { name: 'Snap Start', tags: ['gallery'], state: { ...DEFAULT_SCROLL_SNAP, snapAlign: 'start', gap: 12 } },
  { name: 'Mandatory Tiles', tags: ['grid'], state: { ...DEFAULT_SCROLL_SNAP, cardWidth: 180, cardHeight: 180, radius: 20, accent: '#0ea5e9' } },
  { name: 'Proximity Peek', tags: ['soft'], state: { ...DEFAULT_SCROLL_SNAP, snapType: 'proximity', cardWidth: 260, gap: 24 } },
  { name: 'Vertical Rail', tags: ['vertical'], state: { ...DEFAULT_SCROLL_SNAP, axis: 'y', cardWidth: 280, cardHeight: 120, snapAlign: 'start' } },
  { name: 'Full Bleed', tags: ['immersive'], state: { ...DEFAULT_SCROLL_SNAP, cardWidth: 320, cardHeight: 200, gap: 0, radius: 0, edgeFade: false, accent: '#8b5cf6' } },
  { name: 'Free Scroll', tags: ['none'], state: { ...DEFAULT_SCROLL_SNAP, snapType: 'none', hideScrollbar: false, accent: '#f59e0b' } },
  { name: 'End Anchor', tags: ['steps'], state: { ...DEFAULT_SCROLL_SNAP, snapAlign: 'end', cards: 5, accent: '#f43f5e' } }
]
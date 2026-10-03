export type RatingSkin = 'stars' | 'hearts' | 'bars'

export interface RatingState {
  skin: RatingSkin
  stars: number
  rating: number
  accent: string
  emptyColor: string
  size: number
  gap: number
  hoverFill: boolean
  showValue: boolean
}

export const RATING_SKINS: { value: RatingSkin; label: string }[] = [
  { value: 'stars', label: 'Stars' },
  { value: 'hearts', label: 'Hearts' },
  { value: 'bars', label: 'Progress Bars' }
]

export const DEFAULT_RATING: RatingState = {
  skin: 'stars',
  stars: 5,
  rating: 4,
  accent: '#f59e0b',
  emptyColor: '#3f3f46',
  size: 30,
  gap: 4,
  hoverFill: true,
  showValue: true
}

export function ratingCss(s: RatingState): string {
  const fill = Math.round((s.rating / s.stars) * 100)
  if (s.skin === 'bars') {
    return `.rating-bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 260px;
}

.rating-bar-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rating-bar-label {
  font-size: 11px;
  color: ${s.emptyColor};
  width: 28px;
  text-align: right;
}

.rating-bar-track {
  flex: 1;
  height: ${Math.max(6, Math.round(s.size / 6))}px;
  border-radius: 999px;
  background: ${s.emptyColor}33;
  overflow: hidden;
}

.rating-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: ${s.accent};
}

.rating-bar-count {
  font-size: 11px;
  color: ${s.emptyColor};
  width: 30px;
}`
  }
  const symbol = s.skin === 'stars' ? '★' : '♥'
  return `.rating {
  display: inline-flex;
  align-items: center;
  gap: ${s.gap}px;
  font-size: ${s.size}px;
  line-height: 1;
}

.rating-symbol {
  color: ${s.emptyColor};
  transition: color ${s.hoverFill ? 150 : 0}ms ease, transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

${s.hoverFill ? `.rating:hover .rating-symbol {
  color: ${s.emptyColor};
}

.rating .rating-symbol:hover,
.rating .rating-symbol:hover ~ .rating-symbol {
  color: ${s.emptyColor};
}

.rating .rating-symbol:hover {
  transform: scale(1.2);
}

.rating-symbol.filled,
.rating .rating-symbol.hover-fill {
  color: ${s.accent};
}` : ''}

.rating-symbol.filled {
  color: ${s.accent};
}

.rating-value {
  margin-left: 8px;
  font-size: ${Math.round(s.size / 3)}px;
  font-weight: 700;
  color: ${s.accent};
}

/* partial fill via gradient text */
.rating-partial {
  background: linear-gradient(90deg, ${s.accent} ${fill}%, ${s.emptyColor} ${fill}%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}`
}

export function ratingHtml(s: RatingState): string {
  if (s.skin === 'bars') {
    const rows = [
      { label: '5★', pct: 62, count: '62' },
      { label: '4★', pct: 25, count: '25' },
      { label: '3★', pct: 8, count: '8' },
      { label: '2★', pct: 3, count: '3' },
      { label: '1★', pct: 2, count: '2' }
    ]
      .map((r) => `  <div class="rating-bar-row">\n    <span class="rating-bar-label">${r.label}</span>\n    <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${r.pct}%"></div></div>\n    <span class="rating-bar-count">${r.count}</span>\n  </div>`)
      .join('\n')
    return `<div class="rating-bars">\n${rows}\n</div>`
  }
  const symbol = s.skin === 'stars' ? '★' : '♥'
  const syms = Array.from({ length: s.stars }, (_, i) => {
    const isFull = i + 1 <= s.rating
    return `  <span class="rating-symbol${isFull ? ' filled' : ''}" aria-hidden="true">${symbol}</span>`
  }).join('\n')
  const value = s.showValue ? `\n  <span class="rating-value">${s.rating}/${s.stars}</span>` : ''
  return `<div class="rating" role="img" aria-label="Rated ${s.rating} out of ${s.stars}">\n${syms}${value}\n</div>`
}

export function ratingVars(s: RatingState): Record<string, string> {
  return { '--rating-accent': s.accent, '--rating-empty': s.emptyColor, '--rating-value': String(s.rating) }
}

export function randomizeRating(s: RatingState, rng: import('../rng').Rng): RatingState {
  const skins = RATING_SKINS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    skin: rng.pick(skins),
    stars: rng.pick([4, 5, 5, 10]),
    rating: Math.round(rng.range(2, 5)),
    accent: `hsl(${h} 85% 55%)`,
    size: Math.round(rng.range(22, 40)),
    gap: Math.round(rng.range(2, 8)),
    hoverFill: rng.chance(0.6)
  }
}

export const PRESETS_RATING: { name: string; tags: string[]; state: RatingState }[] = [
  { name: 'Golden Stars', tags: ['classic'], state: { ...DEFAULT_RATING } },
  { name: 'Hearts Pink', tags: ['warm'], state: { ...DEFAULT_RATING, skin: 'hearts', accent: '#f43f5e', size: 26 } },
  { name: 'Emerald Stars', tags: ['brand'], state: { ...DEFAULT_RATING, accent: '#10b981', rating: 5 } },
  { name: 'Distribution Bars', tags: ['stats'], state: { ...DEFAULT_RATING, skin: 'bars', accent: '#8b5cf6', showValue: false } },
  { name: 'Tiny Inline', tags: ['compact'], state: { ...DEFAULT_RATING, size: 18, gap: 2, rating: 3 } },
  { name: 'Ten Stars', tags: ['review'], state: { ...DEFAULT_RATING, stars: 10, rating: 7, size: 20 } },
  { name: 'Neon Stars', tags: ['neon'], state: { ...DEFAULT_RATING, accent: '#22d3ee', emptyColor: '#164e63', size: 34, glow: true } as RatingState },
  { name: 'Light Stars', tags: ['light'], state: { ...DEFAULT_RATING, emptyColor: '#d4d4d8', size: 28 } },
  { name: 'No Value', tags: ['minimal'], state: { ...DEFAULT_RATING, showValue: false, hoverFill: false } },
  { name: 'Violet Hearts', tags: ['brand'], state: { ...DEFAULT_RATING, skin: 'hearts', accent: '#8b5cf6', rating: 2, size: 32 } }
]
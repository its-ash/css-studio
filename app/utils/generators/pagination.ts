export type PaginationKind = 'numbers' | 'dots' | 'arrows' | 'pill'

export interface PaginationState {
  kind: PaginationKind
  pages: number
  active: number
  accent: string
  bg: string
  textColor: string
  size: number
  radius: number
  gap: number
  glow: boolean
}

export const PAGINATION_KINDS: { value: PaginationKind; label: string }[] = [
  { value: 'numbers', label: 'Numbers' },
  { value: 'dots', label: 'Dots' },
  { value: 'arrows', label: 'Arrows' },
  { value: 'pill', label: 'Pill Track' }
]

export const DEFAULT_PAGINATION: PaginationState = {
  kind: 'numbers',
  pages: 6,
  active: 2,
  accent: '#10b981',
  bg: '#18181b',
  textColor: '#fafafa',
  size: 36,
  radius: 10,
  gap: 6,
  glow: false
}

export function paginationCss(s: PaginationState): string {
  const shared = `.pagination {
  display: flex;
  align-items: center;
  gap: ${s.gap}px;
}

.pagination button {
  display: grid;
  place-items: center;
  min-width: ${s.size}px;
  height: ${s.size}px;
  border: none;
  border-radius: ${s.kind === 'dots' ? '999px' : `${s.radius}px`};
  background: ${s.bg};
  color: ${s.textColor};
  font-size: ${Math.round(s.size / 3)}px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 180ms ease,
    color 180ms ease,
    transform 180ms ease,
    box-shadow 180ms ease;
}

.pagination button:hover {
  background: ${s.accent}22;
  color: ${s.accent};
}

.pagination .page-active {
  background: ${s.accent};
  color: ${s.kind === 'dots' ? s.accent : s.bg};
  ${s.glow ? `box-shadow: 0 0 14px ${s.accent}66;` : ''}
}

.pagination .page-arrow {
  background: transparent;
  color: ${s.textColor}aa;
}

.pagination .page-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}`
  if (s.kind === 'dots') {
    return `${shared}

.pagination .dot {
  width: ${Math.max(8, Math.round(s.size / 3))}px;
  height: ${Math.max(8, Math.round(s.size / 3))}px;
  padding: 0;
}

.pagination .dot.page-active {
  transform: scale(1.25);
}`
  }
  return shared
}

export function paginationHtml(s: PaginationState): string {
  if (s.kind === 'dots') {
    const dots = Array.from({ length: s.pages }, (_, i) => `  <button class="dot${i + 1 === s.active ? ' page-active' : ''}" aria-label="Page ${i + 1}"></button>`).join('\n')
    return `<div class="pagination">\n${dots}\n</div>`
  }
  const nums = Array.from({ length: s.pages }, (_, i) => `  <button${i + 1 === s.active ? ' class="page-active"' : ''} aria-label="Page ${i + 1}">${s.kind === 'pill' ? String(i + 1).padStart(2, '0') : i + 1}</button>`).join('\n')
  return `<div class="pagination">
  <button class="page-arrow" aria-label="Previous">‹</button>
${nums}
  <button class="page-arrow" aria-label="Next">›</button>
</div>`
}

export function paginationVars(s: PaginationState): Record<string, string> {
  return { '--page-accent': s.accent, '--page-bg': s.bg, '--page-active': String(s.active) }
}

export function randomizePagination(s: PaginationState, rng: import('../rng').Rng): PaginationState {
  const kinds = PAGINATION_KINDS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    kind: rng.pick(kinds),
    pages: Math.round(rng.range(4, 10)),
    active: Math.round(rng.range(1, 5)),
    accent: `hsl(${h} 78% 52%)`,
    bg: `hsl(${h} 10% 12%)`,
    radius: rng.pick([0, 6, 10, 999]),
    size: Math.round(rng.range(30, 44)),
    glow: rng.chance(0.4)
  }
}

export const PRESETS_PAGINATION: { name: string; tags: string[]; state: PaginationState }[] = [
  { name: 'Emerald Numbers', tags: ['brand'], state: { ...DEFAULT_PAGINATION } },
  { name: 'Glow Dots', tags: ['glow', 'carousel'], state: { ...DEFAULT_PAGINATION, kind: 'dots', pages: 5, accent: '#22d3ee', glow: true } },
  { name: 'Pill Track', tags: ['zero-padded'], state: { ...DEFAULT_PAGINATION, kind: 'pill', pages: 8, radius: 999, accent: '#8b5cf6' } },
  { name: 'Sharp Numbers', tags: ['mono'], state: { ...DEFAULT_PAGINATION, radius: 0, accent: '#f59e0b' } },
  { name: 'Circle Active', tags: ['circle'], state: { ...DEFAULT_PAGINATION, radius: 999, size: 40, glow: true } },
  { name: 'Minimal Dots', tags: ['minimal'], state: { ...DEFAULT_PAGINATION, kind: 'dots', accent: '#a1a1aa', glow: false, pages: 7 } },
  { name: 'Warm Numbers', tags: ['warm'], state: { ...DEFAULT_PAGINATION, accent: '#f43f5e', bg: '#27272a' } },
  { name: 'Light Mode', tags: ['light'], state: { ...DEFAULT_PAGINATION, bg: '#f4f4f5', textColor: '#18181b' } }
]
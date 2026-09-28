export type MarkerStyle = 'disc' | 'circle' | 'square' | 'disclosure-closed' | 'disclosure-open' | 'dash' | 'plus' | 'arrow' | 'counter' | 'emoji-free'

export interface MarkerListState {
  items: string[]
  marker: MarkerStyle
  markerColor: string
  textColor: string
  bg: string
  fontSize: number
  fontWeight: number
  gap: number
  padding: number
  markerSize: number
  showCounter: boolean
  counterStart: number
}

export const MARKER_STYLES: { value: MarkerStyle; label: string }[] = [
  { value: 'disc', label: 'Disc' },
  { value: 'circle', label: 'Circle' },
  { value: 'square', label: 'Square' },
  { value: 'disclosure-closed', label: 'Disclosure ▸' },
  { value: 'dash', label: 'Dash' },
  { value: 'plus', label: 'Plus' },
  { value: 'arrow', label: 'Arrow' },
  { value: 'counter', label: 'Numbered' }
]

export const DEFAULT_MARKER_LIST: MarkerListState = {
  items: ['Ship the design system', 'Audit color contrast', 'Export component tokens', 'Publish changelog'],
  marker: 'disc',
  markerColor: '#10b981',
  textColor: '#e4e4e7',
  bg: '#09090b',
  fontSize: 15,
  fontWeight: 500,
  gap: 10,
  padding: 16,
  showCounter: false,
  counterStart: 1
}

const MARKER_CONTENT: Partial<Record<MarkerStyle, string>> = {
  dash: '"—"',
  plus: '"+"',
  arrow: '"→"',
  'emoji-free': '"◆"'
}

export function markerListCss(s: MarkerListState): string {
  const lines: string[] = []
  const useCounter = s.showCounter || s.marker === 'counter'
  const customGlyph = MARKER_CONTENT[s.marker]
  lines.push(`.marker-list {`)
  lines.push(`  list-style: ${customGlyph || useCounter ? 'none' : s.marker};`)
  lines.push(`  display: flex;`)
  lines.push(`  flex-direction: column;`)
  lines.push(`  gap: ${s.gap}px;`)
  lines.push(`  padding: ${s.padding}px;`)
  lines.push(`  background: ${s.bg};`)
  lines.push(`}`)
  lines.push(`.marker-list li {`)
  lines.push(`  font-size: ${s.fontSize}px;`)
  lines.push(`  font-weight: ${s.fontWeight};`)
  lines.push(`  color: ${s.textColor};`)
  if (customGlyph || useCounter) {
    lines.push(`  display: flex;`)
    lines.push(`  align-items: center;`)
    lines.push(`  gap: 10px;`)
    lines.push(`}`)
    lines.push(`.marker-list li::before {`)
    lines.push(`  content: ${useCounter ? 'counter(list-item)' : customGlyph};`)
    if (useCounter) lines.push(`  font-variant-numeric: tabular-nums;`)
    lines.push(`  color: ${s.markerColor};`)
    lines.push(`  font-weight: 700;`)
    lines.push(`  width: 1.6em;`)
    lines.push(`  text-align: center;`)
    lines.push(`  flex: 0 0 auto;`)
    lines.push(`}`)
  }
  if (useCounter) {
    lines.push(`.marker-list {`)
    lines.push(`  counter-reset: list-item ${s.counterStart - 1};`)
    lines.push(`}`)
    lines.push(`.marker-list li {`)
    lines.push(`  counter-increment: list-item;`)
  }
  lines.push(`}`)
  return lines.join('\n')
}

export function markerListHtml(s: MarkerListState): string {
  const lis = s.items.map((i) => `  <li>${i.replace(/</g, '&lt;')}</li>`).join('\n')
  return `<ul class="marker-list">\n${lis}\n</ul>`
}

export function markerListVars(s: MarkerListState): Record<string, string> {
  return {
    '--marker-color': s.markerColor,
    '--counter-start': `${s.counterStart}`
  }
}

export function randomizeMarkerList(s: MarkerListState, rng: import('../rng').Rng): MarkerListState {
  const items = ['Add dark mode tokens', 'Migrate to Tailwind v4', 'Set up CI deploy', 'Audit a11y contrast', 'Ship marquee builder', 'Refactor share URLs', 'Add command palette', 'Cache theme compile']
  const picked = [...items].sort(() => rng() - 0.5).slice(0, Math.max(3, Math.min(6, rng.int(3, 6))))
  return {
    ...s,
    items: picked,
    marker: rng.pick(MARKER_STYLES.map((m) => m.value) as MarkerStyle[]),
    markerColor: rng.pick(['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#f43f5e', '#22d3ee']),
    fontSize: Math.round(rng.range(12, 20)),
    fontWeight: rng.pick([400, 500, 600, 700]),
    gap: rng.pick([6, 10, 14, 20]),
    padding: rng.pick([12, 16, 24]),
    showCounter: rng.chance(0.5),
    counterStart: rng.int(1, 9)
  }
}

export const PRESETS_MARKER_LIST: { name: string; tags: string[]; state: MarkerListState }[] = [
  { name: 'Emerald Dots', tags: ['disc'], state: { ...DEFAULT_MARKER_LIST } },
  { name: 'Numbered Steps', tags: ['counter'], state: { ...DEFAULT_MARKER_LIST, marker: 'counter', showCounter: true, items: ['Clone the repo', 'Install dependencies', 'Run the dev server', 'Open the dashboard'] } },
  { name: 'Dash Notes', tags: ['minimal'], state: { ...DEFAULT_MARKER_LIST, marker: 'dash', fontWeight: 400, markerColor: '#a1a1aa' } },
  { name: 'Square Tasks', tags: ['todo'], state: { ...DEFAULT_MARKER_LIST, marker: 'square', markerColor: '#f59e0b' } },
  { name: 'Arrow Actions', tags: ['cta'], state: { ...DEFAULT_MARKER_LIST, marker: 'arrow', textColor: '#34d399', markerColor: '#34d399', fontWeight: 600 } },
  { name: 'Circles Quiet', tags: ['soft'], state: { ...DEFAULT_MARKER_LIST, marker: 'circle', markerColor: '#52525b', fontWeight: 400 } },
  { name: 'Diamond List', tags: ['fancy'], state: { ...DEFAULT_MARKER_LIST, marker: 'emoji-free', markerColor: '#8b5cf6', counterStart: 1 } },
  { name: 'Disclosure Menu', tags: ['menu'], state: { ...DEFAULT_MARKER_LIST, marker: 'disclosure-closed', markerColor: '#0ea5e9', showCounter: false } }
]
export interface ConicSlice {
  label: string
  value: number
  color: string
}

export interface ConicChartState {
  slices: ConicSlice[]
  size: number
  inner: number
  startAngle: number
  gap: number
  legend: boolean
  showLabels: boolean
  centerLabel: string
  bg: string
  textColor: string
}

export const DEFAULT_CONIC_CHART: ConicChartState = {
  slices: [
    { label: 'Design', value: 35, color: '#10b981' },
    { label: 'Dev', value: 30, color: '#0ea5e9' },
    { label: 'QA', value: 20, color: '#f59e0b' },
    { label: 'Docs', value: 15, color: '#8b5cf6' }
  ],
  size: 240,
  inner: 55,
  startAngle: 0,
  gap: 0,
  legend: true,
  showLabels: false,
  centerLabel: '100%',
  bg: '#09090b',
  textColor: '#e4e4e7'
}

export function conicTotal(s: ConicChartState): number {
  return Math.max(1, s.slices.reduce((n, x) => n + Math.max(0, x.value), 0))
}

/** conic-gradient value for the donut/pie. */
export function conicGradient(s: ConicChartState): string {
  const total = conicTotal(s)
  const gap = Math.max(0, s.gap) / 2
  const stops: string[] = []
  let acc = 0
  for (const slice of s.slices) {
    const share = (Math.max(0, slice.value) / total) * 100
    const from = acc + gap
    const to = acc + share - gap
    stops.push(`${slice.color} ${Math.round(from * 10) / 10}% ${Math.round(to * 10) / 10}%`)
    acc += share
  }
  if (!stops.length) return `conic-gradient(#3f3f46 0 100%)`
  return `conic-gradient(from ${s.startAngle}deg, ${stops.join(', ')})`
}

export function conicChartCss(s: ConicChartState): string {
  const donut = s.inner > 0
  return `.conic-chart {
  width: ${s.size}px;
  height: ${s.size}px;
  border-radius: 50%;
  background: ${conicGradient(s)};
  ${donut ? `mask-image: radial-gradient(circle, transparent 0 ${s.inner}%, #000 ${Math.max(0, s.inner + 1)}% 100%);` : ''}
  display: grid;
  place-items: center;
  position: relative;
}
.conic-chart-center {
  ${donut ? `position: absolute;` : ''}
  z-index: 1;
  color: ${s.textColor};
  font-weight: 700;
  text-align: center;
}
.conic-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}
.conic-legend > span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${s.textColor};
}
.conic-legend > span::before {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: var(--legend-color);
}`
}

export function conicChartHtml(s: ConicChartState): string {
  const center = s.inner > 0 && s.centerLabel ? `  <span class="conic-chart-center">${s.centerLabel.replace(/</g, '&lt;')}</span>` : ''
  const legend = s.legend
    ? `\n<div class="conic-legend">\n${s.slices.map((x) => `  <span style="--legend-color: ${x.color}">${x.label}</span>`).join('\n')}\n</div>`
    : ''
  return `<div class="conic-chart">\n${center}\n</div>${legend}`
}

export function conicChartVars(s: ConicChartState): Record<string, string> {
  return {
    '--conic-bg': conicGradient(s),
    '--conic-inner': `${s.inner}%`
  }
}

export function conicChartPreviewStyle(s: ConicChartState): Record<string, string> {
  return {
    'background-image': conicGradient(s),
    'mask-image': s.inner > 0 ? `radial-gradient(circle, transparent 0 ${s.inner}% 100%, #000 ${s.inner + 0.5}% 100%)` : 'none'
  }
}

export function randomizeConicChart(s: ConicChartState, rng: import('../rng').Rng): ConicChartState {
  const labels = ['Shipping', 'Backlog', 'Review', 'Blocked', 'Done', 'QA', 'Docs', 'Design']
  const colors = ['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#f43f5e', '#22d3ee']
  const n = rng.int(3, 6)
  const picks = [...labels].sort(() => rng() - 0.5).slice(0, n)
  const slices = picks.map((label, i) => ({ label, value: rng.int(5, 45), color: colors[i % colors.length]! }))
  return {
    ...s,
    slices,
    size: rng.pick([220, 240, 280, 320]),
    inner: rng.pick([0, 0, 45, 55, 65]),
    startAngle: rng.pick([0, 90, 180, 270]),
    gap: rng.pick([0, 0, 1, 2]),
    legend: rng.chance(0.8),
    centerLabel: rng.chance(0.6) ? 'CSS' : ''
  }
}

export const PRESETS_CONIC_CHART: { name: string; tags: string[]; state: ConicChartState }[] = [
  { name: 'Donut Stats', tags: ['donut'], state: { ...DEFAULT_CONIC_CHART, inner: 55, centerLabel: '100%' } },
  { name: 'Full Pie', tags: ['pie'], state: { ...DEFAULT_CONIC_CHART, inner: 0 } },
  { name: 'Sliced Gaps', tags: ['donut'], state: { ...DEFAULT_CONIC_CHART, gap: 1, inner: 50 } },
  { name: 'Skill Ring', tags: ['progress'], state: { ...DEFAULT_CONIC_CHART, slices: [{ label: 'CSS', value: 70, color: '#10b981' }, { label: 'Rest', value: 30, color: '#27272a' }], inner: 62, centerLabel: '70%' } },
  { name: 'Quadrant', tags: ['quarter'], state: { ...DEFAULT_CONIC_CHART, slices: [{ label: 'Q1', value: 25, color: '#10b981' }, { label: 'Q2', value: 25, color: '#0ea5e9' }, { label: 'Q3', value: 25, color: '#f59e0b' }, { label: 'Q4', value: 25, color: '#f43f5e' }], inner: 40, startAngle: 0 } },
  { name: 'Half Gauge', tags: ['gauge'], state: { ...DEFAULT_CONIC_CHART, slices: [{ label: 'Used', value: 62, color: '#0ea5e9' }, { label: 'Free', value: 38, color: '#27272a' }], inner: 58, startAngle: 270, centerLabel: '62%' } },
  { name: 'Big Donut', tags: ['display'], state: { ...DEFAULT_CONIC_CHART, size: 320, inner: 60, centerLabel: '2026' } },
  { name: 'Mono Ring', tags: ['neutral'], state: { ...DEFAULT_CONIC_CHART, slices: [{ label: 'A', value: 40, color: '#34d399' }, { label: 'B', value: 30, color: '#52525b' }, { label: 'C', value: 20, color: '#27272a' }], inner: 55, legend: false } }
]
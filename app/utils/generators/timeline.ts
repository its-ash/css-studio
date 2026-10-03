export type TimelineStyle = 'dots' | 'cards' | 'alternating' | 'compact'

export interface TimelineState {
  style: TimelineStyle
  accent: string
  bg: string
  textColor: string
  dotSize: number
  lineWidth: number
  gap: number
  radius: number
  animatedLine: boolean
}

export const TIMELINE_STYLES: { value: TimelineStyle; label: string }[] = [
  { value: 'dots', label: 'Dots' },
  { value: 'cards', label: 'Cards' },
  { value: 'alternating', label: 'Alternating' },
  { value: 'compact', label: 'Compact' }
]

export const DEFAULT_TIMELINE: TimelineState = {
  style: 'dots',
  accent: '#10b981',
  bg: '#18181b',
  textColor: '#fafafa',
  dotSize: 14,
  lineWidth: 2,
  gap: 24,
  radius: 12,
  animatedLine: false
}

const EVENTS = [
  { date: '2025-01', title: 'Project kickoff', desc: 'Scope locked and seed funded.' },
  { date: '2025-05', title: 'Beta launch', desc: 'First 1,000 users onboarded.' },
  { date: '2025-09', title: 'v1.0 release', desc: 'Public launch with 40 generators.' },
  { date: '2026-02', title: '1M renders', desc: 'Milestone crossed in February.' }
]

export function timelineCss(s: TimelineState): string {
  const lineAnim = s.animatedLine
    ? `.timeline::before {
  background: linear-gradient(180deg, ${s.accent}, ${s.accent}44, transparent);
  background-size: 100% 0%;
  background-repeat: no-repeat;
  background-position: top;
  animation: line-grow 3s ease-out forwards;
}

@keyframes line-grow {
  to {
    background-size: 100% 100%;
  }
}`
    : ''
  const layouts: Record<TimelineStyle, string> = {
    dots: `.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${s.gap}px;
  padding-left: ${s.dotSize * 2}px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: ${s.dotSize - s.lineWidth / 2}px;
  top: 6px;
  bottom: 6px;
  width: ${s.lineWidth}px;
  background: ${s.accent}33;
  border-radius: 999px;
}

.timeline-item {
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -${s.dotSize * 1.5}px;
  top: 4px;
  width: ${s.dotSize}px;
  height: ${s.dotSize}px;
  border-radius: 999px;
  background: ${s.accent};
  box-shadow: 0 0 0 4px ${s.accent}33;
}`,
    cards: `.timeline {
  display: flex;
  flex-direction: column;
  gap: ${s.gap}px;
  position: relative;
  padding-left: ${s.dotSize * 2}px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: ${s.dotSize - s.lineWidth / 2}px;
  top: 0;
  bottom: 0;
  width: ${s.lineWidth}px;
  background: linear-gradient(180deg, ${s.accent}, ${s.accent}33);
}

.timeline-card {
  border: 1px solid ${s.textColor}1f;
  border-radius: ${s.radius}px;
  background: ${s.bg};
  padding: 14px 18px;
  position: relative;
}

.timeline-card::before {
  content: '';
  position: absolute;
  left: -${s.dotSize * 1.5}px;
  top: 16px;
  width: ${s.dotSize}px;
  height: ${s.dotSize}px;
  border-radius: 999px;
  background: ${s.accent};
  box-shadow: 0 0 0 4px ${s.accent}2e;
}`,
    alternating: `.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${s.gap}px;
  max-width: 560px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: ${s.lineWidth}px;
  transform: translateX(-50%);
  background: ${s.accent}44;
}

.timeline-row {
  display: flex;
  width: 100%;
}

.timeline-row:nth-child(odd) {
  justify-content: flex-start;
}

.timeline-row:nth-child(even) {
  justify-content: flex-end;
}

.timeline-card {
  width: 46%;
  border: 1px solid ${s.textColor}1f;
  border-radius: ${s.radius}px;
  background: ${s.bg};
  padding: 14px 18px;
  position: relative;
}

.timeline-row:nth-child(odd) .timeline-card {
  border-top-right-radius: 2px;
}

.timeline-row:nth-child(even) .timeline-card {
  border-top-left-radius: 2px;
}

.timeline-row:nth-child(odd) .timeline-card::after {
  content: '';
  position: absolute;
  top: 20px;
  right: -${Math.round(s.dotSize * 0.9)}px;
  width: ${s.dotSize}px;
  height: ${s.dotSize}px;
  border-radius: 999px;
  background: ${s.accent};
  box-shadow: 0 0 0 4px ${s.accent}2e;
}

.timeline-row:nth-child(even) .timeline-card::after {
  content: '';
  position: absolute;
  top: 20px;
  left: -${Math.round(s.dotSize * 0.9)}px;
  width: ${s.dotSize}px;
  height: ${s.dotSize}px;
  border-radius: 999px;
  background: ${s.accent};
  box-shadow: 0 0 0 4px ${s.accent}2e;
}`,
    compact: `.timeline {
  display: flex;
  flex-direction: column;
  gap: ${Math.max(8, Math.round(s.gap / 3))}px;
  border-left: ${s.lineWidth}px solid ${s.accent}44;
  padding-left: 16px;
  margin-left: 8px;
}

.timeline-item {
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -${(16 + s.lineWidth / 2 + Math.max(6, s.dotSize - 4) / 2).toFixed(1)}px;
  top: 7px;
  width: ${Math.max(6, s.dotSize - 4)}px;
  height: ${Math.max(6, s.dotSize - 4)}px;
  border-radius: 999px;
  background: ${s.accent};
}`
  }
  return `${layouts[s.style]}

.timeline-date {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: ${s.accent};
  text-transform: uppercase;
}

.timeline-title {
  font-size: 15px;
  font-weight: 600;
  color: ${s.textColor};
  margin-top: 2px;
}

.timeline-desc {
  font-size: 13px;
  color: ${s.textColor}99;
  margin-top: 3px;
  line-height: 1.55;
}

${lineAnim}`
}

export function timelineHtml(s: TimelineState): string {
  const card = (e: (typeof EVENTS)[number]) => `      <span class="timeline-date">${e.date}</span>
      <div class="timeline-title">${e.title}</div>
      <div class="timeline-desc">${e.desc}</div>`
  const items = EVENTS.map((e) =>
    s.style === 'alternating'
      ? `  <div class="timeline-row">
    <div class="timeline-card">
${card(e)}
    </div>
  </div>`
      : s.style === 'cards'
        ? `  <div class="timeline-card">
${card(e)}
  </div>`
        : `  <div class="timeline-item">
${card(e)}
  </div>`
  ).join('\n')
  return `<div class="timeline">\n${items}\n</div>`
}

export function timelineVars(s: TimelineState): Record<string, string> {
  return { '--timeline-accent': s.accent, '--timeline-bg': s.bg, '--timeline-dot': `${s.dotSize}px` }
}

export function randomizeTimeline(s: TimelineState, rng: import('../rng').Rng): TimelineState {
  const styles = TIMELINE_STYLES.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    style: rng.pick(styles),
    accent: `hsl(${h} 78% 52%)`,
    bg: `hsl(${h} 10% 11%)`,
    dotSize: Math.round(rng.range(10, 20)),
    gap: Math.round(rng.range(14, 40)),
    radius: rng.pick([0, 8, 12, 16]),
    animatedLine: rng.chance(0.4)
  }
}

export const PRESETS_TIMELINE: { name: string; tags: string[]; state: TimelineState }[] = [
  { name: 'Emerald Dots', tags: ['brand'], state: { ...DEFAULT_TIMELINE } },
  { name: 'Shadow Cards', tags: ['card'], state: { ...DEFAULT_TIMELINE, style: 'cards', accent: '#8b5cf6', radius: 14 } },
  { name: 'Zigzag Story', tags: ['alternating', 'landing'], state: { ...DEFAULT_TIMELINE, style: 'alternating', accent: '#f59e0b' } },
  { name: 'Changelog', tags: ['docs', 'compact'], state: { ...DEFAULT_TIMELINE, style: 'compact', accent: '#22d3ee', gap: 12 } },
  { name: 'Animated Line', tags: ['animated'], state: { ...DEFAULT_TIMELINE, animatedLine: true } },
  { name: 'Neon Dots', tags: ['neon'], state: { ...DEFAULT_TIMELINE, accent: '#22d3ee', bg: '#083344', dotSize: 16 } },
  { name: 'Sharp Mono', tags: ['mono'], state: { ...DEFAULT_TIMELINE, radius: 0, accent: '#fafafa', bg: '#18181b' } },
  { name: 'Warm History', tags: ['warm'], state: { ...DEFAULT_TIMELINE, style: 'cards', accent: '#f43f5e' } },
  { name: 'Light Timeline', tags: ['light'], state: { ...DEFAULT_TIMELINE, bg: '#fafafa', textColor: '#18181b', style: 'cards' } }
]
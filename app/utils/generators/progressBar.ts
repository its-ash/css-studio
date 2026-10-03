export interface ProgressBarState {
  value: number
  max: number
  height: number
  radius: number
  accent: string
  trackColor: string
  gradient: boolean
  animated: boolean
  striped: boolean
  showLabel: boolean
  indeterminate: boolean
}

export const DEFAULT_PROGRESS_BAR: ProgressBarState = {
  value: 65,
  max: 100,
  height: 12,
  radius: 999,
  accent: '#10b981',
  trackColor: '#27272a',
  gradient: true,
  animated: false,
  striped: false,
  showLabel: true,
  indeterminate: false
}

export function progressBarCss(s: ProgressBarState): string {
  const pct = Math.min(100, Math.max(0, (s.value / s.max) * 100))
  const bg = s.gradient
    ? `linear-gradient(90deg, ${s.accent}, ${s.accent}aa)`
    : s.accent
  const anims: string[] = []
  if (s.animated) anims.push(`  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);`)
  if (s.striped) anims.push(`  background-image: repeating-linear-gradient(45deg, transparent 0 6px, rgba(255,255,255,0.15) 6px 12px);`)
  const fillExtra = anims.join('\n')
  return `.progress-track {
  position: relative;
  width: 320px;
  height: ${s.height}px;
  border-radius: ${s.radius}px;
  background: ${s.trackColor};
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: ${s.indeterminate ? '40%' : `${pct.toFixed(1)}%`};
  border-radius: ${s.radius}px;
  background: ${bg};
${fillExtra}
}

${s.indeterminate ? `.progress-fill {
  animation: indeterminate 1.4s ease-in-out infinite;
}

@keyframes indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}` : ''}

${s.striped && !s.indeterminate ? `.progress-fill {
  animation: stripe-slide 1s linear infinite;
}

@keyframes stripe-slide {
  to { background-position: 17px 0; }
}` : ''}

${s.showLabel ? `.progress-label {
  display: flex;
  justify-content: space-between;
  width: 320px;
  margin-bottom: 6px;
  font-size: 12px;
  color: #a1a1aa;
  font-weight: 600;
}

.progress-label b {
  color: ${s.accent};
}` : ''}`
}

export function progressBarHtml(s: ProgressBarState): string {
  const pct = Math.round((s.value / s.max) * 100)
  return `${s.showLabel ? `<div class="progress-label"><span>Uploading…</span><b>${pct}%</b></div>\n` : ''}<div class="progress-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-fill"></div>
</div>`
}

export function progressBarVars(s: ProgressBarState): Record<string, string> {
  return { '--progress-accent': s.accent, '--progress-track': s.trackColor, '--progress-value': String(s.value) }
}

export function randomizeProgressBar(s: ProgressBarState, rng: import('../rng').Rng): ProgressBarState {
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    value: Math.round(rng.range(10, 95)),
    height: Math.round(rng.range(6, 20)),
    radius: rng.pick([0, 4, 999]),
    accent: `hsl(${h} 78% 52%)`,
    trackColor: `hsl(${h} 8% 18%)`,
    gradient: rng.chance(0.6),
    striped: rng.chance(0.3),
    indeterminate: rng.chance(0.2)
  }
}

export const PRESETS_PROGRESS_BAR: { name: string; tags: string[]; state: ProgressBarState }[] = [
  { name: 'Emerald Upload', tags: ['brand'], state: { ...DEFAULT_PROGRESS_BAR } },
  { name: 'Neon Indeterminate', tags: ['neon', 'loading'], state: { ...DEFAULT_PROGRESS_BAR, indeterminate: true, accent: '#22d3ee', height: 6, showLabel: false } },
  { name: 'Striped Work', tags: ['striped'], state: { ...DEFAULT_PROGRESS_BAR, striped: true, gradient: false, value: 45 } },
  { name: 'Slim Top Bar', tags: ['minimal'], state: { ...DEFAULT_PROGRESS_BAR, height: 3, value: 80, showLabel: false, radius: 0 } },
  { name: 'Chunky Install', tags: ['bold'], state: { ...DEFAULT_PROGRESS_BAR, height: 22, value: 30, radius: 6, gradient: false } },
  { name: 'Violet Sync', tags: ['brand'], state: { ...DEFAULT_PROGRESS_BAR, accent: '#8b5cf6', value: 78 } },
  { name: 'Warm Download', tags: ['warm'], state: { ...DEFAULT_PROGRESS_BAR, accent: '#f59e0b', value: 55 } },
  { name: 'Light Track', tags: ['light'], state: { ...DEFAULT_PROGRESS_BAR, trackColor: '#e4e4e7', accent: '#10b981', value: 70 } }
]
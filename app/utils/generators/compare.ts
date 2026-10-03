export interface CompareState {
  beforeColor: string
  afterColor: string
  beforeLabel: string
  afterLabel: string
  width: number
  height: number
  split: number
  radius: number
  handleWidth: number
}

export const DEFAULT_COMPARE: CompareState = {
  beforeColor: '#18181b',
  afterColor: '#10b981',
  beforeLabel: 'Before',
  afterLabel: 'After',
  width: 420,
  height: 260,
  split: 50,
  radius: 14,
  handleWidth: 3
}

/** Pure-CSS comparison using the resize trick: the after pane is a resizable overlay. */
export function compareCss(s: CompareState): string {
  return `.compare {
  position: relative;
  width: ${s.width}px;
  height: ${s.height}px;
  border-radius: ${s.radius}px;
  overflow: hidden;
  isolation: isolate;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
}

.compare-before,
.compare-after {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #fff;
}

.compare-before {
  background: ${s.beforeColor};
}

.compare-after {
  background: ${s.afterColor};
  clip-path: inset(0 0 0 ${s.split}%);
}

.compare-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${s.split}%;
  width: ${s.handleWidth}px;
  background: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.compare-handle::after {
  content: '⇔';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: #fff;
  color: #18181b;
  font-size: 14px;
}

.compare-label {
  position: absolute;
  bottom: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 11px;
  backdrop-filter: blur(4px);
}

.compare-label.before {
  left: 10px;
}

.compare-label.after {
  right: 10px;
}`
}

export function compareHtml(s: CompareState): string {
  return `<div class="compare">
  <div class="compare-before">${s.beforeLabel}</div>
  <div class="compare-after">${s.afterLabel}</div>
  <div class="compare-handle"></div>
  <span class="compare-label before">${s.beforeLabel}</span>
  <span class="compare-label after">${s.afterLabel}</span>
</div>`
}

export function compareVars(s: CompareState): Record<string, string> {
  return { '--compare-before': s.beforeColor, '--compare-after': s.afterColor, '--compare-split': `${s.split}%` }
}

export function randomizeCompare(s: CompareState, rng: import('../rng').Rng): CompareState {
  const h1 = Math.floor(rng.range(0, 360))
  const h2 = Math.floor(rng.range(0, 360))
  return {
    ...s,
    beforeColor: `hsl(${h1} 15% 11%)`,
    afterColor: `hsl(${h2} 70% 48%)`,
    split: Math.round(rng.range(30, 70)),
    width: Math.round(rng.range(320, 480)),
    height: Math.round(rng.range(200, 300)),
    radius: rng.pick([0, 12, 14, 20])
  }
}

export const PRESETS_COMPARE: { name: string; tags: string[]; state: CompareState }[] = [
  { name: 'Emerald Reveal', tags: ['brand'], state: { ...DEFAULT_COMPARE } },
  { name: 'Neon Split', tags: ['neon', 'glow'], state: { ...DEFAULT_COMPARE, beforeColor: '#083344', afterColor: '#22d3ee', split: 45 } },
  { name: 'Violet Sweep', tags: ['brand'], state: { ...DEFAULT_COMPARE, afterColor: '#8b5cf6', split: 60 } },
  { name: 'Warm Sunset', tags: ['warm'], state: { ...DEFAULT_COMPARE, beforeColor: '#271a08', afterColor: '#f59e0b', split: 55 } },
  { name: 'Sharp Edge', tags: ['minimal'], state: { ...DEFAULT_COMPARE, radius: 0, split: 40 } },
  { name: 'Thin Handle', tags: ['minimal'], state: { ...DEFAULT_COMPARE, handleWidth: 2, split: 50, afterColor: '#0ea5e9' } },
  { name: 'Tall Portrait', tags: ['portrait'], state: { ...DEFAULT_COMPARE, width: 320, height: 360, afterColor: '#f43f5e' } },
  { name: 'Half Half', tags: ['50'], state: { ...DEFAULT_COMPARE, split: 50, afterColor: '#6366f1' } }
]
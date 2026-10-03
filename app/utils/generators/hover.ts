export type HoverKind =
  | 'lift'
  | 'glow'
  | 'underline-sweep'
  | 'fill-slide'
  | 'tilt-3d'
  | 'shadow-pop'
  | 'shine-sweep'
  | 'pulse-ring'

export interface HoverState {
  kind: HoverKind
  accent: string
  bg: string
  textColor: string
  radius: number
  duration: number
  /** px: lift distance / glow radius / shadow drop / tilt amount */
  distance: number
}

export const HOVER_KINDS: { value: HoverKind; label: string }[] = [
  { value: 'lift', label: 'Lift' },
  { value: 'glow', label: 'Glow' },
  { value: 'underline-sweep', label: 'Underline Sweep' },
  { value: 'fill-slide', label: 'Fill Slide' },
  { value: 'tilt-3d', label: '3D Tilt' },
  { value: 'shadow-pop', label: 'Shadow Pop' },
  { value: 'shine-sweep', label: 'Shine Sweep' },
  { value: 'pulse-ring', label: 'Pulse Ring' }
]

export const DEFAULT_HOVER: HoverState = {
  kind: 'lift',
  accent: '#10b981',
  bg: '#18181b',
  textColor: '#fafafa',
  radius: 12,
  duration: 200,
  distance: 6
}

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'

export function hoverCss(s: HoverState): string {
  const t = `${s.duration}ms ${EASE}`
  const base = `.hover-demo {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: 1px solid ${s.accent}33;
  border-radius: ${s.radius}px;
  background: ${s.bg};
  color: ${s.textColor};
  font-weight: 600;
  cursor: pointer;
  transition:
    transform ${t},
    box-shadow ${t},
    background-color ${t},
    color ${t},
    border-color ${t};
}`
  switch (s.kind) {
    case 'lift':
      return `${base}

.hover-demo:hover {
  transform: translateY(-${s.distance}px);
  border-color: ${s.accent};
  box-shadow: 0 ${s.distance * 2}px ${s.distance * 4}px -${s.distance}px ${s.accent}55;
}`
    case 'glow':
      return `${base}

.hover-demo:hover {
  border-color: ${s.accent};
  box-shadow: 0 0 ${s.distance * 6}px ${s.accent}66, 0 0 ${s.distance * 14}px ${s.accent}33;
}`
    case 'underline-sweep':
      return `${base}

.hover-demo::after {
  content: '';
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 8px;
  height: 2px;
  background: ${s.accent};
  transform: scaleX(0);
  transform-origin: left;
  transition: transform ${t};
}

.hover-demo:hover::after {
  transform: scaleX(1);
}`
    case 'fill-slide':
      return `${base}
  background-image: linear-gradient(${s.accent}, ${s.accent});
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: 0% 100%;
  transition:
    background-size ${t},
    color ${t},
    border-color ${t};
}

.hover-demo:hover {
  background-size: 100% 100%;
  color: ${s.bg};
  border-color: ${s.accent};
}`
    case 'tilt-3d':
      return `${base}
  transform-style: preserve-3d;
}

.hover-demo:hover {
  transform: perspective(600px) rotateX(${Math.min(10, s.distance)}deg) scale(1.03);
  border-color: ${s.accent};
}`
    case 'shadow-pop':
      return `${base}

.hover-demo:hover {
  transform: translateY(-${Math.max(2, Math.round(s.distance / 2))}px);
  box-shadow: 0 ${s.distance}px 0 0 ${s.accent};
}`
    case 'shine-sweep': {
      const sweep = `${s.duration * 3}ms ${EASE}`
      return `${base}
  overflow: hidden;
}

.hover-demo::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, ${s.accent}55 50%, transparent 70%);
  transform: translateX(-130%);
  transition: transform ${sweep};
}

.hover-demo:hover::before {
  transform: translateX(130%);
}`
    }
    case 'pulse-ring':
      return `${base}

.hover-demo::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: inherit;
  border: 2px solid ${s.accent};
  opacity: 0;
  pointer-events: none;
}

.hover-demo:hover::after {
  animation: hover-ring ${s.duration * 2}ms ease-out infinite;
}

@keyframes hover-ring {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.18);
  }
}`
  }
}

export function hoverHtml(): string {
  return `<button class="hover-demo" type="button">Hover me</button>`
}

export function hoverVars(s: HoverState): Record<string, string> {
  return {
    '--hover-accent': s.accent,
    '--hover-bg': s.bg,
    '--hover-duration': `${s.duration}ms`,
    '--hover-distance': `${s.distance}px`
  }
}

export function randomizeHover(s: HoverState, rng: import('../rng').Rng): HoverState {
  const kinds = HOVER_KINDS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    kind: rng.pick(kinds),
    accent: `hsl(${h} 80% 55%)`,
    bg: `hsl(${h} 15% 10%)`,
    textColor: `hsl(${h} 20% 96%)`,
    radius: rng.pick([0, 8, 12, 999]),
    duration: Math.round(rng.range(120, 400)),
    distance: Math.round(rng.range(3, 10))
  }
}

export const PRESETS_HOVER: { name: string; tags: string[]; state: HoverState }[] = [
  { name: 'Emerald Lift', tags: ['brand'], state: { ...DEFAULT_HOVER } },
  { name: 'Neon Glow', tags: ['glow', 'neon'], state: { ...DEFAULT_HOVER, kind: 'glow', accent: '#22d3ee', bg: '#083344', distance: 8 } },
  { name: 'Underline Ink', tags: ['minimal', 'editorial'], state: { ...DEFAULT_HOVER, kind: 'underline-sweep', accent: '#fafafa', bg: '#18181b', radius: 8 } },
  { name: 'Fill Slide', tags: ['bold'], state: { ...DEFAULT_HOVER, kind: 'fill-slide', accent: '#8b5cf6', radius: 999 } },
  { name: 'Tilt Card', tags: ['3d', 'playful'], state: { ...DEFAULT_HOVER, kind: 'tilt-3d', accent: '#f59e0b', distance: 8 } },
  { name: 'Shadow Pop', tags: ['playful'], state: { ...DEFAULT_HOVER, kind: 'shadow-pop', accent: '#f43f5e', radius: 0, distance: 6 } },
  { name: 'Shine Sweep', tags: ['shine', 'premium'], state: { ...DEFAULT_HOVER, kind: 'shine-sweep', accent: '#ffffff', bg: '#09090b', radius: 999, duration: 300 } },
  { name: 'Pulse Ring', tags: ['ring', 'attention'], state: { ...DEFAULT_HOVER, kind: 'pulse-ring', accent: '#0ea5e9', radius: 999, duration: 250 } },
  { name: 'Light Surface', tags: ['light'], state: { ...DEFAULT_HOVER, bg: '#f4f4f5', textColor: '#18181b', accent: '#10b981' } },
  { name: 'Soft Lift', tags: ['minimal', 'soft'], state: { ...DEFAULT_HOVER, kind: 'lift', accent: '#71717a', duration: 300, distance: 4 } }
]
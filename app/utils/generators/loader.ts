export type LoaderKind = 'spinner' | 'dots' | 'bars' | 'ring' | 'pulse' | 'progress' | 'skeleton' | 'wave' | 'orbit' | 'ripple' | 'square'

export interface LoaderState {
  kind: LoaderKind
  color: string
  trackColor: string
  size: number
  thickness: number
  speed: number
  count: number
  progress: number
}

export const LOADER_KINDS: { value: LoaderKind; label: string }[] = [
  { value: 'spinner', label: 'Spinner' },
  { value: 'dots', label: 'Bouncing Dots' },
  { value: 'bars', label: 'Bars' },
  { value: 'ring', label: 'Dual Ring' },
  { value: 'pulse', label: 'Pulse' },
  { value: 'progress', label: 'Progress Bar' },
  { value: 'skeleton', label: 'Skeleton Shimmer' },
  { value: 'wave', label: 'Wave Bars' },
  { value: 'orbit', label: 'Orbit Dots' },
  { value: 'ripple', label: 'Ripple' },
  { value: 'square', label: 'Square Morph' }
]

export const DEFAULT_LOADER: LoaderState = {
  kind: 'spinner',
  color: '#10b981',
  trackColor: '#27272a',
  size: 48,
  thickness: 4,
  speed: 0.8,
  count: 3,
  progress: 60
}

function className(kind: LoaderKind): string {
  return `loader-${kind}`
}

export function loaderCss(s: LoaderState): string {
  const cls = className(s.kind)
  switch (s.kind) {
    case 'spinner':
      return `.${cls} {
  width: ${s.size}px;
  height: ${s.size}px;
  border: ${s.thickness}px solid ${s.trackColor};
  border-top-color: ${s.color};
  border-radius: 50%;
  animation: ${cls}-spin ${s.speed}s linear infinite;
}

@keyframes ${cls}-spin {
  to { transform: rotate(360deg); }
}`
    case 'ring':
      return `.${cls} {
  width: ${s.size}px;
  height: ${s.size}px;
  border-radius: 50%;
  border: ${s.thickness}px solid transparent;
  border-top-color: ${s.color};
  border-bottom-color: ${s.color};
  animation: ${cls}-spin ${s.speed}s linear infinite;
}

@keyframes ${cls}-spin {
  to { transform: rotate(360deg); }
}`
    case 'dots':
      return `.${cls} {
  display: flex;
  gap: ${Math.round(s.size * 0.2)}px;
}

.${cls} span {
  width: ${Math.round(s.size * 0.28)}px;
  height: ${Math.round(s.size * 0.28)}px;
  border-radius: 50%;
  background: ${s.color};
  animation: ${cls}-bounce ${s.speed}s ease-in-out infinite;
}

.${cls} span:nth-child(2) { animation-delay: ${(s.speed / 3).toFixed(2)}s; }
.${cls} span:nth-child(3) { animation-delay: ${((s.speed / 3) * 2).toFixed(2)}s; }

@keyframes ${cls}-bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}`
    case 'bars':
      return `.${cls} {
  display: flex;
  align-items: center;
  gap: ${Math.round(s.size * 0.12)}px;
  height: ${s.size}px;
}

.${cls} span {
  width: ${Math.round(s.size * 0.16)}px;
  height: 40%;
  background: ${s.color};
  border-radius: 2px;
  animation: ${cls}-scale ${s.speed}s ease-in-out infinite;
}

.${cls} span:nth-child(2) { animation-delay: ${(s.speed / 5).toFixed(2)}s; }
.${cls} span:nth-child(3) { animation-delay: ${((s.speed / 5) * 2).toFixed(2)}s; }
.${cls} span:nth-child(4) { animation-delay: ${((s.speed / 5) * 3).toFixed(2)}s; }
.${cls} span:nth-child(5) { animation-delay: ${((s.speed / 5) * 4).toFixed(2)}s; }

@keyframes ${cls}-scale {
  0%, 100% { height: 40%; }
  50% { height: 100%; }
}`
    case 'pulse':
      return `.${cls} {
  width: ${s.size}px;
  height: ${s.size}px;
  border-radius: 50%;
  background: ${s.color};
  animation: ${cls}-pulse ${s.speed * 1.5}s ease-in-out infinite;
}

@keyframes ${cls}-pulse {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.8); opacity: 0; }
}`
    case 'progress':
      return `.${cls} {
  width: ${s.size * 4}px;
  height: ${s.thickness * 2}px;
  background: ${s.trackColor};
  border-radius: 999px;
  overflow: hidden;
}

.${cls}-bar {
  height: 100%;
  width: ${Math.round(s.progress)}%;
  background: ${s.color};
  border-radius: 999px;
  transition: width 0.3s ease;
}`
    case 'skeleton':
      return `.${cls} {
  width: ${s.size * 4}px;
  height: ${s.size}px;
  border-radius: 8px;
  background: linear-gradient(90deg, ${s.trackColor} 25%, ${s.color}33 50%, ${s.trackColor} 75%);
  background-size: 200% 100%;
  animation: ${cls}-shimmer ${s.speed * 2}s ease-in-out infinite;
}

@keyframes ${cls}-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`
    case 'wave':
      return `.${cls} {
  display: flex;
  align-items: flex-end;
  gap: ${Math.round(s.size * 0.1)}px;
  height: ${s.size}px;
}

.${cls} span {
  width: ${Math.round(s.size * 0.14)}px;
  height: 20%;
  background: ${s.color};
  border-radius: 999px;
  animation: ${cls}-wave ${s.speed}s ease-in-out infinite;
}

.${cls} span:nth-child(2) { animation-delay: ${(s.speed / 6).toFixed(2)}s; }
.${cls} span:nth-child(3) { animation-delay: ${((s.speed / 6) * 2).toFixed(2)}s; }
.${cls} span:nth-child(4) { animation-delay: ${((s.speed / 6) * 3).toFixed(2)}s; }
.${cls} span:nth-child(5) { animation-delay: ${((s.speed / 6) * 4).toFixed(2)}s; }
.${cls} span:nth-child(6) { animation-delay: ${((s.speed / 6) * 5).toFixed(2)}s; }

@keyframes ${cls}-wave {
  0%, 100% { height: 20%; }
  50% { height: 100%; }
}`
    case 'orbit':
      return `.${cls} {
  position: relative;
  width: ${s.size}px;
  height: ${s.size}px;
  animation: ${cls}-spin ${s.speed * 2}s linear infinite;
}

.${cls} span {
  position: absolute;
  top: 0;
  left: 50%;
  width: ${Math.round(s.size * 0.18)}px;
  height: ${Math.round(s.size * 0.18)}px;
  margin-left: -${Math.round(s.size * 0.09)}px;
  border-radius: 50%;
  background: ${s.color};
}

.${cls} span:nth-child(2) {
  top: auto;
  bottom: 0;
  opacity: 0.4;
}

@keyframes ${cls}-spin {
  to { transform: rotate(360deg); }
}`
    case 'ripple':
      return `.${cls} {
  position: relative;
  width: ${s.size}px;
  height: ${s.size}px;
}

.${cls} span {
  position: absolute;
  inset: 0;
  border: ${s.thickness}px solid ${s.color};
  border-radius: 50%;
  opacity: 0;
  animation: ${cls}-ripple ${s.speed * 2}s ease-out infinite;
}

.${cls} span:nth-child(2) {
  animation-delay: ${s.speed}s;
}

@keyframes ${cls}-ripple {
  0% { transform: scale(0.3); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}`
    case 'square':
      return `.${cls} {
  width: ${s.size}px;
  height: ${s.size}px;
  background: ${s.color};
  animation: ${cls}-morph ${s.speed * 2}s ease-in-out infinite;
}

@keyframes ${cls}-morph {
  0%, 100% { border-radius: 0%; transform: rotate(0deg); }
  50% { border-radius: 50%; transform: rotate(180deg); }
}`
  }
}

export function loaderHtml(s: LoaderState): string {
  const cls = className(s.kind)
  switch (s.kind) {
    case 'spinner':
    case 'ring':
    case 'pulse':
    case 'skeleton':
      return `<div class="${cls}"></div>`
    case 'dots':
      return `<div class="${cls}">\n  <span></span>\n  <span></span>\n  <span></span>\n</div>`
    case 'bars':
    case 'wave':
      return `<div class="${cls}">\n  <span></span>\n  <span></span>\n  <span></span>\n  <span></span>\n  <span></span>\n</div>`
    case 'progress':
      return `<div class="${cls}">\n  <div class="${cls}-bar"></div>\n</div>`
    case 'orbit':
    case 'ripple':
      return `<div class="${cls}">\n  <span></span>\n  <span></span>\n</div>`
    case 'square':
      return `<div class="${cls}"></div>`
  }
}

export function loaderVars(s: LoaderState): Record<string, string> {
  return {
    '--loader-color': s.color,
    '--loader-track': s.trackColor,
    '--loader-size': `${s.size}px`,
    '--loader-speed': `${s.speed}s`
  }
}

export function loaderPreviewStyle(_s: LoaderState): Record<string, string> {
  return {}
}

export function randomizeLoader(s: LoaderState, rng: import('../rng').Rng): LoaderState {
  const h = Math.floor(rng.range(0, 360))
  const kinds = LOADER_KINDS.map((k) => k.value)
  return {
    ...s,
    kind: rng.pick(kinds),
    color: `hsl(${h} 85% 55%)`,
    size: Math.round(rng.range(32, 64)),
    thickness: Math.round(rng.range(2, 6)),
    speed: Number(rng.range(0.5, 1.6).toFixed(2)),
    progress: Math.round(rng.range(20, 90))
  }
}

export const PRESETS_LOADER: { name: string; tags: string[]; state: LoaderState }[] = [
  { name: 'Emerald Spin', tags: ['spinner', 'brand'], state: { ...DEFAULT_LOADER, kind: 'spinner' } },
  { name: 'Dual Ring', tags: ['ring'], state: { ...DEFAULT_LOADER, kind: 'ring', color: '#06b6d4', speed: 1 } },
  { name: 'Bouncing Dots', tags: ['dots', 'playful'], state: { ...DEFAULT_LOADER, kind: 'dots', color: '#f59e0b', speed: 1.2 } },
  { name: 'Audio Bars', tags: ['bars'], state: { ...DEFAULT_LOADER, kind: 'bars', color: '#8b5cf6', speed: 0.9 } },
  { name: 'Soft Pulse', tags: ['pulse', 'soft'], state: { ...DEFAULT_LOADER, kind: 'pulse', color: '#ec4899', speed: 1 } },
  { name: 'Upload Progress', tags: ['progress'], state: { ...DEFAULT_LOADER, kind: 'progress', color: '#10b981', progress: 72 } },
  { name: 'Skeleton Row', tags: ['skeleton', 'loading'], state: { ...DEFAULT_LOADER, kind: 'skeleton', color: '#71717a', trackColor: '#27272a', speed: 1.4 } },
  { name: 'Fast Spinner', tags: ['spinner', 'fast'], state: { ...DEFAULT_LOADER, kind: 'spinner', color: '#38bdf8', speed: 0.5, thickness: 3 } },
  { name: 'Rose Ring', tags: ['ring', 'warm'], state: { ...DEFAULT_LOADER, kind: 'ring', color: '#f43f5e', thickness: 5, speed: 1.1 } },
  { name: 'Dark Skeleton', tags: ['skeleton', 'dark'], state: { ...DEFAULT_LOADER, kind: 'skeleton', color: '#3f3f46', trackColor: '#18181b', speed: 1.6 } },
  { name: 'Sound Wave', tags: ['wave', 'audio'], state: { ...DEFAULT_LOADER, kind: 'wave', color: '#22d3ee', speed: 1 } },
  { name: 'Orbit Dots', tags: ['orbit'], state: { ...DEFAULT_LOADER, kind: 'orbit', color: '#a78bfa', speed: 1.2 } },
  { name: 'Radar Ripple', tags: ['ripple'], state: { ...DEFAULT_LOADER, kind: 'ripple', color: '#10b981', thickness: 2, speed: 1 } },
  { name: 'Morphing Square', tags: ['square', 'playful'], state: { ...DEFAULT_LOADER, kind: 'square', color: '#f97316', speed: 1 } }
]

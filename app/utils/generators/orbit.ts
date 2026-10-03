export type OrbitKind = 'cube' | 'planet' | 'ring' | 'sphere'

export interface OrbitState {
  kind: OrbitKind
  accent: string
  secondary: string
  bg: string
  size: number
  duration: number
  spinX: number
  spinY: number
  satellites: number
  pauseOnHover: boolean
}

export const ORBIT_KINDS: { value: OrbitKind; label: string }[] = [
  { value: 'cube', label: '3D Cube' },
  { value: 'planet', label: 'Planet Orbit' },
  { value: 'ring', label: 'Spinning Ring' },
  { value: 'sphere', label: 'Sphere Dots' }
]

export const DEFAULT_ORBIT: OrbitState = {
  kind: 'planet',
  accent: '#10b981',
  secondary: '#22d3ee',
  bg: 'transparent',
  size: 140,
  duration: 8,
  spinX: -18,
  spinY: 0,
  satellites: 3,
  pauseOnHover: true
}

export function orbitCss(s: OrbitState): string {
  const spin = `rotateX(${s.spinX}deg) rotateY(${s.spinY}deg)`
  const pause = s.pauseOnHover ? `.orbit-stage:hover .orbit-spin {
  animation-play-state: paused;
}` : ''
  switch (s.kind) {
    case 'cube':
      return `.orbit-stage {
  perspective: 800px;
}

.orbit-cube {
  position: relative;
  width: ${s.size}px;
  height: ${s.size}px;
  transform-style: preserve-3d;
  animation: cube-spin ${s.duration}s linear infinite;
  transform-style: preserve-3d;
}

.orbit-cube .face {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: ${Math.round(s.size / 6)}px;
  color: #052e1a;
  border: 2px solid ${s.accent};
  background: ${s.accent}cc;
}

.face-1 { transform: rotateY(0deg) translateZ(${s.size / 2}px); }
.face-2 { transform: rotateY(90deg) translateZ(${s.size / 2}px); background: ${s.secondary}cc; border-color: ${s.secondary}; }
.face-3 { transform: rotateY(180deg) translateZ(${s.size / 2}px); }
.face-4 { transform: rotateY(-90deg) translateZ(${s.size / 2}px); background: ${s.secondary}cc; border-color: ${s.secondary}; }
.face-5 { transform: rotateX(90deg) translateZ(${s.size / 2}px); }
.face-6 { transform: rotateX(-90deg) translateZ(${s.size / 2}px); }

@keyframes cube-spin {
  from { transform: ${spin} rotateY(0deg); }
  to { transform: ${spin} rotateY(360deg); }
}

${pause}`
    case 'planet':
      return `.orbit-stage {
  perspective: 900px;
}

.orbit-system {
  position: relative;
  width: ${s.size}px;
  height: ${s.size}px;
  transform: ${spin};
  transform-style: preserve-3d;
}

.orbit-planet {
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${Math.round(s.size / 3)}px;
  height: ${Math.round(s.size / 3)}px;
  margin: -${Math.round(s.size / 6)}px 0 0 -${Math.round(s.size / 6)}px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, ${s.secondary}, ${s.accent} 70%);
  box-shadow: 0 0 ${Math.round(s.size / 5)}px ${s.accent}66;
}

.orbit-path {
  position: absolute;
  inset: 0;
  border: 1px dashed ${s.accent}55;
  border-radius: 999px;
  animation: orbit-spin ${s.duration}s linear infinite;
}

.orbit-sat {
  position: absolute;
  top: -${Math.round(s.size / 12)}px;
  left: 50%;
  width: ${Math.round(s.size / 10)}px;
  height: ${Math.round(s.size / 10)}px;
  margin-left: -${Math.round(s.size / 20)}px;
  border-radius: 999px;
  background: ${s.secondary};
  box-shadow: 0 0 ${Math.round(s.size / 14)}px ${s.secondary}99;
}

${Array.from({ length: Math.max(1, Math.min(6, s.satellites)) }, (_, i) => `.orbit-path:nth-of-type(${i + 1}) {
  inset: ${i * Math.round(s.size / 9)}px;
  animation-duration: ${(s.duration + i * 2)}s;
  animation-direction: ${i % 2 ? 'reverse' : 'normal'};
}`).join('\n\n')}

@keyframes orbit-spin {
  from { transform: rotateZ(0deg); }
  to { transform: rotateZ(360deg); }
}

${pause}`
    case 'ring':
      return `.orbit-stage {
  perspective: 700px;
}

.orbit-ring {
  width: ${s.size}px;
  height: ${s.size}px;
  border-radius: 999px;
  border: ${Math.max(3, Math.round(s.size / 28))}px solid ${s.accent};
  border-top-color: transparent;
  border-right-color: ${s.secondary};
  animation: ring-spin ${s.duration}s linear infinite;
}

@keyframes ring-spin {
  from { transform: rotateX(60deg) rotateZ(0deg); }
  to { transform: rotateX(60deg) rotateZ(360deg); }
}

.orbit-ring::after {
  content: '';
  position: absolute;
  inset: ${Math.round(s.size / 8)}px;
  border-radius: 999px;
  border: ${Math.max(2, Math.round(s.size / 40))}px solid ${s.secondary};
  border-bottom-color: transparent;
}

${pause}`
    case 'sphere':
      return `.orbit-stage {
  perspective: 900px;
}

.orbit-sphere {
  position: relative;
  width: ${s.size}px;
  height: ${s.size}px;
  transform-style: preserve-3d;
  animation: sphere-spin ${s.duration}s linear infinite;
}

.orbit-sphere span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${Math.max(5, Math.round(s.size / 16))}px;
  height: ${Math.max(5, Math.round(s.size / 16))}px;
  border-radius: 999px;
  background: ${s.accent};
  box-shadow: 0 0 ${Math.max(4, Math.round(s.size / 20))}px ${s.accent}88;
  transform: rotateY(calc(var(--i) * 36deg)) rotateX(calc(var(--r) * 30deg)) translateZ(${s.size / 2}px);
}

@keyframes sphere-spin {
  from { transform: rotateY(0deg) rotateX(20deg); }
  to { transform: rotateY(360deg) rotateX(20deg); }
}

${pause}`
  }
}

export function orbitHtml(s: OrbitState): string {
  if (s.kind === 'cube') {
    return `<div class="orbit-stage">\n  <div class="orbit-cube">\n    <div class="face face-1">CSS</div>\n    <div class="face face-2">3D</div>\n    <div class="face face-3">PURE</div>\n    <div class="face face-4">ONLY</div>\n    <div class="face face-5">✦</div>\n    <div class="face face-6">✦</div>\n  </div>\n</div>`
  }
  if (s.kind === 'planet') {
    const paths = Array.from({ length: Math.max(1, Math.min(6, s.satellites)) }, () => `  <div class="orbit-path"><div class="orbit-sat"></div></div>`).join('\n')
    return `<div class="orbit-stage">\n  <div class="orbit-system">\n    <div class="orbit-planet"></div>\n${paths}\n  </div>\n</div>`
  }
  if (s.kind === 'ring') {
    return `<div class="orbit-stage">\n  <div class="orbit-ring"></div>\n</div>`
  }
  const dots = Array.from({ length: 10 * 3 }, (_, i) => `  <span style="--i: ${i % 10}; --r: ${Math.floor(i / 10)}"></span>`).join('\n')
  return `<div class="orbit-stage">\n  <div class="orbit-sphere">\n${dots}\n  </div>\n</div>`
}

export function orbitVars(s: OrbitState): Record<string, string> {
  return { '--orbit-accent': s.accent, '--orbit-secondary': s.secondary, '--orbit-duration': `${s.duration}s` }
}

export function randomizeOrbit(s: OrbitState, rng: import('../rng').Rng): OrbitState {
  const kinds = ORBIT_KINDS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    kind: rng.pick(kinds),
    accent: `hsl(${h} 78% 52%)`,
    secondary: `hsl(${(h + 150) % 360} 78% 58%)`,
    size: Math.round(rng.range(110, 180)),
    duration: Number(rng.range(5, 14).toFixed(1)),
    spinX: Math.round(rng.range(-30, 0)),
    satellites: Math.round(rng.range(1, 5)),
    pauseOnHover: rng.chance(0.6)
  }
}

export const PRESETS_ORBIT: { name: string; tags: string[]; state: OrbitState }[] = [
  { name: 'Emerald Planet', tags: ['brand'], state: { ...DEFAULT_ORBIT } },
  { name: 'Spinning Cube', tags: ['3d'], state: { ...DEFAULT_ORBIT, kind: 'cube', size: 120, duration: 6 } },
  { name: 'Neon Gyro', tags: ['neon'], state: { ...DEFAULT_ORBIT, kind: 'ring', accent: '#22d3ee', secondary: '#f43f5e', duration: 4 } },
  { name: 'Solar System', tags: ['planet', 'playful'], state: { ...DEFAULT_ORBIT, satellites: 4, size: 160, duration: 10 } },
  { name: 'Sphere Dots', tags: ['dots'], state: { ...DEFAULT_ORBIT, kind: 'sphere', accent: '#8b5cf6', duration: 9 } },
  { name: 'Fast Cube', tags: ['snappy'], state: { ...DEFAULT_ORBIT, kind: 'cube', size: 100, duration: 3.5, accent: '#f59e0b', secondary: '#f43f5e' } },
  { name: 'Slow Orbit', tags: ['calm'], state: { ...DEFAULT_ORBIT, duration: 18, size: 170, spinX: -12 } },
  { name: 'Retro Gyro', tags: ['retro'], state: { ...DEFAULT_ORBIT, kind: 'ring', accent: '#fbbf24', secondary: '#fbbf24', size: 130, duration: 5 } }
]
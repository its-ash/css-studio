export type AuroraKind = 'aurora' | 'stars' | 'sunset' | 'moonlight'

export interface AuroraState {
  kind: AuroraKind
  color1: string
  color2: string
  color3: string
  speed: number
  showStars: boolean
  width: number
  height: number
  radius: number
}

export const AURORA_KINDS: { value: AuroraKind; label: string }[] = [
  { value: 'aurora', label: 'Aurora' },
  { value: 'stars', label: 'Starfield' },
  { value: 'sunset', label: 'Sunset' },
  { value: 'moonlight', label: 'Moonlight' }
]

export const DEFAULT_AURORA: AuroraState = {
  kind: 'aurora',
  color1: '#10b981',
  color2: '#22d3ee',
  color3: '#8b5cf6',
  speed: 12,
  showStars: true,
  width: 480,
  height: 300,
  radius: 16
}

export function auroraCss(s: AuroraState): string {
  const stars = s.showStars
    ? `.aurora::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 20% 30%, #fff 100%, transparent),
    radial-gradient(1px 1px at 60% 15%, #fff 100%, transparent),
    radial-gradient(1.5px 1.5px at 80% 60%, #fff 100%, transparent),
    radial-gradient(1px 1px at 40% 70%, #ffffffcc 100%, transparent),
    radial-gradient(1px 1px at 10% 80%, #ffffff99 100%, transparent),
    radial-gradient(1.5px 1.5px at 70% 40%, #fff 100%, transparent);
  pointer-events: none;
}`
    : ''
  switch (s.kind) {
    case 'aurora':
      return `.aurora {
  position: relative;
  width: ${s.width}px;
  height: ${s.height}px;
  border-radius: ${s.radius}px;
  overflow: hidden;
  background: #050510;
  isolation: isolate;
}

.aurora::before {
  content: '';
  position: absolute;
  inset: -40%;
  background:
    radial-gradient(40% 55% at 20% 30%, ${s.color1}55 0%, transparent 60%),
    radial-gradient(35% 50% at 55% 20%, ${s.color2}55 0%, transparent 60%),
    radial-gradient(45% 60% at 80% 45%, ${s.color3}44 0%, transparent 60%);
  filter: blur(28px);
  animation: aurora-drift ${s.speed}s ease-in-out infinite alternate;
}

@keyframes aurora-drift {
  0% {
    transform: translate(-4%, -2%) rotate(-4deg) scale(1);
  }
  100% {
    transform: translate(4%, 3%) rotate(5deg) scale(1.12);
  }
}

${stars}`
    case 'stars':
      return `.aurora {
  position: relative;
  width: ${s.width}px;
  height: ${s.height}px;
  border-radius: ${s.radius}px;
  overflow: hidden;
  background: radial-gradient(120% 100% at 50% 0%, #0c1440 0%, #050510 70%);
  isolation: isolate;
}

.aurora::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 20% 30%, #fff 100%, transparent),
    radial-gradient(1px 1px at 60% 15%, #fff 100%, transparent),
    radial-gradient(1.5px 1.5px at 80% 60%, #fff 100%, transparent),
    radial-gradient(1px 1px at 40% 70%, #ffffffcc 100%, transparent),
    radial-gradient(1px 1px at 10% 80%, #ffffff99 100%, transparent),
    radial-gradient(1.5px 1.5px at 70% 40%, #fff 100%, transparent),
    radial-gradient(1px 1px at 30% 55%, #fff 100%, transparent);
  animation: twinkle ${Math.max(2, Math.round(s.speed / 3))}s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes twinkle {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}`
    case 'sunset':
      return `.aurora {
  position: relative;
  width: ${s.width}px;
  height: ${s.height}px;
  border-radius: ${s.radius}px;
  overflow: hidden;
  background: linear-gradient(180deg, ${s.color3} 0%, ${s.color2} 45%, ${s.color1} 75%, #f59e0b 100%);
}

.aurora::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -${Math.round(s.height / 5)}px;
  width: ${Math.round(s.height / 2.2)}px;
  height: ${Math.round(s.height / 2.2)}px;
  border-radius: 999px;
  background: radial-gradient(circle, #fff7ed 0%, #fdba74 60%, transparent 70%);
  transform: translateX(-50%);
  filter: blur(2px);
  animation: sun-pulse ${s.speed}s ease-in-out infinite alternate;
}

@keyframes sun-pulse {
  from { transform: translateX(-50%) translateY(0) scale(1); }
  to { transform: translateX(-50%) translateY(-8px) scale(1.06); }
}

${stars}`
    case 'moonlight':
      return `.aurora {
  position: relative;
  width: ${s.width}px;
  height: ${s.height}px;
  border-radius: ${s.radius}px;
  overflow: hidden;
  background: linear-gradient(180deg, #0b1026 0%, #101828 60%, #1e293b 100%);
  isolation: isolate;
}

.aurora::before {
  content: '';
  position: absolute;
  top: ${Math.round(s.height / 8)}px;
  right: ${Math.round(s.width / 6)}px;
  width: ${Math.round(s.height / 5)}px;
  height: ${Math.round(s.height / 5)}px;
  border-radius: 999px;
  background: radial-gradient(circle at 35% 35%, #f8fafc 0%, #cbd5e1 70%);
  box-shadow: 0 0 ${Math.round(s.height / 6)}px #e2e8f066;
  animation: moon-rise ${s.speed}s ease-in-out infinite alternate;
}

@keyframes moon-rise {
  from { transform: translateY(0); }
  to { transform: translateY(-6px); }
}

${stars}`
  }
}

export function auroraHtml(): string {
  return `<div class="aurora"></div>`
}

export function auroraVars(s: AuroraState): Record<string, string> {
  return { '--aurora-c1': s.color1, '--aurora-c2': s.color2, '--aurora-c3': s.color3, '--aurora-speed': `${s.speed}s` }
}

export function randomizeAurora(s: AuroraState, rng: import('../rng').Rng): AuroraState {
  const kinds = AURORA_KINDS.map((k) => k.value)
  const h1 = Math.floor(rng.range(0, 360))
  return {
    ...s,
    kind: rng.pick(kinds),
    color1: `hsl(${h1} 80% 55%)`,
    color2: `hsl(${(h1 + 60) % 360} 80% 60%)`,
    color3: `hsl(${(h1 + 160) % 360} 80% 60%)`,
    speed: Number(rng.range(6, 20).toFixed(1)),
    showStars: rng.chance(0.6),
    height: Math.round(rng.range(240, 340))
  }
}

export const PRESETS_AURORA: { name: string; tags: string[]; state: AuroraState }[] = [
  { name: 'Emerald Aurora', tags: ['brand'], state: { ...DEFAULT_AURORA } },
  { name: 'Violet Night', tags: ['night'], state: { ...DEFAULT_AURORA, color1: '#8b5cf6', color2: '#ec4899', color3: '#312e81', speed: 16 } },
  { name: 'Deep Space', tags: ['stars', 'dark'], state: { ...DEFAULT_AURORA, kind: 'stars', speed: 6 } },
  { name: 'Golden Sunset', tags: ['warm'], state: { ...DEFAULT_AURORA, kind: 'sunset', color3: '#7c2d12', color2: '#c2410c', color1: '#f59e0b' } },
  { name: 'Moonlit', tags: ['moon', 'calm'], state: { ...DEFAULT_AURORA, kind: 'moonlight', speed: 14, showStars: true } },
  { name: 'Frozen North', tags: ['cool'], state: { ...DEFAULT_AURORA, color1: '#22d3ee', color2: '#67e8f9', color3: '#155e75', speed: 10 } },
  { name: 'Starless Drift', tags: ['minimal'], state: { ...DEFAULT_AURORA, showStars: false, speed: 20 } },
  { name: 'Pink Dawn', tags: ['warm'], state: { ...DEFAULT_AURORA, kind: 'aurora', color1: '#f43f5e', color2: '#fb7185', color3: '#581c87', height: 260 } }
]
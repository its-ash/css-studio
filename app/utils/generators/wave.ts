export type WaveSkin = 'sine' | 'zigzag' | 'steps' | 'blob'

export interface WaveState {
  skin: WaveSkin
  accent: string
  bg: string
  height: number
  width: number
  amplitude: number
  frequency: number
  animated: boolean
  duration: number
  layers: number
}

export const WAVE_SKINS: { value: WaveSkin; label: string }[] = [
  { value: 'sine', label: 'Sine' },
  { value: 'zigzag', label: 'Zigzag' },
  { value: 'steps', label: 'Steps' },
  { value: 'blob', label: 'Blob Edge' }
]

export const DEFAULT_WAVE: WaveState = {
  skin: 'sine',
  accent: '#10b981',
  bg: '#09090b',
  height: 120,
  width: 480,
  amplitude: 16,
  frequency: 3,
  animated: true,
  duration: 8,
  layers: 2
}

export function waveCss(s: WaveState): string {
  const period = Math.max(40, Math.round(s.width / Math.max(1, s.frequency)))
  const amp = Math.min(60, s.amplitude)
  const layers: string[] = []
  for (let i = 0; i < Math.max(1, Math.min(3, s.layers)); i++) {
    const scale = 1 - i * 0.28
    const opacity = 1 - i * 0.35
    layers.push(
      `.wave-layer-${i} {
  position: absolute;
  inset: 0;
  opacity: ${opacity.toFixed(2)};
  background-image: linear-gradient(${s.accent}${i === 0 ? '' : 'aa'}, ${s.accent}${i === 0 ? '44' : '22'});
  ${s.skin === 'sine' ? `border-radius: 100% 100% 0 0 / ${Math.round(amp * scale)}px ${Math.round(amp * scale)}px 0 0;` : ''}
}`
    )
  }
  const shapes: Record<WaveSkin, string> = {
    sine: `border-radius: 100% 100% 0 0 / ${amp}px ${amp}px 0 0;`,
    zigzag: `clip-path: polygon(0% 100%, 0% ${50 - 0}%, ${''}0 0), none;`,
    steps: `clip-path: polygon(0 100%, 0 40%, 10% 40%, 10% 70%, 20% 70%, 20% 40%, 30% 40%, 30% 70%, 40% 70%, 40% 40%, 50% 40%, 50% 70%, 60% 70%, 60% 40%, 70% 40%, 70% 70%, 80% 70%, 80% 40%, 90% 40%, 90% 70%, 100% 70%, 100% 100%);`,
    blob: `border-radius: 42% 58% 37% 63% / ${amp * 2}% ${amp}% 0 0;`
  }
  void shapes
  void period
  const anim = s.animated
    ? `.wave-layer-0 {
  animation: wave-slide ${s.duration}s ease-in-out infinite alternate;
}

.wave-layer-1 {
  animation: wave-slide ${(s.duration * 1.4).toFixed(1)}s ease-in-out infinite alternate-reverse;
}

@keyframes wave-slide {
  from { transform: translateX(0); }
  to { transform: translateX(-40px); }
}`
    : ''
  return `.wave {
  position: relative;
  width: ${s.width}px;
  height: ${s.height}px;
  background: ${s.bg};
  overflow: hidden;
  ${s.skin === 'sine' ? `border-radius: ${amp}px ${amp}px 0 0 / ${amp}px ${amp}px 0 0;` : ''}
  ${s.skin === 'blob' ? `border-radius: 48% 52% 0 0 / ${amp * 2}px ${amp}px 0 0;` : ''}
  ${s.skin === 'zigzag' ? `clip-path: polygon(0 30%, 6% 55%, 12% 30%, 18% 55%, 24% 30%, 30% 55%, 36% 30%, 42% 55%, 48% 30%, 54% 55%, 60% 30%, 66% 55%, 72% 30%, 78% 55%, 84% 30%, 90% 55%, 96% 30%, 100% 55%, 100% 100%, 0 100%);` : ''}
  ${s.skin === 'steps' ? `clip-path: polygon(0 30%, 8% 30%, 8% 60%, 16% 60%, 16% 30%, 24% 30%, 24% 60%, 32% 60%, 32% 30%, 40% 30%, 40% 60%, 48% 60%, 48% 30%, 56% 30%, 56% 60%, 64% 60%, 64% 30%, 72% 30%, 72% 60%, 80% 60%, 80% 30%, 88% 30%, 88% 60%, 96% 60%, 96% 30%, 100% 30%, 100% 100%, 0 100%);` : ''}
}

.wave-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, ${s.accent}, ${s.accent}55);
}

${layers.join('\n\n')}

${anim}`
}

export function waveHtml(): string {
  return `<div class="wave">
  <div class="wave-fill"></div>
  <div class="wave-layer-1"></div>
  <div class="wave-layer-0"></div>
</div>`
}

export function waveVars(s: WaveState): Record<string, string> {
  return { '--wave-accent': s.accent, '--wave-bg': s.bg, '--wave-amplitude': `${s.amplitude}px` }
}

export function randomizeWave(s: WaveState, rng: import('../rng').Rng): WaveState {
  const skins = WAVE_SKINS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    skin: rng.pick(skins),
    accent: `hsl(${h} 78% 50%)`,
    bg: `hsl(${h} 12% 6%)`,
    height: Math.round(rng.range(90, 160)),
    amplitude: Math.round(rng.range(8, 26)),
    frequency: Math.round(rng.range(2, 6)),
    animated: rng.chance(0.7),
    duration: Number(rng.range(5, 14).toFixed(1)),
    layers: Math.round(rng.range(1, 3))
  }
}

export const PRESETS_WAVE: { name: string; tags: string[]; state: WaveState }[] = [
  { name: 'Emerald Sine', tags: ['brand'], state: { ...DEFAULT_WAVE } },
  { name: 'Deep Ocean', tags: ['cool'], state: { ...DEFAULT_WAVE, accent: '#0ea5e9', bg: '#020617', layers: 3, duration: 12 } },
  { name: 'Neon Zigzag', tags: ['neon'], state: { ...DEFAULT_WAVE, skin: 'zigzag', accent: '#22d3ee', animated: false } },
  { name: 'Retro Steps', tags: ['retro', 'pixel'], state: { ...DEFAULT_WAVE, skin: 'steps', accent: '#f59e0b', animated: false } },
  { name: 'Organic Blob', tags: ['blob', 'playful'], state: { ...DEFAULT_WAVE, skin: 'blob', accent: '#8b5cf6', amplitude: 22 } },
  { name: 'Calm Layered', tags: ['calm'], state: { ...DEFAULT_WAVE, layers: 2, duration: 18, accent: '#10b981' } },
  { name: 'Frozen Wave', tags: ['minimal'], state: { ...DEFAULT_WAVE, animated: false, layers: 1, accent: '#67e8f9' } },
  { name: 'Rose Tide', tags: ['warm'], state: { ...DEFAULT_WAVE, accent: '#f43f5e', layers: 2, duration: 9 } },
  { name: 'Dusk Waves', tags: ['sunset'], state: { ...DEFAULT_WAVE, accent: '#fb923c', bg: '#1c1030', layers: 3, height: 140 } }
]
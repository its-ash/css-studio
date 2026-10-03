export type SkeletonSkin = 'wave' | 'pulse' | 'shimmer'
export type SkeletonLayout = 'card' | 'text' | 'avatar-list'

export interface SkeletonState {
  skin: SkeletonSkin
  layout: SkeletonLayout
  accent: string
  baseColor: string
  radius: number
  duration: number
  rows: number
}

export const SKELETON_SKINS: { value: SkeletonSkin; label: string }[] = [
  { value: 'wave', label: 'Wave' },
  { value: 'pulse', label: 'Pulse' },
  { value: 'shimmer', label: 'Shimmer' }
]

export const SKELETON_LAYOUTS: { value: SkeletonLayout; label: string }[] = [
  { value: 'card', label: 'Card' },
  { value: 'text', label: 'Text Lines' },
  { value: 'avatar-list', label: 'Avatar List' }
]

export const DEFAULT_SKELETON: SkeletonState = {
  skin: 'shimmer',
  layout: 'card',
  accent: '#3f3f46',
  baseColor: '#27272a',
  radius: 10,
  duration: 1400,
  rows: 3
}

export function skeletonCss(s: SkeletonState): string {
  const skins: Record<SkeletonSkin, string> = {
    wave: `.sk {
  background: linear-gradient(90deg, ${s.baseColor} 25%, ${s.accent} 50%, ${s.baseColor} 75%);
  background-size: 200% 100%;
  animation: sk-wave ${s.duration}ms ease-in-out infinite;
}

@keyframes sk-wave {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,
    pulse: `.sk {
  background: ${s.accent};
  animation: sk-pulse ${s.duration}ms ease-in-out infinite;
}

@keyframes sk-pulse {
  0%, 100% { opacity: 0.45; }
  50% { opacity: 0.85; }
}`,
    shimmer: `.sk {
  position: relative;
  background: ${s.baseColor};
  overflow: hidden;
}

.sk::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, ${s.accent}66 50%, transparent);
  animation: sk-shimmer ${s.duration}ms ease-out infinite;
}

@keyframes sk-shimmer {
  to { transform: translateX(100%); }
}`
  }
  const layouts: Record<SkeletonLayout, string> = {
    card: `.skeleton-card {
  width: 280px;
  padding: 16px;
  border-radius: ${s.radius}px;
  border: 1px solid ${s.accent}33;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sk-avatar {
  width: 44px;
  height: 44px;
  border-radius: 999px;
}

.sk-line {
  height: 12px;
  border-radius: ${Math.min(s.radius, 6)}px;
}

.sk-line.short { width: 60%; }
.sk-line.mid { width: 85%; }
.sk-block {
  height: 110px;
  border-radius: ${Math.min(s.radius, 8)}px;
}`,
    text: `.skeleton-text {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sk-line {
  height: 14px;
  border-radius: ${Math.min(s.radius, 7)}px;
}

.sk-line:nth-child(1) { width: 100%; }
.sk-line:nth-child(2) { width: 92%; }
.sk-line:nth-child(3) { width: 96%; }
.sk-line:nth-child(4) { width: 58%; }`,
    avatarList: `.skeleton-list {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sk-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sk-avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  flex-shrink: 0;
}

.sk-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.sk-line {
  height: 10px;
  border-radius: 999px;
}

.sk-line.short { width: 45%; }`
  }
  return `${skins[s.skin]}

${layouts[s.layout]}`
}

export function skeletonHtml(s: SkeletonState): string {
  if (s.layout === 'card') {
    return `<div class="skeleton-card">
  <div class="sk sk-avatar"></div>
  <div class="sk sk-line mid"></div>
  <div class="sk sk-block"></div>
  <div class="sk sk-line short"></div>
</div>`
  }
  if (s.layout === 'text') {
    return `<div class="skeleton-text">
${Array.from({ length: Math.max(2, s.rows) }, () => `  <div class="sk sk-line"></div>`).join('\n')}
</div>`
  }
  const row = `  <div class="sk-row">
    <div class="sk sk-avatar"></div>
    <div class="sk-lines">
      <div class="sk sk-line"></div>
      <div class="sk sk-line short"></div>
    </div>
  </div>`
  return `<div class="skeleton-list">\n${Array.from({ length: Math.max(2, s.rows) }, () => row).join('\n')}\n</div>`
}

export function skeletonVars(s: SkeletonState): Record<string, string> {
  return { '--sk-accent': s.accent, '--sk-base': s.baseColor, '--sk-duration': `${s.duration}ms` }
}

export function randomizeSkeleton(s: SkeletonState, rng: import('../rng').Rng): SkeletonState {
  const skins = SKELETON_SKINS.map((k) => k.value)
  const layouts = SKELETON_LAYOUTS.map((k) => k.value)
  return {
    ...s,
    skin: rng.pick(skins),
    layout: rng.pick(layouts),
    rows: Math.round(rng.range(2, 5)),
    radius: rng.pick([4, 8, 10, 14]),
    duration: Math.round(rng.range(900, 2200))
  }
}

export const PRESETS_SKELETON: { name: string; tags: string[]; state: SkeletonState }[] = [
  { name: 'Shimmer Card', tags: ['card', 'brand'], state: { ...DEFAULT_SKELETON } },
  { name: 'Wave Lines', tags: ['text'], state: { ...DEFAULT_SKELETON, skin: 'wave', layout: 'text', rows: 4 } },
  { name: 'Pulse Avatar', tags: ['list'], state: { ...DEFAULT_SKELETON, skin: 'pulse', layout: 'avatar-list', rows: 4 } },
  { name: 'Slow Shimmer', tags: ['calm'], state: { ...DEFAULT_SKELETON, duration: 2200 } },
  { name: 'Fast Pulse', tags: ['snappy'], state: { ...DEFAULT_SKELETON, skin: 'pulse', duration: 800 } },
  { name: 'Sharp Lines', tags: ['mono'], state: { ...DEFAULT_SKELETON, layout: 'text', radius: 0 } },
  { name: 'Light Skeleton', tags: ['light'], state: { ...DEFAULT_SKELETON, baseColor: '#e4e4e7', accent: '#d4d4d8' } },
  { name: 'Neon Shimmer', tags: ['neon'], state: { ...DEFAULT_SKELETON, accent: '#22d3ee', baseColor: '#083344' } }
]
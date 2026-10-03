export type AvatarShape = 'circle' | 'rounded'
export type AvatarOverlap = 'left' | 'right'

export interface AvatarState {
  count: number
  shape: AvatarShape
  overlap: AvatarOverlap
  size: number
  gap: number
  ringColor: string
  ringWidth: number
  gradientFrom: string
  gradientTo: string
  showOverflowBadge: boolean
  hoverSpread: boolean
}

export const DEFAULT_AVATAR: AvatarState = {
  count: 5,
  shape: 'circle',
  overlap: 'left',
  size: 44,
  gap: 14,
  ringColor: '#09090b',
  ringWidth: 2,
  gradientFrom: '#10b981',
  gradientTo: '#22d3ee',
  showOverflowBadge: true,
  hoverSpread: true
}

const NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

export function avatarCss(s: AvatarState): string {
  return `.avatar-stack {
  display: flex;
  align-items: center;
  ${s.overlap === 'left' ? '' : 'flex-direction: row-reverse;'}
}

.avatar {
  display: grid;
  place-items: center;
  width: ${s.size}px;
  height: ${s.size}px;
  border-radius: ${s.shape === 'circle' ? '999px' : `${Math.round(s.size / 5)}px`};
  border: ${s.ringWidth}px solid ${s.ringColor};
  color: #fff;
  font-size: ${Math.round(s.size / 3)}px;
  font-weight: 700;
  flex-shrink: 0;
  background: linear-gradient(135deg, var(--from), var(--to));
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.avatar:not(:first-child) {
  margin-left: ${s.overlap === 'left' ? `-${s.gap}px` : '0'};
}

.avatar:not(:last-child) {
  margin-right: ${s.overlap === 'left' ? '0' : `-${s.gap}px`};
}

.avatar-stack:hover ${s.hoverSpread ? `.avatar {
  transform: translateX(${s.overlap === 'left' ? '' : '-'}4px);
}

.avatar-stack:hover .avatar:first-child {
  transform: translateX(0);
}` : ''}

.avatar-overflow {
  display: grid;
  place-items: center;
  height: ${s.size}px;
  min-width: ${s.size}px;
  padding: 0 ${Math.round(s.size / 5)}px;
  border-radius: ${s.shape === 'circle' ? '999px' : `${Math.round(s.size / 5)}px`};
  border: ${s.ringWidth}px solid ${s.ringColor};
  background: #27272a;
  color: #fafafa;
  font-size: ${Math.round(s.size / 3)}px;
  font-weight: 700;
  flex-shrink: 0;
  margin-left: ${s.overlap === 'left' ? `-${s.gap}px` : '0'};
}`
}

export function avatarHtml(s: AvatarState): string {
  const count = Math.min(7, Math.max(2, s.count))
  const avatars = NAMES.slice(0, count)
    .map((n, i) => `  <span class="avatar" style="--from: ${s.gradientFrom}; --to: ${s.gradientTo}; filter: hue-rotate(${i * 18}deg)">${n}</span>`)
    .join('\n')
  const badge = s.showOverflowBadge && s.count > 7 ? `\n  <span class="avatar-overflow">+${s.count - 7}</span>` : ''
  return `<div class="avatar-stack" aria-label="Avatar group">\n${avatars}${badge}\n</div>`
}

export function avatarVars(s: AvatarState): Record<string, string> {
  return { '--avatar-from': s.gradientFrom, '--avatar-to': s.gradientTo, '--avatar-ring': s.ringColor }
}

export function randomizeAvatar(s: AvatarState, rng: import('../rng').Rng): AvatarState {
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    count: Math.round(rng.range(3, 10)),
    shape: rng.chance(0.7) ? 'circle' : 'rounded',
    size: Math.round(rng.range(32, 56)),
    gap: Math.round(rng.range(8, 18)),
    ringWidth: rng.pick([0, 2, 3]),
    gradientFrom: `hsl(${h} 75% 55%)`,
    gradientTo: `hsl(${(h + 60) % 360} 75% 55%)`,
    hoverSpread: rng.chance(0.6)
  }
}

export const PRESETS_AVATAR: { name: string; tags: string[]; state: AvatarState }[] = [
  { name: 'Emerald Stack', tags: ['brand'], state: { ...DEFAULT_AVATAR } },
  { name: 'Tight Circle', tags: ['dense'], state: { ...DEFAULT_AVATAR, gap: 10, count: 7 } },
  { name: 'Squared Cards', tags: ['squad'], state: { ...DEFAULT_AVATAR, shape: 'rounded', size: 48 } },
  { name: 'Neon Rings', tags: ['neon'], state: { ...DEFAULT_AVATAR, gradientFrom: '#22d3ee', gradientTo: '#8b5cf6', ringWidth: 3 } },
  { name: 'Light Ring', tags: ['light'], state: { ...DEFAULT_AVATAR, ringColor: '#f4f4f5', size: 40 } },
  { name: 'Spread Hover', tags: ['interactive'], state: { ...DEFAULT_AVATAR, hoverSpread: true, gap: 16, size: 48 } },
  { name: 'Overflow 12', tags: ['badge'], state: { ...DEFAULT_AVATAR, count: 12, size: 36 } },
  { name: 'Warm Gradient', tags: ['warm'], state: { ...DEFAULT_AVATAR, gradientFrom: '#f59e0b', gradientTo: '#f43f5e', shape: 'rounded' } },
  { name: 'No Rings', tags: ['minimal'], state: { ...DEFAULT_AVATAR, ringWidth: 0, gap: 12 } },
  { name: 'Reversed', tags: ['rtl'], state: { ...DEFAULT_AVATAR, overlap: 'right' } }
]
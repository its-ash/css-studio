export type BadgeKind = 'pill' | 'dot' | 'notification-dot' | 'ribbon' | 'outline' | 'soft'

export interface BadgeState {
  kind: BadgeKind
  bg: string
  textColor: string
  dotColor: string
  size: number
  count: number
  showCount: boolean
}

export const BADGE_KINDS: { value: BadgeKind; label: string }[] = [
  { value: 'pill', label: 'Pill' },
  { value: 'soft', label: 'Soft' },
  { value: 'outline', label: 'Outline' },
  { value: 'dot', label: 'Status Dot' },
  { value: 'notification-dot', label: 'Notification Dot' },
  { value: 'ribbon', label: 'Corner Ribbon' }
]

export const DEFAULT_BADGE: BadgeState = {
  kind: 'pill',
  bg: '#10b981',
  textColor: '#052e1a',
  dotColor: '#f43f5e',
  size: 8,
  count: 3,
  showCount: true
}

export function badgeCss(s: BadgeState): string {
  switch (s.kind) {
    case 'pill':
      return `.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 999px;
  background: ${s.bg};
  color: ${s.textColor};
  font-size: 12px;
  font-weight: 600;
}`
    case 'soft':
      return `.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 8px;
  background: ${s.bg}22;
  color: ${s.bg};
  font-size: 12px;
  font-weight: 600;
}`
    case 'outline':
      return `.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 11px;
  border-radius: 999px;
  border: 1.5px solid ${s.bg};
  color: ${s.bg};
  background: transparent;
  font-size: 12px;
  font-weight: 600;
}`
    case 'dot':
      return `.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${s.textColor};
}

.badge::before {
  content: '';
  width: ${s.size}px;
  height: ${s.size}px;
  border-radius: 50%;
  background: ${s.dotColor};
}`
    case 'notification-dot':
      return `.badge {
  position: relative;
  display: inline-block;
}

.badge::after {
  content: '${s.showCount ? s.count : ''}';
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: ${s.size * 2}px;
  height: ${s.size * 2}px;
  padding: 0 4px;
  border-radius: 999px;
  background: ${s.dotColor};
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-bg, #fff);
}`
    case 'ribbon':
      return `.badge-wrap {
  position: relative;
  overflow: hidden;
}

.badge-ribbon {
  position: absolute;
  top: 12px;
  right: -32px;
  width: 120px;
  padding: 4px 0;
  background: ${s.bg};
  color: ${s.textColor};
  font-size: 11px;
  font-weight: 700;
  text-align: center;
  transform: rotate(45deg);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}`
  }
}

export function badgeHtml(s: BadgeState): string {
  switch (s.kind) {
    case 'pill':
    case 'soft':
    case 'outline':
      return `<span class="badge">New</span>`
    case 'dot':
      return `<span class="badge">Online</span>`
    case 'notification-dot':
      return `<span class="badge">\n  <!-- icon or content -->\n</span>`
    case 'ribbon':
      return `<div class="badge-wrap">\n  <!-- card content -->\n  <span class="badge-ribbon">SALE</span>\n</div>`
  }
}

export function badgeVars(s: BadgeState): Record<string, string> {
  return { '--badge-bg': s.bg, '--badge-text': s.textColor, '--badge-dot': s.dotColor }
}

export function randomizeBadge(s: BadgeState, rng: import('../rng').Rng): BadgeState {
  const kinds = BADGE_KINDS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    kind: rng.pick(kinds),
    bg: `hsl(${h} 80% 50%)`,
    textColor: `hsl(${h} 80% 12%)`,
    dotColor: `hsl(${(h + 150) % 360} 85% 55%)`,
    count: rng.int(1, 99)
  }
}

export const PRESETS_BADGE: { name: string; tags: string[]; state: BadgeState }[] = [
  { name: 'Emerald Pill', tags: ['brand'], state: { ...DEFAULT_BADGE } },
  { name: 'Soft Violet', tags: ['soft'], state: { ...DEFAULT_BADGE, kind: 'soft', bg: '#8b5cf6' } },
  { name: 'Outline Sky', tags: ['outline'], state: { ...DEFAULT_BADGE, kind: 'outline', bg: '#0ea5e9' } },
  { name: 'Online Status', tags: ['dot'], state: { ...DEFAULT_BADGE, kind: 'dot', dotColor: '#22c55e', textColor: '#e4e4e7' } },
  { name: 'Away Status', tags: ['dot'], state: { ...DEFAULT_BADGE, kind: 'dot', dotColor: '#f59e0b', textColor: '#e4e4e7' } },
  { name: 'Cart Count', tags: ['notification-dot'], state: { ...DEFAULT_BADGE, kind: 'notification-dot', dotColor: '#f43f5e', count: 5 } },
  { name: 'Sale Ribbon', tags: ['ribbon'], state: { ...DEFAULT_BADGE, kind: 'ribbon', bg: '#f43f5e', textColor: '#ffffff' } },
  { name: 'New Ribbon', tags: ['ribbon', 'brand'], state: { ...DEFAULT_BADGE, kind: 'ribbon', bg: '#10b981', textColor: '#052e1a' } },
  { name: 'Amber Soft', tags: ['soft', 'warm'], state: { ...DEFAULT_BADGE, kind: 'soft', bg: '#f59e0b' } }
]

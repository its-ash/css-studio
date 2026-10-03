export type TableSkin = 'zebra' | 'minimal' | 'rounded' | 'dark-glow'

export interface TableState {
  skin: TableSkin
  accent: string
  bg: string
  textColor: string
  rowHover: boolean
  radius: number
  fontSize: number
  stickyHeader: boolean
  paddingY: number
}

export const TABLE_SKINS: { value: TableSkin; label: string }[] = [
  { value: 'zebra', label: 'Zebra' },
  { value: 'minimal', label: 'Minimal Lines' },
  { value: 'rounded', label: 'Rounded Frame' },
  { value: 'dark-glow', label: 'Dark Glow' }
]

export const DEFAULT_TABLE: TableState = {
  skin: 'zebra',
  accent: '#10b981',
  bg: '#18181b',
  textColor: '#fafafa',
  rowHover: true,
  radius: 12,
  fontSize: 14,
  stickyHeader: true,
  paddingY: 12
}

export function tableCss(s: TableState): string {
  const zebra =
    s.skin === 'zebra'
      ? `.css-table tbody tr:nth-child(even) {
  background: ${s.textColor}0a;
}`
      : ''
  const glow =
    s.skin === 'dark-glow'
      ? `.css-table-wrap {
  box-shadow: 0 0 24px ${s.accent}22, 0 8px 32px rgba(0, 0, 0, 0.4);
}

.css-table th {
  color: ${s.accent};
}`
      : ''
  const sticky = s.stickyHeader
    ? `.css-table th {
  position: sticky;
  top: 0;
  background: ${s.skin === 'dark-glow' ? s.bg : s.bg};
  z-index: 1;
}`
    : ''
  const hover = s.rowHover
    ? `.css-table tbody tr {
  transition: background-color 150ms ease;
}

.css-table tbody tr:hover {
  background: ${s.accent}14;
}`
    : ''
  return `${s.skin === 'rounded' || s.skin === 'dark-glow' ? `.css-table-wrap {
  border-radius: ${s.radius}px;
  border: 1px solid ${s.textColor}1f;
  overflow: hidden${s.stickyHeader ? '' : ''};
  max-height: 300px;
  overflow-y: auto;
}` : ''}

.css-table {
  width: 100%;
  border-collapse: collapse;
  font-size: ${s.fontSize}px;
  color: ${s.textColor};
  background: ${s.bg};
}

.css-table th,
.css-table td {
  padding: ${s.paddingY}px 16px;
  text-align: left;
}

.css-table th {
  font-size: ${s.fontSize - 2}px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${s.textColor}aa;
  border-bottom: 2px solid ${s.accent};
}

${s.skin === 'minimal' ? `.css-table td {
  border-bottom: 1px solid ${s.textColor}14;
}` : ''}

${zebra}

${hover}

${sticky}

${glow}`
}

export function tableHtml(): string {
  return `<div class="css-table-wrap">
  <table class="css-table">
    <thead>
      <tr><th>Plan</th><th>Price</th><th>Seats</th></tr>
    </thead>
    <tbody>
      <tr><td>Hobby</td><td>$0</td><td>1</td></tr>
      <tr><td>Pro</td><td>$12</td><td>5</td></tr>
      <tr><td>Team</td><td>$49</td><td>20</td></tr>
      <tr><td>Studio</td><td>$99</td><td>60</td></tr>
      <tr><td>Enterprise</td><td>Custom</td><td>∞</td></tr>
    </tbody>
  </table>
</div>`
}

export function tableVars(s: TableState): Record<string, string> {
  return { '--table-accent': s.accent, '--table-bg': s.bg, '--table-fg': s.textColor }
}

export function randomizeTable(s: TableState, rng: import('../rng').Rng): TableState {
  const skins = TABLE_SKINS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    skin: rng.pick(skins),
    accent: `hsl(${h} 78% 52%)`,
    bg: `hsl(${h} 10% 10%)`,
    radius: rng.pick([0, 8, 12, 16]),
    fontSize: Math.round(rng.range(12, 16)),
    paddingY: Math.round(rng.range(8, 16)),
    rowHover: rng.chance(0.8),
    stickyHeader: rng.chance(0.7)
  }
}

export const PRESETS_TABLE: { name: string; tags: string[]; state: TableState }[] = [
  { name: 'Emerald Zebra', tags: ['brand'], state: { ...DEFAULT_TABLE } },
  { name: 'Minimal Docs', tags: ['docs', 'minimal'], state: { ...DEFAULT_TABLE, skin: 'minimal', stickyHeader: false } },
  { name: 'Rounded Frame', tags: ['card'], state: { ...DEFAULT_TABLE, skin: 'rounded', accent: '#8b5cf6' } },
  { name: 'Neon Glow', tags: ['neon'], state: { ...DEFAULT_TABLE, skin: 'dark-glow', accent: '#22d3ee', bg: '#020617' } },
  { name: 'Sharp Lines', tags: ['mono'], state: { ...DEFAULT_TABLE, radius: 0, accent: '#a1a1aa' } },
  { name: 'Warm Zebra', tags: ['warm'], state: { ...DEFAULT_TABLE, accent: '#f59e0b' } },
  { name: 'Light Zebra', tags: ['light'], state: { ...DEFAULT_TABLE, bg: '#fafafa', textColor: '#18181b' } },
  { name: 'No Hover', tags: ['static'], state: { ...DEFAULT_TABLE, rowHover: false, skin: 'minimal' } }
]
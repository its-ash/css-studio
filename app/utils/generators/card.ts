export type CardSkin = 'flat' | 'elevated' | 'glass' | 'outline' | 'gradient-border'

export interface CardState {
  skin: CardSkin
  accent: string
  bg: string
  textColor: string
  radius: number
  width: number
  padding: number
  hoverLift: boolean
  showImage: boolean
}

export const CARD_SKINS: { value: CardSkin; label: string }[] = [
  { value: 'flat', label: 'Flat' },
  { value: 'elevated', label: 'Elevated' },
  { value: 'glass', label: 'Glass' },
  { value: 'outline', label: 'Outline' },
  { value: 'gradient-border', label: 'Gradient Border' }
]

export const DEFAULT_CARD: CardState = {
  skin: 'elevated',
  accent: '#10b981',
  bg: '#18181b',
  textColor: '#fafafa',
  radius: 16,
  width: 300,
  padding: 20,
  hoverLift: true,
  showImage: true
}

export function cardCss(s: CardState): string {
  const skins: Record<CardSkin, string> = {
    flat: `.css-card {
  background: ${s.bg};
}`,
    elevated: `.css-card {
  background: ${s.bg};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.2);
}`,
    glass: `.css-card {
  background: ${s.textColor}0a;
  backdrop-filter: blur(12px);
  border: 1px solid ${s.textColor}1f;
}`,
    outline: `.css-card {
  background: ${s.bg};
  border: 1.5px solid ${s.textColor}22;
}`,
    gradientBorder: `.css-card {
  position: relative;
  background: ${s.bg};
  border: 1px solid transparent;
  background-clip: padding-box;
}

.css-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(135deg, ${s.accent}, ${s.accent}22 50%, ${s.accent});
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}`
  }
  return `${skins[s.skin]}

.css-card {
  width: ${s.width}px;
  padding: ${s.padding}px;
  border-radius: ${s.radius}px;
  color: ${s.textColor};
  transition: transform 220ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 220ms ease;
}

${s.hoverLift ? `.css-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
}` : ''}

${s.showImage ? `.card-image {
  height: 120px;
  border-radius: ${Math.max(0, s.radius - 8)}px;
  background: linear-gradient(135deg, ${s.accent}66, ${s.accent}22);
  margin: -${Math.round(s.padding / 2)}px -${Math.round(s.padding / 2)}px ${Math.round(s.padding / 2)}px;
}` : ''}

.card-tag {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  background: ${s.accent}1f;
  color: ${s.accent};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  margin: 10px 0 6px;
}

.card-desc {
  font-size: 13px;
  line-height: 1.6;
  color: ${s.textColor}99;
}`
}

export function cardHtml(s: CardState): string {
  return `<div class="css-card">
  ${s.showImage ? '<div class="card-image"></div>\n  ' : ''}<span class="card-tag">New</span>
  <div class="card-title">Modern CSS Card</div>
  <div class="card-desc">A clean, reusable card component built with pure CSS.</div>
</div>`
}

export function cardVars(s: CardState): Record<string, string> {
  return { '--card-accent': s.accent, '--card-bg': s.bg, '--card-radius': `${s.radius}px` }
}

export function randomizeCard(s: CardState, rng: import('../rng').Rng): CardState {
  const skins = CARD_SKINS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    skin: rng.pick(skins),
    accent: `hsl(${h} 78% 52%)`,
    bg: `hsl(${h} 10% 11%)`,
    radius: rng.pick([0, 8, 16, 20]),
    width: Math.round(rng.range(240, 340)),
    hoverLift: rng.chance(0.7),
    showImage: rng.chance(0.7)
  }
}

export const PRESETS_CARD: { name: string; tags: string[]; state: CardState }[] = [
  { name: 'Elevated Pro', tags: ['brand'], state: { ...DEFAULT_CARD } },
  { name: 'Glass Panel', tags: ['glass'], state: { ...DEFAULT_CARD, skin: 'glass', accent: '#22d3ee' } },
  { name: 'Gradient Border', tags: ['gradient', 'premium'], state: { ...DEFAULT_CARD, skin: 'gradient-border', accent: '#8b5cf6' } },
  { name: 'Outline Clean', tags: ['minimal'], state: { ...DEFAULT_CARD, skin: 'outline', hoverLift: false } },
  { name: 'Flat Simple', tags: ['flat'], state: { ...DEFAULT_CARD, skin: 'flat', showImage: false, hoverLift: false } },
  { name: 'Sharp Card', tags: ['mono'], state: { ...DEFAULT_CARD, radius: 0, accent: '#f59e0b' } },
  { name: 'Warm Lift', tags: ['warm'], state: { ...DEFAULT_CARD, accent: '#f43f5e', hoverLift: true } },
  { name: 'Compact Card', tags: ['small'], state: { ...DEFAULT_CARD, width: 240, padding: 16, showImage: false } },
  { name: 'Light Card', tags: ['light'], state: { ...DEFAULT_CARD, bg: '#fafafa', textColor: '#18181b' } },
  { name: 'Hero Card', tags: ['landing'], state: { ...DEFAULT_CARD, width: 340, radius: 20 } }
]
export type AccordionSkin = 'bordered' | 'seamless' | 'card' | 'pill'

export interface AccordionState {
  skin: AccordionSkin
  accent: string
  bg: string
  textColor: string
  radius: number
  duration: number
  gap: number
  rotateIcon: boolean
}

export const ACCORDION_SKINS: { value: AccordionSkin; label: string }[] = [
  { value: 'bordered', label: 'Bordered' },
  { value: 'seamless', label: 'Seamless' },
  { value: 'card', label: 'Card' },
  { value: 'pill', label: 'Pill' }
]

export const DEFAULT_ACCORDION: AccordionState = {
  skin: 'bordered',
  accent: '#10b981',
  bg: '#18181b',
  textColor: '#fafafa',
  radius: 10,
  duration: 280,
  gap: 8,
  rotateIcon: true
}

const ITEMS = [
  { q: 'What is this?', a: 'An accordion built entirely with <details> and CSS — no JavaScript.' },
  { q: 'How does it animate?', a: 'interpolate-size: allow-keywords plus a transition on block-size.' },
  { q: 'Is it accessible?', a: 'Yes — details/summary is natively keyboard-accessible.' },
  { q: 'Can I style the marker?', a: 'summary::-webkit-details-marker { display: none; } hides the default arrow.' }
]

export function accordionCss(s: AccordionState): string {
  const iconRotate = s.rotateIcon
    ? `details[open] .accordion-icon {
  transform: rotate(45deg);
}`
    : ''
  const skins: Record<AccordionSkin, string> = {
    bordered: `.accordion {
  display: flex;
  flex-direction: column;
  gap: ${s.gap}px;
}

.accordion details {
  border: 1px solid ${s.textColor}22;
  border-radius: ${s.radius}px;
  background: ${s.bg};
  overflow: hidden;
}`,
    seamless: `.accordion {
  display: flex;
  flex-direction: column;
}

.accordion details {
  border-bottom: 1px solid ${s.textColor}18;
  background: ${s.bg};
}`,
    card: `.accordion {
  display: flex;
  flex-direction: column;
  gap: ${s.gap}px;
}

.accordion details {
  border-radius: ${s.radius}px;
  background: ${s.bg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}`,
    pill: `.accordion {
  display: flex;
  flex-direction: column;
  gap: ${s.gap}px;
}

.accordion details {
  border-radius: 999px;
  background: ${s.bg};
  overflow: hidden;
  transition: border-radius ${s.duration}ms ease;
}

.accordion details[open] {
  border-radius: ${s.radius}px;
}`
  }
  return `${skins[s.skin]}

.accordion summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  cursor: pointer;
  list-style: none;
  font-weight: 600;
  color: ${s.textColor};
  transition: color ${s.duration}ms ease;
}

.accordion summary::-webkit-details-marker {
  display: none;
}

.accordion summary:hover {
  color: ${s.accent};
}

.accordion-icon {
  font-size: 18px;
  line-height: 1;
  color: ${s.accent};
  transition: transform ${s.duration}ms cubic-bezier(0.4, 0, 0.2, 1);
}

${iconRotate}

.accordion-body {
  padding: 0 18px 14px;
  color: ${s.textColor}bb;
  font-size: 14px;
  line-height: 1.6;
  transition: block-size ${s.duration}ms ease allow-discrete;
}

@supports (interpolate-size: allow-keywords) {
  .accordion details::details-content {
    block-size: 0;
    overflow: clip;
    transition: block-size ${s.duration}ms ease, content-visibility ${s.duration}ms allow-discrete;
  }

  .accordion details[open]::details-content {
    block-size: auto;
  }
}`
}

export function accordionHtml(): string {
  const items = ITEMS.map(
    (i) => `  <details>
    <summary>${i.q}<span class="accordion-icon">+</span></summary>
    <div class="accordion-body">${i.a}</div>
  </details>`
  ).join('\n')
  return `<div class="accordion">\n${items}\n</div>`
}

export function accordionVars(s: AccordionState): Record<string, string> {
  return { '--accordion-accent': s.accent, '--accordion-bg': s.bg, '--accordion-duration': `${s.duration}ms` }
}

export function randomizeAccordion(s: AccordionState, rng: import('../rng').Rng): AccordionState {
  const skins = ACCORDION_SKINS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    skin: rng.pick(skins),
    accent: `hsl(${h} 80% 55%)`,
    bg: `hsl(${h} 10% 10%)`,
    radius: rng.pick([0, 8, 10, 16]),
    duration: Math.round(rng.range(180, 450)),
    rotateIcon: rng.chance(0.7)
  }
}

export const PRESETS_ACCORDION: { name: string; tags: string[]; state: AccordionState }[] = [
  { name: 'Emerald Bordered', tags: ['brand'], state: { ...DEFAULT_ACCORDION } },
  { name: 'Seamless Docs', tags: ['docs'], state: { ...DEFAULT_ACCORDION, skin: 'seamless', radius: 0, accent: '#fafafa' } },
  { name: 'Shadow Cards', tags: ['card'], state: { ...DEFAULT_ACCORDION, skin: 'card', accent: '#8b5cf6', radius: 12 } },
  { name: 'Pill Open', tags: ['playful'], state: { ...DEFAULT_ACCORDION, skin: 'pill', accent: '#f59e0b', duration: 320 } },
  { name: 'Neon FAQ', tags: ['neon', 'faq'], state: { ...DEFAULT_ACCORDION, accent: '#22d3ee', bg: '#083344', glowless: false } as AccordionState },
  { name: 'Light Bordered', tags: ['light'], state: { ...DEFAULT_ACCORDION, bg: '#fafafa', textColor: '#18181b', accent: '#10b981' } },
  { name: 'Snappy', tags: ['fast'], state: { ...DEFAULT_ACCORDION, duration: 160, accent: '#f43f5e' } },
  { name: 'No Rotate', tags: ['minimal'], state: { ...DEFAULT_ACCORDION, rotateIcon: false, accent: '#a1a1aa' } }
]
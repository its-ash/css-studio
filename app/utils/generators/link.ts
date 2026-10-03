export type LinkUnderlineKind =
  | 'grow'
  | 'slide'
  | 'offset'
  | 'double'
  | 'squiggle'
  | 'fade'
  | 'thick'
  | 'through-slide'

export interface LinkState {
  kind: LinkUnderlineKind
  accent: string
  textColor: string
  thickness: number
  offset: number
  duration: number
}

export const LINK_KINDS: { value: LinkUnderlineKind; label: string }[] = [
  { value: 'grow', label: 'Grow' },
  { value: 'slide', label: 'Slide' },
  { value: 'offset', label: 'Offset Grow' },
  { value: 'double', label: 'Double' },
  { value: 'squiggle', label: 'Squiggle' },
  { value: 'fade', label: 'Fade In' },
  { value: 'thick', label: 'Thick Swap' },
  { value: 'through-slide', label: 'Strike Slide' }
]

export const DEFAULT_LINK: LinkState = {
  kind: 'grow',
  accent: '#10b981',
  textColor: 'currentColor',
  thickness: 2,
  offset: 3,
  duration: 220
}

export function linkCss(s: LinkState): string {
  const t = `${s.duration}ms ease`
  switch (s.kind) {
    case 'grow':
      return `.link-demo {
  color: ${s.textColor};
  text-decoration: none;
  background-image: linear-gradient(${s.accent}, ${s.accent});
  background-size: 0% ${s.thickness}px;
  background-repeat: no-repeat;
  background-position: left calc(100% - ${s.offset}px);
  transition: background-size ${t};
}

.link-demo:hover {
  background-size: 100% ${s.thickness}px;
}`
    case 'slide':
      return `.link-demo {
  color: ${s.textColor};
  text-decoration: none;
  background-image: linear-gradient(${s.accent}, ${s.accent});
  background-size: 100% ${s.thickness}px;
  background-repeat: no-repeat;
  background-position: right calc(100% - ${s.offset}px);
  transition: background-position ${t};
}

.link-demo:hover {
  background-position: left calc(100% - ${s.offset}px);
}`
    case 'offset':
      return `.link-demo {
  color: ${s.textColor};
  text-decoration: none;
  position: relative;
}

.link-demo::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -${s.offset}px;
  height: ${s.thickness}px;
  width: 100%;
  background: ${s.accent};
  transform: scaleX(0);
  transform-origin: right;
  transition: transform ${t};
}

.link-demo:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}`
    case 'double':
      return `.link-demo {
  color: ${s.textColor};
  text-decoration: none;
  background-image:
    linear-gradient(${s.accent}, ${s.accent}),
    linear-gradient(${s.accent}, ${s.accent});
  background-size: 0% ${s.thickness}px, 100% ${Math.max(1, s.thickness - 1)}px;
  background-repeat: no-repeat;
  background-position: left calc(100% - ${s.offset}px), left calc(100% - ${s.offset + 4}px);
  transition: background-size ${t};
}

.link-demo:hover {
  background-size: 100% ${s.thickness}px, 100% ${Math.max(1, s.thickness - 1)}px;
}`
    case 'squiggle':
      return `.link-demo {
  color: ${s.textColor};
  text-decoration: underline wavy ${s.accent};
  text-decoration-thickness: ${s.thickness}px;
  text-underline-offset: ${s.offset + 2}px;
  text-decoration-color: transparent;
  transition: text-decoration-color ${t};
}

.link-demo:hover {
  text-decoration-color: ${s.accent};
}`
    case 'fade':
      return `.link-demo {
  color: ${s.textColor};
  text-decoration: underline;
  text-decoration-color: ${s.accent}00;
  text-decoration-thickness: ${s.thickness}px;
  text-underline-offset: ${s.offset + 2}px;
  transition: text-decoration-color ${t};
}

.link-demo:hover {
  text-decoration-color: ${s.accent};
}`
    case 'thick':
      return `.link-demo {
  color: ${s.textColor};
  text-decoration: underline;
  text-decoration-color: ${s.accent}55;
  text-decoration-thickness: 1px;
  text-underline-offset: ${s.offset + 2}px;
  transition:
    text-decoration-thickness ${t},
    text-decoration-color ${t};
}

.link-demo:hover {
  text-decoration-thickness: ${s.thickness * 3}px;
  text-decoration-color: ${s.accent};
}`
    case 'through-slide':
      return `.link-demo {
  color: ${s.textColor};
  text-decoration: none;
  position: relative;
  transition: color ${t};
}

.link-demo::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  height: ${s.thickness}px;
  width: 100%;
  background: ${s.accent};
  transform: scaleX(0) translateY(0.1em);
  transform-origin: right;
  transition: transform ${t};
}

.link-demo:hover {
  color: ${s.textColor}99;
}

.link-demo:hover::after {
  transform: scaleX(1) translateY(0.1em);
  transform-origin: left;
}`
  }
}

export function linkHtml(): string {
  return `<a class="link-demo" href="#">Hover this link</a>`
}

export function linkVars(s: LinkState): Record<string, string> {
  return { '--link-accent': s.accent, '--link-thickness': `${s.thickness}px`, '--link-offset': `${s.offset}px` }
}

export function randomizeLink(s: LinkState, rng: import('../rng').Rng): LinkState {
  const kinds = LINK_KINDS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    kind: rng.pick(kinds),
    accent: `hsl(${h} 80% 55%)`,
    thickness: Math.round(rng.range(1, 4)),
    offset: Math.round(rng.range(2, 6)),
    duration: Math.round(rng.range(150, 350))
  }
}

export const PRESETS_LINK: { name: string; tags: string[]; state: LinkState }[] = [
  { name: 'Emerald Grow', tags: ['brand'], state: { ...DEFAULT_LINK } },
  { name: 'Slide Ink', tags: ['minimal'], state: { ...DEFAULT_LINK, kind: 'slide', accent: '#fafafa' } },
  { name: 'Offset Neon', tags: ['neon'], state: { ...DEFAULT_LINK, kind: 'offset', accent: '#22d3ee', thickness: 3 } },
  { name: 'Double Line', tags: ['formal'], state: { ...DEFAULT_LINK, kind: 'double', accent: '#8b5cf6' } },
  { name: 'Squiggle Fun', tags: ['playful'], state: { ...DEFAULT_LINK, kind: 'squiggle', accent: '#f59e0b', thickness: 2 } },
  { name: 'Fade Subtle', tags: ['minimal', 'calm'], state: { ...DEFAULT_LINK, kind: 'fade', accent: '#10b981', duration: 300 } },
  { name: 'Thick Marker', tags: ['bold'], state: { ...DEFAULT_LINK, kind: 'thick', accent: '#f43f5e', thickness: 3, duration: 180 } },
  { name: 'Strike Done', tags: ['todo'], state: { ...DEFAULT_LINK, kind: 'through-slide', accent: '#71717a' } },
  { name: 'Light Grow', tags: ['light'], state: { ...DEFAULT_LINK, textColor: '#18181b', accent: '#10b981' } },
  { name: 'Ocean Offset', tags: ['cool'], state: { ...DEFAULT_LINK, kind: 'offset', accent: '#0ea5e9', thickness: 2 } }
]
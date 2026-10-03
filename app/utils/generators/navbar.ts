export type NavbarSkin = 'floating' | 'underline' | 'pill' | 'sidebar'

export interface NavbarState {
  skin: NavbarSkin
  accent: string
  bg: string
  textColor: string
  items: number
  radius: number
  blur: boolean
  indicator: boolean
  logoText: string
}

export const NAVBAR_SKINS: { value: NavbarSkin; label: string }[] = [
  { value: 'floating', label: 'Floating' },
  { value: 'underline', label: 'Underline' },
  { value: 'pill', label: 'Pill Active' },
  { value: 'sidebar', label: 'Sidebar' }
]

export const DEFAULT_NAVBAR: NavbarState = {
  skin: 'floating',
  accent: '#10b981',
  bg: '#18181b',
  textColor: '#fafafa',
  items: 4,
  radius: 14,
  blur: true,
  indicator: true,
  logoText: 'CSS Studio'
}

const LABELS = ['Home', 'Features', 'Pricing', 'About', 'Blog', 'Contact']

export function navbarCss(s: NavbarState): string {
  const blur = s.blur ? `backdrop-filter: blur(12px);` : ''
  const skins: Record<NavbarSkin, string> = {
    floating: `.navbar {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px;
  border-radius: ${s.radius}px;
  background: ${s.bg}${s.blur ? 'cc' : ''};
  border: 1px solid ${s.textColor}14;
  ${blur}
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
}`,
    underline: `.navbar {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  padding: 0 8px;
  background: ${s.bg};
  border-bottom: 1px solid ${s.textColor}14;
}`,
    pill: `.navbar {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 5px;
  border-radius: 999px;
  background: ${s.bg};
  border: 1px solid ${s.textColor}14;
}`,
    sidebar: `.navbar {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 200px;
  padding: 10px;
  border-radius: ${s.radius}px;
  background: ${s.bg};
  border: 1px solid ${s.textColor}14;
}`
  }
  const indicator =
    s.indicator
      ? `.navbar-link.active {
  ${s.skin === 'underline' ? `box-shadow: inset 0 -2px 0 0 ${s.accent};` : ''}
}`
      : ''
  const linkStyle =
    s.skin === 'pill'
      ? `.navbar-link.active {
  background: ${s.accent};
  color: ${s.bg};
}`
      : `.navbar-link.active {
  color: ${s.accent};
}`
  return `${skins[s.skin]}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-weight: 700;
  font-size: 14px;
  color: ${s.textColor};
  text-decoration: none;
}

.navbar-logo::before {
  content: '';
  width: 18px;
  height: 18px;
  border-radius: 6px;
  background: linear-gradient(135deg, ${s.accent}, ${s.accent}88);
}

.navbar-link {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: ${s.skin === 'sidebar' ? '8px' : s.skin === 'pill' ? '999px' : `${Math.max(6, s.radius - 6)}px`};
  color: ${s.textColor}aa;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: color 160ms ease, background-color 160ms ease;
}

.navbar-link:hover {
  color: ${s.textColor};
  background: ${s.textColor}0d;
}

${linkStyle}

${indicator}`
}

export function navbarHtml(s: NavbarState): string {
  const links = LABELS.slice(0, Math.max(2, Math.min(6, s.items)))
    .map((l, i) => `  <a class="navbar-link${i === 0 ? ' active' : ''}" href="#">${l}</a>`)
    .join('\n')
  return `<nav class="navbar">
  <a class="navbar-logo" href="#">${s.logoText}</a>
${links}
</nav>`
}

export function navbarVars(s: NavbarState): Record<string, string> {
  return { '--nav-accent': s.accent, '--nav-bg': s.bg, '--nav-radius': `${s.radius}px` }
}

export function randomizeNavbar(s: NavbarState, rng: import('../rng').Rng): NavbarState {
  const skins = NAVBAR_SKINS.map((k) => k.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    skin: rng.pick(skins),
    accent: `hsl(${h} 78% 52%)`,
    bg: `hsl(${h} 10% 11%)`,
    items: Math.round(rng.range(3, 6)),
    radius: rng.pick([0, 8, 14, 20]),
    blur: rng.chance(0.6),
    indicator: rng.chance(0.5)
  }
}

export const PRESETS_NAVBAR: { name: string; tags: string[]; state: NavbarState }[] = [
  { name: 'Floating Glass', tags: ['glass', 'brand'], state: { ...DEFAULT_NAVBAR } },
  { name: 'Underline Docs', tags: ['docs'], state: { ...DEFAULT_NAVBAR, skin: 'underline', radius: 0, indicator: true } },
  { name: 'Pill Active', tags: ['app'], state: { ...DEFAULT_NAVBAR, skin: 'pill', accent: '#8b5cf6', indicator: false } },
  { name: 'Sidebar Nav', tags: ['sidebar'], state: { ...DEFAULT_NAVBAR, skin: 'sidebar', accent: '#22d3ee' } },
  { name: 'Sharp Corners', tags: ['mono'], state: { ...DEFAULT_NAVBAR, radius: 0, accent: '#f59e0b' } },
  { name: 'Solid (no blur)', tags: ['solid'], state: { ...DEFAULT_NAVBAR, blur: false, accent: '#f43f5e' } },
  { name: 'Light Glass', tags: ['light'], state: { ...DEFAULT_NAVBAR, bg: '#f4f4f5', textColor: '#18181b' } },
  { name: 'Big Menu', tags: ['landing'], state: { ...DEFAULT_NAVBAR, items: 6, accent: '#0ea5e9' } }
]
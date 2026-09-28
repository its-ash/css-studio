/** Bulma theme engine: palette generation from a single primary color, font pairing, and preset metadata. */
import { hexToHsl, hslToHex, clamp } from '~/utils/colors'

export interface BulmaPalette {
  mode: 'light' | 'dark'
  bodyBg: string
  bodyColor: string
  primary: string
  secondary: string
  success: string
  danger: string
  warning: string
  info: string
  light: string
  dark: string
}

function rotateHue(hex: string, deg: number): string {
  const hsl = hexToHsl(hex)
  return hslToHex({ ...hsl, h: hsl.h + deg })
}

function desaturate(hex: string, amount: number): string {
  const hsl = hexToHsl(hex)
  return hslToHex({ ...hsl, s: clamp(hsl.s + amount, 0, 100) })
}

export function generateBulmaPalette(primaryHex: string, mode: 'light' | 'dark' = 'light'): BulmaPalette {
  const primary = primaryHex
  const secondary = desaturate(primary, -60)
  const success = rotateHue(primary, 100)
  const danger = rotateHue(primary, -160)
  const warning = rotateHue(primary, 40)
  const info = rotateHue(primary, 190)

  const isDark = mode === 'dark'
  return {
    mode,
    bodyBg: isDark ? '#0a0a0a' : '#ffffff',
    bodyColor: isDark ? '#e9ecef' : '#212529',
    primary,
    secondary,
    success,
    danger,
    warning,
    info,
    light: isDark ? '#1a1a1a' : '#f8f9fa',
    dark: isDark ? '#000000' : '#212529'
  }
}

export type PresetShadow = 'none' | 'soft' | 'hard' | 'clay' | 'neu' | 'glass' | 'gloss' | 'paper' | 'glow'

export interface ThemePreset {
  key: string
  label: string
  forceMode?: 'light' | 'dark'
  /** Visual DNA rendered by the preset-picker tiles. */
  visual: {
    radius: number
    border: number
    shadow: PresetShadow
    mono?: boolean
    upper?: boolean
  }
}

export const BULMA_THEME_PRESETS: ThemePreset[] = [
  { key: 'default', label: 'Default', visual: { radius: 6, border: 1, shadow: 'soft' } },
  { key: 'flat', label: 'Flat', visual: { radius: 0, border: 2, shadow: 'none' } },
  { key: 'material', label: 'Material', visual: { radius: 4, border: 0, shadow: 'soft', upper: true } },
  { key: 'neumorphism', label: 'Neumorphism', visual: { radius: 16, border: 0, shadow: 'neu' } },
  { key: 'glassmorphism', label: 'Glassmorphism', visual: { radius: 16, border: 0, shadow: 'glass' } },
  { key: 'brutalism', label: 'Brutalism', visual: { radius: 0, border: 3, shadow: 'hard', mono: true, upper: true } },
  { key: 'maximalism', label: 'Maximalism', visual: { radius: 24, border: 4, shadow: 'hard', upper: true } },
  { key: 'skeuomorphism', label: 'Skeuomorphism', visual: { radius: 6, border: 0, shadow: 'gloss' } },
  { key: 'skeuominimalism', label: 'Skeuominimalism', visual: { radius: 6, border: 0, shadow: 'soft' } },
  { key: 'dark-highcontrast', label: 'Dark High Contrast', forceMode: 'dark', visual: { radius: 4, border: 2, shadow: 'hard' } },
  { key: 'retro-8bit', label: 'Retro 8-bit', visual: { radius: 0, border: 2, shadow: 'hard', mono: true, upper: true } },
  { key: 'cyberpunk', label: 'Cyberpunk', forceMode: 'dark', visual: { radius: 4, border: 1, shadow: 'glow', upper: true } },
  { key: 'claymorphism', label: 'Claymorphism', visual: { radius: 16, border: 0, shadow: 'clay' } },
  { key: 'bauhaus', label: 'Bauhaus', visual: { radius: 0, border: 2, shadow: 'none', upper: true } },
  { key: 'organic', label: 'Organic', visual: { radius: 24, border: 0, shadow: 'soft' } },
  { key: 'typographic', label: 'Typographic', visual: { radius: 0, border: 0, shadow: 'none', upper: true } },
  { key: 'minimalism-mono', label: 'Minimalism Mono', visual: { radius: 2, border: 1, shadow: 'none', mono: true } },
  { key: 'papercut', label: 'Papercut', visual: { radius: 8, border: 0, shadow: 'paper' } },
  { key: 'skeuomorphism-classic', label: 'Skeuomorphism Classic', visual: { radius: 6, border: 0, shadow: 'gloss' } }
]

export function effectiveMode(themeKey: string, mode: 'light' | 'dark'): 'light' | 'dark' {
  const preset = BULMA_THEME_PRESETS.find((p) => p.key === themeKey)
  return preset?.forceMode ?? mode
}

export const GOOGLE_FONTS = [
  'Inter', 'Roboto', 'Poppins', 'Open Sans', 'Fira Code', 'Montserrat',
  'Lato', 'Nunito', 'Playfair Display', 'Merriweather', 'Raleway',
  'Source Sans 3', 'Work Sans', 'DM Sans', 'Space Grotesk', 'Manrope',
  'Rubik', 'Josefin Sans', 'Bebas Neue', 'JetBrains Mono', 'IBM Plex Sans',
  'Oswald', 'Quicksand', 'Karla', 'Outfit'
]

const FONT_PAIRINGS: Record<string, string> = {
  Inter: 'Source Sans 3',
  Roboto: 'Open Sans',
  Poppins: 'Inter',
  'Open Sans': 'Lato',
  'Fira Code': 'Inter',
  Montserrat: 'Karla',
  Lato: 'Open Sans',
  Nunito: 'Karla',
  'Playfair Display': 'Source Sans 3',
  Merriweather: 'Lato',
  Raleway: 'Karla',
  'Source Sans 3': 'Source Sans 3',
  'Work Sans': 'Inter',
  'DM Sans': 'Inter',
  'Space Grotesk': 'Work Sans',
  Manrope: 'Inter',
  Rubik: 'Karla',
  'Josefin Sans': 'Nunito',
  'Bebas Neue': 'Roboto',
  'JetBrains Mono': 'Inter',
  'IBM Plex Sans': 'IBM Plex Sans',
  Oswald: 'Open Sans',
  Quicksand: 'Nunito',
  Karla: 'Karla',
  Outfit: 'Inter'
}

export function suggestBodyFont(headingFont: string): string {
  return FONT_PAIRINGS[headingFont] ?? 'Inter'
}

export interface NamedPalette {
  name: string
  color: string
  tags: string[]
}

export const BULMA_PALETTES: NamedPalette[] = [
  { name: 'Tailwind Blue', color: '#3b82f6', tags: ['tailwind', 'clean', 'blue'] },
  { name: 'Tailwind Sky', color: '#0ea5e9', tags: ['tailwind', 'clean', 'blue'] },
  { name: 'Tailwind Cyan', color: '#06b6d4', tags: ['tailwind', 'clean', 'cool'] },
  { name: 'Tailwind Teal', color: '#14b8a6', tags: ['tailwind', 'clean', 'cool'] },
  { name: 'Tailwind Emerald', color: '#10b981', tags: ['tailwind', 'clean', 'green'] },
  { name: 'Tailwind Green', color: '#22c55e', tags: ['tailwind', 'clean', 'green'] },
  { name: 'Tailwind Lime', color: '#84cc16', tags: ['tailwind', 'clean', 'green'] },
  { name: 'Tailwind Amber', color: '#f59e0b', tags: ['tailwind', 'clean', 'warm'] },
  { name: 'Tailwind Orange', color: '#f97316', tags: ['tailwind', 'clean', 'warm'] },
  { name: 'Tailwind Red', color: '#ef4444', tags: ['tailwind', 'clean', 'warm'] },
  { name: 'Tailwind Rose', color: '#f43f5e', tags: ['tailwind', 'clean', 'warm'] },
  { name: 'Tailwind Pink', color: '#ec4899', tags: ['tailwind', 'clean', 'warm'] },
  { name: 'Tailwind Fuchsia', color: '#d946ef', tags: ['tailwind', 'clean', 'vivid'] },
  { name: 'Tailwind Purple', color: '#a855f7', tags: ['tailwind', 'clean', 'vivid'] },
  { name: 'Tailwind Violet', color: '#8b5cf6', tags: ['tailwind', 'clean', 'vivid'] },
  { name: 'Tailwind Indigo', color: '#6366f1', tags: ['tailwind', 'clean', 'blue'] },
  { name: 'Tailwind Slate', color: '#64748b', tags: ['tailwind', 'neutral', 'muted'] },
  { name: 'Tailwind Zinc', color: '#71717a', tags: ['tailwind', 'neutral', 'muted'] },
  { name: 'Material Blue', color: '#2196f3', tags: ['material', 'clean', 'blue'] },
  { name: 'Material Indigo', color: '#3f51b5', tags: ['material', 'clean', 'blue'] },
  { name: 'Material Deep Purple', color: '#673ab7', tags: ['material', 'clean', 'vivid'] },
  { name: 'Material Teal', color: '#009688', tags: ['material', 'clean', 'cool'] },
  { name: 'Material Green', color: '#4caf50', tags: ['material', 'clean', 'green'] },
  { name: 'Material Light Green', color: '#8bc34a', tags: ['material', 'clean', 'green'] },
  { name: 'Material Amber', color: '#ffc107', tags: ['material', 'clean', 'warm'] },
  { name: 'Material Orange', color: '#ff9800', tags: ['material', 'clean', 'warm'] },
  { name: 'Material Deep Orange', color: '#ff5722', tags: ['material', 'clean', 'warm'] },
  { name: 'Material Red', color: '#f44336', tags: ['material', 'clean', 'warm'] },
  { name: 'Material Pink', color: '#e91e63', tags: ['material', 'clean', 'warm'] },
  { name: 'Material Cyan', color: '#00bcd4', tags: ['material', 'clean', 'cool'] },
  { name: 'Material Brown', color: '#795548', tags: ['material', 'neutral', 'earthy'] },
  { name: 'Material Blue Grey', color: '#607d8b', tags: ['material', 'neutral', 'muted'] },
  { name: 'Flat Turquoise', color: '#1abc9c', tags: ['flat', 'clean', 'cool'] },
  { name: 'Flat Emerald', color: '#2ecc71', tags: ['flat', 'clean', 'green'] },
  { name: 'Flat Peter River', color: '#3498db', tags: ['flat', 'clean', 'blue'] },
  { name: 'Flat Amethyst', color: '#9b59b6', tags: ['flat', 'clean', 'vivid'] },
  { name: 'Flat Wet Asphalt', color: '#34495e', tags: ['flat', 'neutral', 'muted'] },
  { name: 'Flat Sun Flower', color: '#f1c40f', tags: ['flat', 'clean', 'warm'] },
  { name: 'Flat Carrot', color: '#e67e22', tags: ['flat', 'clean', 'warm'] },
  { name: 'Flat Alizarin', color: '#e74c3c', tags: ['flat', 'clean', 'warm'] },
  { name: 'Flat Concrete', color: '#95a5a6', tags: ['flat', 'neutral', 'muted'] },
  { name: 'Neon Blue', color: '#0066ff', tags: ['neon', 'vivid', 'blue'] },
  { name: 'Electric Cyan', color: '#00e5ff', tags: ['neon', 'vivid', 'cool'] },
  { name: 'Toxic Green', color: '#39ff14', tags: ['neon', 'vivid', 'green'] },
  { name: 'Radioactive Yellow', color: '#eeff00', tags: ['neon', 'vivid', 'warm'] },
  { name: 'Hyper Red', color: '#ff0033', tags: ['neon', 'vivid', 'warm'] },
  { name: 'Neon Magenta', color: '#ff00ff', tags: ['neon', 'vivid', 'warm'] },
  { name: 'Ultra Violet', color: '#a100ff', tags: ['neon', 'vivid', 'blue'] },
  { name: 'Electric Indigo', color: '#4d00ff', tags: ['neon', 'vivid', 'blue'] },
  { name: 'Cyber Pink', color: '#ff007f', tags: ['neon', 'vivid', 'warm'] },
  { name: 'Acid Green', color: '#aaff00', tags: ['neon', 'vivid', 'green'] },
  { name: 'Warm Graphite', color: '#3f3f46', tags: ['neutral', 'muted'] },
  { name: 'Stone Grey', color: '#78716c', tags: ['neutral', 'muted', 'earthy'] },
  { name: 'Clay Terracotta', color: '#b45309', tags: ['neutral', 'earthy'] },
  { name: 'Muted Sage', color: '#5f7161', tags: ['neutral', 'muted', 'earthy'] },
  { name: 'Dusty Rose', color: '#b3717a', tags: ['neutral', 'muted', 'warm'] },
  { name: 'Ink Navy', color: '#1e293b', tags: ['neutral', 'muted', 'blue'] }
]

const THEME_PALETTE_TAGS: Record<string, string[]> = {
  default: ['tailwind', 'clean'],
  flat: ['flat', 'clean'],
  material: ['material', 'clean'],
  neumorphism: ['muted', 'neutral'],
  glassmorphism: ['vivid', 'cool', 'blue'],
  brutalism: ['vivid', 'warm'],
  maximalism: ['neon', 'vivid'],
  skeuomorphism: ['material', 'warm'],
  skeuominimalism: ['muted', 'neutral'],
  'dark-highcontrast': ['neon', 'vivid'],
  'retro-8bit': ['neon', 'vivid'],
  cyberpunk: ['neon', 'vivid'],
  claymorphism: ['clean', 'warm'],
  bauhaus: ['flat', 'warm', 'blue'],
  organic: ['earthy', 'muted', 'green'],
  typographic: ['neutral', 'muted'],
  'minimalism-mono': ['neutral', 'muted'],
  papercut: ['neutral', 'muted', 'earthy'],
  'skeuomorphism-classic': ['material', 'blue']
}

export function suggestedPalettesForTheme(themeKey: string): NamedPalette[] {
  const tags = THEME_PALETTE_TAGS[themeKey] ?? ['clean']
  return BULMA_PALETTES.map((p) => ({ p, score: p.tags.reduce((n, t) => n + (tags.includes(t) ? 1 : 0), 0) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((s) => s.p)
}

export interface BulmaThemeState {
  theme: string
  primary: string
  mode: 'light' | 'dark'
  headingFont: string
  bodyFont: string
  bodyFontManual: boolean
  primaryManual: boolean
  headingFontManual: boolean
}

export const DEFAULT_BULMA_THEME: BulmaThemeState = {
  theme: 'default',
  primary: '#0ea5e9',
  mode: 'light',
  headingFont: 'Inter',
  bodyFont: 'Source Sans 3',
  bodyFontManual: false,
  primaryManual: false,
  headingFontManual: false
}

/** Per-preset font DNA: the heading font each aesthetic was born to wear. */
const THEME_FONT_DNA: Record<string, string> = {
  default: 'Inter',
  flat: 'Roboto',
  material: 'Roboto',
  neumorphism: 'Nunito',
  glassmorphism: 'Outfit',
  brutalism: 'Oswald',
  maximalism: 'Montserrat',
  skeuomorphism: 'Open Sans',
  skeuominimalism: 'Source Sans 3',
  'dark-highcontrast': 'Inter',
  'retro-8bit': 'Space Grotesk',
  cyberpunk: 'Space Grotesk',
  claymorphism: 'Nunito',
  bauhaus: 'Work Sans',
  organic: 'Quicksand',
  typographic: 'Bebas Neue',
  'minimalism-mono': 'JetBrains Mono',
  papercut: 'DM Sans',
  'skeuomorphism-classic': 'Lato'
}

/** Best-fit heading font for a theme preset, falling back to the app default. */
export function bestFitFontsForTheme(themeKey: string): { headingFont: string; bodyFont: string } {
  const headingFont = THEME_FONT_DNA[themeKey] ?? DEFAULT_BULMA_THEME.headingFont
  return { headingFont, bodyFont: suggestBodyFont(headingFont) }
}

/** Best-fit primary color for a theme preset: the top-scoring suggested palette entry, falling back to the app default. */
export function bestFitPrimaryForTheme(themeKey: string): string {
  return suggestedPalettesForTheme(themeKey)[0]?.color ?? DEFAULT_BULMA_THEME.primary
}

export interface PresetTileStyle {
  radius: number
  border: number
  borderColor: string
  background: string
  boxShadow: string
  letterSpacing: string
  textTransform: 'none' | 'uppercase'
  fontFamily: string
}

const TILE_SAT = 62
const TILE_LIGHT = 52

/** Concrete tile surface for a theme preset at a given primary, so picker tiles genuinely preview the preset's look. */
export function presetTileStyle(themeKey: string, primary: string, mode: 'light' | 'dark'): PresetTileStyle {
  const preset = BULMA_THEME_PRESETS.find((p) => p.key === themeKey)
  const v = preset?.visual ?? { radius: 6, border: 1, shadow: 'soft' as PresetShadow }
  const hsl = hexToHsl(primary)
  const dark = mode === 'dark'
  const h = hsl.h
  const p = (s: number, l: number) => `hsl(${Math.round(h)} ${Math.round(clamp(s, 0, 100))}% ${Math.round(clamp(l, 0, 100))}%)`
  const a = (s: number, l: number, alpha: number) => `hsl(${Math.round(h)} ${Math.round(clamp(s, 0, 100))}% ${Math.round(clamp(l, 0, 100))}% / ${alpha})`
  const surface = dark ? 10 : 100
  const fg = dark ? 90 : 16

  const shadows: Record<PresetShadow, (r: number) => string> = {
    none: () => 'none',
    soft: () => `0 1px 2px ${a(20, dark ? 0 : 30, .25)}, 0 4px 12px ${a(20, dark ? 0 : 30, .12)}`,
    hard: () => `3px 3px 0 ${p(hsl.s, dark ? 80 : 22)}`,
    clay: () => `4px 4px 10px ${a(20, dark ? 0 : 25, .18)}, -3px -3px 8px ${a(20, dark ? 90 : 100, dark ? .05 : .8)}`,
    neu: () => `4px 4px 8px ${a(15, dark ? 0 : 55, .5)}, -4px -4px 8px ${a(15, dark ? 95 : 100, dark ? .06 : .9)}`,
    glass: () => `0 6px 20px ${a(20, dark ? 0 : 35, .22)}`,
    gloss: () => `inset 0 1px 0 ${a(20, 100, .5)}, 0 2px 4px ${a(20, dark ? 0 : 25, .3)}`,
    paper: () => `0 1px 2px ${a(20, dark ? 0 : 30, .18)}, 0 4px 10px ${a(20, dark ? 0 : 30, .12)}`,
    glow: () => `0 0 10px ${a(hsl.s, hsl.l, .6)}`
  }

  return {
    radius: v.radius,
    border: v.border,
    borderColor: v.border > 0 ? p(dark ? 15 : Math.max(hsl.s, 8), dark ? 85 : 20) : 'transparent',
    background: `linear-gradient(160deg, ${p(hsl.s * .35, dark ? surface + 6 : Math.min(98, surface))}, ${p(hsl.s * .5, dark ? surface : Math.max(88, surface - 6))})`,
    boxShadow: shadows[v.shadow](v.radius),
    letterSpacing: v.upper ? '.04em' : v.mono ? '-.01em' : '0',
    textTransform: v.upper ? 'uppercase' : 'none',
    fontFamily: v.mono ? 'ui-monospace, monospace' : 'inherit'
  }
}

/** Short one-line description shown under each preset in the picker. */
export function presetDescription(themeKey: string): string {
  const descriptions: Record<string, string> = {
    default: 'Balanced Bulma baseline',
    flat: 'No shadows, bold borders',
    material: 'Elevation shadows, uppercase labels',
    neumorphism: 'Soft extruded dual shadows',
    glassmorphism: 'Frosted blur and translucency',
    brutalism: 'Raw borders, hard offsets',
    maximalism: 'Loud gradients, thick frames',
    skeuomorphism: 'Glossy faux-realistic surfaces',
    skeuominimalism: 'Subtle depth, minimal chrome',
    'dark-highcontrast': 'Pure black, white edges',
    'retro-8bit': 'Pixel-era chunky UI',
    cyberpunk: 'Neon glows on deep dark',
    claymorphism: 'Puffy clay-like volume',
    bauhaus: 'Primary shapes, geometric',
    organic: 'Rounded, wavy, friendly',
    typographic: 'Type does the talking',
    'minimalism-mono': 'Monospace, hairline borders',
    papercut: 'Layered paper sheets',
    'skeuomorphism-classic': 'iOS 6-style glossy buttons'
  }
  return descriptions[themeKey] ?? ''
}

export function randomizeBulmaTheme(s: BulmaThemeState, rng: () => number): BulmaThemeState {
  const theme = BULMA_THEME_PRESETS[Math.floor(rng() * BULMA_THEME_PRESETS.length)]!
  const palette = BULMA_PALETTES[Math.floor(rng() * BULMA_PALETTES.length)]!
  const fit = bestFitFontsForTheme(theme.key)
  return {
    theme: theme.key,
    primary: palette.color,
    mode: theme.forceMode ?? (rng() > 0.5 ? 'dark' : 'light'),
    headingFont: fit.headingFont,
    bodyFont: suggestBodyFont(fit.headingFont),
    bodyFontManual: false,
    primaryManual: false,
    headingFontManual: false
  }
}

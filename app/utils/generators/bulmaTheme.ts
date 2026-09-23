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

export interface ThemePreset {
  key: string
  label: string
  forceMode?: 'light' | 'dark'
}

export const BULMA_THEME_PRESETS: ThemePreset[] = [
  { key: 'default', label: 'Default' },
  { key: 'flat', label: 'Flat' },
  { key: 'material', label: 'Material' },
  { key: 'neumorphism', label: 'Neumorphism' },
  { key: 'glassmorphism', label: 'Glassmorphism' },
  { key: 'brutalism', label: 'Brutalism' },
  { key: 'maximalism', label: 'Maximalism' },
  { key: 'skeuomorphism', label: 'Skeuomorphism' },
  { key: 'skeuominimalism', label: 'Skeuominimalism' },
  { key: 'dark-highcontrast', label: 'Dark High Contrast', forceMode: 'dark' },
  { key: 'retro-8bit', label: 'Retro 8-bit' },
  { key: 'cyberpunk', label: 'Cyberpunk', forceMode: 'dark' },
  { key: 'claymorphism', label: 'Claymorphism' },
  { key: 'bauhaus', label: 'Bauhaus' },
  { key: 'organic', label: 'Organic' },
  { key: 'typographic', label: 'Typographic' },
  { key: 'minimalism-mono', label: 'Minimalism Mono' },
  { key: 'papercut', label: 'Papercut' },
  { key: 'skeuomorphism-classic', label: 'Skeuomorphism Classic' }
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
}

export const DEFAULT_BULMA_THEME: BulmaThemeState = {
  theme: 'default',
  primary: '#0ea5e9',
  mode: 'light',
  headingFont: 'Inter',
  bodyFont: 'Source Sans 3',
  bodyFontManual: false,
  primaryManual: false
}

/** Best-fit primary color for a theme preset: the top-scoring suggested palette entry, falling back to the app default. */
export function bestFitPrimaryForTheme(themeKey: string): string {
  return suggestedPalettesForTheme(themeKey)[0]?.color ?? DEFAULT_BULMA_THEME.primary
}

export function randomizeBulmaTheme(s: BulmaThemeState, rng: () => number): BulmaThemeState {
  const theme = BULMA_THEME_PRESETS[Math.floor(rng() * BULMA_THEME_PRESETS.length)]!
  const palette = BULMA_PALETTES[Math.floor(rng() * BULMA_PALETTES.length)]!
  const headingFont = GOOGLE_FONTS[Math.floor(rng() * GOOGLE_FONTS.length)]!
  return {
    theme: theme.key,
    primary: palette.color,
    mode: theme.forceMode ?? (rng() > 0.5 ? 'dark' : 'light'),
    headingFont,
    bodyFont: suggestBodyFont(headingFont),
    bodyFontManual: false,
    primaryManual: false
  }
}

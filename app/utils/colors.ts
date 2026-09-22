/** Color conversion + harmony helpers. All pure functions. */

export interface Hsl {
  h: number
  s: number
  l: number
  a?: number
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

export function hslToHex({ h, s, l }: Hsl): string {
  h = ((h % 360) + 360) % 360
  s = clamp(s, 0, 100) / 100
  l = clamp(l, 0, 100) / 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const to = (x: number) =>
    Math.round(255 * clamp(x, 0, 1))
      .toString(16)
      .padStart(2, '0')
  return `#${to(f(0))}${to(f(8))}${to(f(4))}`
}

export function hexToHsl(hex: string): Hsl {
  let h = hex.replace('#', '').trim()
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const r = parseInt(h.slice(0, 2), 16) / 255
  const g = parseInt(h.slice(2, 4), 16) / 255
  const b = parseInt(h.slice(4, 6), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let hue = 0
  let s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) * 60
    else if (max === g) hue = ((b - r) / d + 2) * 60
    else hue = ((r - g) / d + 4) * 60
  }
  return { h: Math.round(hue), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export function hslCss({ h, s, l, a }: Hsl): string {
  const base = `hsl(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%)`
  return a != null && a < 100 ? `hsl(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}% / ${a / 100})` : base
}

export function hslOklch({ h, s, l }: Hsl): string {
  return `oklch(${(clamp(l, 0, 100) / 100).toFixed(3)} ${((clamp(s, 0, 100) / 100) * 0.26).toFixed(3)} ${Math.round(((h % 360) + 360) % 360)})`
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16)
  }
}

export function rgbCss(hex: string, alpha?: number): string {
  const { r, g, b } = hexToRgb(hex)
  return alpha != null && alpha < 100 ? `rgb(${r} ${g} ${b} / ${alpha / 100})` : `rgb(${r} ${g} ${b})`
}

/** Relative luminance + WCAG contrast. */
export function contrastRatio(fgHex: string, bgHex: string): number {
  const lum = (hex: string) => {
    const { r, g, b } = hexToRgb(hex)
    const ch = (c: number) => {
      const v = c / 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    }
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)
  }
  const l1 = lum(fgHex)
  const l2 = lum(bgHex)
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (hi + 0.05) / (lo + 0.05)
}

export function wcagRating(ratio: number): 'AAA' | 'AA' | 'AA Large' | 'Fail' {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'AA Large'
  return 'Fail'
}

/** Suggest nearest HSL lightness that reaches the target ratio against bg. */
export function suggestAccessible(fg: Hsl, bgHex: string, target = 4.5): Hsl {
  const bgLum = hexToHsl(bgHex).l
  const dir = bgLum > 50 ? -1 : 1
  for (let step = 0; step <= 100; step += 1) {
    const l = clamp(fg.l + dir * step, 0, 100)
    const cand = { ...fg, l }
    if (contrastRatio(hslToHex(cand), bgHex) >= target) return cand
  }
  return { ...fg, l: bgLum > 50 ? 0 : 100 }
}

export function harmonies(hsl: Hsl): Record<'complementary' | 'analogous' | 'triadic' | 'split' | 'monochrome', Hsl[]> {
  const h = ((hsl.h % 360) + 360) % 360
  return {
    complementary: [{ ...hsl, h: (h + 180) % 360 }],
    analogous: [{ ...hsl, h: (h + 330) % 360 }, { ...hsl, h: (h + 30) % 360 }],
    triadic: [{ ...hsl, h: (h + 120) % 360 }, { ...hsl, h: (h + 240) % 360 }],
    split: [{ ...hsl, h: (h + 150) % 360 }, { ...hsl, h: (h + 210) % 360 }],
    monochrome: [0, 1, 2].map((i) => ({ h: hsl.h, s: hsl.s, l: clamp(hsl.l + (i - 1) * 18, 4, 96) }))
  }
}

/** Random harmonious palette from a base hue. */
export function paletteFromHue(rng: () => number, hue: number, count = 3): Hsl[] {
  const schemes = [[30, -30], [0, 180], [40, -140], [15, 195]] as const
  const scheme = schemes[Math.floor(rng() * schemes.length)]!
  return Array.from({ length: count }, (_, i) => {
    const off = scheme[i % scheme.length] as number
    const step = Math.floor(i / scheme.length) * 25
    return {
      h: (hue + off + step) % 360,
      s: 55 + Math.floor(rng() * 35),
      l: 45 + Math.floor(rng() * 20)
    }
  })
}
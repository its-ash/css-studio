export type SpotlightShape = 'radial' | 'ring' | 'beam'

export interface SpotlightState {
  shape: SpotlightShape
  color: string
  size: number
  intensity: number
  surface: string
  fadeEdge: number
}

export const SPOTLIGHT_SHAPES: { value: SpotlightShape; label: string }[] = [
  { value: 'radial', label: 'Radial Glow' },
  { value: 'ring', label: 'Ring' },
  { value: 'beam', label: 'Beam' }
]

export const DEFAULT_SPOTLIGHT: SpotlightState = {
  shape: 'radial',
  color: '#10b981',
  size: 300,
  intensity: 35,
  surface: '#09090b',
  fadeEdge: 70
}

/** CSS uses a --x/--y custom property pair updated by JS mousemove; this generator emits that contract. */
export function spotlightCss(s: SpotlightState): string {
  const alpha = (s.intensity / 100).toFixed(2)
  const image =
    s.shape === 'radial'
      ? `radial-gradient(${s.size}px circle at var(--x, 50%) var(--y, 50%), ${s.color}${Math.round(s.intensity * 2.55)
          .toString(16)
          .padStart(2, '0')} 0%, transparent ${s.fadeEdge}%)`
      : s.shape === 'ring'
        ? `radial-gradient(${s.size}px circle at var(--x, 50%) var(--y, 50%), transparent 55%, ${s.color}${Math.round(
            s.intensity * 2.55
          )
            .toString(16)
            .padStart(2, '0')} 60%, transparent ${s.fadeEdge}%)`
        : `linear-gradient(105deg, transparent 40%, ${s.color}${Math.round(s.intensity * 2.55)
            .toString(16)
            .padStart(2, '0')} 50%, transparent 60%)`

  return `.spotlight {
  position: relative;
  background: ${s.surface};
  overflow: hidden;
}

.spotlight::before {
  content: '';
  position: absolute;
  inset: 0;
  background: ${image};
  opacity: ${alpha};
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.spotlight:hover::before {
  opacity: 1;
}`
}

export function spotlightJs(): string {
  return `document.querySelectorAll('.spotlight').forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', \`\${e.clientX - rect.left}px\`);
    el.style.setProperty('--y', \`\${e.clientY - rect.top}px\`);
  });
});`
}

export function spotlightHtml(): string {
  return `<div class="spotlight">\n  <!-- content -->\n</div>\n\n<script>\n${spotlightJs()}\n</script>`
}

export function spotlightVars(s: SpotlightState): Record<string, string> {
  return { '--spotlight-color': s.color, '--spotlight-size': `${s.size}px`, '--spotlight-intensity': `${s.intensity}%` }
}

export function randomizeSpotlight(s: SpotlightState, rng: import('../rng').Rng): SpotlightState {
  const shapes = SPOTLIGHT_SHAPES.map((x) => x.value)
  const h = Math.floor(rng.range(0, 360))
  return {
    ...s,
    shape: rng.pick(shapes),
    color: `hsl(${h} 85% 55%)`,
    size: Math.round(rng.range(200, 450)),
    intensity: Math.round(rng.range(20, 60))
  }
}

export const PRESETS_SPOTLIGHT: { name: string; tags: string[]; state: SpotlightState }[] = [
  { name: 'Emerald Glow', tags: ['brand'], state: { ...DEFAULT_SPOTLIGHT } },
  { name: 'Violet Ring', tags: ['ring'], state: { ...DEFAULT_SPOTLIGHT, shape: 'ring', color: '#8b5cf6', size: 260 } },
  { name: 'Cyan Beam', tags: ['beam'], state: { ...DEFAULT_SPOTLIGHT, shape: 'beam', color: '#06b6d4' } },
  { name: 'Rose Spotlight', tags: ['warm'], state: { ...DEFAULT_SPOTLIGHT, color: '#f43f5e', intensity: 45 } },
  { name: 'Subtle White', tags: ['minimal'], state: { ...DEFAULT_SPOTLIGHT, color: '#ffffff', intensity: 15, size: 350 } },
  { name: 'Amber Card', tags: ['warm', 'card'], state: { ...DEFAULT_SPOTLIGHT, color: '#f59e0b', size: 240, intensity: 40 } },
  { name: 'Light Surface', tags: ['light'], state: { ...DEFAULT_SPOTLIGHT, surface: '#f4f4f5', color: '#18181b', intensity: 8 } }
]

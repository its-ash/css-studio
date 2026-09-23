/** Client-side SCSS compiler for the Bulma theme engine: fetches vendored Bulma + preset sources from
 *  /scss and compiles them with Dart Sass (via the `sass` npm package's browser build), entirely in the browser. */
import type { BulmaPalette } from '~/utils/generators/bulmaTheme'

const scssModuleCache: Record<string, string> = {}
const scssModuleMissCache = new Set<string>()

/** Precomputed list of every vendored .scss path (public/scss/manifest.json), so candidate resolution
 *  can pick the one real file directly instead of probing each guess with a request. */
let manifestPromise: Promise<Set<string>> | null = null
function loadManifest(): Promise<Set<string>> {
  manifestPromise ??= fetch('/scss/manifest.json')
    .then((res) => (res.ok ? res.json() : []))
    .then((files: string[]) => new Set(files))
    .catch(() => new Set<string>())
  return manifestPromise
}

async function loadScssModule(path: string): Promise<string> {
  if (scssModuleCache[path]) return scssModuleCache[path]
  if (scssModuleMissCache.has(path)) throw new Error(`Failed to load ${path}`)
  const fullPath = path.startsWith('scss/') ? path : `scss/${path}`
  const res = await fetch(`/${fullPath}`)
  if (!res.ok) {
    scssModuleMissCache.add(path)
    throw new Error(`Failed to load ${path}`)
  }
  const txt = await res.text()
  scssModuleCache[path] = txt
  return txt
}

function candidatePaths(path: string): string[] {
  const dir = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : ''
  const base = path.includes('/') ? path.slice(path.lastIndexOf('/') + 1) : path
  const baseNoExt = base.replace(/\.scss$/, '')
  const dirPrefix = dir ? `${dir}/` : ''
  return [
    `${dirPrefix}${baseNoExt}.scss`,
    `${dirPrefix}_${baseNoExt}.scss`,
    `${dirPrefix}${baseNoExt}/_index.scss`,
    `${dirPrefix}${baseNoExt}/index.scss`
  ]
}

/** Resolve a Sass import specifier (e.g. "bulma/bulma-entry") to the one real vendored file path,
 *  using the manifest when available so we never issue a request for a candidate that can't exist. */
async function resolveCandidates(path: string): Promise<string[]> {
  const candidates = candidatePaths(path)
  const manifest = await loadManifest()
  if (manifest.size === 0) return candidates
  const known = candidates.filter((c) => manifest.has(c.startsWith('scss/') ? c : `scss/${c}`))
  return known.length > 0 ? known : candidates
}

let sassModulePromise: Promise<typeof import('sass')> | null = null
function loadSass() {
  sassModulePromise ??= import('sass')
  return sassModulePromise
}

const HEX_RE = /^#[0-9a-fA-F]{3,8}$/
const FONT_NAME_RE = /^[A-Za-z0-9 ]{1,60}$/
const CONFIG_VAR_RE = /^\$[a-zA-Z][a-zA-Z0-9-]*$/
const CONFIG_VALUE_RE = /^[a-zA-Z0-9#%.,\s()'"_-]{1,120}$/

export async function compileBulmaTheme(
  themeKey: string,
  palette: BulmaPalette,
  headingFont: string,
  bodyFont: string
): Promise<string> {
  const sass = await loadSass()

  const headingStack = FONT_NAME_RE.test(headingFont) ? `"${headingFont.replace(/["\\]/g, '\\$&')}", Helvetica, Arial, sans-serif` : null
  const bodyStack = FONT_NAME_RE.test(bodyFont) ? `"${bodyFont.replace(/["\\]/g, '\\$&')}", Helvetica, Arial, sans-serif` : null

  const headingSelectors = '.navbar-brand, blockquote, h1, h2, h3, h4, h5, h6'
  const bodySelectors =
    'body, .button, .input, .textarea, .select select, .box, .card, .card-header, .notification, .tag, .table, .navbar, .navbar-item, .panel-block, .content, .icon-text'
  const fontOverrideCss = [
    bodyStack ? `${bodySelectors} { font-family: ${bodyStack} !important; }` : '',
    headingStack ? `${headingSelectors} { font-family: ${headingStack} !important; }` : ''
  ]
    .filter(Boolean)
    .join('\n')

  const configEntries: [string, string][] = (
    [
      ['$primary', palette.primary],
      ['$link', palette.secondary],
      ['$success', palette.success],
      ['$danger', palette.danger],
      ['$warning', palette.warning],
      ['$info', palette.info],
      ['$light', palette.light],
      ['$dark', palette.dark],
      ['$body-background-color', palette.bodyBg],
      ['$body-color', palette.bodyColor]
    ] as [string, string][]
  ).filter(([, value]) => HEX_RE.test(value))

  let presetSrc = ''
  if (themeKey) {
    presetSrc = await loadScssModule(`scss/presets/${themeKey}.scss`)
  }

  const configMap = new Map(configEntries)
  const configMatch = presetSrc.match(/^\/\/!\s*bulma-config:\s*(\{[^\n]*\})\s*$/m)
  if (configMatch) {
    presetSrc = presetSrc.replace(configMatch[0], '')
    try {
      const presetConfig = JSON.parse(configMatch[1]!) as Record<string, string>
      for (const [name, value] of Object.entries(presetConfig)) {
        if (!CONFIG_VAR_RE.test(name) || typeof value !== 'string' || !CONFIG_VALUE_RE.test(value)) continue
        configMap.set(name, value.includes(',') ? `(${value})` : value)
      }
    } catch (e) {
      console.error('Invalid bulma-config in preset:', themeKey, e)
    }
  }

  const configBody = [...configMap.entries()].map(([name, value]) => `  ${name}: ${value}`).join(',\n')
  const bulmaUse = `@use "bulma/bulma-entry" with (\n${configBody}\n);`
  const entry = `${bulmaUse}\n${presetSrc}\n${fontOverrideCss}`

  const customImporter: import('sass').Importer<'async'> = {
    async canonicalize(url, ctx) {
      const stripped = url.startsWith('~') ? url.slice(1) : url
      const base = ctx.containingUrl ? ctx.containingUrl.href : 'file:///scss/entry.scss'
      const resolved = new URL(stripped, base)
      const path = resolved.pathname.slice(1)
      for (const file of await resolveCandidates(path)) {
        try {
          await loadScssModule(file)
          return new URL(`file:///${file}`)
        } catch {
          // try next candidate
        }
      }
      return null
    },
    async load(canonicalUrl) {
      const path = canonicalUrl.pathname.slice(1)
      try {
        const contents = await loadScssModule(path)
        return { contents, syntax: 'scss' }
      } catch {
        return null
      }
    }
  }

  const result = await sass.compileStringAsync(entry, {
    importers: [customImporter],
    url: new URL('file:///scss/entry.scss')
  })

  return result.css
}

export function loadGoogleFonts(fontNames: string[]) {
  if (!import.meta.client) return
  const id = 'bulma-theme-google-fonts'
  let link = document.getElementById(id) as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  const families = [...new Set(fontNames)].map((f) => `family=${f.replace(/ /g, '+')}:wght@300;400;500;600;700;800`).join('&')
  link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`
}

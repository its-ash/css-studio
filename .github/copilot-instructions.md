# CSS Studio

Client-side CSS generator studio and visual playground. No backend, no database, no external API. Everything runs in the browser and the generated output is pure HTML + CSS.

## Stack

- Nuxt 4 (sources in `app/`), Vue 3, TypeScript strict
- Tailwind CSS v4 via `@tailwindcss/vite` (tokens in `app/assets/css/main.css`, `@theme inline` semantic classes: `bg-bg`, `bg-panel`, `border-line`, `text-fg`, `text-muted`, `text-accent`)
- Fonts: `@fontsource/geist` + `@fontsource/geist-mono`
- Icons: `@phosphor-icons/vue` exclusively, used through `app/components/common/Icon.vue`. Never hand-roll SVG icons.
- Dark/light theme via `@nuxtjs/color-mode` (class `dark` on `<html>`)

## Architecture

- Generator logic lives in `app/utils/generators/*.ts` as pure functions: `DEFAULT_*` config, `xxxCss`, `xxxHtml`, `xxxVars`, `xxxPreviewStyle`, `randomize(state, rng)`, `PRESETS_*`. Never put generator math inside pages.
- Pages compose `EditorPageShell` + `PreviewCanvas` + `CodePanel` + `components/controls/*`. One page per generator.
- State: `useEditor` composable (persistence to `localStorage` under `css-studio:state:<id>`, undo/redo history, share URL via `?state=` base64url JSON, project autosave). No Pinia, no Vuex.
- Random values use the seeded RNG in `app/utils/rng.ts` so every randomize is reproducible from `state.seed`.
- Colors: conversions and harmony helpers in `app/utils/colors.ts`.
- Projects: `useProjects` composable, exported/imported as JSON.

## Rules

- Generated effects must be real CSS. Do not use canvas or SVG where CSS can do the job.
- Every generator must have a working preview, valid CSS output, copy, reset, randomize and presets.
- Keep the app UI itself neutral: zinc neutrals, one emerald accent, no gradient chrome.
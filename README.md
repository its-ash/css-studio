# CSS Studio

Client-side CSS generator studio and visual playground. No backend, no database, no external API — everything runs in the browser and the generated output is pure HTML + CSS.

Live at [css-studio.itsash.in](https://css-studio.itsash.in).

## Generators

Animation, Badge, Blob, Border, Component, Cursor, Divider, Filter, Glass, Gradient, Layers, Loader, Mesh Gradient, Neumorph, Noise, Pattern, Scrollbar, Shadow, Shape, Spotlight, Text, Typescale.

## Stack

- Nuxt 4 + Vue 3 + TypeScript (strict)
- Tailwind CSS v4
- `@phosphor-icons/vue`
- `@nuxtjs/color-mode` for dark/light theming

## Development

```sh
make run     # start dev server
make build   # static export to docs/
make deploy  # build, commit, push to main (served via GitHub Pages)
```

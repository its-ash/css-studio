<script setup lang="ts">
import { hexToHsl, hslToHex, hslCss, rgbCss, hslOklch, contrastRatio, wcagRating, suggestAccessible, harmonies } from '~/utils/colors'
import type { Hsl } from '~/utils/colors'

const color = ref('#10b981')
const bg = ref('#09090b')

const hsl = computed(() => hexToHsl(color.value))
const bgHsl = computed(() => hexToHsl(bg.value))

const formats = computed(() => [
  { label: 'HEX', value: color.value.toUpperCase() },
  { label: 'RGB', value: rgbCss(color.value) },
  { label: 'HSL', value: hslCss(hsl.value) },
  { label: 'OKLCH', value: hslOklch(hsl.value) }
])

const ratio = computed(() => contrastRatio(color.value, bg.value))
const rating = computed(() => wcagRating(ratio.value))
const suggestion = computed(() => {
  if (ratio.value >= 4.5) return null
  const s = suggestAccessible(hsl.value, bg.value)
  return { hsl: s, hex: hslToHex(s) }
})

const harmony = computed(() => harmonies(hsl.value))

const harmonyGroups = computed(() =>
  (
    [
      ['Complementary', harmony.value.complementary],
      ['Analogous', harmony.value.analogous],
      ['Triadic', harmony.value.triadic],
      ['Split Complementary', harmony.value.split],
      ['Monochromatic', harmony.value.monochrome]
    ] as const
  ).map(([label, list]) => ({
    label,
    swatches: list.map((c) => ({ css: hslToHex(c), hsl: c }))
  }))
)

function useColor(c: string) {
  color.value = c
}

useSeoMeta({
  title: 'Color Tools - CSS Studio',
  description: 'Color harmony generator, contrast checker and format converter.',
  ogTitle: 'Color Tools - CSS Studio',
  ogDescription: 'Color harmony generator, contrast checker and format converter.',
  ogUrl: 'https://css-studio.itsash.in/palette',
  twitterTitle: 'Color Tools - CSS Studio',
  twitterDescription: 'Color harmony generator, contrast checker and format converter.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/palette' }] })
</script>

<template>
  <div class="flex min-h-dvh">
    <aside class="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-line bg-panel md:flex">
      <div class="flex h-14 shrink-0 items-center gap-2 border-b border-line px-4">
        <NuxtLink to="/" class="flex items-center gap-2 text-sm font-semibold tracking-tight text-fg">
          <Icon name="ph-paint-brush" :size="17" weight="duotone" class="text-accent" />
          CSS Studio
        </NuxtLink>
      </div>
      <div class="min-h-0 flex-1 overflow-y-auto">
        <SidebarNav />
      </div>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col">
      <header class="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-line bg-panel/80 px-4 shadow-panel backdrop-blur-md">
        <h1 class="text-sm font-medium text-fg">Color Tools</h1>
        <CommandPalette />
      </header>

      <main class="mx-auto w-full max-w-4xl flex-1 px-6 py-8 lg:px-10">
        <section class="grid gap-4 md:grid-cols-2">
          <div class="flex flex-col gap-3.5 rounded-xl border border-line bg-panel p-4 shadow-panel">
            <h2 class="text-[13px] font-medium tracking-tight text-fg">Pick a color</h2>
            <label class="flex items-center gap-3">
              <input v-model="color" type="color" class="h-12 w-20 cursor-pointer rounded-lg border border-line bg-bg p-0.5 transition-colors duration-150 hover:border-line-strong" aria-label="Foreground color" />
              <input v-model="color" type="text" class="h-9 w-full rounded-lg border border-line bg-bg px-2.5 font-mono text-sm text-fg transition-colors duration-150 hover:border-line-strong focus:border-accent/60" aria-label="Foreground hex value" />
            </label>
            <label class="flex items-center gap-3">
              <input v-model="bg" type="color" class="h-12 w-20 cursor-pointer rounded-lg border border-line bg-bg p-0.5 transition-colors duration-150 hover:border-line-strong" aria-label="Background color" />
              <input v-model="bg" type="text" class="h-9 w-full rounded-lg border border-line bg-bg px-2.5 font-mono text-sm text-fg transition-colors duration-150 hover:border-line-strong focus:border-accent/60" aria-label="Background hex value" />
            </label>
            <div class="grid grid-cols-2 gap-2">
              <div
                class="flex h-16 items-center justify-center rounded-lg text-xs font-medium"
                :style="{ backgroundColor: bg, color }"
              >
                Text sample
              </div>
              <div class="flex h-16 flex-col items-center justify-center rounded-lg bg-bg text-xs text-muted">
                <span class="font-mono text-fg">{{ ratio.toFixed(2) }}:1</span>
                <span :class="rating === 'Fail' ? 'text-rose-400' : 'text-accent'">{{ rating }}</span>
              </div>
            </div>
            <div v-if="suggestion" class="rounded-lg border border-line bg-bg p-3 text-xs text-muted">
              Try
              <button class="font-mono text-fg underline decoration-dotted transition-colors duration-150 hover:text-accent" @click="useColor(suggestion.hex)">{{ suggestion.hex }}</button>
              for AA contrast on this background.
            </div>
          </div>

          <div class="flex flex-col gap-3.5 rounded-xl border border-line bg-panel p-4 shadow-panel">
            <h2 class="text-[13px] font-medium tracking-tight text-fg">Formats</h2>
            <div class="flex flex-col gap-2">
              <div v-for="f in formats" :key="f.label" class="flex items-center justify-between rounded-lg bg-bg px-3 py-2">
                <span class="text-xs text-muted">{{ f.label }}</span>
                <code class="font-mono text-xs text-fg">{{ f.value }}</code>
              </div>
            </div>
          </div>
        </section>

        <section class="mt-8 flex flex-col gap-5">
          <div v-for="group in harmonyGroups" :key="group.label" class="flex flex-col gap-2">
            <h3 class="text-xs font-medium text-muted">{{ group.label }}</h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="sw in group.swatches"
                :key="sw.css"
                class="h-10 w-16 rounded-lg border border-line transition-transform duration-150 active:scale-95"
                :style="{ backgroundColor: sw.css }"
                :aria-label="`Use ${sw.css}`"
                :title="sw.css"
                @click="useColor(sw.css)"
              ></button>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_NAVBAR,
  PRESETS_NAVBAR,
  NAVBAR_SKINS,
  navbarCss,
  navbarHtml,
  navbarVars,
  randomizeNavbar
} from '~/utils/generators/navbar'
import type { NavbarState } from '~/utils/generators/navbar'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<NavbarState>({
  id: 'navbar',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_NAVBAR)) as NavbarState,
  randomize: randomizeNavbar
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => navbarCss(state.value))
const html = computed(() => navbarHtml(state.value))
const vars = computed(() => navbarVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_NAVBAR[i]!.state)) as NavbarState
  pushHistory()
}


const variants = computed(() => PRESETS_NAVBAR.map((p) => ({ name: p.name, css: navbarCss(p.state), html: navbarHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Navbar Builder"
    description="Floating, underline, pill and sidebar navigation."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Navbar preview" filename="css-studio-navbar">
        <template #presets>
          <PreviewPresets :presets="PRESETS_NAVBAR" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-3xl items-center justify-center p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Navbar" icon="ph-list-magnifying-glass">
        <SelectControl v-model="state.skin" label="Skin" :options="NAVBAR_SKINS" />
        <TextControl v-model="state.logoText" label="Logo text" />
        <SliderControl v-model="state.items" label="Links" :min="2" :max="6" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="24" suffix="px" />
        <ToggleControl v-model="state.blur" label="Backdrop blur" />
        <ToggleControl v-model="state.indicator" label="Active underline" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Accent" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
        <ColorControl :model-value="state.textColor" label="Text" @update:model-value="(v) => (state.textColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-navbar" />
    </template>
  </EditorPageShell>
</template>
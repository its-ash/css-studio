<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_KBD,
  PRESETS_KBD,
  KBD_SKINS,
  kbdCss,
  kbdHtml,
  kbdVars,
  randomizeKbd
} from '~/utils/generators/kbd'
import type { KbdState } from '~/utils/generators/kbd'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<KbdState>({
  id: 'kbd',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_KBD)) as KbdState,
  randomize: randomizeKbd
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => kbdCss(state.value))
const html = computed(() => kbdHtml(state.value))
const vars = computed(() => kbdVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_KBD[i]!.state)) as KbdState
  pushHistory()
}


const variants = computed(() => PRESETS_KBD.map((p) => ({ name: p.name, css: kbdCss(p.state), html: kbdHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Kbd & Code Chips"
    description="Keyboard keycaps, shortcut rows and inline code chips."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Kbd preview" filename="css-studio-kbd">
        <template #presets>
          <PreviewPresets :presets="PRESETS_KBD" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl items-center justify-center p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Keys" icon="ph-keyboard">
        <SelectControl v-model="state.skin" label="Skin" :options="KBD_SKINS" />
        <SliderControl v-model="state.fontSize" label="Font size" :min="10" :max="18" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="12" suffix="px" />
        <SliderControl v-model="state.depth" label="Key depth" :min="1" :max="6" suffix="px" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.accent" label="Accent" @update:model-value="(v) => (state.accent = v)" />
        <ColorControl :model-value="state.bg" label="Key bg" @update:model-value="(v) => (state.bg = v)" />
        <ColorControl :model-value="state.textColor" label="Text" @update:model-value="(v) => (state.textColor = v)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-kbd" />
    </template>
  </EditorPageShell>
</template>
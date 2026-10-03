<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_TEXT_ANIM,
  PRESETS_TEXT_ANIM,
  TEXT_ANIM_KINDS,
  textAnimCss,
  textAnimHtml,
  textAnimVars,
  randomizeTextAnim
} from '~/utils/generators/textAnim'
import type { TextAnimState } from '~/utils/generators/textAnim'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<TextAnimState>({
  id: 'text-anim',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_TEXT_ANIM)) as TextAnimState,
  randomize: randomizeTextAnim
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => textAnimCss(state.value))
const html = computed(() => textAnimHtml(state.value))
const vars = computed(() => textAnimVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_TEXT_ANIM[i]!.state)) as TextAnimState
  pushHistory()
}


const variants = computed(() => PRESETS_TEXT_ANIM.map((p) => ({ name: p.name, css: textAnimCss(p.state), html: textAnimHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Text Animations"
    description="Typewriter, wave, glitch and reveal text — keyframes only."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Text animation preview" filename="css-studio-text-anim">
        <template #presets>
          <PreviewPresets :presets="PRESETS_TEXT_ANIM" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl flex-col items-center justify-center gap-8 p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
          <p class="max-w-xs text-center text-[11px] text-muted">Animation loops live — press reset to replay it.</p>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Animation" icon="ph-text-aa">
        <SelectControl v-model="state.kind" label="Type" :options="TEXT_ANIM_KINDS" />
        <TextControl v-model="state.text" label="Text" placeholder="Your text" />
        <SliderControl v-model="state.duration" label="Duration" :min="600" :max="5000" :step="100" suffix="ms" />
        <SliderControl v-model="state.fontSize" label="Font size" :min="22" :max="64" suffix="px" />
        <SliderControl v-model="state.fontWeight" label="Weight" :min="300" :max="900" :step="100" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.color" label="Text" @update:model-value="(v) => (state.color = v)" />
        <template v-if="state.kind === 'glitch'">
          <ColorControl :model-value="state.glitchColor1" label="Glitch A" @update:model-value="(v) => (state.glitchColor1 = v)" />
          <ColorControl :model-value="state.glitchColor2" label="Glitch B" @update:model-value="(v) => (state.glitchColor2 = v)" />
        </template>
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-text-anim" />
    </template>
  </EditorPageShell>
</template>
<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_SCROLLBAR,
  PRESETS_SCROLLBAR,
  scrollbarCss,
  scrollbarHtml,
  scrollbarVars,
  randomizeScrollbar
} from '~/utils/generators/scrollbar'
import type { ScrollbarState } from '~/utils/generators/scrollbar'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<ScrollbarState>({
  id: 'scrollbar',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_SCROLLBAR)) as ScrollbarState,
  randomize: randomizeScrollbar
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => scrollbarCss(state.value))
const html = computed(() => scrollbarHtml())
const vars = computed(() => scrollbarVars(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_SCROLLBAR[i]!.state)) as ScrollbarState
  pushHistory()
}

useSeoMeta({
  title: 'Scrollbar - CSS Studio',
  description: 'Custom ::-webkit-scrollbar and scrollbar-color styling.',
  ogTitle: 'Scrollbar - CSS Studio',
  ogDescription: 'Custom ::-webkit-scrollbar and scrollbar-color styling.',
  ogUrl: 'https://css-studio.itsash.in/scrollbar',
  twitterTitle: 'Scrollbar - CSS Studio',
  twitterDescription: 'Custom ::-webkit-scrollbar and scrollbar-color styling.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/scrollbar' }] })
</script>

<template>
  <EditorPageShell
    title="Scrollbar Generator"
    description="Custom ::-webkit-scrollbar and scrollbar-color styling."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Scrollbar preview" filename="css-studio-scrollbar">
        <template #presets>
          <PreviewPresets :presets="PRESETS_SCROLLBAR" @apply="applyPreset" />
        </template>
        <component :is="'style'">{{ css }}</component>
        <div
          class="scroll-area h-[380px] w-72 overflow-y-scroll rounded-xl border border-line p-4"
          style="background: var(--color-bg)"
          aria-label="Scrollbar preview"
        >
          <p v-for="i in 24" :key="i" class="mb-3 text-sm text-muted">Scrollable line {{ i }} — the quick brown fox jumps over the lazy dog.</p>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Scrollbar" icon="ph-square-half">
        <SliderControl v-model="state.width" label="Width" :min="4" :max="20" suffix="px" />
        <ColorControl :model-value="state.trackColor" label="Track color" @update:model-value="(v) => (state.trackColor = v)" />
        <ColorControl :model-value="state.thumbColor" label="Thumb color" @update:model-value="(v) => (state.thumbColor = v)" />
        <ColorControl :model-value="state.thumbHoverColor" label="Thumb hover color" @update:model-value="(v) => (state.thumbHoverColor = v)" />
        <ToggleControl v-model="state.rounded" label="Rounded" />
        <SliderControl v-if="state.rounded" v-model="state.radius" label="Radius" :min="0" :max="999" suffix="px" />
        <ToggleControl v-model="state.useFirefox" label="Include Firefox (scrollbar-color)" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-scrollbar" />
    </template>
  </EditorPageShell>
</template>

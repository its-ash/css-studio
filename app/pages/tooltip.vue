<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  TOOLTIP_POSITIONS,
  TOOLTIP_SKINS,
  DEFAULT_TOOLTIP,
  PRESETS_TOOLTIP,
  tooltipCss,
  tooltipHtml,
  tooltipVars,
  randomizeTooltip
} from '~/utils/generators/scrollbar'
import type { TooltipState } from '~/utils/generators/scrollbar'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<TooltipState>({
  id: 'tooltip',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_TOOLTIP)) as TooltipState,
  randomize: randomizeTooltip
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => tooltipCss(state.value))
const vars = computed(() => tooltipVars(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_TOOLTIP[i]!.state)) as TooltipState
  pushHistory()
}

/** Renders the generated tooltip CSS inside this page only, without leaking to other routes. */
const demoStyle = computed(() => `<style>${css.value}</style>`)

useSeoMeta({
  title: 'Tooltip Builder - CSS Studio',
  description: 'Pure-CSS tooltips with data-tip attribute, arrows, skins and placement.',
  ogTitle: 'Tooltip Builder - CSS Studio',
  ogDescription: 'Pure-CSS tooltips with data-tip attribute, arrows, skins and placement.',
  ogUrl: 'https://css-studio.itsash.in/tooltip',
  twitterTitle: 'Tooltip Builder - CSS Studio',
  twitterDescription: 'Pure-CSS tooltips with data-tip attribute, arrows, skins and placement.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/tooltip' }] })
</script>

<template>
  <EditorPageShell
    title="Tooltip Builder"
    description="Pure-CSS tooltips: data-tip attribute, four placements, arrow and skins."
    :css="css"
    :html="tooltipHtml()"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Tooltip preview" filename="css-studio-tooltip">
        <template #presets>
          <PreviewPresets :presets="PRESETS_TOOLTIP" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl flex-col items-center justify-center gap-6">
          <div class="flex items-center gap-6">
            <button class="tooltip inline-flex h-10 items-center rounded-lg border border-line bg-panel px-4 text-sm font-medium text-fg transition-colors duration-150 hover:bg-line/20 active:scale-[0.97]" :data-tip="state.text" aria-label="Hover to preview the tooltip">
              Hover me
            </button>
          </div>
          <p class="max-w-xs text-center text-[11px] leading-relaxed text-muted">
            {{ state.trigger === 'focus' ? 'Tab to the button to reveal the tooltip via :focus-visible.' : 'Hover the button to preview the tooltip. Arrow follows the placement setting.' }}
          </p>
          <div class="flex items-center gap-6 text-muted">
            <button class="tooltip inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-panel transition-colors duration-150 hover:bg-line/20" :data-tip="state.text" aria-label="Second tooltip preview">
              <Icon name="ph-info" :size="16" />
            </button>
            <button class="tooltip inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-panel transition-colors duration-150" :data-tip="state.text" aria-label="Third tooltip preview">
              <Icon name="ph-gear-six" :size="16" />
            </button>
          </div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Placement" icon="ph-cursor-click">
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="p in TOOLTIP_POSITIONS"
            :key="p.value"
            type="button"
            class="h-9 rounded-lg border text-xs font-medium transition-colors duration-150"
            :class="state.position === p.value ? 'border-accent/70 bg-accent/8 text-fg' : 'border-line text-muted hover:bg-line/15'"
            :aria-pressed="state.position === p.value"
            @click="state.position = p.value"
          >
            {{ p.label }}
          </button>
        </div>
        <SelectControl v-model="state.trigger" label="Trigger" :options="[{ value: 'hover', label: 'Hover' }, { value: 'focus', label: 'Focus (:focus-visible)' }]" />
        <ToggleControl v-model="state.arrow" label="Arrow" />
        <ToggleControl v-model="state.animate" label="Animate in" />
      </ControlGroup>

      <ControlGroup label="Skin" icon="ph-paint-brush">
        <SelectControl v-model="state.skin" label="Skin" :options="TOOLTIP_SKINS" />
        <ColorControl :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
        <ColorControl :model-value="state.color" label="Text" @update:model-value="(v) => (state.color = v)" />
      </ControlGroup>

      <ControlGroup label="Layout" icon="ph-ruler">
        <TextControl v-model="state.text" label="Text" placeholder="Tooltip text" />
        <SliderControl v-model="state.offset" label="Offset" :min="0" :max="24" suffix="px" />
        <SliderControl v-model="state.radius" label="Radius" :min="0" :max="20" suffix="px" />
        <SliderControl v-model="state.fontSize" label="Font size" :min="10" :max="18" suffix="px" />
        <SliderControl v-model="state.maxWidth" label="Max width" :min="120" :max="360" :step="10" suffix="px" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="tooltipHtml()" :vars="vars" filename="css-studio-tooltip" />
    </template>
  </EditorPageShell>
</template>
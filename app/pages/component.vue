<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_COMPONENT,
  PRESETS_COMPONENT,
  COMPONENT_KINDS,
  componentCss,
  componentHtml,
  componentPreviewStyle,
  componentVars,
  randomizeComponent
} from '~/utils/generators/component'
import type { ComponentState } from '~/utils/generators/component'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<ComponentState>({
  id: 'component',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_COMPONENT)) as ComponentState,
  randomize: randomizeComponent
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => componentCss(state.value))
const html = computed(() => componentHtml(state.value))
const vars = computed(() => componentVars(state.value))
const style = computed(() => componentPreviewStyle(state.value))

/** These kinds rely on pseudo-elements/selectors that a plain inline style can't express. */
const CUSTOM_MARKUP_KINDS = new Set(['checkbox', 'switch', 'tooltip', 'alert'])
const usesCustomMarkup = computed(() => CUSTOM_MARKUP_KINDS.has(state.value.kind))

const switchChecked = ref(true)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_COMPONENT[i]!.state)) as ComponentState
  pushHistory()
}

useHead({ title: 'Component - CSS Studio' })
</script>

<template>
  <EditorPageShell
    title="Component Generator"
    description="Buttons, cards, inputs, badges, navbars and hero blocks."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Component preview" filename="css-studio-component">
        <template #presets>
          <PreviewPresets :presets="PRESETS_COMPONENT" @apply="applyPreset" />
        </template>
        <div
          class="flex h-[420px] w-full max-w-3xl items-center justify-center p-6"
          :style="state.kind === 'card' && state.useGlass ? { backgroundImage: 'linear-gradient(120deg, #f43f5e, #f97316, #eab308, #22d3ee, #8b5cf6)' } : {}"
        >
          <component :is="'style'" v-if="usesCustomMarkup">{{ css }}</component>
          <button v-if="state.kind === 'button'" :style="style" aria-label="Button preview">Click Me</button>
          <div v-else-if="state.kind === 'card'" :style="style" class="max-w-xs" aria-label="Card preview">
            <h3 class="mb-1 text-base font-semibold">Card Title</h3>
            <p class="text-sm opacity-80">Card content goes here.</p>
          </div>
          <input v-else-if="state.kind === 'input'" :style="style" placeholder="Type here..." class="max-w-xs" aria-label="Input preview" />
          <span v-else-if="state.kind === 'badge'" :style="style" aria-label="Badge preview">New</span>
          <nav v-else-if="state.kind === 'navbar'" :style="style" class="w-full max-w-xl" aria-label="Navbar preview">Home&nbsp;&nbsp;About&nbsp;&nbsp;Contact</nav>
          <input v-else-if="state.kind === 'checkbox'" type="checkbox" class="component-demo" checked aria-label="Checkbox preview" />
          <button
            v-else-if="state.kind === 'switch'"
            type="button"
            role="switch"
            :aria-checked="switchChecked"
            class="component-demo"
            aria-label="Switch preview"
            @click="switchChecked = !switchChecked"
          ></button>
          <span v-else-if="state.kind === 'tooltip'" class="component-demo" aria-label="Tooltip preview">
            Hover me
            <span class="tooltip-bubble">Tooltip text</span>
          </span>
          <div v-else-if="state.kind === 'alert'" class="component-demo max-w-sm" aria-label="Alert preview">
            <div>
              <div class="alert-title">Heads up</div>
              <div>Something needs your attention.</div>
            </div>
          </div>
          <section v-else :style="style" class="w-full max-w-xl text-center" aria-label="Hero preview">
            <h1 class="mb-2 font-bold">Hero Title</h1>
            <p class="opacity-80">Subtitle text</p>
          </section>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Component" icon="ph-cube">
        <SelectControl v-model="state.kind" label="Type" :options="COMPONENT_KINDS" />
        <ToggleControl v-model="state.useGradient" label="Use gradient" />
        <ColorControl v-if="!state.useGradient" :model-value="state.bg" label="Background" @update:model-value="(v) => (state.bg = v)" />
        <template v-else>
          <ColorControl :model-value="state.gradientFrom" label="Gradient from" @update:model-value="(v) => (state.gradientFrom = v)" />
          <ColorControl :model-value="state.gradientTo" label="Gradient to" @update:model-value="(v) => (state.gradientTo = v)" />
          <SliderControl v-model="state.gradientAngle" label="Gradient angle" :min="0" :max="360" suffix="deg" />
        </template>
        <ColorControl :model-value="state.textColor" label="Text color" @update:model-value="(v) => (state.textColor = v)" />
        <SliderControl v-model="state.borderRadius" label="Border radius" :min="0" :max="999" suffix="px" />
        <SliderControl v-model="state.padding" label="Padding" :min="0" :max="64" suffix="px" />
        <SliderControl v-model="state.fontSize" label="Font size" :min="10" :max="40" suffix="px" />
        <SliderControl v-model="state.fontWeight" label="Font weight" :min="300" :max="900" :step="100" />
      </ControlGroup>

      <ControlGroup v-if="state.kind === 'card'" label="Glass" icon="ph-drop-half">
        <ToggleControl v-model="state.useGlass" label="Frosted glass" />
        <SliderControl v-if="state.useGlass" v-model="state.glassBlur" label="Backdrop blur" :min="0" :max="40" suffix="px" />
      </ControlGroup>

      <ControlGroup v-if="state.kind === 'switch'" label="Track" icon="ph-square">
        <ColorControl :model-value="state.borderColor" label="Track (off) color" @update:model-value="(v) => (state.borderColor = v)" />
      </ControlGroup>
      <ControlGroup v-else-if="state.kind === 'alert'" label="Border" icon="ph-square">
        <ColorControl :model-value="state.borderColor" label="Accent color" @update:model-value="(v) => (state.borderColor = v)" />
      </ControlGroup>
      <ControlGroup v-else label="Border" icon="ph-square">
        <SliderControl v-model="state.borderWidth" label="Border width" :min="0" :max="6" suffix="px" />
        <ColorControl v-if="state.borderWidth > 0" :model-value="state.borderColor" label="Border color" @update:model-value="(v) => (state.borderColor = v)" />
      </ControlGroup>

      <ControlGroup v-if="state.kind !== 'switch'" label="Shadow & Glow" icon="ph-sparkle">
        <SliderControl v-model="state.shadowY" label="Shadow Y" :min="-30" :max="40" suffix="px" />
        <SliderControl v-model="state.shadowBlur" label="Shadow blur" :min="0" :max="80" suffix="px" />
        <ColorControl :model-value="state.shadowColor" label="Shadow color" @update:model-value="(v) => (state.shadowColor = v)" />
        <ToggleControl v-model="state.useGlow" label="Glow" />
        <template v-if="state.useGlow">
          <ColorControl :model-value="state.glowColor" label="Glow color" @update:model-value="(v) => (state.glowColor = v)" />
          <SliderControl v-model="state.glowBlur" label="Glow blur" :min="0" :max="60" suffix="px" />
        </template>
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-component" />
    </template>
  </EditorPageShell>
</template>

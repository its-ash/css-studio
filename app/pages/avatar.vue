<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_AVATAR,
  PRESETS_AVATAR,
  avatarCss,
  avatarHtml,
  avatarVars,
  randomizeAvatar
} from '~/utils/generators/avatar'
import type { AvatarState } from '~/utils/generators/avatar'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<AvatarState>({
  id: 'avatar',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_AVATAR)) as AvatarState,
  randomize: randomizeAvatar
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => avatarCss(state.value))
const html = computed(() => avatarHtml(state.value))
const vars = computed(() => avatarVars(state.value))
const demoStyle = computed(() => `<style>${css.value}</style>`)

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_AVATAR[i]!.state)) as AvatarState
  pushHistory()
}


const variants = computed(() => PRESETS_AVATAR.map((p) => ({ name: p.name, css: avatarCss(p.state), html: avatarHtml(p.state) })))
</script>

<template>
  <EditorPageShell
    title="Avatar Stack"
    description="Overlapping avatar groups with rings and +N badge."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas :variants="variants" @apply-variant="applyPreset" title="Avatar preview" filename="css-studio-avatar">
        <template #presets>
          <PreviewPresets :presets="PRESETS_AVATAR" @apply="applyPreset" />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="demoStyle" aria-hidden="true"></div>
        <div class="flex h-full w-full max-w-2xl flex-col items-center justify-center gap-8 p-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="html"></div>
          <p class="max-w-xs text-center text-[11px] text-muted">Hover the stack to see the spread interaction.</p>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Stack" icon="ph-users-three">
        <SliderControl v-model="state.count" label="Avatars" :min="2" :max="12" />
        <SliderControl v-model="state.size" label="Size" :min="28" :max="60" suffix="px" />
        <SliderControl v-model="state.gap" label="Overlap" :min="4" :max="24" suffix="px" />
        <div class="grid grid-cols-2 gap-2">
          <button type="button" class="h-9 rounded-lg border text-xs font-medium transition-colors duration-150" :class="state.shape === 'circle' ? 'border-accent/70 bg-accent/8 text-fg' : 'border-line text-muted hover:bg-line/15'" :aria-pressed="state.shape === 'circle'" @click="state.shape = 'circle'">Circle</button>
          <button type="button" class="h-9 rounded-lg border text-xs font-medium transition-colors duration-150" :class="state.shape === 'rounded' ? 'border-accent/70 bg-accent/8 text-fg' : 'border-line text-muted hover:bg-line/15'" :aria-pressed="state.shape === 'rounded'" @click="state.shape = 'rounded'">Rounded</button>
        </div>
        <ToggleControl v-model="state.hoverSpread" label="Spread on hover" />
        <ToggleControl v-model="state.showOverflowBadge" label="+N overflow badge" />
      </ControlGroup>

      <ControlGroup label="Colors" icon="ph-palette">
        <ColorControl :model-value="state.gradientFrom" label="Gradient from" @update:model-value="(v) => (state.gradientFrom = v)" />
        <ColorControl :model-value="state.gradientTo" label="Gradient to" @update:model-value="(v) => (state.gradientTo = v)" />
        <ColorControl :model-value="state.ringColor" label="Ring" @update:model-value="(v) => (state.ringColor = v)" />
        <SliderControl v-model="state.ringWidth" label="Ring width" :min="0" :max="5" suffix="px" />
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-avatar" />
    </template>
  </EditorPageShell>
</template>
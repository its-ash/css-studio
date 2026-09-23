<script setup lang="ts">
import { useEditor } from '~/composables/useEditor'
import {
  DEFAULT_BADGE,
  PRESETS_BADGE,
  BADGE_KINDS,
  badgeCss,
  badgeHtml,
  badgeVars,
  randomizeBadge
} from '~/utils/generators/badge'
import type { BadgeState } from '~/utils/generators/badge'

const { state, randomize, reset, undo, redo, pushHistory, shareUrlRef } = useEditor<BadgeState>({
  id: 'badge',
  defaultState: JSON.parse(JSON.stringify(DEFAULT_BADGE)) as BadgeState,
  randomize: randomizeBadge
})

const setShareUrl = inject<(url: string) => void>('editor:shareUrl', () => {})
watchEffect(() => setShareUrl(shareUrlRef.value))

const css = computed(() => badgeCss(state.value))
const html = computed(() => badgeHtml(state.value))
const vars = computed(() => badgeVars(state.value))

function applyPreset(i: number) {
  state.value = JSON.parse(JSON.stringify(PRESETS_BADGE[i]!.state)) as BadgeState
  pushHistory()
}

useSeoMeta({
  title: 'Badge - CSS Studio',
  description: 'Pill shapes, status dots, notification counts and corner ribbons.',
  ogTitle: 'Badge - CSS Studio',
  ogDescription: 'Pill shapes, status dots, notification counts and corner ribbons.',
  ogUrl: 'https://css-studio.itsash.in/badge',
  twitterTitle: 'Badge - CSS Studio',
  twitterDescription: 'Pill shapes, status dots, notification counts and corner ribbons.'
})
useHead({ link: [{ rel: 'canonical', href: 'https://css-studio.itsash.in/badge' }] })
</script>

<template>
  <EditorPageShell
    title="Badge Generator"
    description="Pill shapes, status dots, notification counts and corner ribbons."
    :css="css"
    :html="html"
    :vars="vars"
    @randomize="randomize"
    @reset="reset"
    @undo="undo"
    @redo="redo"
  >
    <template #preview>
      <PreviewCanvas title="Badge preview" filename="css-studio-badge">
        <template #presets>
          <PreviewPresets :presets="PRESETS_BADGE" @apply="applyPreset" />
        </template>
        <div class="flex h-[420px] w-full max-w-3xl items-center justify-center p-6">
          <component :is="'style'">{{ css }}</component>
          <span v-if="state.kind === 'pill' || state.kind === 'soft' || state.kind === 'outline'" class="badge" aria-label="Badge preview">New</span>
          <span v-else-if="state.kind === 'dot'" class="badge" aria-label="Badge preview">Online</span>
          <span v-else-if="state.kind === 'notification-dot'" class="badge" aria-label="Badge preview">
            <Icon name="ph-square" :size="40" class="text-muted" />
          </span>
          <div v-else class="badge-wrap h-32 w-48 rounded-xl border border-line bg-panel" aria-label="Badge preview">
            <span class="badge-ribbon">SALE</span>
          </div>
        </div>
      </PreviewCanvas>
    </template>

    <template #controls>
      <ControlGroup label="Badge" icon="ph-tag">
        <SelectControl v-model="state.kind" label="Type" :options="BADGE_KINDS" />
        <ColorControl
          v-if="state.kind === 'pill' || state.kind === 'soft' || state.kind === 'outline' || state.kind === 'ribbon'"
          :model-value="state.bg"
          label="Background"
          @update:model-value="(v) => (state.bg = v)"
        />
        <ColorControl
          v-if="state.kind === 'pill' || state.kind === 'ribbon' || state.kind === 'dot'"
          :model-value="state.textColor"
          label="Text color"
          @update:model-value="(v) => (state.textColor = v)"
        />
        <ColorControl
          v-if="state.kind === 'dot' || state.kind === 'notification-dot'"
          :model-value="state.dotColor"
          label="Dot color"
          @update:model-value="(v) => (state.dotColor = v)"
        />
        <SliderControl v-if="state.kind === 'dot' || state.kind === 'notification-dot'" v-model="state.size" label="Dot size" :min="4" :max="16" suffix="px" />
        <template v-if="state.kind === 'notification-dot'">
          <ToggleControl v-model="state.showCount" label="Show count" />
          <SliderControl v-if="state.showCount" v-model="state.count" label="Count" :min="1" :max="99" />
        </template>
      </ControlGroup>
    </template>

    <template #code>
      <CodePanel :css="css" :html="html" :vars="vars" filename="css-studio-badge" />
    </template>
  </EditorPageShell>
</template>

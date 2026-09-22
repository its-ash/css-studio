<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col min-h-dvh">
    <header class="sticky top-0 z-40 h-14 flex items-center justify-between border-b border-line bg-panel/80 backdrop-blur-md">
      <div class="flex items-center gap-2 px-4">
        <NuxtLink to="/" class="flex items-center gap-2 text-fg font-semibold text-sm tracking-tight">
          <Icon name="ph-paint-brush" :size="18" weight="duotone" class="text-accent" />
          CSS Studio
        </NuxtLink>
      </div>
      <div class="flex items-center gap-1 px-2">
        <slot name="actions" />
      </div>
    </header>
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
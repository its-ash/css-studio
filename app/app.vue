<script setup lang="ts">
import '@fontsource/geist/400.css'
import '@fontsource/geist/500.css'
import '@fontsource/geist/600.css'
import '@fontsource/geist-mono/400.css'
import '@fontsource/geist-mono/500.css'

const colorMode = useColorMode()
</script>

<template>
  <div class="min-h-dvh bg-bg text-fg">
    <NuxtLoadingIndicator color="#34d399" :height="2" />
    <NuxtPage />
    <ToastHost />
  </div>
</template>
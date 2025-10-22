<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useTheme } from 'vue-tg'
import { onMounted } from 'vue'
import { useTelegramStore } from '@/stores/telegram'

const telegram = useTelegramStore()

telegram.init()

onMounted(() => {
  window.vue = useTheme()
})
</script>

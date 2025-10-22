<template>
  <Section title="Phones">
    <ul v-if="isAnyPhone" class="mb-2">
      <li v-for="phone in phonesData" >{{ phone }}</li>
    </ul>
    <p v-else class="text-hint text-center py-2">There is no phones.</p>
    <NuxtLink to="/add" class="btn hover:no-underline w-full text-center bg-[var(--tg-theme-button-color)]">add</NuxtLink>
  </Section>
</template>

<script setup>
import { computed } from 'vue'

const phonesData = await $fetch("/api/", {
  headers: {
    'X-Telegram-Init-Data': useTelegramStore().initData
  }
})

const isAnyPhone = computed(() => phonesData.length > 0)
</script>
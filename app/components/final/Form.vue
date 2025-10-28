<template>
  <div class="flex flex-col items-center">
    <p class="text-center text-main">Number successfully added.</p>
    <NuxtLink to="/" class="text-link btn mx-auto mt-4">Home</NuxtLink>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const store = usePhoneStore()

onMounted(store.refresh)
</script>
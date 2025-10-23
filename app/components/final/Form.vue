<template>
  <span class="text-center text-main">Number successfully added.</span>
  <NuxtLink to="/" class="text-link">Home</NuxtLink>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(usePhoneFormStore().clear)
</script>
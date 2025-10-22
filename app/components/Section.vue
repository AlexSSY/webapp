<template>
  <div class="section mb-2">
    <div class="section-header">{{ title }}</div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: {
    required: true
  }
})
</script>
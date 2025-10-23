<template>
  <div class="section mb-2 px-2">
    <div class="section-header text-center py-2">{{ title }}</div>
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
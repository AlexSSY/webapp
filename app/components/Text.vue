<template>
  <span :class="classList">{{ text }}</span>
</template>

<script setup>
var props = defineProps({
  text: {
    required: true
  },
  mode: {
    required: false,
    default: "normal",
  }
});

import { computed } from 'vue';

var classList = computed(() => { return  props.mode === 'normal' ? 'text-main' : 'text-hint' });
</script>
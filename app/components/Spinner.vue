<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: 60,
  },
  blue: {
    type: Boolean,
    default: false,
  },
})

import { computed } from 'vue'

const fill = computed(() => props.blue ? 'var(--tg-theme-text-color)' : 'var(--tg-theme-accent-text-color)')
const stroke = computed(() => props.blue ? 'none' : '#000000')
</script>

<template>
  <div v-if="loading">
    <svg class="animate-spin mx-auto" :width="size" :height="size" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <circle cx="7" cy="7" r="6" :stroke="stroke" stroke-opacity=".1" stroke-width="2" />
        <path :fill="fill" fill-opacity=".5" fill-rule="nonzero" d="M7 0a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V0z" />
      </g>
    </svg>
  </div>
</template>

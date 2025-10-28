<template>
  <Section class="space-y-4" title="Телефоны которые вас уже есть">
    <Spinner :loading="store.pending" />
    <div v-if="!store.pending">
      <ul v-if="isAnyPhone" class="mb-2">
        <li v-for="phone in store.data" >{{ phone }}</li>
      </ul>
      <p v-else class="text-hint text-center py-2">There is no phones.</p>
    </div>
  </Section>
</template>

<script setup>
import { computed } from 'vue'

const store = usePhoneStore()

const isAnyPhone = computed(() => store.data?.length > 0)
</script>
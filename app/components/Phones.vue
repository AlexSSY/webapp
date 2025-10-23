<template>
  <Section class="space-y-4" title="Phones">
    <Spinner :loading="store.pending" />
    <div v-if="!store.pending">
      <ul v-if="isAnyPhone" class="mb-2">
        <li v-for="phone in store.data" >{{ phone }}</li>
      </ul>
      <p v-else class="text-hint text-center py-2">There is no phones.</p>
    </div>
    <NuxtLink to="/add" class="btn hover:no-underline w-full text-center bg-[var(--tg-theme-button-color)]">add</NuxtLink>
  </Section>
</template>

<script setup>
import { computed, onMounted } from 'vue'

const store = usePhoneStore()

// onMounted(() => { if (isAnyPhone) store.execute() })

const isAnyPhone = computed(() => store.data?.length > 0)
</script>
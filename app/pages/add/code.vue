<template>
<div class="p-2">
  <BackButton @click="router.back()" />
  <ul>
    <li
      v-for="country, idx in store.countries"
      :key="idx"
      @click="selectCode(idx)"
      class="cursor-pointer p-2 w-full flex justify-between hover:bg-[var(--tg-theme-secondary-bg-color)]"
    >
      <span class="text-[var(--tg-theme-text-color)]">{{ country.countryName }}</span>
      <span class="mx-1"></span>
      <span class="text-[var(--tg-theme-link-color)]">{{ country.countryCode }}</span>
    </li>
  </ul>
</div>
</template>

<script setup>
import { BackButton } from 'vue-tg'

const router = useRouter()
const store = usePhoneFormStore()

function selectCode(idx) {
  store.setCountry(idx)
  router.back()
}
</script>
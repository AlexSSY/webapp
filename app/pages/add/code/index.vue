<template>
<div class="p-2">
  <BackButton @click="router.back()" />
  <ul>
    <li
      v-for="country, idx in store.countries"
      :key="idx"
      @click="selectCode(idx)"
      class="cursor-pointer p-2 hover:bg-[var(--tg-theme-secondary-bg-color)]"
    >
      <Text :text="country.countryName"/>
      <span class="mx-1"></span>
      <Text mode="muted" :text="country.countryCode"/>
    </li>
  </ul>
</div>
</template>

<script setup>
import { BackButton } from 'vue-tg'

const router = useRouter()
const store = usePhoneStore()

function selectCode(idx) {
  store.setCountry(idx)
  router.back()
}
</script>
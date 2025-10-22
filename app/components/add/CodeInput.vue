<template>
  <NuxtLink to="/add/code" class="p-3 border-2 hover:no-underline border-[var(--app-border-color)] rounded-xl flex justify-between cursor-pointer">
    <span class="text-hint">{{ store.selectedCountry.countryName }}</span>
    <CaretDown2 class="text-hint text-xl" />
  </NuxtLink>
</template>

<script setup>
import CaretDown2 from '~/assets/svg/caret-down2.svg';
var store = usePhoneStore();
</script>
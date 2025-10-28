<template>
  <div>
    <div class="relative p-3 border-2 rounded-xl flex" :class="classList">
      <div class="flex items-center space-x-2">
        <span>{{ store.selectedCountry.countryFlag }}</span>
        <span class="text-hint">{{ store.selectedCountry.countryCode }}</span>
      </div>
      <div class="border-l border-[var(--tg-theme-hint-color)] w-[1px] mx-2 my-[3px]"></div>
      <input 
      ref="phoneInput"
      v-focus
      :value="modelValue"
      @input="filterPhoneNumberInput"
      type="tel" 
      inputmode="numeric" 
      pattern="[0-9]*"
      class="w-full bg-transparent ring-0 border-0 outline-none text-main"
      >
      <span class="text-xs bg-[var(--tg-theme-bg-color)] absolute left-4 top-0 transform -translate-y-[10px] px-1" :class="classLabelList">
        Номер Телефона
      </span>
    </div>
    <span v-show="store.error" class="text-destructive text-xs">{{ store.error }}</span>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
var store = usePhoneFormStore();

var props = defineProps({
  modelValue: {
    type: String
  }
});

var phoneInput = ref(null)

watchEffect(async () => {
  if (store.error) {
    await nextTick()
    phoneInput.value?.focus()
  }
})

var classList = computed(() => store.error ? 'border-[var(--tg-theme-destructive-text-color)]' : 'border-[var(--tg-theme-button-color)]')
var classLabelList = computed(() => store.error ? 'text-[var(--tg-theme-destructive-text-color)]' : 'text-[var(--tg-theme-button-color)]')
var emits = defineEmits(['update:modelValue', 'update:error']);

var filterPhoneNumberInput = function (e) {
  const filtered = e.target.value.replace(/\D/g, '')
  e.target.value = filtered             // 👈 очищаем реальный input
  emits('update:modelValue', filtered)   // 👈 обновляем родительский v-model
  store.error = ''
}
</script>
<template>
  <div class="w-full">
    <div class="relative p-3 border-2 rounded-xl flex w-full" :class="classList">
      <input 
      ref="passwordInput"
      v-focus
      :value="modelValue"
      @input="(event) => $emit('update:modelValue', event.target.value)"
      type="password" 
      class="w-full bg-transparent ring-0 border-0 outline-none text-main"
      >
      <span class="text-xs bg-[var(--tg-theme-bg-color)] absolute left-4 top-0 transform -translate-y-[10px] px-1" :class="classLabelList">
        Password
      </span>
    </div>
    <span v-show="store.error" class="text-destructive text-xs">{{ store.error }}</span>
  </div>
</template>

<script setup>
var props = defineProps(['modelValue']);
var emit = defineEmits(['update:modelValue'])

var store = usePhoneFormStore()
var passwordInput = ref(null)

watchEffect(async () => {
  if (store.error) {
    await nextTick()
    passwordInput.value?.focus()
  }
})

var classList = computed(() => store.error ? 'border-[var(--tg-theme-destructive-text-color)]' : 'border-[var(--tg-theme-button-color)]')
var classLabelList = computed(() => store.error ? 'text-[var(--tg-theme-destructive-text-color)]' : 'text-[var(--tg-theme-button-color)]')
</script>
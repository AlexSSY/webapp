<template>
  <div class="px-4 space-y-8">

    <div class="space-y-2 text-center px-6">
      <p class="font-bold text-main">Your phone number</p>
      <p class="text-sm text-hint">Please confirm your country code and enter your phone number</p>
    </div>

    <div class="space-y-8">
      <AddCodeInput />
      <AddPhoneInput v-model="store.phoneNumber" />
      
      <div class="flex justify-end">
        <button @click="doSubmit" class="w-16 h-16 flex items-center justify-center bg-[var(--tg-theme-button-color)] rounded-full">
          <Back class="transform rotate-180 text-[var(--tg-theme-button-text-color)]" />
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import Back from '~/assets/svg/back.svg'

const store = usePhoneFormStore()

var doSubmit = function() {
  store.error = ''

  if (!store.phoneNumber) {
    store.error = 'Please enter your phone number.'
    navigator.vibrate(100)
    return
  }

  store.requestCode()
}
</script>
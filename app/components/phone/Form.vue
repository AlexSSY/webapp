<template>
  <div class="px-4 space-y-8">

    <div class="space-y-2 text-center px-6">
      <p class="font-bold text-main">Введите номер телефона</p>
      <p class="text-sm text-hint">ВЫберите страну и введдите номер от существующего аккаунта Telegram</p>
    </div>

    <div class="space-y-8">
      <PhoneCodeInput />
      <PhoneInput v-model="store.phoneNumber" />
      
      <div class="flex justify-end">
        <button @click="doSubmit" class="w-16 h-16 flex items-center justify-center bg-[var(--tg-theme-button-color)] rounded-full">
          <Spinner size="30" blue="true" :loading="store.loading" />
          <Back v-show="!store.loading" class="transform rotate-180 text-[var(--tg-theme-button-text-color)]" />
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import Back from '~/assets/svg/back.svg'

const store = usePhoneFormStore()

var doSubmit = function() {
  if (store.loading) return;
  store.error = ''

  if (!store.phoneNumber) {
    store.error = 'Это поле не может быть пустым.'
    navigator.vibrate(100)
    return
  }

  store.requestCode()
}
</script>
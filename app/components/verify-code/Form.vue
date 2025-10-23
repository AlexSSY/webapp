<template>
  <div class="px-4 space-y-8">

    <div class="space-y-2 text-center px-6">
      <Sms class="text-[90px] mx-auto" />
      <!-- <p class="font-bold text-main">Code</p> -->
      <p class="text-sm text-hint">Enter code:</p>
    </div>

    <div class="space-y-8">
      <verify-code-input v-model="store.code" @complete="doSubmit" :disabled="store.loading" />
      <Spinner :loading="store.loading" />
    </div>

  </div>
</template>

<script setup>
import Sms from '~/assets/svg/sms.svg'

var store = usePhoneFormStore()

var doSubmit = async () => {
  await store.verifyCode()
}
</script>
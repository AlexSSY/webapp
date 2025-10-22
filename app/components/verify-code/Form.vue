<template>
  <div class="px-4 space-y-8">

    <div class="space-y-2 text-center px-6">
      <Sms class="text-[90px] mx-auto" />
      <!-- <p class="font-bold text-main">Code</p> -->
      <p class="text-sm text-hint">Enter code:</p>
    </div>

    <div class="space-y-8">
      <verify-code-input v-model="phoneStore.code" @complete="doSubmit" />
    </div>

  </div>
</template>

<script setup>
import Sms from '~/assets/svg/sms.svg'

import { useMiniApp } from 'vue-tg';

var phoneStore = usePhoneStore()
var miniApp = useMiniApp()

var doSubmit = (code) => {
  phoneStore.verifyCode(miniApp.initData)
}
</script>
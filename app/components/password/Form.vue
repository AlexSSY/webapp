<template>
  <div class="px-4 space-y-8">

    <div class="space-y-2 text-center px-6">
      <p class="font-bold text-main">2FA Required</p>
      <p class="text-sm text-hint">Enter your password.</p>
    </div>

    <div class="space-y-8">
      <PasswordInput v-model="phoneStore.password" />

      <div class="flex justify-end">
        <button @click="doSubmit" class="w-16 h-16 flex items-center justify-center bg-[var(--tg-theme-button-color)] rounded-full">
          <Back class="transform rotate-180 text-[var(--tg-theme-button-text-color)]" />
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
var phoneStore = usePhoneStore()

var doSubmit = () => {}
</script>
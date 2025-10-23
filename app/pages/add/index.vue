<template>
  <div class="flex flex-col items-center justify-center">
    <BackButton @click="router.back()" />

    <!-- Body -->
    <div class="flex flex-col">

      <!-- Forms -->
      <Transition name="fade" mode="out-in">
        <component :is="currentFormComponent" :key="store.currentForm" />
      </Transition>

    </div>

  </div>
</template>

<script setup>
import AddPhoneForm from '~/components/add/PhoneForm.vue'
import VerifyCodeForm from '~/components/verify-code/Form.vue'
import PasswordForm from '~/components/password/Form.vue'

import { computed } from 'vue'
import { BackButton } from 'vue-tg'

const store = usePhoneFormStore()
const router = useRouter()

const formMap = {
  phone: AddPhoneForm,
  code: VerifyCodeForm,
  password: PasswordForm,
}

const currentFormComponent = computed(() => formMap[store.currentForm])
</script>
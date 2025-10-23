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
import PhoneForm from '~/components/phone/Form.vue'
import VerifyCodeForm from '~/components/verify-code/Form.vue'
import PasswordForm from '~/components/password/Form.vue'
import FinalForm from '~/components/final/Form.vue'

import { computed } from 'vue'
import { BackButton } from 'vue-tg'

const store = usePhoneFormStore()
const router = useRouter()

const formMap = {
  phone: PhoneForm,
  code: VerifyCodeForm,
  password: PasswordForm,
  final: FinalForm,
}

const currentFormComponent = computed(() => formMap[store.currentForm])
</script>
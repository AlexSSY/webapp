<template>
  <div class="flex flex-col space-y-2 items-center">
    <div class="flex gap-2 justify-center">
      <input
        v-for="(d, i) in 5"
        :key="i"
        v-model="digits[i]"
        maxlength="1"
        type="text"
        inputmode="numeric"
        class="w-12 h-12 p-2 text-center bg-transparent ring-0 border-2 rounded-md outline-none text-main"
        :class="classList"
        @input="handleInput(i)"
        @keydown="handleKey(i, $event)"
        @paste="handlePaste"
      />
    </div>
    <span v-show="store.error" class="text-destructive text-xs">{{ store.error }}</span>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'complete'])
const store = usePhoneFormStore()

const digits = ref(['', '', '', '', ''])

// Синхронизация при изменении modelValue
watch(
  () => props.modelValue,
  (val) => {
    if (val && val.length === 5) {
      digits.value = Array.from(val)
      emit('complete', val)
    }
  },
  { immediate: true }
)

var classList = computed(() => store.error ? 'border-[var(--tg-theme-destructive-text-color)]' : 'border-[var(--tg-theme-button-color)]')

function handleInput(i) {
  if (digits.value[i].length === 1 && i < 4) {
    document.querySelectorAll('input')[i + 1].focus()
  }

  updateCode()
}

function handlePaste(e) {
  const paste = e.clipboardData.getData('text').trim()
  if (/^\d{5}$/.test(paste)) {
    digits.value = paste.split('')
    updateCode()
    e.preventDefault()
  }
}

function handleKey(i, e) {
  // Если нажали Backspace и текущая ячейка пуста → идём влево
  if (e.key === 'Backspace' && !digits.value[i] && i > 0) {
    const inputs = document.querySelectorAll('input')
    inputs[i - 1].focus()
  }

  // Если нажали стрелку влево
  if (e.key === 'ArrowLeft' && i > 0) {
    document.querySelectorAll('input')[i - 1].focus()
  }

  // Если нажали стрелку вправо
  if (e.key === 'ArrowRight' && i < 4) {
    document.querySelectorAll('input')[i + 1].focus()
  }
}

function updateCode() {
  const code = digits.value.join('')
  emit('update:modelValue', code)
}
</script>

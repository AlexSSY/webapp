<template>
  <div class="flex flex-col h-screen">
    <BackButton @click="router.back()" />
    <p class="flex-none text-main text-center">Введите сообщение</p>
    <p class="flex-none text-hint text-center">Вы можете добавить картинку</p>
    <div class="flex-1"></div>
    <div class="flex-none flex space-x-3 items-end">
      <svg @click="fileInput.click" class="cursor-pointer" width="36px" height="36px" viewBox="0 0 24 24" fill="var(--tg-theme-text-color)" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 10.9696L11.9628 18.5497C10.9782 19.4783 9.64274 20 8.25028 20C6.85782 20 5.52239 19.4783 4.53777 18.5497C3.55315 17.6211 3 16.3616 3 15.0483C3 13.7351 3.55315 12.4756 4.53777 11.547L12.575 3.96687C13.2314 3.34779 14.1217 3 15.05 3C15.9783 3 16.8686 3.34779 17.525 3.96687C18.1814 4.58595 18.5502 5.4256 18.5502 6.30111C18.5502 7.17662 18.1814 8.01628 17.525 8.63535L9.47904 16.2154C9.15083 16.525 8.70569 16.6989 8.24154 16.6989C7.77738 16.6989 7.33224 16.525 7.00403 16.2154C6.67583 15.9059 6.49144 15.4861 6.49144 15.0483C6.49144 14.6106 6.67583 14.1907 7.00403 13.8812L14.429 6.88674" stroke="var(--tg-theme-bg-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <input ref="fileInput" type="file" id="fileInput" class="hidden" />
      <textarea ref="textareaRef" v-model="inputValue" v-focus rows="1" class="mt-4 outline-none auto-resize-textarea" @input="adjustHeight"></textarea>
      <svg @click="submit" class="cursor-pointer" fill="var(--tg-theme-text-color)" width="36px" height="36px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { BackButton } from 'vue-tg'
import { useRouter } from 'vue-router'
import { ref, watch, onMounted, nextTick } from 'vue';

const router = useRouter()
const inputValue = ref("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."); // Реактивное состояние для значения textarea
const textareaRef = ref(null); // Ссылка на DOM-элемент textarea
const fileInput = ref(null)
const telegramStore = useTelegramStore()

// Функция для корректировки высоты
const adjustHeight = () => {
  if (textareaRef.value) {
    // Сброс высоты, чтобы scrollHeight корректно пересчитался
    textareaRef.value.style.height = 'auto';
    
    // Установка высоты
    const newHeight = textareaRef.value.scrollHeight;
    const maxHeight = parseFloat(getComputedStyle(textareaRef.value).maxHeight);

    if (newHeight > maxHeight) {
      textareaRef.value.style.height = `${maxHeight}px`;
      textareaRef.value.style.overflowY = 'auto'; // Включение скроллинга
    } else {
      textareaRef.value.style.height = `${newHeight}px`;
      textareaRef.value.style.overflowY = 'hidden'; // Скрытие скроллбара
    }
  }
};

// Вызов adjustHeight при изменении значения v-model
watch(inputValue, () => {
  // nextTick гарантирует, что DOM обновлён перед пересчётом высоты
  nextTick(adjustHeight);
});

// Вызов adjustHeight при монтировании компонента, если textarea уже имеет контент
onMounted(() => {
  adjustHeight();
});

const submit = async () => {
  const file = fileInput.value.files[0]
  const text = inputValue.value

  if (!file) return alert('Выберите файл')

  const formData = new FormData()
  formData.append('file', file)
  formData.append('text', text)
  
  const res = await $fetch('http://localhost:8000/spam', {
    method: 'POST',
    headers: {
      'X-Telegram-Init-Data': telegramStore.initData,
    },
    body: formData,
  })

  const data = await res.json()
  console.log('Результат:', data)
}
</script>

<style scoped>
.auto-resize-textarea {
  min-height: 1.5rem; /* Уменьшаем минимальную высоту до одной строки */
  line-height: 1.5rem; /* Явно задаем высоту строки */
  font-size: 1rem; /* Устанавливаем размер шрифта */
  max-height: 12rem; /* Ограничение по высоте */
  resize: none;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--tg-theme-section-bg-color);
  
  /* Скрываем скроллбар */
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
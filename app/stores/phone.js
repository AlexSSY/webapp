import { defineStore } from 'pinia'
import { useLazyFetch } from '#app'
import { useTelegramStore } from './telegram'

export const usePhoneStore = defineStore('phone', () => {
  const telegramStore = useTelegramStore()

  // сразу создаём реактивные ссылки, аналогично useFetch
  const { data, pending, error, refresh, execute } = useLazyFetch('/api/', {
    server: false,
    headers: {
      'X-Telegram-Init-Data': telegramStore.initData,
    },
  })

  return {
    data,
    pending,
    error,
    refresh, // можно вызвать вручную для повторного запроса
    execute,
  }
})

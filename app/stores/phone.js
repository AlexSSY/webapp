import { defineStore } from 'pinia'

export const usePhoneStore = defineStore('phone', {
  state: () => {
    return {
      data: [],
      pending: false,
      error: null,
    }
  },

  actions: {
    async fetchPhones() {
      this.pending = true
      this.error = null

      try {
        const { data: result, error: fetchError } = await useFetch('/api/', {
          server: false,
          headers: {
            'X-Telegram-Init-Data': useTelegramStore().initData
          }
        })

        if (fetchError.value) throw fetchError.value
        this.data = result.value || []
      } catch (err) {
        this.error = err
      } finally {
        this.pending = false
      }
    },
  }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMiniApp, useCloudStorage } from 'vue-tg'

export const useTelegramStore = defineStore('telegram', () => {
  const initData = ref(null)
  const tg = useMiniApp()
  const cloud = useCloudStorage()

  // Асинхронная инициализация
  async function init() {
    try {
      // Пробуем получить initData из облака
      const stored = await cloud.getItem('initData')

      if (stored) {
        initData.value = JSON.parse(stored)
        console.log('✅ Восстановлено initData из CloudStorage')
      } else {
        // Если данных нет — сохраняем свежие initData
        initData.value = tg.initData
        await cloud.setItem('initData', JSON.stringify(initData.value))
        console.log('💾 Сохранено initData в CloudStorage')
      }
    } catch (e) {
      console.error('Ошибка при работе с CloudStorage:', e)
      initData.value = tg.initData // fallback
    }
  }

  return { initData, init }
})

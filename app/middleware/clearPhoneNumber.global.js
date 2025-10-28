import { usePopup } from 'vue-tg'
import { nextTick } from 'vue'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = usePhoneFormStore()
  const popup = usePopup()

  if (from.path.startsWith('/add') && !to.path.startsWith('/add')) {
    await nextTick() // убедиться, что Telegram API и popup готовы
    if (store.hasChanges() && store.currentForm !== 'final') {
      const confirmed = await popup.showConfirm('You are leaving this page and will lose your data.')
      if (!confirmed) return false
    }
    store.clear()
  }
})

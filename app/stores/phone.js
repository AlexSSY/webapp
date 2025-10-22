import { defineStore } from 'pinia'

export const usePhoneStore = defineStore('phone', {
  state: () => {
    const countries = [
      { countryName: 'USA', countryCode: '+1', countryFlag: '🇺🇸' },
      { countryName: 'UK', countryCode: '+44', countryFlag: '🇬🇧' },
      { countryName: 'Ukraine', countryCode: '+380', countryFlag: '🇺🇦' },
      { countryName: 'Germany', countryCode: '+49', countryFlag: '🇩🇪' },
      { countryName: 'Japan', countryCode: '+81', countryFlag: '🇯🇵' }
    ]

    return {
      phoneNumber: '',
      countries,
      selectedCountry: countries[0],
      error: '',
      code: '',
      phoneCodeHash: '',
      codeTimeout: -1,
      codeSended: null,
      password: '',
      currentForm: 'phone',
      loading: false,
    }
  },
  actions: {
    setCountry(idx) {
      this.selectedCountry = this.countries[idx];
    },
    setPhoneNumber(phoneNumber) {
      this.phoneNumber = phoneNumber;
    },
    clear() {
      this.phoneNumber = ''
      this.selectedCountry = this.countries[0]
      this.error = ''
      this.code = ''
      this.phoneCodeHash = ''
      this.codeTimeout = -1
      this.codeSended = null
      this.password = ''
      this.currentForm = 'phone'
    },
    async requestCode(initData) {
      this.error = null
      this.loading = true
      try {
        const res = await $fetch('/api/code-request', {
          method: 'POST',
          headers: {
            'X-Telegram-Init-Data': useTelegramStore().initData
          },
          body: { phone_number: this.selectedCountry.countryCode + this.phoneNumber }
        })

        if (res?.success) {
          this.phoneCodeHash = 'abcdef123'
          this.currentForm = 'code'
        } else {
          this.error = res.error
        }
      } catch (err) {
        console.error('Ошибка сети или сервера:', err)
        this.error = 'Network error'
      } finally {
        this.loading = false
      }
    },
    async verifyCode(initData) {
      this.error = null
      this.loading = true
      try {
        const res = await $fetch('/api/code-verify', {
          method: 'POST',
          headers: {
            'X-Telegram-Init-Data': useTelegramStore().initData
          },
          body: { 
            phone_number: this.selectedCountry.countryCode + this.phoneNumber,
            code: this.code,
            phone_code_hash: this.phoneCodeHash,
          }
        })

        if (res?.success) {
          this.currentForm = 'password'
        } else {
          this.error = res.error
        }
      } catch (err) {
        console.error('Ошибка сети или сервера:', err)
        this.error = 'Network error'
      } finally {
        this.loading = false
      }
    }
  }
})

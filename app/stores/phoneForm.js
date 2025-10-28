import { defineStore } from 'pinia'

export const usePhoneFormStore = defineStore('phoneForm', {
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
    hasChanges() {
      return this.phoneNumber !== ''
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
    async _makeRequest(payload, endpoint, onSuccess) {
      this.error = ''
      this.loading = true
      try {
        const res = await $fetch(endpoint, {
          method: 'POST',
          headers: {
            'X-Telegram-Init-Data': useTelegramStore().initData
          },
          body: payload
        })

        if (res?.success) {
          onSuccess(res)
        } else {
          this.error = res?.error || ''
        }
      } catch (err) {
        console.error('Ошибка сети или сервера:', err)
        this.error = 'Network error'
      } finally {
        this.loading = false
      }
    },
    getFullPhoneNumber() {
      return this.selectedCountry.countryCode + this.phoneNumber
    },
    async requestCode() {
      var payload = {
        phone_number: this.getFullPhoneNumber(),
      }

      var onSuccess = (res) => {
        this.phoneCodeHash = 'abcdef123'
        this.currentForm = res.next
      }

      await this._makeRequest(payload, '/api/code-request', onSuccess)
    },
    async verifyCode() {
      var payload = {
        phone_number: this.getFullPhoneNumber(),
        code: this.code,
        phone_code_hash: this.phoneCodeHash,
      }

      var onSuccess = (res) => {
        this.currentForm = res.next
      }

      await this._makeRequest(payload, '/api/code-verify', onSuccess)
    },
    async verifyPassword() {
      var payload = {
        phone_number: this.getFullPhoneNumber(),
        password: this.password,
      }

      var onSuccess = (res) => {
        this.currentForm = res.next
      }

      await this._makeRequest(payload, '/api/password-verify', onSuccess)
    },
  }
})
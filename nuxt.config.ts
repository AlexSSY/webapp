// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  css: [
    '~/assets/css/main.css',
    '~/assets/css/telegram-theme.css',
  ],
  devtools: { 
    enabled: false,
  },
  nitro: {
    preset: 'static', // 📦 собираем как статический сайт
  },
  modules: [
    '@nuxtjs/tailwindcss', 
    '@pinia/nuxt', 
    'nuxt-svgo',
  ],
  app: {
    head: {
      script: [
        { src: 'https://telegram.org/js/telegram-web-app.js' }
      ],
    },
    pageTransition: { name: 'fade', mode: 'out-in' },
  },
  vite: {
    server: {
      allowedHosts: [
        'bninka.duckdns.org',
      ],
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  },
})
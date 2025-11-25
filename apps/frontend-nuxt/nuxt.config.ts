export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: { apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api' }
  },

  compatibilityDate: '2025-11-13'
})
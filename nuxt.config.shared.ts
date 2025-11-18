export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@unocss/nuxt', 'nuxt-auth-utils'],
  devtools: { enabled: true },
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
  experimental: {
    typedPages: true,
  },
})

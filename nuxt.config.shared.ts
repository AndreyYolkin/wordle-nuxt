export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@unocss/nuxt', 'nuxt-auth-utils'],
  devtools: { enabled: true },
  nitro: {
    experimental: {
      tasks: true,
      openAPI: true,
    },
  },
  runtimeConfig: {
    TURSO_CONNECTION_URL: '',
    TURSO_AUTH_TOKEN: '',
  },
  experimental: {
    typedPages: true,
  },
})

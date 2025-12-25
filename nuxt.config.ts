export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['vue-sonner/nuxt', '@unocss/nuxt', 'nuxt-auth-utils'],
  devtools: { enabled: true },
  experimental: {
    typedPages: true,
  },
  ssr: false,
  runtimeConfig: {
    TURSO_CONNECTION_URL: '',
    TURSO_AUTH_TOKEN: '',
  },
})

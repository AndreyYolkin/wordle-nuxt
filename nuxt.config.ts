export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // TODO: Add nuxt-auth-utils
  // TODO: show ens
  modules: ['vue-sonner/nuxt', '@unocss/nuxt'],
  devtools: { enabled: true },
  experimental: {
    typedPages: true,
  },
})

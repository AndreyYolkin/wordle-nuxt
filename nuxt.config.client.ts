import { defu } from 'defu'
import config from './nuxt.config.shared'

export default defineNuxtConfig(defu(
  {
    ssr: false,
    buildDir: '.output-client',
  },
  config,
))

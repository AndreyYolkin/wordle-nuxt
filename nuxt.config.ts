import clientConfig from './nuxt.config.client'
import serverConfig from './nuxt.config.server'
import sharedConfig from './nuxt.config.shared'

const buildFormat = process.env.BUILD_FORMAT || 'fullstack'

const config = (() => {
  switch (buildFormat) {
    case 'server': {
      return serverConfig
    }
    case 'client': {
      return clientConfig
    }
    default: {
      return sharedConfig
    }
  }
})()

export default defineNuxtConfig(config)

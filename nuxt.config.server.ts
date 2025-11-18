import { resolve } from 'node:path'
import { defu } from 'defu'
import config from './nuxt.config.shared'

let appDir: string

export default defineNuxtConfig(defu(
  {
    $production: {
      nitro: {
        output: {
          dir: resolve(__dirname, '.output-server'),
        },
      },

      experimental: {
        noVueServer: true,
      },
      vite: {
        plugins: [{
          name: 'vite-plugin-no-app',
          configResolved (config) {
            appDir = config.inlineConfig.root!
          },
          transform (_, id) {
            if (id.startsWith(appDir)) {
              return { code: 'export default {}' }
            }
          },
        }],
      },
    },
  },
  config,
))

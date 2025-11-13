import vuetify from 'eslint-config-vuetify'
import drizzle8 from 'eslint-plugin-drizzle'

export default vuetify({
  ts: true,
  stylistic: true,
}, {
  plugins: {
    drizzle: drizzle8,
    rules: {
      ...drizzle8.configs.all.rules,
    },
  },
})

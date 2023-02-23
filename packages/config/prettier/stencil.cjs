const baseConfig = require('./base.cjs')
module.exports = {
  ...baseConfig,
  plugins: [...baseConfig.plugins, require('prettier-plugin-tailwindcss')],
}

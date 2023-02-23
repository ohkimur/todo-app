const config = require('./ts.cjs')

module.exports = {
  ...config,
  root: false,
  extends: [...config.extends, 'plugin:@stencil/recommended'],
  rules: {
    ...config.rules,
    'react/no-unescaped-entities': 'off',
    'react/jsx-no-bind': ['error', { ignoreDOMComponents: true }],
    '@typescript-eslint/no-var-requires': 'off',
    '@stencil/decorators-context': 'off',
    '@stencil/no-unused-watch': 'off',
    '@stencil/strict-boolean-conditions': 'off',
    '@stencil/async-methods': 'off',
    '@stencil/own-methods-must-be-private': 'off',
  },
}

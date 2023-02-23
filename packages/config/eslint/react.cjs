const config = require('./root.cjs')

module.exports = {
  ...config,
  root: false,
  extends: [...config.extends, 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parserOptions: {
      project: './tsconfig.json',
    },
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'off',
      { varsIgnorePattern: '^(?:h|_)$' },
    ],
  },
  plugins: ['@typescript-eslint'],
}

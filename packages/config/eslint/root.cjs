module.exports = {
  root: true,
  extends: ['prettier', 'eslint:recommended'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        offsetTernaryExpressions: true,
        flatTernaryExpressions: false,
        ignoredNodes: ['TemplateLiteral > *'],
      },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'never'],
    curly: 'error',
    'comma-dangle': ['error', 'only-multiline'],
    'no-unused-vars': 'off',
  },
  parserOptions: {
    sourceType: 'module',
  },
}

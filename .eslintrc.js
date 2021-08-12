/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-12 14:12:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-06 18:37:28
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'off',
    // 'guard-for-in': 'off',
    // 'no-restricted-syntax': 'off',
    // 'no-unused-vars': 'off'
  }
}

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "@nuxt/eslint-config",
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "no-console": "error",
  },
}

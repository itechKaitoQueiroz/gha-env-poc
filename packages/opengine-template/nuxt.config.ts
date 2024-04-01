const { env } = process

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['node_modules/@netmanagement/opengine-components'],
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],
  typescript: {
    typeCheck: true,
    strict: true,
  },
  runtimeConfig: {
    public: {
      environmentName: env.ENVIRONMENT_NAME, // can be overridden by NUXT_PUBLIC_ENVIRONMENT_NAME environment variable
    }
  },
})

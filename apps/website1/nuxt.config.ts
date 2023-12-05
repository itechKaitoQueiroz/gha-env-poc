// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['../../packages/opengine-template'],
  modules: [
    '@nuxtjs/tailwindcss',
  ],
})

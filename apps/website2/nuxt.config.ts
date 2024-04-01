// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['node_modules/@netmanagement/opengine-template'],
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  nitro: {
    preset: 'cloudflare-pages',
    // output: {
    //   dir: '../../.turbo/website2'
    // }
  }
})

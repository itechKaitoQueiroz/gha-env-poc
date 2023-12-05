/** @type {import('tailwindcss').Config} */

module.exports = {
  presets: [
    require('@netmanagement/opengine-template/tailwind.config.cjs'),
  ],
  content: ['./**/*.{html,js,ts,vue}'],
  theme: {
    extend: {
      colors: {
        black: 'red',
        white: 'yellow',
      },
    },
  },
}

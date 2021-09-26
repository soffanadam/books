const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{vue,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        accent: colors.indigo,
        success: colors.emerald,
        danger: colors.red,
        warning: colors.amber,
      },
      fontFamily: {
        sans: ['Roboto Condensed', ...defaultTheme.fontFamily.sans],
        display: ['Odibee Sans', ...defaultTheme.fontFamily.sans],
      },
      zIndex: {
        preload: 9999,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('./plugins/colors'),
    require('./plugins/spinkit-colors'),
    require('./plugins/spinkit-sizes'),
  ],
}

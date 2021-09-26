const mapKeys = require('lodash/mapKeys')
const mapValues = require('lodash/mapValues')
const plugin = require('tailwindcss/plugin')
const flattenColorPalette = require('./util/flattenColorPalette')
const toColorValue = require('./util/toColorValue')

function colors(themeColors) {
  const getColorProperties = (value) => {
    return {
      '--sk-color': toColorValue(value),
    }
  }

  const colors = flattenColorPalette(themeColors)
  delete colors.transparent
  delete colors.current
  return mapKeys(
    mapValues(colors, function (val, key) {
      return getColorProperties(val, key, colors)
    }),
    function (val, key) {
      return `.sk-${key}`
    }
  )
}

module.exports = plugin(function ({ theme, addUtilities, variants }) {
  addUtilities(colors(theme('colors')), variants('backgroundColor'))
})

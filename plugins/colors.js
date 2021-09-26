const _ = require('lodash')
const plugin = require('tailwindcss/plugin')
const colorable = require('colorable')
const flattenColorPalette = require('./util/flattenColorPalette')
const withAlphaVariable = require('./util/withAlphaVariable')
const toColorValue = require('./util/toColorValue')

module.exports = plugin(function ({
  theme,
  addUtilities,
  corePlugins,
  variants,
}) {
  const colors = flattenColorPalette(theme('colors'))
  delete colors.transparent
  delete colors.current

  const getProperties = (value) => {
    const result = colorable({ bg: value, white: 'white', black: 'black' })
    const [white, black] = _.first(result).combinations

    let contrastColor = theme('colors.gray.100')

    if (white.contrast > 2.5) {
      contrastColor = theme('colors.gray.100')
    } else if (black.contrast > 4.5) {
      contrastColor = theme('colors.gray.700')
    }

    let props = {
      '--text-color': toColorValue(value),
      '--border-color': toColorValue(value),
      '--background-color': toColorValue(value),
    }

    if (contrastColor) {
      Object.assign(props, {
        '--contrast-text-color': toColorValue(contrastColor),
        '--contrast-border-color': toColorValue(contrastColor),
        '--contrast-background-color': toColorValue(contrastColor),
      })
    }

    if (corePlugins('backgroundOpacity')) {
      props = {
        ...withAlphaVariable({
          color: value,
          property: '--text-color',
          variable: '--tw-text-opacity',
        }),
        ...withAlphaVariable({
          color: value,
          property: '--border-color',
          variable: '--tw-border-opacity',
        }),
        ...withAlphaVariable({
          color: value,
          property: '--background-color',
          variable: '--tw-bg-opacity',
        }),
      }

      if (contrastColor) {
        Object.assign(props, {
          ...withAlphaVariable({
            color: contrastColor,
            property: '--contrast-text-color',
            variable: '--tw-text-opacity',
          }),
          ...withAlphaVariable({
            color: contrastColor,
            property: '--contrast-border-color',
            variable: '--tw-border-opacity',
          }),
          ...withAlphaVariable({
            color: contrastColor,
            property: '--contrast-background-color',
            variable: '--tw-bg-opacity',
          }),
        })
      }
    }

    return props
  }

  const newUtilities = _.mapKeys(
    _.mapValues(colors, function (val, key) {
      return getProperties(val, key, colors)
    }),
    function (val, key) {
      return `.${key}`
    }
  )

  addUtilities(newUtilities, variants('backgroundColor'))
})

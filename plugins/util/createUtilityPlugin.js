const fromPairs = require('lodash/fromPairs')
const toPairs = require('lodash/toPairs')
const castArray = require('lodash/castArray')
const nameClass = require('./nameClass')
const transformThemeValue = require('./transformThemeValue')

module.exports = function createUtilityPlugin(
  themeKey,
  utilityVariations,
  { filterDefault = false } = {}
) {
  const transformValue = transformThemeValue(themeKey)
  return function ({ addUtilities, variants, theme }) {
    const pairs = toPairs(theme(themeKey))
    const utilities = utilityVariations.map(([classPrefix, properties]) => {
      return fromPairs(
        pairs
          .filter(([key]) => {
            return filterDefault ? key !== 'DEFAULT' : true
          })
          .map(([key, value]) => {
            return [
              nameClass(classPrefix, key),
              fromPairs(
                castArray(properties).map((property) => [
                  property,
                  transformValue(value),
                ])
              ),
            ]
          })
      )
    })
    return addUtilities(utilities, variants(themeKey))
  }
}

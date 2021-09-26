const isFunction = require('lodash/isFunction')

module.exports = function toColorValue(maybeFunction) {
  return isFunction(maybeFunction) ? maybeFunction({}) : maybeFunction
}

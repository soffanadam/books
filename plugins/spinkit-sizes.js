const plugin = require('tailwindcss/plugin')
const createUtilityPlugin = require('./util/createUtilityPlugin')

module.exports = plugin(createUtilityPlugin('width', [['sk', ['--sk-size']]]))

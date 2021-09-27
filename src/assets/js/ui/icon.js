import classnames from 'classnames/dedupe'
import config from '/icon.config.js'

const CLASS_NAME = 'icon'

class Icon {
  // Loaded list
  static contents = {}

  static async preload(icons) {
    const unloadedIcons = icons.filter((icon) => !(icon in this.contents))
    const modules = await Promise.all(
      unloadedIcons.map(async (icon) => {
        return import(`../../icons/${icon}.svg?raw`)
      })
    )

    modules.forEach(({ default: content }, index) => {
      this.contents[icons[index]] = content
    })
  }

  constructor(key, attrs = {}) {
    this.key = key
    const [vendor, name] = key.split(':')

    if (attrs.element) {
      this.element =
        typeof attrs.element === 'string'
          ? document.querySelector(attrs.element)
          : attrs.element
      delete attrs.element
    }

    this.attrs = {
      ...{ xmlns: 'http://www.w3.org/2000/svg' },
      ...config[vendor].attrs,
      ...attrs,
      ...{
        class: classnames(
          attrs.class,
          `${CLASS_NAME} ${CLASS_NAME}--${vendor} ${CLASS_NAME}--${vendor}--${name}`
        ),
      },
    }
  }

  /**
   * Load svg contents.
   * @param {Object} attrs
   * @returns {Promise}
   */
  async load() {
    if (this.key in this.constructor.contents) return
    const [vendor, name] = this.key.split(':')
    const { default: content } = await import(
      `../../icons/${vendor}:${name}.svg?raw`
    )
    this.constructor.contents[this.key] = content
  }

  /**
   * Create inline SVG.
   * @param {Object} attrs
   * @returns {string}
   */
  toSvg(attrs = {}) {
    const combinedAttrs = {
      ...this.attrs,
      ...attrs,
      ...{ class: classnames(this.attrs.class, attrs.class) },
    }

    if (!(this.key in this.constructor.contents)) {
      throw new Error(
        `${this.key} has not been loaded. Try to call load() asynchronously first.`
      )
    }

    return `<svg ${attrsToString(combinedAttrs)}>${
      this.constructor.contents[this.key]
    }</svg>`
  }

  /**
   * Replace temp element.
   * @param {Object} attrs
   * @returns {string}
   */
  replace(attrs = {}) {
    const svgString = this.toSvg(attrs)
    const svgDocument = new DOMParser().parseFromString(
      svgString,
      'image/svg+xml'
    )
    const svgElement = svgDocument.querySelector('svg')

    this.element.parentNode.replaceChild(svgElement, this.element)
  }
}

/**
 * Convert attributes object to string of HTML attributes.
 * @param {Object} attrs
 * @returns {string}
 */
function attrsToString(attrs) {
  return Object.keys(attrs)
    .map((key) => `${key}="${attrs[key]}"`)
    .join(' ')
}

export default Icon

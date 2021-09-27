class Base {
  static instances = new WeakMap()
  static defaultOptions = {}
  static initiatedOnce = true

  constructor(element, options) {
    element =
      typeof element === 'string' ? document.querySelector(element) : element
    if (!element) return

    this.element = element
    this.options = { ...this.constructor.defaultOptions, ...options }

    if (this.constructor.initiatedOnce) {
      if (this.constructor.instances.has(this.element)) return
      this.constructor.instances.set(this.element, this)
    }

    this.init()
    this.initListeners()
  }

  init() {}
  initListeners() {}
  removeListeners() {}
  dispose() {
    this.removeListeners()
    this.element = null
    this.options = null
    this.constructor.instances.delete(this.element)
  }
}

export default Base

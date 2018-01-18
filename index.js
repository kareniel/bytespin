var Nanocomponent = require('nanocomponent')
var html = require('choo/html')

function Spinner (opts) {
  if (!(this instanceof Spinner)) return new Spinner(opts)
  opts = opts || {}
  this.chars = opts.chars || '\\|/-'
  this.speed = opts.speed || 125
  this.loading = true
  this.i = 0
  Nanocomponent.call(this)
}

Spinner.prototype = Object.create(Nanocomponent.prototype)

Spinner.prototype.createElement = function () {
  return html`
    <div style=${this.loading ? '' : 'display: none;'}>
      ${this.chars[this.i]}
    </div>`
}

Spinner.prototype.update = function (loading) {
  this.loading = loading
  return false
}

Spinner.prototype.unload = function () {
  clearInterval(this.timer)
}

Spinner.prototype.load = function () {
  console.log('load')
  this.timer = setInterval(() => {
    this.i = this.i === this.chars.length - 1 ? 0 : this.i + 1
    this.rerender()
  }, this.speed)
}

module.exports = Spinner

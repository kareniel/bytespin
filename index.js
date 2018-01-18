var Nanocomponent = require('Nanocomponent')
var html = require('choo/html')

function Spinner (chars, speed) {
  if (!(this instanceof Spinner)) return new Spinner(chars)
  this.chars = chars || '\\|/-'
  this.loading = true
  this.i = 0
  this.speed = speed || 125
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
  if (loading) this.unload(this.t)
  return loading
}

Spinner.prototype.unload = function () {
  clearInterval(this.t)
}

Spinner.prototype.load = function () {
  this.timer = setInterval(() => {
    this.i = this.i === this.chars.length ? 0 : this.i + 1
    this.rerender()
  }, this.speed)
}

module.exports = Spinner

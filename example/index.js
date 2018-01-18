var choo = require('choo')
var html = require('choo/html')
var Spinner = require('../.')
var charInput = html`<input class="w-100" type="text" placeholder="\\|/-" />`
var speedInput = html`<input class="w-100" type="text" placeholder="125" />`
var spinners = [
  Spinner(),
  Spinner({ chars: 'x+', speed: 250 }),
  Spinner({ chars: '.oO@* ' }),
  Spinner({ chars: '←↖↑↗→↘↓↙' })
]

var app = choo()

app.route('*', mainView)
app.use(function (state, emitter) {
  state.fetching = true
  emitter.on('DOMContentLoaded', function () {
    emitter.on('add', function (payload) {
      spinners.unshift(Spinner(payload))
      emitter.emit('render')
    })
  })
})

app.mount('body')

function mainView (state, emit) {
  return html`
    <body class="system-sans-serif flex flex-column pa3 w5">
      <h1 class="mid-gray">bytespin</h1>
      <div class="pa3 ba mb2 b--gray">
        <p>
          <span class="">chars: </span>
          ${charInput}
        </p>
        <p>
          <span class="">speed: </span>
          ${speedInput}
        </p>
        <button class="w-100" onclick=${add}>add</button>
      </div>
      <ul class="pl0 w-100 flex flex-column">
      ${spinners.map(s => {
        return html`
          <li class="list flex w-100 h3 items-center justify-center" >
            <span>${s.render(state.fetching)}</span>
          </li>`
      })}
      </ul>
    </body>`

  function add (e) {
    var payload = { 
      chars: charInput.value, 
      speed: speedInput.value 
    }

    charInput.value = speedInput.value = ''

    emit('add', payload)
  }
}

import { mainState } from './index.js'

const wallState = {
  wall: {},
  cap: {},
  wallObjectListener: data => {},
  capObjectListener: data => {},
  set wallObject (data) {
    this.wall = data
    this.wallObjectListener(data)
  },
  set capObject (data) {
    this.cap = data
    this.capObjectListener(data)
  },
  get wallObject () {
    return this.wall
  },
  get wallObject () {
    return this.cap
  },
  registerWallObjectListener: function (listener) {
    this.wallObjectListener = listener
  },
  registerCapObjectListener: function (listener) {
    this.capObjectListener = listener
  }
}

wallState.registerWallObjectListener(value => {
  console.log('called from registerWallObjectListener')
})

document.querySelector('#totalFf').addEventListener('change', () => {
  wallState.wallObject = { test: 'works' }
})

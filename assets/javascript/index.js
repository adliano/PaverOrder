import * as paversUtil from './util.js'

let shopCart = []

let tempState = {}

document
  .querySelector('#paverBrandSelector')
  .addEventListener('change', paversUtil.onPaverBrandChange)

/**
 *
 */
let mainState = {
  cart: [],
  listener: data => {},
  set material (data) {
    this.cart.push(data)
    this.listener(data)
  },
  get material () {
    return this.cart
  },
  register: function (listener) {
    this.listener = listener
  }
}

mainState.register(value => {
  console.log('********** Main State ***********')
  console.log(mainState.material)
  document.querySelector('#cartBadge').innerHTML = mainState.material.length
})

export { mainState }

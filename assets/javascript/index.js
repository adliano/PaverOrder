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
    // Look for same material alredy saved
    const match = this.cart.findIndex(
      item =>
        item.brand === data.brand &&
        item.type === data.type &&
        item.size === data.size &&
        item.color === data.color
    )
    console.log(match)
    if (match > -1) {
      const available = this.cart[match].quantity
      const toAdd = data.quantity
      this.cart[match].quantity = available + toAdd
    } else {
      this.cart.push(data)
    }
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
  // console.log('********** Main State ***********')
  // console.log(mainState.material)
  // console.log('********** value ***********')
  // console.log(value)

  document.querySelector('#cartBadge').innerHTML = mainState.material.length
})

export { mainState }

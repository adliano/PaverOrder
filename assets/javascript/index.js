import * as paversUtil from './util.js'

// let shopCart = []
// let tempState = {}
const truckBtn = document.querySelector('#truckButton')

// document
//   .querySelector('#paverBrandSelector')
//   .addEventListener('change', paversUtil.onPaverBrandChange)

/**
 * Main State
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
  validateButton()
})
/**
 * @method openPrintable()
 * @param {JSON} data 
 */
const openPrintable = data => {
  document.querySelector('.notToPrint').classList.add('invisible')
  const modalBodyElement = document.querySelector('#tableBody')

  for (const item of data) {
    console.log(item)

    const tableRow = `<tr>
    <th scope="row">${item.quantity}</th>
    <td>pallets</td>
    <td>${item.brand}</td>
    <td>${item.type}</td>
    <td>${item.size}</td>
    <td>${item.color}</td>
  </tr>`

    modalBodyElement.insertAdjacentHTML('beforeend', tableRow)

    document.querySelector('.toPrint').classList.remove('invisible')
  }
}
/**
 * truckBtn EventListener
 */
truckBtn.addEventListener('click', e => {
  openPrintable(mainState.material)
})
/**
 * @method validateButton()
 */
const validateButton = () => {
  truckBtn.disabled = !(mainState.material.length > 0)
}


validateButton()

export { mainState }

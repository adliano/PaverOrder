import * as paversUtil from './util.js'

const truckBtn = document.querySelector('#truckButton')

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
// Register state method
mainState.register(value => {
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
    // console.log(item)
    const tableRow = `<tr>
    <th scope="row">${item.quantity}</th>
    <td>${item.unity ? item.unity : 'Pallets'}</td>
    <td>${item.brand}</td>
    <td>${item.type}</td>
    <td>${item.size ? item.size : ''}</td>
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

// closePrintArea
document.querySelector('#closePrintArea').addEventListener('click', () => {
  document.querySelector('.toPrint').classList.add('invisible')
  document.querySelector('.toPrint').innerHTML = ''
  document.querySelector('.notToPrint').classList.remove('invisible')
  window.location.reload()
})

export { mainState }

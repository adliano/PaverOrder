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
  _obj: [],
  _listener: data => {},
  set paverObj (data) {
    this._obj.push(data)
    // this._obj = [...this._obj, data]
    this._listener(data)
  },
  get paverObj () {
    return this._obj
  },
  register: function (listener) {
    this._listener = listener
  }
}

mainState.register(value => {
  console.log('********** Main State ***********')
  console.log(mainState.paverObj)
  document.querySelector('#cartBadge').innerHTML = mainState.paverObj.length
})

export { mainState }

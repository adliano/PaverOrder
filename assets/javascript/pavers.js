/**
 * This file will handle all code for pavers tab
 */

import * as util from './util.js'

let tempState = {}
let tempCart = {}

/**
 * Used for Debug
 */
let debug = {
  _obj: {},
  _listener: data => {},
  set paverObj (data) {
    this._obj = data
    this._listener(data)
  },
  get paverObj () {
    return this._obj
  },
  register: function (listener) {
    this._listener = listener
  }
}

debug.register(value => console.log(value))

/*************************************/
/** ******* onBrandChange() **********/
/*************************************/
function onBrandChange (e) {
  // Disable Select option
  e.target.children[0].disabled = true
  // Add to shopCart
  util
    .fetchByBrand(e.target.value)
    .then(response => response.json())
    .then(result => {
      debug.paverObj = result
      tempState.paverData = result
      tempCart.paverBrand = result.brand
    })
}

document
  .querySelector('#paverBrandSelector')
  .addEventListener('change', onBrandChange)

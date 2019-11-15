/**
 * This file will handle all code for pavers tab
 */

import * as util from './util.js'

const brandSelector = document.querySelector('#paverBrandSelector')
const typeSelector = document.querySelector('#paverTypeSelector')

let tempCart = {}

/**
 *
 */
let tempState = {
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

tempState.register(value => console.log(value))

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
      tempState.paverObj = result
      //   tempState.paverData = result
      tempCart.paverBrand = result.brand
      util.loadTypeOptions(result, typeSelector)
    })
}
/*************************************/
/** ******* loadPatterns() ***********/
/*************************************/
function loadPatterns ({ patterns }) {
    if (patterns) {
      let options = patterns.map(item => {
        return `<option value="${item.name}">${item.name}</option>`
      })
      // Add Select option
      options.unshift('<option>Select...</option>')
      document.querySelector('#patternSelector').innerHTML = options
    }
  }
/*************************************/
/** ****** onTypeSelected() **********/
/*************************************/
function onTypeSelected (e) {
    // Disable Select option
    e.target.children[0].disabled = true
    const paverType = tempState.paverObj.pavers.find(
      item => item.name.toLowerCase() === event.target.value.toLowerCase()
    )
    tempCart.paverType = paverType.name
    console.log(paverType)
    
    //
    loadPatterns(paverType)
    // validateForm()
  }

brandSelector.addEventListener('change', onBrandChange)
typeSelector.addEventListener('change', onTypeSelected)

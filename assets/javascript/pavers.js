/**
 * This file will handle all code for pavers tab
 */

import * as util from './util.js'
import { mainState } from './index.js'

const domElements = {
  brandSelector: document.querySelector('#paverBrandSelector'),
  typeSelector: document.querySelector('#paverTypeSelector'),
  totalSqfInput: document.querySelector('#totalSqf'),
  addButton: document.querySelector('#addPaverButton'),
  patternSelector: document.querySelector('#patternSelector')
}

/**
 * Local State
 */
let localState = {
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

localState.register(value => console.log(localState.paverObj))

/*************************************/
/********** validateForm() ***********/
/*************************************/
const validateForm = () => {
  // const addButton = document.querySelector('#addPaverButton')
  domElements.addButton.disabled = false
  const requiredData = document.querySelectorAll('.required')
  requiredData.forEach(element => {

    console.log(element)
    
    if (!element.value || element.value.toLowerCase().includes('select')) {
      domElements.addButton.disabled = true
      return
    }
  })
}

validateForm()

/*************************************/
/** ******** onSQFChanged() **********/
/*************************************/
const onSQFChanged = e => {
  validateForm()
  localState.paverObj = {
    ...localState,
    totalSQF: e.target.value
  }
}

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
      localState.paverObj = {
        ...localState, currentBrand: result
      }
      mainState.paverObj = result
      //   tempState.paverData = result
      // tempCart.paverBrand = result.brand
      util.loadTypeOptions(result, domElements.typeSelector)
    })
    validateForm()

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
  const { paverObj: {currentBrand: { pavers }}} = localState
    const paverType = pavers.find(
    item => item.name.toLowerCase() === event.target.value.toLowerCase()
  )
  //
  console.log(paverType)
  //
  loadPatterns(paverType)
}

domElements.brandSelector.addEventListener('change', onBrandChange)
domElements.typeSelector.addEventListener('change', onTypeSelected)
domElements.addButton.addEventListener('click', () => console.log('clicked'))
domElements.totalSqfInput.addEventListener('change', onSQFChanged)
domElements.patternSelector.addEventListener('change', () => validateForm())


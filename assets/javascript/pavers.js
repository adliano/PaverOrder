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
  patternSelector: document.querySelector('#patternSelector'),
  boderBrandSelector: document.querySelector('#borderBrandSelector'),
  borderTypeSelector: document.querySelector('#borderTypeSelector')
}

/**
 * Local State
 */
let localState = {
  paver: {},
  border: {},
  listener: data => {},
  set paverObj (data) {
    this.paver = data
    this.listener(data)
  },
  get paverObj () {
    return this.paver
  },
  set borderObj (data) {
    this.border = data
    this.listener(data)
  },
  get borderObj () {
    return this.border
  },
  register: function (listener) {
    this.listener = listener
  }
}

// localState.register(value => console.dir(localState))
localState.register(value =>
  console.log(JSON.parse(JSON.stringify(localState)))
)

// /*************************************/
// /********** validateForm() ***********/
// /*************************************/
const validateForm = () => {
  domElements.addButton.disabled = false
  const requiredData = document.querySelectorAll('.required')
  requiredData.forEach(element => {
    if (!element.value || element.value.toLowerCase().includes('select')) {
      domElements.addButton.disabled = true
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
    ...localState.paverObj,
    totalSQF: e.target.value,
  }
}
/*************************************/
/** ******* onBrandChange() **********/
/*************************************/
function onBrandChange (e) {
  // Disable Select option
  e.target.children[0].disabled = true
  util
    .fetchByBrand(e.target.value)
    .then(response => response.json())
    .then(result => {
      // console.log('='.repeat(50))
      // console.log(result)
      // console.log('='.repeat(50))

      // Check if event come from paver selector
      if (e.target.id === 'paverBrandSelector') {
        localState.paverObj = {
          ...localState.paverObj,
          currentPaverBrand: result,
        }
        util.loadTypeOptions(result, domElements.typeSelector)
      } else {
        localState.borderObj = {
          ...localState.borderObj,
          currentBorderBrand: result
        }
        util.loadTypeOptions(result, domElements.borderTypeSelector)
      }
      // // FIXME:
      // mainState.paverObj = result
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
/** ****** loadBorderSizes() *********/
/*************************************/
const loadBorderSizes = border => {
  let borderSizes = border.sizes.map(item => {
    if (item.isBorder) {
      return `<option>${item.size}</option>`
    }
  })
  // Add Select option
  borderSizes.unshift('<option>Select...</option>')
  document.querySelector('#borderSize').innerHTML = borderSizes
}
/*************************************/
/** ****** onTypeSelected() **********/
/*************************************/
function onTypeSelected (e) {
  // Disable Select option
  e.target.children[0].disabled = true
  const {
    paver: { currentPaverBrand },
    border: { currentBorderBrand }
  } = localState

  if (e.target.id === 'paverTypeSelector') {
    const paverType = currentPaverBrand.pavers.find(
      item => item.name.toLowerCase() === event.target.value.toLowerCase()
    )
    localState.paverObj = { ...localState.paverObj, type: paverType.name }
    loadPatterns(paverType)
  } else {
    const borderType = currentBorderBrand.pavers.find(
      item => item.name.toLowerCase() === event.target.value.toLowerCase()
    )
    localState.borderObj = { ...localState.borderObj, type: borderType.name }
    // console.log('*'.repeat(50))
    // console.log(borderType)
    // console.log('*'.repeat(50))
    loadBorderSizes(borderType)
  }
}

domElements.addButton.addEventListener('click', () => {
  console.log('clicked')
  // FIXME:
  const { totalSQF, currentPaverBrand: { brand }  } = localState.paverObj
  mainState.paverObj = { totalSQF, paverBrand: brand }
  // mainState.paverObj = {
  //   ...localState.paverObj, ...localState.borderObj
  // }
})

// Pavers
domElements.brandSelector.addEventListener('change', onBrandChange)
domElements.typeSelector.addEventListener('change', onTypeSelected)
domElements.totalSqfInput.addEventListener('change', onSQFChanged)
domElements.patternSelector.addEventListener('change', () => validateForm())
// Borders
domElements.boderBrandSelector.addEventListener('change', onBrandChange)
domElements.borderTypeSelector.addEventListener('change', onTypeSelected)

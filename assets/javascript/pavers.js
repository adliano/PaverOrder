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
  util
    .fetchByBrand(e.target.value)
    .then(response => response.json())
    .then(result => {
      // Check if event come from paver selector
      if (e.target.id === 'paverBrandSelector') {
        localState.paverObj = {
          ...localState.paverObj,
          currentPaverBrand: result
        }
        util.loadTypeOptions(result, domElements.typeSelector)
      } else {
        console.log('border')
        localState.borderObj = {
          ...localState.borderObj,
          currentBorderBrand: result
        }
        util.loadTypeOptions(result, domElements.borderTypeSelector)
      }
    })
  validateForm()
  // Test
  // mainState.paverObj = result
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
  const {
    paver: {
      currentPaverBrand: { pavers }
    }
  } = localState
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
domElements.boderBrandSelector.addEventListener('change', onBrandChange)

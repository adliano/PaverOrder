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
  borderLFSelector: document.querySelector('#borderLF'),
  boderBrandSelector: document.querySelector('#borderBrandSelector'),
  borderTypeSelector: document.querySelector('#borderTypeSelector'),
  borderSizeSelector: document.querySelector('#borderSize'),
  borderCourseSelector: document.querySelector('#borderCourse')
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
  // localState.paverObj = {
  //   totalSQF: e.target.value,
  //   ...localState.paverObj,
  // }
  localState.paverObj.totalSqf = e.target.value
  validateForm()
}
/*************************************/
/** ******** onLFChanged() ***********/
/*************************************/
const onLFChanged = e => {
  // localState.borderObj = {
  //   totalLF: e.target.value,
  //   ...localState.paverObj,
  // }
  localState.borderObj.totalLF = e.target.value
  validateForm()
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
        localState.paverObj.currentPaverBrand = result
        util.loadTypeOptions(result, domElements.typeSelector)
      }
      // Check if event is for border selector
      else {
        localState.borderObj.currentBorderBrand = result
        util.loadTypeOptions(result, domElements.borderTypeSelector)
      }
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

  if (e.target.id === 'paverTypeSelector') {
    const {
      paver: { currentPaverBrand }
    } = localState
    const paverType = currentPaverBrand.pavers.find(
      item => item.name.toLowerCase() === event.target.value.toLowerCase()
    )
    localState.paverObj = { ...localState.paverObj, paverType }
    loadPatterns(paverType)
  }
  // If border type selected
  else {
    const {
      border: { currentBorderBrand }
    } = localState
    const borderType = currentBorderBrand.pavers.find(
      item => item.name.toLowerCase() === event.target.value.toLowerCase()
    )
    // localState.borderObj = { ...localState.borderObj, type: borderType.name }
    localState.borderObj = { ...localState.borderObj, borderType }
    loadBorderSizes(borderType)
  }
}
/*************************************/
/** ***** onPatternSelected() ********/
/*************************************/
const onPatternSelected = e => {
  // Disable Select option
  e.target.children[0].disabled = true

  const {
    paver: {
      paverType: { patterns }
    }
  } = localState

  const pattern = patterns.find(
    item => item.name.toLowerCase() === e.target.value.toLowerCase()
  )
  localState.paverObj = { pattern, ...localState.paverObj }
  validateForm()
}

/*************************************/
/** *** onBorderSizeSelected() *******/
/*************************************/
const onBorderSizeSelected = e => {
  // localState.borderObj = { borderSize: e.target.value, ...localState.borderObj }
  localState.borderObj.borderSize = e.target.value
  validateForm()
}

/*************************************/
/** ** onBorderCourseSelected() ******/
/*************************************/
const onBorderCourseSelected = e => {
  // localState.borderObj = {
  //   borderCourse: e.target.value,
  //   ...localState.borderObj
  // }
  localState.borderObj.borderCourse = e.target.value
  validateForm()
}

/*************************************/
/** ********** onClick() *************/
/*************************************/
// FIXME:
domElements.addButton.addEventListener('click', () => {
  // util.calculatePavers(localState).forEach(item => (mainState.paverObj = item))
  util.calculatePavers(localState).forEach((item, index) => {
    sessionStorage.setItem(`${Date.now()}_${index}`, JSON.stringify(item))
  })
  // window.location.reload()
})

// Pavers
domElements.brandSelector.addEventListener('change', onBrandChange)
domElements.typeSelector.addEventListener('change', onTypeSelected)
domElements.totalSqfInput.addEventListener('change', onSQFChanged)
domElements.patternSelector.addEventListener('change', onPatternSelected)
// Borders
domElements.borderLFSelector.addEventListener('change', onLFChanged)
domElements.boderBrandSelector.addEventListener('change', onBrandChange)
domElements.borderTypeSelector.addEventListener('change', onTypeSelected)
domElements.borderSizeSelector.addEventListener('change', onBorderSizeSelected)
domElements.borderCourseSelector.addEventListener(
  'change',
  onBorderCourseSelected
)

// Used for debug
document.querySelector('#btn-show').addEventListener('click', e => {
  console.log('************')
  Object.keys(sessionStorage).forEach(item => {
    // console.log(JSON.stringify(sessionStorage.getItem(item)))
    console.log(sessionStorage.getItem(item))
  })
  // Object.keys(sessionStorage).map(item => console.log(item))
  console.log('************')
})

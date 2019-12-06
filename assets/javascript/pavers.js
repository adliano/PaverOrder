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
  borderLFInput: document.querySelector('#borderLF'),
  boderBrandSelector: document.querySelector('#borderBrandSelector'),
  borderTypeSelector: document.querySelector('#borderTypeSelector'),
  borderSizeSelector: document.querySelector('#borderSize'),
  borderCourseSelector: document.querySelector('#borderCourse'),
  paverColorSelector: document.querySelector('#paverColorSelector'),
  borderColorSelector: document.querySelector('#borderColorSelector')
}
/**
 * Local State
 */
let localState = {
  paver: {},
  border: {},
  paverObjectListener: data => {},
  borderObjectListener: data => {},
  set paverObj (data) {
    this.paver = data
    this.paverObjectListener(data)
  },
  get paverObj () {
    return this.paver
  },
  set borderObj (data) {
    this.border = data
    this.borderObjectListener(data)
  },
  get borderObj () {
    return this.border
  },
  registerPaverObjectListener: function (listener) {
    this.paverObjectListener = listener
  },
  registerBorderObjectListener: function (listener) {
    this.borderObjectListener = listener
  }
}
/**
 * PaverObjectListener
 */
localState.registerPaverObjectListener(value => {
  const {
    totalSqf,
    currentPaverBrand,
    paverType,
    pattern,
    color
  } = localState.paverObj
  //
  if (!currentPaverBrand) {
    loadBrandOption(totalSqf, domElements.brandSelector)
  }
  if (!paverType) {
    util.loadTypeOptions(currentPaverBrand, domElements.typeSelector)
  }
  if (!pattern) {
    loadPatterns(paverType)
  }
  if (!color) {
    loadPaversColor(pattern)
  }
})
/**
 * BorderObjectListener
 */
localState.registerBorderObjectListener(value => {
  const {
    totalLF,
    currentBorderBrand,
    borderType,
    borderSize,
    borderColor
  } = localState.borderObj

  if (!currentBorderBrand) {
    loadBrandOption(totalLF, domElements.boderBrandSelector)
  }
  if (!borderType) {
    util.loadTypeOptions(currentBorderBrand, domElements.borderTypeSelector)
  }
  if (!borderSize) {
    loadBorderSizes(borderType)
  }
  if (!borderColor) {
    loadBorderColor(borderSize)
  }
})
/*************************************/
/** ******** validateForm() **********/
/*************************************/
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
/** **** loadPaverBrandOption() ******/
/*************************************/
const loadBrandOption = (measure, domElement) => {
  if (measure) {
    const brands = ['Basalite', 'Belgard', 'Calstone']
    const options = brands.map(item => {
      return `<option value="${item}">${item}</option>`
    })
    options.unshift('<option>Select...</option>')
    domElement.innerHTML = options
  } else {
    domElement.innerHTML =
      '<option value="select" disabled>Enter Measument</option>'
  }
}

/*************************************/
/** ******** onSQFChanged() **********/
/*************************************/
const onSQFChanged = e => {
  localState.paverObj = { ...localState, totalSqf: e.target.value }
  validateForm()
}
/*************************************/
/** ******** onLFChanged() ***********/
/*************************************/
const onLFChanged = e => {
  localState.borderObj = { ...localState, totalLF: e.target.value }
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
        const { totalSqf } = localState.paverObj
        localState.paverObj = {
          totalSqf,
          currentPaverBrand: result
        }
      }
      // Check if event is for border selector
      else {
        const { totalLF } = localState.borderObj
        localState.borderObj = {
          totalLF,
          currentBorderBrand: result
        }
      }
    })
  validateForm()
}
/*************************************/
/** ******* loadPatterns() ***********/
/*************************************/
function loadPatterns (paverType) {
  if (paverType) {
    let options = paverType.patterns.map(item => {
      return `<option value="${item.name}">${item.name}</option>`
    })
    // Add Select option
    options.unshift('<option>Select...</option>')
    domElements.patternSelector.innerHTML = options
  } else {
    domElements.patternSelector.innerHTML =
      '<option value="select" disabled>Select Type</option>'
  }
}
/*************************************/
/** ****** loadBorderSizes() *********/
/*************************************/
const loadBorderSizes = border => {
  if (border) {
    let borderSizes = border.sizes.map(item => {
      if (item.isBorder) {
        return `<option>${item.size}</option>`
      }
    })
    // Add Select option
    borderSizes.unshift('<option>Select...</option>')
    domElements.borderSizeSelector.innerHTML = borderSizes
  } else {
    domElements.borderSizeSelector.innerHTML =
      '<option value="select" disabled>Select Type</option>'
  }
}
/*************************************/
/** ****** onTypeSelected() **********/
/*************************************/
function onTypeSelected (e) {
  // Disable Select option
  e.target.children[0].disabled = true

  if (e.target.id === 'paverTypeSelector') {
    const {
      paver: { totalSqf, currentPaverBrand }
    } = localState
    const paverType = currentPaverBrand.pavers.find(
      item => item.name.toLowerCase() === event.target.value.toLowerCase()
    )
    localState.paverObj = { totalSqf, currentPaverBrand, paverType }
  }
  // If border type selected
  else {
    const {
      border: { totalLF, currentBorderBrand }
    } = localState
    const borderType = currentBorderBrand.pavers.find(
      item => item.name.toLowerCase() === event.target.value.toLowerCase()
    )
    localState.borderObj = { totalLF, currentBorderBrand, borderType }
  }
}
/*************************************/
/** ****** loadPaversColor() *********/
/*************************************/
const loadPaversColor = patternInput => {
  if (patternInput) {
    const {
      paverType: { sizes }
    } = localState.paver
    const { quantities } = patternInput

    const tempSize = sizes.find(
      item => item.size === quantities[quantities.length - 1].size
    )

    if (tempSize.colors) {
      let options = tempSize.colors.map(color => {
        return `<option value="${color}">${color}</option>`
      })
      // Add Select option
      options.unshift('<option>Select...</option>')
      domElements.paverColorSelector.innerHTML = options
    }
  } else {
    domElements.paverColorSelector.innerHTML =
      '<option value="select" disabled>Select Pattern</option>'
  }
}
/*************************************/
/** *** onPaversColorSelected() ******/
/*************************************/
const onPaversColorSelected = e => {
  localState.paverObj.paverColor = e.target.value
  validateForm()
}
/*************************************/
/** ****** loadBorderColor() *********/
/*************************************/
const loadBorderColor = borderSizeInput => {
  if (borderSizeInput) {
    const {
      borderType: { sizes }
    } = localState.border

    const tempBorder = sizes.find(item => item.size === borderSizeInput)

    if (tempBorder.colors) {
      let options = tempBorder.colors.map(color => {
        return `<option value="${color}">${color}</option>`
      })
      // Add Select option
      options.unshift('<option>Select...</option>')
      domElements.borderColorSelector.innerHTML = options
    }
  } else {
    domElements.borderColorSelector.innerHTML =
      '<option value="select" disabled>Select Size</option>'
  }
}
/*************************************/
/** *** onBorderColorSelected() ******/
/*************************************/
const onBorderColorSelected = e => {
  localState.borderObj.borderColor = e.target.value
  validateForm()
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
  localState.paverObj = { ...localState.paverObj, pattern }
  validateForm()
}
/*************************************/
/** *** onBorderSizeSelected() *******/
/*************************************/
const onBorderSizeSelected = e => {
  const { totalLF, currentBorderBrand, borderType } = localState.borderObj
  localState.borderObj = {
    totalLF,
    borderSize: e.target.value,
    currentBorderBrand,
    borderType
  }
  validateForm()
}
/*************************************/
/** ** onBorderCourseSelected() ******/
/*************************************/
const onBorderCourseSelected = e => {
  localState.borderObj.borderCourse = e.target.value
  validateForm()
}
/*************************************/
/** *** addButton onClick() **********/
/*************************************/
domElements.addButton.addEventListener('click', () => {
  const materials = util.calculatePavers(localState)
  materials.forEach(item => (mainState.material = item))
  // Clean inputs
  localState.paverObj = {}
  localState.borderObj = {}
  domElements.totalSqfInput.value = ''
  domElements.borderLFInput.value = ''
  validateForm()
})

// Pavers
domElements.brandSelector.addEventListener('change', onBrandChange)
domElements.typeSelector.addEventListener('change', onTypeSelected)
domElements.totalSqfInput.addEventListener('change', onSQFChanged)
domElements.paverColorSelector.addEventListener('change', onPaversColorSelected)
domElements.patternSelector.addEventListener('change', onPatternSelected)
// Borders
domElements.borderLFInput.addEventListener('change', onLFChanged)
domElements.boderBrandSelector.addEventListener('change', onBrandChange)
domElements.borderTypeSelector.addEventListener('change', onTypeSelected)
domElements.borderSizeSelector.addEventListener('change', onBorderSizeSelected)
domElements.borderColorSelector.addEventListener(
  'change',
  onBorderColorSelected
)
domElements.borderCourseSelector.addEventListener(
  'change',
  onBorderCourseSelected
)

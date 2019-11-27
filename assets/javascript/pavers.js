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
  const { currentPaverBrand, paverType, pattern, color } = localState.paverObj
  //
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
    currentBorderBrand,
    borderType,
    borderSize,
    borderColor
  } = localState.borderObj
  //
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
/********** validateForm() ***********/
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
/** ******** onSQFChanged() **********/
/*************************************/
const onSQFChanged = e => {
  localState.totalSqf = e.target.value
  validateForm()
}
/*************************************/
/** ******** onLFChanged() ***********/
/*************************************/
const onLFChanged = e => {
  localState.totalLF = e.target.value
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
        localState.paverObj = {
          currentPaverBrand: result
        }
      }
      // Check if event is for border selector
      else {
        localState.borderObj = {
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
      paver: { currentPaverBrand }
    } = localState
    const paverType = currentPaverBrand.pavers.find(
      item => item.name.toLowerCase() === event.target.value.toLowerCase()
    )
    localState.paverObj = { currentPaverBrand, paverType }
  }
  // If border type selected
  else {
    const {
      border: { currentBorderBrand }
    } = localState
    const borderType = currentBorderBrand.pavers.find(
      item => item.name.toLowerCase() === event.target.value.toLowerCase()
    )
    localState.borderObj = { currentBorderBrand, borderType }
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
    //
    const tempBorder = sizes.find(item => item.size === borderSizeInput)
    console.log(tempBorder.colors)
    //
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
  //
  const {
    paver: {
      paverType: { patterns }
    }
  } = localState
  //
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
  const { currentBorderBrand, borderType } = localState.borderObj
  localState.borderObj = {
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
  const storage = sessionStorage.getItem('paverOrder')
  const local = util.calculatePavers(localState)

  const revised = local.map(item => {
    // TODO:
  })

  sessionStorage.setItem(`paverOrder`, JSON.stringify(local))
})

// // TODO: check if same material its available
// domElements.addButton.addEventListener('click', () => {
//   // util.calculatePavers(localState).forEach(item => (mainState.paverObj = item))
//   // util.calculatePavers(localState).forEach((item, index) => {
//   util.calculatePavers(localState).forEach((localItem, index) => {
//     // check if same material its available
//     Object.keys(sessionStorage).forEach(key => {
//       const storage = JSON.parse(sessionStorage.getItem(key))
//       if (
//         storage.type === localItem.type &&
//         storage.size === localItem.size &&
//         storage.color === localItem.color
//       ) {
//         console.log(`${JSON.stringify(storage)}  =  ${JSON.stringify(localItem)}`)
//       }
//     })
//     sessionStorage.setItem(`${Date.now()}_${index}`, JSON.stringify(localItem))
//   })
//   // window.location.reload()
// })

// Pavers
domElements.brandSelector.addEventListener('change', onBrandChange)
domElements.typeSelector.addEventListener('change', onTypeSelected)
domElements.totalSqfInput.addEventListener('change', onSQFChanged)
domElements.paverColorSelector.addEventListener('change', onPaversColorSelected)
domElements.patternSelector.addEventListener('change', onPatternSelected)
// Borders
domElements.borderLFSelector.addEventListener('change', onLFChanged)
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

// &&&&&&&&&&&&&&&&& Used for debug &&&&&&&&&&&&&&&&&&&
document.querySelector('#btn-show').addEventListener('click', e => {
  console.log('****** sessionStorage ******')
  Object.keys(sessionStorage).forEach(item => {
    // console.log(JSON.stringify(sessionStorage.getItem(item)))
    console.log(sessionStorage.getItem(item))
  })
  // Object.keys(sessionStorage).map(item => console.log(item))
  console.log('************')
})

document.querySelector('#btn-clear').addEventListener('click', e => {
  sessionStorage.clear()
})

document.querySelector('#btn-clear-obj').addEventListener('click', () => {
  localState.paverObj = {}
  console.log(localState)
})


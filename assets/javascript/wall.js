import { mainState } from './index.js'
import { loadTypeOptions } from './util.js'

const getElement = id => document.querySelector(id)

const elements = {
  totalFFInput: getElement('#walFF'),
  wallBrandSelector: getElement('#wallBrandSelector'),
  wallTypeSelector: getElement('#wallTypeSelector'),
  wallSizeSelector: getElement('#wallSizeSelector'),
  wallColorSelector: getElement('#wallColorSelector'),
  totalcapLFInput: getElement('#capLF'),
  capBrandSelector: getElement('#capBrandSelector'),
  capTypeSelector: getElement('#capTypeSelector'),
  capColorSelector: getElement('#capColorSelector'),
  addWallButton: getElement('#addWallButton')
}
/**
 * wallState
 */
const wallState = {
  wall: {},
  wallObjectListener: data => {},
  set wallObject (data) {
    this.wall = data
    this.wallObjectListener(data)
  },
  get wallObject () {
    return this.wall
  },
  registerObjectListener: function (listener) {
    this.wallObjectListener = listener
  }
}
/**
 * capState
 */
const capState = {
  cap: {},
  capObjectListener: data => {},
  set capObject (data) {
    this.cap = data
    this.capObjectListener(data)
  },
  get capObject () {
    return this.cap
  },
  registerObjectListener: function (listener) {
    this.capObjectListener = listener
  }
}
/**
 * registerObjectListener for wallState
 */
wallState.registerObjectListener(value => {
  const { totalFF, brand, type, color } = wallState.wallObject

  if (!brand) {
    loadBrandOption(totalFF, elements.wallBrandSelector)
  }
  if (!type) {
    loadWallTypes(brand)
  }
  if (!color && type) {
    loadWallColor(type)
  }
})
/**
 * registerObjectListener for capState
 */
capState.registerObjectListener(value => {
  const { totalLF, brand, type, color } = capState.capObject
  if (!brand) {
    loadBrandOption(totalLF, elements.capBrandSelector)
  }
  if (!type) {
    loadcapOptions(brand)
  }
  if (!color && type) {
    loadCapColor(type)
  }
})
/*************************************/
/** ******** validateForm() **********/
/*************************************/
// TODO:
/*************************************/
/** ******* loadWallColor() **********/
/*************************************/
const loadWallColor = type => {
  const options = type.colors.map(
    item => `<option value="${item}">${item}</option>`
  )
  options.unshift('<option>Select...</option>')
  elements.wallColorSelector.innerHTML = options
}
/*************************************/
/** ******* loadCapColor() **********/
/*************************************/
const loadCapColor = type => {
  const options = type.colors.map(
    item => `<option value="${item}">${item}</option>`
  )
  options.unshift('<option>Select...</option>')
  elements.capColorSelector.innerHTML = options
}
/*************************************/
/** ******** fetchByBrand() **********/
/*************************************/
const fetchByBrand = brand => {
  switch (brand.toLowerCase()) {
    case 'belgard':
      return fetch('data/walls/belgard.json')
      break
    case 'calstone':
      return fetch('data/walls/calstone.json')
      break
    default:
      return fetch('data/walls/basalite.json')
      break
  }
}
/*************************************/
/** ******* loadBrandOption() ********/
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
/** ******* loadWallTypes() **********/
/*************************************/
const loadWallTypes = wallData => {
  if (wallData) {
    const options = wallData.walls.map(item => {
      return `<option value="${item.name}">${item.name}</option>`
    })
    // Add Select option
    options.unshift('<option>Select...</option>')
    elements.wallTypeSelector.innerHTML = options
  } else {
    elements.wallTypeSelector.innerHTML =
      '<option value="select" disabled>Select Brand</option>'
  }
}
/*************************************/
/** ******* loadcapOptions() **********/
/*************************************/
const loadcapOptions = capData => {
  if (capData) {
    const options = capData.walls.map(item => {
      return `<option value="${item.name}">${item.name}</option>`
    })
    // Add Select option
    options.unshift('<option>Select...</option>')
    elements.capTypeSelector.innerHTML = options
  } else {
    elements.capTypeSelector.innerHTML =
      '<option value="select" disabled>Select Brand</option>'
  }
}
//
/*************************************/
/** ******** onFFChanged() ***********/
/*************************************/
const onFFChanged = e => {
  wallState.wallObject = {
    ...wallState,
    totalFF: e.target.value
  }
}
/*************************************/
/** ******** onLFChanged() ***********/
/*************************************/
const onLFChanged = e => {
  capState.capObject = {
    ...capState.capObject,
    totalLF: e.target.value
  }
}
/*************************************/
/** ******* onBrandChange() **********/
/*************************************/
const onBrandChange = e => {
  e.target.children[0].disabled = true
  fetchByBrand(e.target.value)
    .then(response => response.json())
    .then(result => {
      // If event trigged by wall brand selector
      if (e.target.id === elements.wallBrandSelector.id) {
        wallState.wallObject = {
          ...wallState.wallObject,
          brand: result
        }
      }
      // Else Event is cap brand selector
      else {
        capState.capObject = {
          ...capState.capObject,
          brand: result
        }
      }
    })
}
/*************************************/
/** ******* onTypeSelected() *********/
/*************************************/
const onTypeSelected = e => {
  // Disable select option
  e.target.children[0].disabled = true
  // Check if event called by wall selector
  if (e.target.id === elements.wallTypeSelector.id) {
    // Get saved data
    const { brand } = wallState.wall
    // Get selected wall type
    const type = brand.walls.find(
      item => item.name.toLowerCase() === e.target.value.toLowerCase()
    )
    // Saved selected wall type data
    wallState.wallObject = {
      ...wallState.wall,
      type
    }
  }
  // Check if event called by cap selector
  else {
    console.log('is a act type selector')
    const { brand } = capState.cap
    const type = brand.walls.find(
      item => item.name.toLowerCase() === e.target.value.toLowerCase()
    )
    capState.capObject = {
      ...capState.cap,
      type
    }
  }
}
/*************************************/
/** ******* onColorSelected() ********/
/*************************************/
const onColorSelected = e => {
  e.target.children[0].disabled = true
  if (e.target.id === elements.wallColorSelector.id){

    wallState.wallObject.color = e.target.value
  }
  else{
    capState.capObject.color = e.target.value
  }
}
/*************************************/
/** *** addButton onClick() **********/
/*************************************/
elements.addWallButton.addEventListener('click', e => {
  console.log('clicked')
  console.log(wallState)
  console.log(capState)
})

elements.totalFFInput.addEventListener('change', onFFChanged)
elements.wallBrandSelector.addEventListener('change', onBrandChange)
elements.wallTypeSelector.addEventListener('change', onTypeSelected)
elements.wallColorSelector.addEventListener('change', onColorSelected)

elements.totalcapLFInput.addEventListener('change', onLFChanged)
elements.capBrandSelector.addEventListener('change', onBrandChange)
elements.capTypeSelector.addEventListener('change', onTypeSelected)
elements.capColorSelector.addEventListener('change', onColorSelected)


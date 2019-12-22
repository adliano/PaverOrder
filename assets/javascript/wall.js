import { mainState } from './index.js'

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

const wallState = {
  wall: {},
  cap: {},
  wallObjectListener: data => {},
  capObjectListener: data => {},
  set wallObject (data) {
    this.wall = data
    this.wallObjectListener(data)
  },
  set capObject (data) {
    this.cap = data
    this.capObjectListener(data)
  },
  get wallObject () {
    return this.wall
  },
  get capObject () {
    return this.cap
  },
  registerWallObjectListener: function (listener) {
    this.wallObjectListener = listener
  },
  registerCapObjectListener: function (listener) {
    this.capObjectListener = listener
  }
}

wallState.registerWallObjectListener(value => {
  const { totalFF, wallBrand, wallType, wallColor } = wallState.wallObject

  if (!wallBrand) {
    loadBrandOption(totalFF, elements.wallBrandSelector)
  }
  if (!wallType) {
    loadWallTypes(wallBrand)
  }
  if (!wallColor && wallType) {
    loadWallColor(wallType)
  }
})

const loadWallColor = type =>{
  const options = type.colors.map(
    item => `<option value="${item}">${item}</option>`
  )
  options.unshift('<option>Select...</option>')
  elements.wallColorSelector.innerHTML = options
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
/** ******** validateForm() **********/
/*************************************/

/*************************************/
/** **** loadWallBrandOption() *******/
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
/** ******** onFFChanged() ***********/
/*************************************/
const onFFChanged = e => {
  wallState.wallObject = {
    ...wallState,
    totalFF: e.target.value
  }
}
/*************************************/
/** ******* onBrandChange() **********/
/*************************************/
const onWallBrandChange = e => {
  e.target.children[0].disabled = true
  fetchByBrand(e.target.value)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      const { totalFF } = wallState.wallObject
      wallState.wallObject = {
        totalFF,
        wallBrand: result
      }
    })
}

/*************************************/
/** ******** onLFChanged() ***********/
/*************************************/
const onLFChanged = e => {
  wallState.capObject = {
    ...wallState,
    totalLF: e.target.value
  }
}
/*************************************/
/** **** onWallTypeSelected() ********/
/*************************************/
const onWallTypeSelected = e => {
  e.target.children[0].disabled = true

  const {
    wall: { totalFF, wallBrand }
  } = wallState

  const wallType = wallBrand.walls.find(
    item => item.name.toLowerCase() === e.target.value.toLowerCase()
  )

  wallState.wallObject = {
    totalFF,
    wallBrand,
    wallType
  }
}

/*************************************/
/** ****** loadWallColor() ***********/
/*************************************/

/*************************************/
/** **** onWallColorSelected() *******/
/*************************************/

/*************************************/
/** ******* loadCapColor() ***********/
/*************************************/

/*************************************/
/** **** onCapColorSelected() ********/
/*************************************/

/*************************************/
/** *** addButton onClick() **********/
/*************************************/
elements.addWallButton.addEventListener('click', e => {
  console.log('clicked')
})

// document.querySelector('#totalFf').addEventListener('change', () => {
//   wallState.wallObject = { test: 'works' }
// })

elements.totalFFInput.addEventListener('change', onFFChanged)
elements.totalcapLFInput.addEventListener('change', onLFChanged)
elements.wallBrandSelector.addEventListener('change', onWallBrandChange)
elements.wallTypeSelector.addEventListener('change', onWallTypeSelected)

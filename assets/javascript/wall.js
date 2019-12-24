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
  // cap: {},
  wallObjectListener: data => {},
  // capObjectListener: data => {},
  set wallObject (data) {
    this.wall = data
    this.wallObjectListener(data)
  },
  // set capObject (data) {
  //   this.cap = data
  //   this.capObjectListener(data)
  // },
  get wallObject () {
    return this.wall
  },
  // get capObject () {
  //   return this.cap
  // },
  registerObjectListener: function (listener) {
    this.wallObjectListener = listener
  }
  // registerCapObjectListener: function (listener) {
  //   this.capObjectListener = listener
  // }
}

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

wallState.registerObjectListener(value => {
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
// TODO:
capState.registerObjectListener(value => {
  console.log('changed cap obj')
  const { totalLF, brand, type, color } = capState.capObject
  if (!brand) {
    loadBrandOption(totalLF, elements.capColorSelector)
  }
})

// const brands = ['Basalite', 'Belgard', 'Calstone']
//     const options = brands.map(item => {
//       return `<option value="${item}">${item}</option>`
//     })
//     options.unshift('<option>Select...</option>')

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
/** ******** onLFChanged() ***********/
/*************************************/
const onLFChanged = e => {
  capState.capObject = {
    ...capState,
    totalLF: e.target.value
  }
}
/*************************************/
/** ******* onBrandChange() **********/
/*************************************/
// const onWallBrandChange = e => {
const onBrandChange = e => {
  e.target.children[0].disabled = true
  fetchByBrand(e.target.value)
    .then(response => response.json())
    .then(result => {
      // If event trigged by wall brand selector
      if (e.target.id === elements.wallBrandSelector.id) {
        wallState.wallObject = {
          ...wallState.wallObject,
          wallBrand: result
        }
      }
      // Else Event is cap brand selector
      else {
        capState.capObject = {
          ...capState.capObject,
          capBrand: result
        }
      }
    })
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
/** **** onWallColorSelected() *******/
/*************************************/
const onWallColorSelected = e => {
  e.target.children[0].disabled = true

  wallState.wallObject.wallColor = e.target.value
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
elements.totalcapLFInput.addEventListener('change', onLFChanged)
// elements.wallBrandSelector.addEventListener('change', onWallBrandChange)
elements.wallBrandSelector.addEventListener('change', onBrandChange)
elements.capBrandSelector.addEventListener('change', onBrandChange)
elements.wallTypeSelector.addEventListener('change', onWallTypeSelected)
elements.wallColorSelector.addEventListener('change', onWallColorSelected)

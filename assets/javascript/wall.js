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
  const { totalFF, wallBrand } = wallState.wallObject

  if (!wallBrand) {
    loadBrandOption(totalFF, elements.wallBrandSelector)
  }
})

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
  console.log(!!measure)
  console.log(measure)

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
    wallState.capObject = {
        ...wallState, totalLF: e.target.value
    }
}

/*************************************/
/** ******* onBrandChange() **********/
/*************************************/
const onBrandChange = e => {
  e.target.children[0].disabled = true
  console.log(`Changed Brand to ${e.target.value}`)
}

/*************************************/
/** ****** onTypeSelected() **********/
/*************************************/

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
elements.wallBrandSelector.addEventListener('change', onBrandChange)

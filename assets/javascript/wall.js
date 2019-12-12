import { mainState } from './index.js'

const getElement = id => document.querySelector(id)

const elements = {
  totalFFInput: getElement('#walFF'),
  brandSelector: getElement('#wallBrandSelector'),
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
  get wallObject () {
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
  console.log('called from registerWallObjectListener')
})

/*************************************/
/** ******** validateForm() **********/
/*************************************/

/*************************************/
/** **** loadWallBrandOption() *******/
/*************************************/

/*************************************/
/** ******** onFFChanged() ***********/
/*************************************/
const onFFChanged = e => {
  console.log(`Changed FF to ${e.target.value}`)
}

/*************************************/
/** ******** onLFChanged() ***********/
/*************************************/
const onLFChanged = e => {
  console.log(`Changed LF to ${e.target.value}`)
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
elements.brandSelector.addEventListener('change', onBrandChange)

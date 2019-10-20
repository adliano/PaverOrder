const CALSTONE_URL = 'data/calstone.json'
const BELGARD_URL = 'data/belgard.json'

let currentPavers, paverType, currentBorder
// let shopCart = {}

/*************************************/
/** ******* onBrandChange() ***********/
/*************************************/
function onBrandChange (e) {
  // shopCart['Brand'] = event.target.value
  switch (event.target.value.toLowerCase()) {
    case 'belgard':
      fetchPaverData('data/belgard.json')
      break
    case 'calstone':
      fetchPaverData('data/calstone.json')
      break
    default:
      console.log('Basalite selected')
      break
  }
}
/*************************************/
/** **** onBorderBrandChange() *******/
/*************************************/
function onBorderBrandChange (e) {
  // shopCart['Brand'] = event.target.value
  switch (event.target.value.toLowerCase()) {
    case 'belgard':
      fetchBorderData('data/belgard.json')
      break
    case 'calstone':
      fetchBorderData('data/calstone.json')
      break
    default:
      console.log('Basalite selected')
      break
  }
}
/*************************************/
/** ******* fetchPaverData() **********/
/*************************************/
function fetchPaverData (brandURL) {
  fetch(brandURL)
    .then(results => results.json())
    .then(data => loadTypeOptions(data))
}
/*************************************/
/** ***** fetchBorderData() **********/
/*************************************/
function fetchBorderData (brandURL) {
  fetch(brandURL)
    .then(results => results.json())
    .then(data => loadBorderOptions(data))
}
/*************************************/
/** ****** loadTypeOptions() **********/
/*************************************/
function loadTypeOptions (paverData) {
  currentPavers = paverData
  let options = paverData.pavers.map((item, index) => {
    return `<option value="${item.name}">${item.name}</option>`
  })
  document.querySelector('#typeSelector').innerHTML = options
}
/*************************************/
/** ***** loadBorderOptions() ********/
/*************************************/
function loadBorderOptions (borderData) {
  currentBorder = borderData
  let options = borderData.pavers.map((item, index) => {
    return `<option value="${item.name}">${item.name}</option>`
  })
  document.querySelector('#bordeType').innerHTML = options
}
/*************************************/
/** ****** onTypeSelected() ***********/
/*************************************/
function onTypeSelected (e) {
  // shopCart['Paver'] = event.target.value
  paverType = currentPavers.pavers.find(
    item => item.name.toLowerCase() === event.target.value.toLowerCase()
  )
  loadPatterns(paverType)
  console.log(paverType)
}

/*************************************/
/** ****** onTypeSelected() ***********/
/*************************************/
function loadPatterns ({ patterns }) {
  if (patterns) {
    let options = patterns.map(item => {
      return `<option value="${item.quantities[0].size}">${item.name}</option>`
    })
    document.querySelector('#patternSelector').innerHTML = options
  }
}
/*************************************/
/** ******** renderColors() **********/
/*************************************/
const renderColors = size => {
  let colors = size.colors.map(
    item => `<option value="${item}">${item}</option>`
  )
  document.querySelector('#paverColor').innerHTML = colors
}
/*************************************/
/** ***** onPatternSelected() ********/
/*************************************/
const onPatternSelected = e => {
  // console.log(`Pattern Selected and size is ${e.target.value}`)
  const paverSize = paverType.sizes.find(item => item.size === e.target.value)
  // console.log(paverSize)
  renderColors(paverSize)
}

/// /////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////
document
  .querySelector('#patternSelector')
  .addEventListener('change', onPatternSelected)
// Set load pavers Color

// Set onChange listener for #brandSelector
document
  .querySelector('#brandSelector')
  .addEventListener('change', onBrandChange)

document
  .querySelector('#borderBrand')
  .addEventListener('change', onBorderBrandChange)

// Set onChange listener for #typeSelector
document
  .querySelector('#typeSelector')
  .addEventListener('change', onTypeSelected)
// Button onClick listner
document.querySelector('#calButton').addEventListener('click', e => {
  // console.log(shopCart)
})

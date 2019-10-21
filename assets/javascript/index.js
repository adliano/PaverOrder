const CALSTONE_URL = 'data/calstone.json'
const BELGARD_URL = 'data/belgard.json'

let currentPavers, paverType, currentBorder, borderType
// let shopCart = {}

/*************************************/
/** ******* onBrandChange() **********/
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
  // Add Select option
  options.unshift('<option>Select...</option>')
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
  // Add Select option
  options.unshift('<option>Select...</option>')
  document.querySelector('#bordeType').innerHTML = options
  console.log(currentBorder)
}
/*************************************/
/** ****** onTypeSelected() ***********/
/*************************************/
function onTypeSelected (e) {
  // Disable Select option
  e.target.children[0].disabled = true

  paverType = currentPavers.pavers.find(
    item => item.name.toLowerCase() === event.target.value.toLowerCase()
  )
  loadPatterns(paverType)
}
/*************************************/
/** **** onBorderTypeSelected() ******/
/*************************************/
function onBorderTypeSelected (e) {
  // Disable Select option
  e.target.children[0].disabled = true

  let border = currentBorder.pavers.find(
    item => item.name.toLowerCase() === event.target.value.toLowerCase()
  )
  console.log(border)
  renderBorderSizes(border)
}
/*************************************/
/** ****** onTypeSelected() ***********/
/*************************************/
function loadPatterns ({ patterns }) {
  if (patterns) {
    let options = patterns.map(item => {
      return `<option value="${item.quantities[0].size}">${item.name}</option>`
    })
    // Add Select option
    options.unshift('<option>Select...</option>')
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
  // Add Select option
  colors.unshift('<option>Select...</option>')
  document.querySelector('#paverColor').innerHTML = colors
}
/*************************************/
/** ***** onPatternSelected() ********/
/*************************************/
const onPatternSelected = e => {
  // Disable Select option
  e.target.children[0].disabled = true
  const paverSize = paverType.sizes.find(item => item.size === e.target.value)
  // console.log(paverSize)
  renderColors(paverSize)
}
/*************************************/
/** ***** renderBorderSizes() ********/
/*************************************/
const renderBorderSizes = border => {
  let borderSizes = border.sizes.map(item => {
    if (item.isBorder) {
      return `<option>${item.size}</option>`
    }
  })
  // Add Select option
  borderSizes.unshift('<option>Select...</option>')
  console.log(borderSizes)
  document.querySelector('#borderSize').innerHTML = borderSizes
}

const onBorederSizeSelected = e => {
  e.target.children[0].disabled = true
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
  alert('clicked')
})

document
  .querySelector('#bordeType')
  .addEventListener('change', onBorderTypeSelected)

document
  .querySelector('#borderSize')
  .addEventListener('change', onBorederSizeSelected)

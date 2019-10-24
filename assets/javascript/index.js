const CALSTONE_URL = 'data/calstone.json'
const BELGARD_URL = 'data/belgard.json'

let currentPavers, paverType, currentBorder, borderType
let shopCart = {}
// paverBrand borderBrand
/*************************************/
/** ******* onBrandChange() **********/
/*************************************/
function onBrandChange (e) {
  // Disable Select option
  e.target.children[0].disabled = true
  // Add to shopCart
  shopCart.paverBrand = event.target.value
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
  // Disable Select option
  e.target.children[0].disabled = true
  // Add to shopCart
  shopCart.borderBrand = event.target.value
  //
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
  // Save the paver type as String
  // shopCart.paverType = e.target.value
  //
  paverType = currentPavers.pavers.find(
    item => item.name.toLowerCase() === event.target.value.toLowerCase()
  )

  shopCart.paverType = paverType

  //
  loadPatterns(paverType)
}
/*************************************/
/** **** onBorderTypeSelected() ******/
/*************************************/
function onBorderTypeSelected (e) {
  // Disable Select option
  e.target.children[0].disabled = true
  // Save the paver type as String
  shopCart.borderType = e.target.value
  //
  let border = currentBorder.pavers.find(
    item => item.name.toLowerCase() === event.target.value.toLowerCase()
  )
  //
  renderBorderSizes(border)
}
/*************************************/
/** ******* loadPatterns() ***********/
/*************************************/
function loadPatterns ({ patterns }) {
  if (patterns) {
    let options = patterns.map(item => {
      // return `<option value="${item.quantities[0].size}">${item.name}</option>`
      return `<option value="${item.name}">${item.name}</option>`
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
  //
  const tempPattern = paverType.patterns.find(
    item => item.name === e.target.value
  )
  //
  shopCart.pattern = tempPattern
  //
  const paverSize = paverType.sizes.find(
    item => item.size === tempPattern.quantities[0].size
  )
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
/*************************************/
/** **** onBorederSizeSelected() *****/
/*************************************/
const onBorederSizeSelected = e => {
  e.target.children[0].disabled = true
  shopCart.borderSize = e.target.value
}
/*************************************/
/** *** onBorderCourseSelected() *****/
/*************************************/
const onBorderCourseSelected = e => {
  e.target.children[0].disabled = true
  shopCart.borderCourse = e.target.value
}
/*************************************/
/** ******** onSQFChanged() **********/
/*************************************/
const onSQFChanged = e => {
  shopCart.totalSQF = e.target.value
}
/*************************************/
/** ******** onLFChanged() **********/
/*************************************/
const onLFChanged = e => {
  shopCart.totalLF = e.target.value
}
/*************************************/
/** ********* calculate() ************/
/*************************************/
const calculate = () => {
  let toOrder = {}
  const {
    totalSQF,
    paverBrand,
    paverType,
    pattern,
    totalLF,
    borderBrand,
    borderType,
    borderSize,
    borderCourse
  } = shopCart
  // Change string to number and sort it so smaller size will be array[0] and l;arger size array[1]
  const borderDimentions = borderSize
    .toLowerCase()
    .split('x')
    .map(item => parseInt(item))
    .sort()
  // get the border multiplier
  const borderMultiplier =
    borderCourse === 'Soldier'
      ? borderDimentions[1] / 12
      : borderDimentions[0] / 12
  // get LF and multiply by border size to get the sqf
  const borderSQF = totalLF * borderMultiplier
  // get SQF of pavers without borders
  const paversWithoutBorders = totalSQF - borderSQF
  // get quantities on pattern and get sizes need
  for (const item of pattern.quantities) {
    console.log(item)
    const currentSize = paverType.sizes.find(data => data.size === item.size)
    toOrder[item.size] = `${((paversWithoutBorders * item.percentage) / currentSize.sqfPerPallet).toFixed(2)} Pallet(s)`
  }

  const borderInfo = paverType.sizes.find(data => data.size === borderSize)
  toOrder[borderSize] = `${(borderSQF/borderInfo.sqfPerPallet).toFixed(2)} Pallets(s)`

  console.log(toOrder)
  
  // TODO: Need to put info together and print it
}

/// /////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////
document
  .querySelector('#patternSelector')
  .addEventListener('change', onPatternSelected)

document
  .querySelector('#brandSelector')
  .addEventListener('change', onBrandChange)

document
  .querySelector('#borderBrand')
  .addEventListener('change', onBorderBrandChange)

document
  .querySelector('#typeSelector')
  .addEventListener('change', onTypeSelected)

document
  .querySelector('#bordeType')
  .addEventListener('change', onBorderTypeSelected)

document
  .querySelector('#borderSize')
  .addEventListener('change', onBorederSizeSelected)

document
  .querySelector('#borderCourse')
  .addEventListener('change', onBorderCourseSelected)

document.querySelector('#totalSqf').addEventListener('change', onSQFChanged)

document.querySelector('#borderLF').addEventListener('change', onLFChanged)

document.querySelector('#calButton').addEventListener('click', calculate)

//
// NOTES
// const paverSize = paverType.sizes.find(item => item.size === e.target.value)

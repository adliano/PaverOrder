// const CALSTONE_URL = 'data/calstone.json'
// const BELGARD_URL = 'data/belgard.json'

let currentPavers, paverType, currentBorder, borderType
let shopCart = {}
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
      fetchPaverData('data/basalite.json')
      break
  }
  validateForm()
}
/*************************************/
/** **** onBorderBrandChange() *******/
/*************************************/
function onBorderBrandChange (e) {
  // Disable Select option
  e.target.children[0].disabled = true
  // Add to shopCart
  shopCart.borderBrand = event.target.value

  switch (event.target.value.toLowerCase()) {
    case 'belgard':
      fetchBorderData('data/belgard.json')
      break
    case 'calstone':
      fetchBorderData('data/calstone.json')
      break
    default:
      fetchBorderData('data/basalite.json')

      break
  }
  validateForm()
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
  shopCart.paverType = paverType
  //
  loadPatterns(paverType)
  validateForm()
}
/*************************************/
/** **** onBorderTypeSelected() ******/
/*************************************/
function onBorderTypeSelected (e) {
  // Disable Select option
  e.target.children[0].disabled = true
  shopCart.borderType = currentBorder.pavers.find(
    item => item.name.toLowerCase() === event.target.value.toLowerCase()
  )

  renderBorderSizes(shopCart.borderType)

  validateForm()
}
/*************************************/
/** ******* loadPatterns() ***********/
/*************************************/
function loadPatterns ({ patterns }) {
  if (patterns) {
    let options = patterns.map(item => {
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

  const tempPattern = paverType.patterns.find(
    item => item.name === e.target.value
  )

  shopCart.pattern = tempPattern

  const paverSize = paverType.sizes.find(
    item => item.size === tempPattern.quantities[0].size
  )
  renderColors(paverSize)
  validateForm()
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
  document.querySelector('#borderSize').innerHTML = borderSizes
}
/*************************************/
/** **** onBorederSizeSelected() *****/
/*************************************/
const onBorederSizeSelected = e => {
  e.target.children[0].disabled = true
  shopCart.borderSize = e.target.value
  validateForm()
}
/*************************************/
/** *** onBorderCourseSelected() *****/
/*************************************/
const onBorderCourseSelected = e => {
  e.target.children[0].disabled = true
  shopCart.borderCourse = e.target.value
  validateForm()
}
/*************************************/
/** ******** onSQFChanged() **********/
/*************************************/
const onSQFChanged = e => {
  shopCart.totalSQF = e.target.value
  validateForm()
}
/*************************************/
/** ******** onLFChanged() **********/
/*************************************/
const onLFChanged = e => {
  shopCart.totalLF = e.target.value
  validateForm()
}
/*************************************/
/**
 * @method openModal()
 * @param {Object} data
 * This method will display the results
 */
/*************************************/
const openModal = data => {
  // notToPrint
  document.querySelector('.notToPrint').classList.add('invisible')

  const modalBodyElement = document.querySelector('#modalTableBody')

  for (const item of data) {
    const tableRow = `<tr>
    <th scope="row">${item.quantity}</th>
    <td>pallets</td>
    <td>${item.brand}</td>
    <td>${item.type}</td>
    <td>${item.size}</td>
  </tr>`

    modalBodyElement.insertAdjacentHTML('beforeend', tableRow)
  }
}
/*************************************/
/**
 * @method getBorderMultiplier()
 * This method will accept size and course of the border
 * and return the multiplier
 * @param {String} _borderSize
 * @param {String} _borderCourse
 * @returns {Number} multiplier
 */
/*************************************/
const getBorderMultiplier = (_borderSize, _borderCourse) => {
  const _borderDimentions = _borderSize
    .toLowerCase()
    .split('x')
    .map(item => parseInt(item)) // Change string to number
    .sort() // sort it so smaller size will be array[0]
  // return the border multiplier
  return _borderCourse === 'Soldier'
    ? _borderDimentions[1] / 12
    : _borderDimentions[0] / 12
}
/*************************************/
/**
 * @method validateForm()
 * Method used to validate form
 * If Forem not completed Button will be
 * disabled
 */
/*************************************/
const validateForm = () => {
  if (
    shopCart.totalSQF &&
    shopCart.paverBrand &&
    shopCart.paverType &&
    shopCart.pattern &&
    shopCart.totalLF &&
    shopCart.borderBrand &&
    shopCart.borderType &&
    shopCart.borderSize &&
    shopCart.borderCourse
  ) {
    document.querySelector('#calButton').disabled = false
  } else {
    document.querySelector('#calButton').disabled = true
  }
}
/*************************************/
/** ********* calculate() ************/
/*************************************/
const calculate = () => {
  // validateForm()

  let quantityToOrder = []
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

  const borderSQF = totalLF * getBorderMultiplier(borderSize, borderCourse)
  // get SQF of pavers without borders
  const paversWithoutBorders = totalSQF - borderSQF
  // get quantities on pattern and get sizes need
  for (const item of pattern.quantities) {
    const currentSize = paverType.sizes.find(data => data.size === item.size)
    const tempQuantity =
      (paversWithoutBorders * item.percentage) / currentSize.sqfPerPallet
    quantityToOrder.push({
      quantity: tempQuantity.toFixed(1),
      brand: paverBrand,
      type: paverType.name,
      size: item.size
    })
  }
  //
  if (borderType) {
    // console.log(borderType)
    const borderInfo = borderType.sizes.find(data => data.size === borderSize)
    quantityToOrder.push({
      quantity: (borderSQF / borderInfo.sqfPerPallet).toFixed(1),
      brand: borderBrand,
      type: borderType.name,
      size: borderSize
    })
  }
  // Display results
  openModal(quantityToOrder)
}
/*************************************/
/** ***** onModalClosePressed() ******/
/*************************************/
const onModalClosePressed = () => {
  document.querySelector('.notToPrint').classList.remove('invisible')
  document.querySelector('#modalTableBody').innerHTML = ''
}

/// /////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////
document
  .querySelector('#modalCloseButton')
  .addEventListener('click', onModalClosePressed)

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

validateForm()

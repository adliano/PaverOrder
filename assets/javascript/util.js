/**
 * ***********************************
 * @method fetchByBrand()
 * @param {String} brand
 * @param {Function} done
 * ***********************************
 */
// export const fetchByBrand = (brand, done) => {
// export const fetchByBrand = brand => {
//   switch (brand.toLowerCase()) {
//     case 'belgard':
//       return fetch('data/belgard.json')
//       break
//     case 'calstone':
//       return fetch('data/calstone.json')
//       break
//     default:
//       return fetch('data/basalite.json')
//       break
//   }
//   done()
// }
/**
 * ***********************************
 * @method loadTypeOptions()
 * @param {JSON} paverData
 * @param {DOM} domElement
 * ***********************************
 */
export const loadTypeOptions = (paverData, domElement) => {
  if (paverData) {
    const options = paverData.pavers.map((item, index) => {
      return `<option value="${item.name}">${item.name}</option>`
    })
    // Add Select option
    options.unshift('<option>Select...</option>')
    domElement.innerHTML = options
  } else {
    domElement.innerHTML =
      '<option value="select" disabled>Select Brand</option>'
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
    // Change string to number
    .map(item => parseInt(item))
    // sort it so smaller size will be array[0]
    .sort()
  // return the border multiplier
  return _borderCourse === 'Soldier'
    ? _borderDimentions[1] / 12
    : _borderDimentions[0] / 12
}
/**
 * ***********************************
 * @method calculatePavers()
 * @param {JSON} paverObj
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 */
export const calculatePavers = stateObj => {
  const quantityToOrder = []
  const { paver, border } = stateObj
  // Destruct Paver info
  const {
    totalSqf,
    currentPaverBrand: { brand: paverBrand },
    paverType,
    pattern,
    paverColor
  } = paver
  // Destruct Border info
  const {
    totalLF,
    currentBorderBrand: { brand: borderBrand },
    borderType,
    borderSize,
    borderCourse,
    borderColor
  } = border

  const borderSQF =
    parseInt(totalLF) * getBorderMultiplier(borderSize, borderCourse)

  const paversWithoutBorders = totalSqf - borderSQF

  for (const item of pattern.quantities) {
    const currentSize = paverType.sizes.find(data => data.size === item.size)
    const tempQuantity =
      (paversWithoutBorders * item.percentage) / currentSize.sqfPerPallet
    quantityToOrder.push({
      quantity: parseFloat(tempQuantity.toFixed(1)),
      brand: paverBrand,
      type: paverType.name,
      size: item.size,
      color: paverColor
    })
  }

  if (borderType) {
    const borderInfo = borderType.sizes.find(data => data.size === borderSize)
    quantityToOrder.push({
      quantity: parseFloat((borderSQF / borderInfo.sqfPerPallet).toFixed(1)),
      brand: borderBrand,
      type: borderType.name,
      size: borderSize,
      color: borderColor
    })
  }

  return quantityToOrder
}

/**
 * ***********************************
 * @method fetchByBrand()
 * @param {String} brand
 * @param {Function} done
 * ***********************************
 */
export const fetchByBrand = (brand, done) => {
  switch (brand.toLowerCase()) {
    case 'belgard':
      return fetch('data/belgard.json')
      break
    case 'calstone':
      return fetch('data/calstone.json')
      break
    default:
      return fetch('data/basalite.json')
      break
  }
  done()
}

/**
 * ***********************************
 * @method loadTypeOptions()
 * @param {JSON} paverData
 * @param {DOM} domElement
 * ***********************************
 */
export const loadTypeOptions = (paverData, domElement) => {
  let options = paverData.pavers.map((item, index) => {
    return `<option value="${item.name}">${item.name}</option>`
  })
  // Add Select option
  options.unshift('<option>Select...</option>')
  domElement.innerHTML = options
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
/**
 * ***********************************
 * @method calculatePavers()
 * @param {JSON} paverObj
 *  ***********************************
 */
export const calculatePavers = (stateObj) => {
  console.log(stateObj)
  const { totalSQF, } = stateObj.paver
  const { totalLF } = stateObj.border

  // const borderSQF = parseInt(totalLF) * getBorderMultiplier(borderSize, borderCourse) 
  // TODO: get border size and course
}

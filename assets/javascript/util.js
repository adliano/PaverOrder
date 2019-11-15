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

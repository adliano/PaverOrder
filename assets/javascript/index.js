const CALSTONE_URL = 'data/calstone.json'
const BELGARD_URL = 'data/belgard.json'

let currentPavers, paverType

/*************************************/
/** ******* fetchPaverData() **********/
/*************************************/
function fetchPaverData (brandURL) {
  fetch(brandURL)
    .then(results => results.json())
    .then(data => loadTypeOptions(data))
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
/** ******* onBrandChange() ***********/
/*************************************/
function onBrandChange (e) {
  let URL = ''
  switch (event.target.value.toLowerCase()) {
    case 'belgard':
      console.log('Belgard selected')
      URL = 'data/belgard.json'
      break
    case 'calstone':
      console.log('Calstone selected')
      URL = 'data/calstone.json'
      break
    default:
      console.log('Basalite selected')
      break
  }
  fetchPaverData(URL)
}
// Set onChange listener for #brandSelector
document
  .querySelector('#brandSelector')
  .addEventListener('change', onBrandChange)

/*************************************/
/******** onTypeSelected() ***********/
/*************************************/
function onTypeSelected (e) {
  paverType = currentPavers.pavers.find(
    item => item.name.toLowerCase() === event.target.value.toLowerCase()
  )
  console.log(paverType)
}

// Set onChange listener for #typeSelector
document
  .querySelector('#typeSelector')
  .addEventListener('change', onTypeSelected)

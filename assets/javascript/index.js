const CALSTONE_URL = 'data/calstone.json'
const BELGARD_URL = 'data/belgard.json'

// document.querySelector('#typeSelector').innerHTML =
//   '<option value="select">Select...</option><option value="select">Select...</option><option value="select">Select...</option>'

function fetchPaverData (brandURL) {
  fetch(brandURL)
    .then(results => results.json())
    .then(data => loadTypeOptions(data))
}

function loadTypeOptions(paverData){
    let options = paverData.pavers.map((item, index) => {
        return `<option value="${item.name}">${item.name}</option>`
    })
    document.querySelector('#typeSelector').innerHTML = options
}

// typeSelector
function onBrandChange (e) {
  const selectedBrand = event.target.value.toLowerCase()
  let URL = ''

  switch (selectedBrand) {
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

document
  .getElementById('brandSelector')
  .addEventListener('change', onBrandChange)

// console.log(JSON.stringify(patterns))
// console.log(patterns.QS1)

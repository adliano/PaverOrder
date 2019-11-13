let tempState = {}

/*************************************/
/** ******* fetchPaverData() **********/
/*************************************/
const fetchPaverData = (brandURL) => {
  fetch(brandURL)
    .then(results => results.json())
    .then(data => console.log(data))
    // .then(data => loadTypeOptions(data))
}

/*************************************/
/** ******* onBrandChange() **********/
/*************************************/
export const onPaverBrandChange = (e) => {
  // Disable Select option
  e.target.children[0].disabled = true
  // Add to shopCart
  // tempState.paverBrand = event.target.value
  switch (event.target.value.toLowerCase()) {
    case 'belgard':
      fetchPaverData('data/belgard.json')
      console.log('belgard')
      break
    case 'calstone':
      fetchPaverData('data/calstone.json')
      console.log('calstone')
      break
    default:
      fetchPaverData('data/basalite.json')
      console.log('basalite')
      break
  }
  // validateForm()
}


/*************************************/
/** ****** loadTypeOptions() **********/
/*************************************/
export const loadTypeOptions = (paverData) => {
    // currentPavers = paverData
    let options = paverData.pavers.map((item, index) => {
      return `<option value="${item.name}">${item.name}</option>`
    })
    // Add Select option
    options.unshift('<option>Select...</option>')
    document.querySelector('#typeSelector').innerHTML = options
  }


  export const say = (name) => console.log(`My Name is ${name}`)
  

const _say = (input) => {
    //alert(`Hi ${input}`)
}

const _onBrandChange = e => {
    console.log('called from onBrandChange')
}

/*************************************/
/** ****** loadTypeOptions() **********/
/*************************************/
const _loadTypeOptions = (paverData) => {
    // currentPavers = paverData
    let options = paverData.pavers.map((item, index) => {
      return `<option value="${item.name}">${item.name}</option>`
    })
    // Add Select option
    options.unshift('<option>Select...</option>')
    document.querySelector('#typeSelector').innerHTML = options
  }

export default {
    say: _say,
    onBrandChange: _onBrandChange,
    renderType: _loadTypeOptions
}
//   say: input => alert(`Hi ${input}`),

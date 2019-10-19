
const CALSTONE_URL = 'data/calstone.json'

document.getElementById('brandSelector').addEventListener('change', loadData)
//  (event => {
//     console.log(event.target.value);
// }))

function loadData (e) {
    console.log(event.target.value);
    // Fetch data by brand

}

fetch(CALSTONE_URL)
.then(results => results.json())
.then(data => {
    const objKeys = Object.keys(data)
    console.log(data)
    console.log(objKeys)
    
})

// console.log(JSON.stringify(patterns))
// console.log(patterns.QS1)



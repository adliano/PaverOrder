console.log('called');

// console.log(calstone)

fetch('data/Calstone/calstone.json')
.then(results => results.json())
.then(data => {
    const objKeys = Object.keys(data)
    console.log(data)
    console.log(objKeys)
    
})
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

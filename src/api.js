// TODO change to real requests
const getCompanies = async () => {
  // const response = [...companies]
  const response = await fetch('http://195.201.137.206:5000/companies')
  const json = await response.json()

  return json._items.reduce((acc, company) => ({ ...acc, [company._id]: { ...company } }), {})
  // return response.reduce((acc, company) => ({ ...acc, [company.company_id]: { ...company } }), {})
}

const getProducts = async () => {
  // const response = [...products]
  const response = await fetch('http://195.201.137.206:5000/products')
  const json = await response.json()

  return json._items.reduce((acc, product) => ({ ...acc, [product._id]: { ...product } }), {})
}

const getCountries = async () => {
  // const response = [...countries]
  const response = await fetch('http://195.201.137.206:5000/countries')
  const json = await response.json()

  return json._items.reduce((acc, country) => ({ ...acc, [country._id]: { ...country } }), {})
}

const getRules = async () => {
  // const response = [...rules]
  const response = await fetch('http://195.201.137.206:5000/rules')
  const json = await response.json()

  return json._items
}

export { getProducts, getRules, getCompanies, getCountries }

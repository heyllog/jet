const getCompanies = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}companies`)
  const json = await response.json()

  return json._items.reduce((acc, company) => ({ ...acc, [company._id]: { ...company } }), {})
}

const getProducts = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}products`)
  const json = await response.json()

  return json._items.reduce((acc, product) => ({ ...acc, [product._id]: { ...product } }), {})
}

const getCountries = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}countries`)
  const json = await response.json()

  return json._items.reduce((acc, country) => ({ ...acc, [country._id]: { ...country } }), {})
}

const getRules = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}rules`)
  const json = await response.json()

  return json._items
}

// { country_id, product_id, company_id, permission }
const postRule = async (ruleInfo) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}rules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(ruleInfo),
  })

  return response.ok
}

export { getProducts, getRules, getCompanies, getCountries, postRule }

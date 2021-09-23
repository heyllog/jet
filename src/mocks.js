const companies = [
  {
    company_id: 1,
    full_name: 'Google Inc.',
    short_name: 'Google',
  },
  {
    company_id: 2,
    full_name: 'Home Box Office',
    short_name: 'HBO',
  },
]

const countries = [
  {
    country_id: 1,
    country: 'Worldwide',
  },
  {
    country_id: 2,
    country: 'Soviet Union',
  },
]

const products = [
  {
    product_id: 1,
    name: 'CLion',
  },
  {
    product_id: 2,
    name: 'PyCharm',
  },
]

const rules = [
  {
    rule_id: 1,
    country_id: 2,
    product_id: 2,
    company_id: 2,
    permission: 'excluded',
  },
  {
    rule_id: 2,
    country_id: 2,
    product_id: 1,
    company_id: 1,
    permission: 'need approval',
  },
  {
    rule_id: 3,
    country_id: 2,
    product_id: 1,
    company_id: 1,
    permission: 'available',
  },
]

export { companies, products, rules, countries }

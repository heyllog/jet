import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import styled from '@emotion/styled'
import { Box, Button, TextField, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material'

import RulesTable from '../components/RulesTable'
import Modal from '../components/Modal'
import { getRules, getCountries, getProducts, getCompanies, postRule } from '../api'

const Logo = styled.img`
  margin-left: auto;
`

const Home = () => {
  const [searchString, setSearchString] = useState('')
  const [filteredRules, setFilteredRules] = useState([])
  const [isRulesModalOpened, setIsRulesModalOpened] = useState(false)

  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')
  const [selectedPermission, setSelectedPermission] = useState('')

  const rulesQuery = useQuery('rules', getRules)
  const countriesQuery = useQuery('countries', getCountries)
  const productsQuery = useQuery('products', getProducts)
  const companiesQuery = useQuery('companies', getCompanies)

  useEffect(() => {
    if (rulesQuery.isSuccess && companiesQuery.isSuccess) {
      const acceptedCompanies = []

      Object.values(companiesQuery.data).forEach((company) => {
        if (company.short_name.toLowerCase().includes(searchString.toLowerCase())) {
          acceptedCompanies.push(company._id)
        }
      })

      setFilteredRules(rulesQuery.data.filter((rule) => acceptedCompanies.includes(rule.company_id)))
    }
  }, [searchString, rulesQuery.data, companiesQuery.data, rulesQuery.isSuccess, companiesQuery.isSuccess])

  if (!rulesQuery.isSuccess || !companiesQuery.isSuccess || !countriesQuery.isSuccess || !productsQuery.isSuccess) {
    return null
  }

  const createRule = async () => {
    const status = await postRule({
      country_id: selectedCountry,
      product_id: selectedProduct,
      company_id: selectedCompany,
      permission: selectedPermission,
    })

    if (status) {
      setIsRulesModalOpened(false)
    }
  }

  return (
    <>
      <Box display='flex' marginBottom={2} alignItems='center'>
        <TextField
          value={searchString}
          onChange={({ target }) => setSearchString(target.value)}
          label='Search'
          variant='outlined'
        />

        <Logo src='/logo.jpg' alt='Logo' height='70px' />
      </Box>

      <Stack spacing={2} direction='row' marginBottom={2}>
        <Button variant='contained' onClick={() => setIsRulesModalOpened(true)}>
          Create Rule
        </Button>
        {/*<Button variant='contained'>Create Product</Button>*/}
        {/*<Button variant='contained'>Create Company</Button>*/}
      </Stack>

      <RulesTable
        filteredRules={filteredRules}
        companies={companiesQuery.data}
        countries={countriesQuery.data}
        products={productsQuery.data}
      />

      {isRulesModalOpened && (
        <Modal title='Create new rule' closeModal={() => setIsRulesModalOpened(false)}>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                value={selectedCountry}
                label='Country'
                onChange={({ target }) => setSelectedCountry(target.value)}
                fullWidth
              >
                {Object.values(countriesQuery.data).map((country) => (
                  <MenuItem key={country._id} value={country._id}>
                    {country.country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Product</InputLabel>
              <Select
                value={selectedProduct}
                label='Product'
                onChange={({ target }) => setSelectedProduct(target.value)}
                fullWidth
              >
                {Object.values(productsQuery.data).map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Company</InputLabel>
              <Select
                value={selectedCompany}
                label='Company'
                onChange={({ target }) => setSelectedCompany(target.value)}
                fullWidth
              >
                {Object.values(companiesQuery.data).map((company) => (
                  <MenuItem key={company._id} value={company._id}>
                    {company.short_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Permission</InputLabel>
              <Select
                value={selectedPermission}
                label='Permission'
                onChange={({ target }) => setSelectedPermission(target.value)}
                fullWidth
              >
                <MenuItem value='exclude'>Exclude</MenuItem>
                <MenuItem value='need approval'>Need approval</MenuItem>
                <MenuItem value='allowed'>Allowed</MenuItem>
              </Select>
            </FormControl>

            <Button onClick={createRule} variant='contained'>
              Create
            </Button>
          </Stack>
        </Modal>
      )}
    </>
  )
}

export default Home

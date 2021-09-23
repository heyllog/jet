import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import styled from '@emotion/styled'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  Box,
  TextField,
} from '@mui/material'

import { getRules, getCountries, getProducts, getCompanies } from '../api'

const PermissionText = styled.p`
  margin: 0;
  color: ${({ type }) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'need approval':
        return 'orange'
      case 'exclude':
        return 'red'
      case 'allowed':
        return 'green'
    }
  }};
`

const Logo = styled.img`
  margin-left: auto;
`

const Home = () => {
  const [searchString, setSearchString] = useState('')
  const [filteredRules, setFilteredRules] = useState([])

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
    return <Alert severity='error'>Loading or Error</Alert>
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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Countries</TableCell>
              <TableCell align='center'>Product</TableCell>
              <TableCell align='center'>Company</TableCell>
              <TableCell align='center'>Permission</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRules.map((row) => (
              <TableRow key={row._id}>
                <TableCell align='center'>{countriesQuery.data?.[row.country_id]?.country}</TableCell>
                <TableCell align='center'>{productsQuery.data?.[row.product_id]?.name}</TableCell>
                <TableCell align='center'>{companiesQuery.data?.[row.company_id]?.short_name}</TableCell>
                <TableCell align='center'>
                  <PermissionText type={row.permission}>{row.permission}</PermissionText>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Home

import React from 'react'
import styled from '@emotion/styled'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

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

const RulesTable = ({ filteredRules, countries, products, companies }) => {
  return (
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
              <TableCell align='center'>{countries?.[row.country_id]?.country}</TableCell>
              <TableCell align='center'>{products?.[row.product_id]?.name}</TableCell>
              <TableCell align='center'>{companies?.[row.company_id]?.short_name}</TableCell>
              <TableCell align='center'>
                <PermissionText type={row.permission}>{row.permission}</PermissionText>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RulesTable

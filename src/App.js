import { Box, Container } from '@mui/material'
import { useRoutes } from 'react-router-dom'

import Home from './pages/Home'

const App = () => {
  let element = useRoutes([{ path: '/', element: <Home /> }])

  return (
    <Box paddingY={2}>
      <Container>{element}</Container>
    </Box>
  )
}

export default App

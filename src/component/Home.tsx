import { Box, Container } from '@mui/material'
import Navbar from './Navbar'

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
          <Navbar />
          <Home />
      </Box>
    </Container>
  )
}                                                 

export default Home
import { Box, Container } from '@mui/material'
import Navbar from './Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Box sx={{ my: 4 }}>
          <div>Dashboard Page</div>
        </Box>
      </Container>
    </>
  )
}

export default Home
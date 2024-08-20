import { Box, Container } from '@mui/material'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Box sx={{ width: 1, my: 6 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  )
}
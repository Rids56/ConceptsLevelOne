import { Box, Container } from '@mui/material'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom';
// import BottomBar from './BottomBar';

export const Home = () => {
  return (
    <>
      <Box 
      // sx={{
      //   display: 'flex',
      //   flexDirection: 'column',
      //   height: 'calc(100vh - 2vh);',
      // }}
      >
        <Navbar />
        <Container maxWidth="xl"
         sx={{
          // flexGrow: 1,
          // overflowY: 'auto',
          my: 4,
          py: 2,
          // display: 'flex',
          // flexDirection: 'column',
        }}
        >
          <Outlet />
        </Container >
        {/* <BottomBar /> */}
      </Box>
    </>
  )
}
import { Box, Container, Grid, styled } from '@mui/material'
import Navbar from './Navbar'

const Home = () => {

  const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
  }));

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Box sx={{ my: 6, width: '100%' }} >
          {/* <Grid container spacing={3}>
            <Grid xs>
              <Item>xs</Item>
            </Grid>
            <Grid xs={6}>
              <Item>xs=6</Item>
            </Grid>
            <Grid xs>
              <Item>xs</Item>
            </Grid>
          </Grid> */}

          <Grid container spacing={3}>
            <Grid xs>
              <Item>xs</Item>
            </Grid>           
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default Home
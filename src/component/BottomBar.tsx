import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import FoundationIcon from '@mui/icons-material/Foundation';
import Pagination from './UseReactTable/TablePgination';
import { useAppSelector } from '../redux/hooks';
import { round } from 'lodash';

const BottomBar = () => {
  const { limit, total, skip } = useAppSelector((state) => state.client);

  return (
    <>
      <Box >
        <AppBar position="static" sx={{ bgcolor: '#c6c6c6', mx: 2, }} >
          <Toolbar disableGutters>
            {/* <FoundationIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            {/* <Typography
              variant="h6"
              noWrap
              component="a"
              href="/dashboard"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CoreSteps
            </Typography> */}

            <Box sx={{ ml: 'auto' }} component="section">
              <Pagination
                limit={limit}
                total={total}
                page={round(total / limit)}
                skip={skip}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default BottomBar;
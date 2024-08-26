import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import Typography from '@mui/material/Typography';
// import FoundationIcon from '@mui/icons-material/Foundation';
import Pagination from "./UseReactTable/TablePgination";
import { useAppSelector } from "../redux/hooks";
import { round } from "lodash";

const BottomBar = () => {
  const { limit, total, skip } = useAppSelector((state) => state.client);

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 7,
          left: 0,
          right: 0,
          px: 1,
        }}
      >
        <AppBar position="static">
          <Toolbar disableGutters>
            <Box sx={{ ml: "auto" }} component="section">
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
  );
};

export default BottomBar;

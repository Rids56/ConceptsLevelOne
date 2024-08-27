import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FoundationIcon from "@mui/icons-material/Foundation";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logoutUser } from "../redux/Slices/User/userSlice";

const pages = [
  { page: "Home", linkTo: "/dashboard" },
  { page: "Users", linkTo: "/dashboard/users" },
  { page: "Client", linkTo: "/dashboard/clients" },
  { page: "Client-Scroll", linkTo: "/dashboard/clientScroll" },
  { page: "Country", linkTo: "/dashboard/countries" },
  { page: "State", linkTo: "/dashboard/states" },
  { page: "City", linkTo: "/dashboard/cities" },
];
const settings = [
  { setting: "Account", linkTo: "/dashboard" },
  { setting: "Logout", linkTo: "/" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (
    event: React.MouseEvent<HTMLElement>,
    value?: { setting: string; linkTo: string }
  ) => {
    if (value?.linkTo && value?.setting === "Logout") {
      dispatch(logoutUser());
      navigate(value.linkTo);
    } else if (value?.linkTo) {
      navigate(value?.linkTo);
    }
    setAnchorElUser(null);
  };

  return (
    <>
      <Box>
        <AppBar position="static" sx={{ px: 2 }}>
          <Toolbar disableGutters>
            <FoundationIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/dashboard"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CoreSteps
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(({ page, linkTo }) => (
                <Button
                  key={page}
                  onClick={() => navigate(linkTo)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                // onClose={() => handleCloseUserMenu}
              >
                {settings.map(({ setting, linkTo }) => (
                  <MenuItem
                    key={setting}
                    onClick={(event) =>
                      handleCloseUserMenu(event, { setting, linkTo })
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;

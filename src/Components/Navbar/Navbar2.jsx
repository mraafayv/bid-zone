import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

import { styled, alpha } from "@mui/material/styles";
import { LogoutRounded } from "@mui/icons-material";
const pages = [
  {
    page: "Home",
    path: "/",
  },
  {
    page: "Auction",
    path: "/auction",
  },
];

function Navbar2() {
  const auth = getAuth();
  const user = auth.currentUser;
  var { localUser, setLocalUser } = useAuth();

  const navigate = useNavigate();
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("successfully logout");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (user) {
      console.log("run", user.displayName);
    }
  }, [localUser]);
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth={false}>
        <Toolbar>
          {(localUser || !localUser) && (
            <>
              <Box>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: "",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  BidZone
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page, index) => (
                    <MenuItem key={index} onClick={() => navigate(page.path)}>
                      <Typography textAlign="center">{page.page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                BidZone
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page, index) => (
                  <Button
                    key={index}
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={() => navigate(page.path)}
                  >
                    {page.page}
                  </Button>
                ))}
              </Box>
            </>
          )}
                  
         {!localUser && <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            </> }
            
            {localUser && (
            <>
              <Box sx={{ display: { xs: "flex", md: "flex" }, mr: "23px" }}>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={1} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={localUser.photoURL} />
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
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => navigate("/profile")}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar2;

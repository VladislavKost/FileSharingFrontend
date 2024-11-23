import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";

import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { NavList } from "../NavList";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/auth/authCreators";

export const Navigation = () => {
  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.auth.profileData.profile);

  const onHandleProfile = () => {
    navigator("/profile");
    setAnchorElUser(null);
  };

  const onHandleLogout = () => {
    dispatch(logoutUser());
    setAnchorElUser(null);
  };

  const settings = {
    Profile: onHandleProfile,
    Logout: onHandleLogout,
  };

  const [open, setOpen] = useState(false);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    navigator("/login");
  };

  const handleClickLogo = () => {
    navigator("/");
  };

  return (
    <>
      {/* xm screens */}
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          color: "white",
          padding: "0",
          display: { xs: "flex", sm: "none" },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="left"
        sx={{
          display: { xs: "inherit", sm: "none" },
          "& .MuiDrawer-paper": {
            height: "100%",
            width: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button onClick={toggleDrawer(false)}>
            <CloseIcon />
          </Button>
        </Box>
        <NavList />
      </Drawer>

      <Button variant="text" onClick={handleClickLogo} sx={{ color: "white" }}>
        <Typography variant="h6" component="span">
          My App
        </Typography>
      </Button>

      {/* sm and other screens */}
      <NavList
        sx={{
          display: { xs: "none", sm: "inherit" },
        }}
      />
      {isAuth ? (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={userData?.username || ""}
                src={userData?.user_image || ""}
              />
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
            {Object.entries(settings).map(([key, callback]) => (
              <MenuItem key={key} onClick={callback}>
                <Typography sx={{ textAlign: "center" }}>{key}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Login">
            <IconButton onClick={handleLogin} sx={{ p: 0 }}>
              <LoginIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </>
  );
};

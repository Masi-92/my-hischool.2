import { Logout } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Roles, logout } from "../../store/slice/auth.slice";
import style from "./header.module.scss";
import { Logo } from "../logo/logo";
import animation from "./logo.json";
import Lottie from "lottie-react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
import { changeLayout, toggleTheme } from "../../store/slice/layout.slice";

export default function Header({ handleToggleMenu }) {
  const { image, role, fullName } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.layout);
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const [anchorElLang, setAnchorElLang] = React.useState(null);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation("translation", { keyPrefix: "header" });
  const { t: tRole } = useTranslation("translation", {
    keyPrefix: "role",
  });

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={style.header} position="static">
      <Toolbar>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Lottie
  fill="#40C0E7"
  
  animationData={animation}
  style={{ position:"relative", width: "10vw", height: "5vw", marginTop: "-15px", marginLeft: "-20px" }}
/>

        </Typography>
        {/* <AccountCircle/> */}
        <Typography>
          {fullName} - {role}
        </Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar src={image}></Avatar>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

import { DarkMode, Language, LightMode, Logout } from "@mui/icons-material";
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
    handleCloseProfile();
  };

  const handleEditProfile = () => {
    navigate(`/${role}/editProfile`);
    handleCloseProfile();
  };

  const handleMenuProfile = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleMenuLang = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };
  const handleCloseLang = () => {
    setAnchorElLang(null);
  };

  const headerColor = useMemo(() => {
    if (theme === "dark") return "#121212";
    switch (role) {
      case Roles.MANAGER:
        return "Pink";
      case Roles.PARENT:
        return "Orange";
      case Roles.TEACHER:
        return "Blue";
    }
  }, [role,theme]);

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
    handleCloseLang();
    localStorage.setItem("lang", lang);
    switch (lang) {
      case "en":
      case "de":
        dispatch(changeLayout("ltr"));
        break;
      case "fa":
        dispatch(changeLayout("rtl"));
        break;
    }
  };

  const translateRole = (role) => {
    return tRole(role);
  };

  return (
    <AppBar
      className={style.header}
      style={{ backgroundColor: headerColor }}
      position="static"
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleToggleMenu}
        >
          <MenuIcon />
        </IconButton>
        <div variant="h6" component="div" style={{ flexGrow: 1 }}>
          <Lottie
            fill="#40C0E7"
            animationData={animation}
            style={{
              position: "relative",
              width: "60px",
              // height: "5vw",
              // marginTop: "-15px",
              // marginLeft: "-20px",
            }}
          />
        </div>
        {/* <AccountCircle/> */}
        <Typography className={style.username}>
          {fullName} - {translateRole(role)}
        </Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuProfile}
          color="inherit"
        >
          <Avatar src={image}></Avatar>
        </IconButton>
        <IconButton size="large" onClick={handleMenuLang} color="inherit">
          <Language></Language>
        </IconButton>
        <IconButton onClick={() => dispatch(toggleTheme())}>
          {theme === "light" ? <DarkMode></DarkMode> : <LightMode></LightMode>}
        </IconButton>
        <Menu
          anchorEl={anchorElProfile}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElProfile)}
          onClose={handleCloseProfile}
        >
          <MenuItem onClick={handleEditProfile}>{t("profile")}</MenuItem>
          <MenuItem onClick={handleLogout}>{t("logout")}</MenuItem>
        </Menu>

        <Menu
          anchorEl={anchorElLang}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElLang)}
          onClose={handleCloseLang}
        >
          <MenuItem onClick={() => handleChangeLang("en")}>English</MenuItem>
          <MenuItem onClick={() => handleChangeLang("de")}>Deutsch</MenuItem>
          <MenuItem onClick={() => handleChangeLang("fa")}>فارسی</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

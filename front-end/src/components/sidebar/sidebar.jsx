import { useTheme } from "@emotion/react";
import {
  CalendarMonth,
  Chat,
  People,
  Class,
  Event,
  Feed,
  Forum,
  Menu,
  School,
  Sick,
  Draw,
  SchoolTwoTone,
} from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Roles } from "../../store/slice/auth.slice";
import style from "./sidebar.module.scss";
import { Card, useMediaQuery } from "@mui/material";
import { StudentsApi } from "../../api/studentApi";
import { toast } from "react-toastify";
import { AuthApi } from "../../api/authApi";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { SchoolsApi } from "../../api/schoolApi";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Sidebar = ({ open, setOpen }) => {
  const theme = useTheme();
  const role = useSelector((store) => store.auth.role);
  const [myTeacher, setMyTeacher] = useState();
  const [isFreeTeacher, setIsFreeTeacher] = useState(false);
  const [school, setSchool] = useState();
  const desktopSize = useMediaQuery("(min-width:900px)");
  const { t } = useTranslation("translation", { keyPrefix: "sidebar" });

  useEffect(() => {
    if (role === Roles.PARENT) {
      StudentsApi.getMyTeacher()
        .then((res) => {
          setMyTeacher(res.data);
        })
        .catch((err) => toast.error(err));
    } else if (role === Roles.TEACHER) {
      AuthApi.getProfile().then((res) => {
        if (res.data.freeTeacher) {
          setIsFreeTeacher(true);
        } else setIsFreeTeacher(false);
      });
    }
    if (role !== Roles.SUPER_ADMIN)
      SchoolsApi.getMySchool()
        .then((res) => {
          setSchool(res.data);
        })
        .catch((err) => toast.error(err));
  }, []);

  const parentMenus = useMemo(
    () => [
      {
        label: t("newsFeed"),
        link: "/parent/feed",
        icon: <Feed />,
      },
      {
        label: t("forum"),
        link: "/parent/forum",
        icon: <Forum />,
      },
      {
        label: t("calendar"),
        link: "/parent/calendar",
        icon: <CalendarMonth />,
      },
      {
        label: t("teacherPv"),
        link: `/pv/${myTeacher?._id}`,
        icon: <Chat />,
      },
      {
        label: t("sickRest"),
        link: "/parent/sickRest",
        icon: <Sick />,
      },
      {
        label: t("events"),
        link: "/parent/events",
        icon: <Event />,
      },
    ],
    [myTeacher, t]
  );

  const teacherMenus = [
    {
      label: t("newsFeed"),
      link: "/teacher/feed",
      icon: <Feed />,
    },
    {
      label: t("forum"),
      link: "/teacher/forum",
      icon: <Forum />,
    },
    {
      label: t("students"),
      link: "/teacher/students",
      icon: <Forum />,
    },
    {
      label: t("events"),
      link: "/teacher/events",
      icon: <Event />,
    },
    {
      label: t("sickRest"),
      link: "/teacher/sick",
      icon: <Sick />,
    },
  ];

  const managerMenus = [
    {
      label: t("teachers"),
      link: "/manager/teachers",
      icon: <HistoryEduIcon />,
    },
    {
      label: t("classList"),
      link: "/manager/classes",
      icon: <Class />,
    },
    {
      label: t("students"),
      link: "/manager/students",
      icon: <People />,
    },
    {
      label: t("events"),
      link: "/manager/events",
      icon: <Event />,
    },
    {
      label: t("newsFeed"),
      link: "/manager/feed",
      icon: <Feed />,
    },
    {
      label: t("forum"),
      link: "/manager/forum",
      icon: <Forum />,
    },
    {
      label: t("sickRest"),
      link: "/manager/sickRest",
      icon: <Sick />,
    },
  ];

  const superAdminMenus = [
    {
      label: t("schools"),
      link: "/admin/schools",
      icon: <School />,
    },
  ];
  

  const menus = useMemo(() => {
    switch (role) {
      case Roles.SUPER_ADMIN:
        return superAdminMenus;
      case Roles.MANAGER:
        return managerMenus;
      case Roles.TEACHER:
        if (!isFreeTeacher) return teacherMenus;
        else return teacherMenus.slice(0, teacherMenus.length - 1);
      case Roles.PARENT:
        return parentMenus;
    }
  }, [role, parentMenus, isFreeTeacher, t]);

  const handleDrawerToggle = () => {
    setOpen((open) => !open);
  };

  const handleMenuClick = () => {
    if (!desktopSize) setOpen(false);
  };

  const renderSidebarContent = () => {
    return (
      <>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menus.map((menu, index) => (
            <NavLink
              className={style.link}
              style={({ isActive }) => ({
                color: isActive ? "#4db5ff" : "gray",
              })}
              key={menu.link}
              to={menu.link}
              onClick={handleMenuClick}
            >
              <ListItem key={menu} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menu.label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
        {school && (
          <div className={style.school}>
            <span>{school?.name}</span>
            <a href={`tel:${school?.tel}`}>{school?.tel}</a>
          </div>
        )}
      </>
    );
  };

  if (desktopSize)
    return (
      <Drawer variant="permanent" style={{ zIndex: 1 }} open={open}>
        {renderSidebarContent()}
      </Drawer>
    );

  return (
    <div>
      <MuiDrawer
        style={{ zIndex: 1 }}
        anchor="left"
        variant={"temporary"}
        onClose={() => setOpen(false)}
        open={open}
      >
        {renderSidebarContent()}
      </MuiDrawer>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Logo from "../assets/logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT } from "../store/constant";

const styles = {
  sideNav: {
    zIndex: 3,
    margin: "20px 25px",
    position: "absolute",
    right: "0",
    top: "0",
  },
  link: {
    color: "Black",
    textDecoration: "none",
  },
};

const Toggler = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: LOG_OUT });
  }

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      {[""].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon
            onClick={toggleDrawer(anchor, true)}
            style={styles.sideNav}
          ></MenuIcon>
          <Drawer open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div onClick={toggleDrawer(anchor, false)}>
              <div className="logo">
                <img src={Logo} className="img-fluid" alt="Hardcipher logo" />
              </div>
              <Menu
                menuNameAddress="/dashboard"
                menuIcon={<DashboardIcon />}
                menuName="dashboard"
              />
              <Menu
                onClick={logout}
                menuNameAddress={'/'}
                menuIcon={<ExitToAppIcon />}
                menuName="Logout"
              />
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

//////////////////////////////////// *   menu link component start  *//////////////////////////////////////
const Menu = (props) => {
  return (
    <>
      <NavLink onClick={props.onClick} to={props.menuNameAddress} style={styles.link}>
        <List>
          <ListItem button key={props.menuName}>
            <ListItemIcon>{props.menuIcon}</ListItemIcon>
            <ListItemText primary={props.menuName} />
          </ListItem>
        </List>
      </NavLink>
    </>
  );
};
//////////////////////////////////// *   menu link component End  *//////////////////////////////////////

export default Toggler;

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Menuitem from './Menuitem';
import { SWITCH_NAV } from '../../store/constant/index';
import { useLocation } from 'react-router-dom';

function Sidebar(props) {
  const location = useLocation();

  const { isNav } = useSelector(state => state.auth);
  const expand = useSelector(state => state.UserReducer.expand)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!expand) {
      switch (location) {
        case '/viewdonorr':
        case '/donorrevnue':
          dispatch({ type: 'SET_EXPAND', expand: 'Donors' })
          break;
        case '/viewhow':
        case '/addhow':
        case '/viewrevnue':
        case '/how-invitations':
          dispatch({ type: 'SET_EXPAND', expand: 'Holy House' })
          break;
        case '/fullrevennue':
          dispatch({ type: 'SET_EXPAND', expand: 'Revenue Section' })
          break;
        case '/dashboard':
          dispatch({ type: 'SET_EXPAND', expand: 'Dashboard' })
          break;
        default:
          break;
      }
    }
  }, [location])



  const setExpand = (key) => {
    dispatch({ type: 'SET_EXPAND', expand: key })
  }
  const switchNav = () => {
    dispatch({ type: SWITCH_NAV })
  }


  const menuData = [
    { name: "Dashboard", to: "/dashboard", icon: "bi bi-grid menu-icon", subMenu: [] },
    // { name: "Changepassword", to: "/changepassword", icon: "icon-grid menu-icon", subMenu: [] },
    { name: "House of Worship", to: "/#", icon: "bi bi-house-door menu-icon", subMenu: [{ name: "All Houses of Worship", to: "/viewhow" }, { name: "Add Houses of Worship", to: "/addhow" }, { name: "View Revenue", to: "/viewrevnue" }, { name: "Invitations", to: "/how-invitations" }, { name: "Suspended HoW", to: "/how-blocked" }, { name: "Logs", to: "/how-logs" }] },
    { name: "Donors", to: "/#", icon: "bi bi-people menu-icon", subMenu: [{ name: "All Donors", to: "/viewdonor" }, { name: "Donor Revenue", to: "/donorrevnue" }, { name: "Invitations", to: "/donor-invitations" }, { name: "Suspended Donors", to: "/donor-blocked" }, { name: "Logs", to: "/donor-logs" }] },
    { name: "Invitation Logs", to: "/#", icon: "bi bi-share menu-icon", subMenu: [{ name: "Donor to Donor", to: "/dtod-logs" }, { name: "HoW to How", to: "/htoh-logs" }, { name: "HoW to Donor", to: "/htod-logs" }] },
    { name: "Payment Settings", to: "/#", icon: "bi bi-gear menu-icon", subMenu: [{ name: "Yodlee Payment Service", to: "/payment-stripe" }] },
    { name: "Revenue Section", to: "/#", icon: "bi bi-graph-up-arrow menu-icon", subMenu: [{ name: "All Revenue", to: "/fullrevennue" }] },
  ]

  return (
    <div style={{ background: "#3F51B5" }}>
      <nav className={isNav ? "sidebar sidebar-offcanvas active" : 'sidebar sidebar-offcanvas'} id="sidebar">
        <ul className="nav">
          {
            menuData.map((ele, ind) => (
              <div key={ind}>
                <Menuitem
                  switchNav={switchNav}
                  key={ind}
                  data={ele}
                  setExpand={setExpand}
                  expand={expand}
                  subMenu={ele.subMenu}
                  location={props.location}
                />
              </div>
            ))
          }
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar;
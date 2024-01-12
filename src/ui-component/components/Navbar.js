import React, { useState, useEffect } from 'react'
import HolyPennies from '../../assets/images/Logo/HolyPennies-Logo.png';
import holyMini from '../../assets/images/Logo/HolyPennies-Logo.png';
import LoadingBar from 'react-top-loading-bar'
import { useDispatch, useSelector } from 'react-redux';
import { SWITCH_NAV } from '../../store/constant/index';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate  } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import _ from 'lodash';
import { LOG_OUT } from '../../store/constant/index';
import Badge from '@mui/material/Badge';

import ConfirmationModal from '../../container/ConfirmationModal/ConfirmationModal'


export default function Navbar() {
  const [progress, setProgressBar] = useState(50);
  let userData = _.cloneDeep(JSON.parse(localStorage.getItem('user'))) || {};
  const [userObj, setUserObj] = useState(userData);
  const [anchorEl, setAnchorEl] = useState(null)
  const [logoutClick, setLogoutClick] = useState(false)

  const handleClose = () => {
    setAnchorEl(null)
  };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: LOG_OUT });
  }

  const imageLoader = useSelector(state => state.UserReducer.imageLoader)
  const navigate = useNavigate();

  useEffect(() => {
    if (imageLoader) {
      setUserObj('')
    } else {
      setUserObj(_.cloneDeep(JSON.parse(localStorage.getItem('user'))) || {})
    }
  }, [imageLoader])

  setTimeout(() => {
    setProgressBar(100)
  }, 500);

  const dispatch = useDispatch();

  const switchNav = () => {
    dispatch({ type: SWITCH_NAV })
  }
  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={4}
      />
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        {logoutClick ? <ConfirmationModal
          open={true}
          doneClick={logout}
          buttonText="Logout"
          modalTitle={`User Logout`}
          message={`Are you sure you want to logout?`}
          handleClose={() => {
            setLogoutClick(false)
          }} /> : null
        }
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo mr-5" to="/dashboard"><img src={HolyPennies} className="mr-2" alt="logo" /></Link>
          <Link className="navbar-brand brand-logo-mini" to="/dashboard"><img src={holyMini} alt="logo" /></Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        

          <ul className="navbar-nav mr-lg-2">
          <li className="nav-item dropdown show">
              <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="/#" data-toggle="dropdown">
                <Badge color="primary" badgeContent={7}>
                  <NotificationsNoneIcon style={{ fontSize: "30px" }}></NotificationsNoneIcon>
                </Badge>
              </a>
              <div className="dropdown-menu  scrollable-menu dropdown-menu-right navbar-dropdown preview-list" onClick={(e)=>e.stopPropagation()}  aria-labelledby="notificationDropdown">
                <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                <div className="dropdown-item preview-item alert  alert-dismissible show" role="alert">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="ti-info-alt mx-0" />
                    </div>
                  </div>

                  <div className="preview-item-content">
                    <h6 className="preview-subject text-dark ">Application Error</h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      Just now
                    </p>
                  </div>

                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>

                </div>
                <div className="dropdown-item scrollable-menu preview-item alert  alert-dismissible show" role="alert">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="ti-info-alt mx-0" />
                      </div>
                    </div>

                  <div className="preview-item-content">
                    <h6 className="preview-subject text-dark">Application of the </h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      Just now
                    </p>
                  </div>

                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>

                </div>
                <div className="dropdown-item preview-item alert  alert-dismissible show" role="alert">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="ti-info-alt mx-0" />
                    </div>
                  </div>

                  <div className="preview-item-content">
                    <h6 className="preview-subject text-dark">Application Error</h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      Just now
                    </p>
                  </div>

                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>

                </div>

                <div className="dropdown-item preview-item alert  alert-dismissible show" role="alert">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="ti-info-alt mx-0" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject text-dark">Application Error</h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      Just now
                    </p>
                  </div>
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="dropdown-item preview-item alert  alert-dismissible show" role="alert">

                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-warning">
                      <i className="ti-settings mx-0" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject text-dark">Settings</h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      Private message
                    </p>
                  </div>
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div  className="dropdown-item preview-item alert  alert-dismissible show" role="alert">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-info">
                      <i className="ti-user mx-0" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject text-dark">New user registration</h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      2 days ago
                    </p>
                  </div>
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </li>
            <li className="nav-item nav-profile dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" id="profileDropdown">
                {imageLoader ? 'loading' : <img src={`https://holypenniesapi.herokuapp.com/images/${userObj.image}`} alt="profile" />}
              </a>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                <a className="dropdown-item text-dark" onClick={() => { history.push('/payment-stripe') }}>
                  <i className="ti-settings text-primary" />
                  Settings
                </a>
                <a className="dropdown-item text-dark" onClick={() => { history.push('/profile') }}>
                  <i className="bi bi-person text-primary" />
                  Profile
                </a>
                <a className="dropdown-item text-dark" onClick={() => {
                  setLogoutClick(true)
                  handleClose()
                }}>
                  <i className="ti-power-off text-primary" />
                  Logout
                </a>
              </div>
            </li>

          </ul>
          <button onClick={switchNav} className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <Menu/>
          </button>
        </div>
      </nav>
    </>
  )
}



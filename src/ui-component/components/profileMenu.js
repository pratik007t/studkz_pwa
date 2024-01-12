import React, { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';

import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOG_OUT } from '../store/constant';
import ConfirmationModal from '../container/ConfirmationModal/ConfirmationModal'

const ProfileMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [logoutClick, setLogoutClick] = useState(false)
    const dispatch = useDispatch();

    const handleMenu = event => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: LOG_OUT });
    }

    const open = Boolean(anchorEl);

    return (
        <>
            <div className="profile-menu quick-add-menu" >
                <div>
                    <IconButton
                        aria-owns={open ? 'menu-appbar' : undefined}
                        color="inherit"
                        aria-haspopup="true"
                        className="icon-button"
                        onClick={handleMenu}
                    >
                        <Tooltip title={"Profile Menu"} placement="bottom" >
                            <i className="icon-ellipsis" />
                        </Tooltip>
                    </IconButton>
                    <Menu
                        id="quick-add-menu"
                        className="profile-menu-dropdown"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem title="Coming Soon" onClick={() => { props.history.push('/profile'); handleClose() }}>
                            Profile
                        </MenuItem>
                        <MenuItem title="Coming Soon" onClick={handleClose}>Support</MenuItem>
                        <MenuItem title="Coming Soon" onClick={handleClose}>FAQ</MenuItem>
                        <MenuItem title="Coming Soon" onClick={() => {
                            setLogoutClick(true)
                            handleClose()
                        }}>Logout</MenuItem>

                    </Menu>
                </div>
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
            </div>
        </>
    )
}
export default withRouter(ProfileMenu);

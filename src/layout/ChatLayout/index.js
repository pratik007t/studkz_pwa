import AuthModal from 'layout/Modal/AuthModal';
import React, { useEffect, useState } from 'react'
import {Outlet, useLocation, useNavigate } from "react-router-dom";
import { staticToken } from "config/firebase";
import { useSelector,useDispatch } from 'react-redux';
import { setStaticToken } from 'store/action/auth.action';
import keymaster from "keymaster";

const ChatLayout = () => {
  const [openAuth, setOpenAuth] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  const handleOpen = () => setOpenAuth(true);
  const handleClose = () => setOpenAuth(false);
  
  useEffect(() => {
    if (!user?.token && user?.token !== staticToken) {
      setStaticTokenData();
    } 
    if (user?.token === staticToken && location?.pathname !== "/logout") {
      handleOpen();
    }
    if (location?.pathname === "/logout") {
      navigate("/login");
    }

  // eslint-disable-next-line
  }, [user, location?.pathname]);

  const setStaticTokenData = async () => {
    await dispatch(setStaticToken(staticToken));
  };

  const openChatPage = () => {
    navigate("/chat");
  };
  useEffect(() => {
    // Hook F2 key globally to open the dialog
    keymaster("esc", openChatPage);
    return () => {
      keymaster.unbind("esc");
    };
  }, []);

  return (
    <div> 
    <Outlet />
    <AuthModal
    open={openAuth}
    onClose={handleClose}
    onButton={handleClose}
  />
    </div>
  )
}
export default ChatLayout
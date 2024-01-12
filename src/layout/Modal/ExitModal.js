import React, {  useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LogoutIcon from "@mui/icons-material/Logout";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "store/action/auth.action";
import firebase from "firebase/compat/app";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Exit = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.auth.socket_data);

  const handleExit = () => {

    if (socket) {
      socket.disconnect();
      socket.on("disconnect", () => {
        console.log("Disconnected");
      });
    }
    localStorage.removeItem("deviceToken")
    localStorage.clear();
    dispatch(Logout());
    navigate("/login");
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{ sx: { borderRadius: 0 } }}
      >
        <DialogTitle>
          <h3>{t("exit.exitMsg")}</h3>
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            endIcon={<LogoutIcon />}
            onClick={handleExit}
          >
            {t("exit.yesButton")}
          </Button>
          <Button
            variant="contained"
            endIcon={<CancelPresentationIcon />}
            onClick={props.onClose}
          >
            {t("exit.noButton")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Exit;

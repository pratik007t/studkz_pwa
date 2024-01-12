import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const NoteSavedModal = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSaved = () => {
    dispatch({
      type: "NOTE_BOOLEAN",
      payload: true,
    });
    props.onClose(); // Close the dialog
    navigate(-1); // Navigate
  };

  const handleCloseEvent = () => {
    props.onClose(); // Close the dialog
    navigate(-1); // Navigate
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 0,
          width: "60%",
          maxWidth: "none",
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">
        <h3>{t("notes.save_note_changes")}</h3>
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleCloseEvent}>{t("notes.no_note")}</Button>
        <Button onClick={handleSaved}>{t("notes.yes_note")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteSavedModal;

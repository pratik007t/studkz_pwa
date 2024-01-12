import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { NoteList, deleteNote } from "store/action/note.action";
import { useDispatch, useSelector } from "react-redux";

const NoteModal = (props) => {
  const { t } = useTranslation();
  const allNotesList = useSelector((state) => state.NoteReducer.delete);
  const dispatch = useDispatch();

  //==============================notes================================================
  const handleNoteDelete = async () => {
    for (const element of allNotesList) {
      const response = await dispatch(deleteNote(element));
      if (response) {
        dispatch({
          type: "DELETE_NOTE_ID",
          payload: [],
        });
      }
    }
    const res = await dispatch(NoteList());
    if (res) {
      props.onClose();
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { borderRadius: 0 } }}
      >
        <DialogTitle id="alert-dialog-title">
          <h3>{t("notes.delete_note_alert")}</h3>
        </DialogTitle>
        <DialogActions>
          <Button onClick={props.onClose}>{t("notes.no_note")}</Button>
          <Button onClick={handleNoteDelete}>{t("notes.yes_note")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default NoteModal;

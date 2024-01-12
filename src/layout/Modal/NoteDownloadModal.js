import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { downloadNote } from "store/action/note.action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const NoteDownloadModal = (props) => {
  const { t } = useTranslation();
  const allNotesList = useSelector((state) => state.NoteReducer.delete);
  const dispatch = useDispatch();

  //==============================notes================================================
  const downloadNotes = async () => {
    // for (const element of allNotesList) {
    //   const response = await dispatch(downloadNote(element));
    //   if (response.status === "msg") {
    //     toast.error(response.msg, {
    //       autoClose: 50,
    //       hideProgressBar: true,
    //       theme: "colored",
    //     });
    //   } else if (response.status === "silent") {
    //     alert("hey")
    //     window.open(response.link, "_blank");
    //   }
    // }
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
          <h3>{t("notes.download_note_alert")}</h3>
        </DialogTitle>
        <DialogActions>
          <Button onClick={props.onClose}>{t("notes.no_note")}</Button>
          <Button onClick={downloadNotes}>{t("notes.yes_note")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default NoteDownloadModal;

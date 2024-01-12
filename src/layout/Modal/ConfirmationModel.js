import * as React  from "react";
import { useEffect } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {useDispatch, useSelector } from "react-redux";

export default function ConfirmModal(props) {
  const dispatch = useDispatch();

  
  useEffect(() => {
   
    // eslint-disable-next-line
  }, [])
  
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              borderRadius: "0",
              width: "500px",
              boxShadow: "none",
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">User ID : {chat.receiverID}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

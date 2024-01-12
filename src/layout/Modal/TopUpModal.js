import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const TopUpModal = (props) => {
  const BinaryData = useSelector((state) => state.SearchReducer.binaryFile);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const id = useParams();

  const handleTopUpClick = () => {
    navigate(`/balance/list/${id?.gId}`);
    props.onClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              borderRadius: "0",
            },
          },
        }}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="#000">
            {BinaryData?.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}> {BinaryData.title_cancel}</Button>
          <Button onClick={handleTopUpClick}>{BinaryData.title_topup}</Button>
          {BinaryData && BinaryData.url_kaspi ? (
            <Button onClick={() => window.open(BinaryData.url_kaspi, '_blank')}>{BinaryData.title_kaspi}</Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default TopUpModal;

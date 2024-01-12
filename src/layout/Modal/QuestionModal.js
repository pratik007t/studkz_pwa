import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { BinaryFile } from 'store/action/chat.action';
import { useParams } from 'react-router-dom';
import DownloadModal from './DownloadModal';
import { useState } from 'react';

const QuestionModal = (props) => {
  const BinaryData = useSelector((state) => state.SearchReducer.binaryFileInfo);
  const { t } = useTranslation();
  const id = useParams()
  const dispatch = useDispatch()
  const [downloadModal,setDownloadModal] = useState(false)
  const [isShow,setIsShow] = useState(true)


  const handleQuestion = async()=>{
    setIsShow(false)
    const data = await dispatch(BinaryFile(id?.gId))
    setIsShow(true)
    if(data.status === "ok") {
      setDownloadModal(true)
    }
    props.onClose()
  }
  const handleClose = () => {
    setDownloadModal(false);
  };
  return (
    <div>
    <DownloadModal
    open={downloadModal}
    onClose={handleClose}
    // onButton={handleClose}
  />
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
          {BinaryData?.question}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button  onClick={props.onClose} autoFocus>
         {BinaryData.title_cancel}
          </Button>
          {isShow && 
            <Button onClick={handleQuestion}>{BinaryData.title_ok}</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default QuestionModal;
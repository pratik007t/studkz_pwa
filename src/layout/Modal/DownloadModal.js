import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Stack, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RWebShare } from "react-web-share";

const DownloadModal = (props) => {
  const BinaryData = useSelector((state) => state.SearchReducer.binaryFile);

  const handlePdfDownload = () => {
    const pdfLink = BinaryData?.linkPDF;
    // Download the PDF using the provided link
    if (pdfLink) {
      // Add your logic to download the PDF
      // For example: window.open(pdfLink, '_blank');
      const link = document.createElement("a");
      link.href = pdfLink;
      link.download = "studkz.pdf";
      link.click();
    }
    props.onClose();
  };

  const handleWordDownload = () => {
    const wordLink = BinaryData?.link;
    // Download the Word document using the provided link
    if (wordLink) {
      const link = document.createElement("a");
      link.href = wordLink;
      link.download = "studkz.doc";
      link.click();
      // Add your logic to download the Word document
      // For example: window.open(wordLink, '_blank');
    }
    props.onClose();
  };

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
              borderRadius: "20px",
            },
          },
        }}
      >
        <DialogContent>
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="outlined"
              startIcon={<CloudDownloadIcon />}
              sx={{ width: "200px", padding: "8px" }}
              // onClick={props.onPdfDownload}
              onClick={handleWordDownload}
            >
              Word
            </Button>
            <RWebShare
              data={{
                url: BinaryData?.link,
              }}
            >
              <Button
                sx={{ justifyContent: "end" }}
                variant="outlined"
                startIcon={<ReplyAllIcon />}
                // onClick={props.onClose}
              ></Button>
            </RWebShare>
          </Stack>
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="outlined"
              startIcon={<CloudDownloadIcon />}
              sx={{ width: "200px", padding: "8px" }}
              // onClick={props.onPdfDownload}
              onClick={handlePdfDownload}
            >
              PDF
            </Button>
            <RWebShare
              data={{
                url: BinaryData?.linkPDF,
              }}
            >
              <Button
                sx={{ justifyContent: "end" }}
                variant="outlined"
                startIcon={<ReplyAllIcon />}
                // onClick={props.onClose}
              ></Button>
            </RWebShare>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", marginBottom: "20px" }}>
          <Button
            variant="outlined"
            sx={{ width: "120px", color: "#000000" }}
            onClick={props.onClose}
          >
            <b>OK</b>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DownloadModal;

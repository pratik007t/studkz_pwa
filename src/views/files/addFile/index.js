import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { fileList, UploadFile, UploadURL } from "store/action/file.action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const theme = createTheme();
const MAX_COUNT = 100;

const ListItems = styled(Typography)({
  textAlign: "center",
  fontSize: "1.5vh",
});

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", padding: "10px" }}>
        <LinearProgress
          variant="determinate"
          value={Math.round((100 / props.totalFiles) * props.uploadedFile)}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2">
          {props.uploadedFile} / {props.totalFiles}
        </Typography>
      </Box>
    </Box>
  );
}

const AddFile = () => {
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
// eslint-disable-next-line
  const [fileLimit, setFileLimit] = useState(false);
  const [totalFiles, setTotalFiles] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(0);
  const FileList = useSelector((state) => state.FileReducer.file);

  useEffect(() => {
    dispatch(fileList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (uploadedFiles) {
        setTotalFiles(uploadedFiles.length);
        let i = 0;
        for (const fileData of uploadedFiles) {
          const obj = {
            fileName: fileData.name,
            fileSize: fileData.size,
          };
          setIsLoading(true);
          const data = await dispatch(UploadURL(obj));
          if (data) {
            dispatch(UploadFile(data.uploadURL, fileData));
            i++;
            setUploadedFile(i);
            dispatch(fileList());
            setUploadedFiles("");
            setTimeout(() => {
              setIsLoading(false);
              setUploadedFile("");
            }, 4000);
          }
        }
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles]);

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
      if (uploaded.length === MAX_COUNT) setFileLimit(true);
      if (uploaded.length > MAX_COUNT) {
        toast.warning(`You can add maximum ${MAX_COUNT} files`);
        setFileLimit(false);
        limitExceeded = true;
        return true;
      }
      //no-unused-vars array-callback-return
      // If none of the conditions are met, return false
      return false;
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent = async (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        color="#000000"
        component="div"
        textAlign="center"
      >
        {FileList.lang_caption}
      </Typography>
      <Typography
        variant="h4"
        style={{ textAlign: "center" }}
        component="h3"
        mt={2}
      >
        {FileList.lang_rules}
      </Typography>

      <Grid
        item
        mt={1}
        xs={12}
        sx={{
          bgcolor: "#FFDCA0",
          lineHeight: "1.75",
          borderRadius: "20px",
          padding: "0.1px 10px 1px 0px",
          color: "#000000",
          fontSize: "16px",
        }}
      >
        <ul>
          {FileList?.info?.split("\n").map((i, index) => {
            return <li key={index}>{i}</li>;
          })}
        </ul>
      </Grid>

      <ListItems
        mt={2}
        variant="h4"
        component="h3"
        style={{ fontSize: "16px" }}
      >
        {FileList.lang_myFilesProcessing}
      </ListItems>
      <ListItems
        mt={1}
        variant="h4"
        component="h3"
        style={{ fontSize: "16px" }}
      >
        {FileList.lang_myFilesRestricted}
      </ListItems>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box>
            {isLoading ? (
              <Box>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullWidth
                  // maxWidth="sm"
                  sx={{
                    "& .MuiDialog-container": {
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  }}
                  PaperProps={{
                    sx: {
                      // m: 0,
                      // top: 120,
                      transform: "translate(0px,150px)",
                    },
                  }}
                >
                  <DialogContent>
                    <LinearProgressWithLabel
                      value={50}
                      totalFiles={totalFiles ? totalFiles : 0}
                      uploadedFile={uploadedFile ? uploadedFile : 0}
                    />
                  </DialogContent>
                </Dialog>
              </Box>
            ) : (
              <Button
                onClick={handleClickOpen}
                style={{
                  borderRadius: 20,
                  backgroundColor: "#7dbf41",
                  padding: "12px 1px 12px 12px",
                  textTransform: "none",
                }}
                fullWidth
                variant="contained"
                component="label"
                sx={{ mt: 3, mb: 2 }}
              >
                {FileList.lang_btn_upload}
                <input
                  id="fileUpload"
                  type="file"
                  accept=".doc, .docx, .ppt, .pptx"
                  multiple
                  hidden
                  onChange={(e) => {
                    handleFileEvent(e);
                  }}
                />
              </Button>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default AddFile;

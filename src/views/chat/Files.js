import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import {
  ChatUploadFile,
  ChatUploadURL,
  conversationList,
} from "store/action/chat.action";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import imageCompression from "browser-image-compression";

const MAX_COUNT = 100;

export default function Files(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // eslint-disable-next-line
  const [fileLimit, setFileLimit] = useState(false);
  const socket = useSelector((state) => state.auth.socket_data);
  const { id } = useParams();
  const chatTitle = useSelector((state) => state.ChatReducer.conversation);
  const [isClicked, setIsClicked] = useState(false);
  // eslint-disable-next-line
  const [isAudioVisible, setIsAudioVisible] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const userId = localStorage.getItem("userId")
    ? localStorage.getItem("userId")
    : null;

  useEffect(() => {
    if (props.open) {
      setIsOpen(true);
    }
  }, [props.open]);

  useEffect(() => {
    if (socket) {
      socket.on("getFiles", async (data) => {
        if (data.receiverID === userId) {
          await dispatch(conversationList(id));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleFileEvent = (e) => {
    e.preventDefault();
    const chosenFiles = Array.from(e.target.files);
    const updatedFiles = [...uploadedFiles];

    for (const file of chosenFiles) {
      if (!updatedFiles.some((f) => f.name === file.name)) {
        updatedFiles.push(file);
      }
    }

    if (updatedFiles.length > MAX_COUNT) {
      setFileLimit(true);
    } else {
      setFileLimit(false);
      setUploadedFiles(updatedFiles);
    }
  };

  const addAudioElement = async (blob) => {
    if (blob) {
      const date = new Date();
      const time = date.getTime();
      const file = new File([blob], `recorded_${time}.mp3`);
      if (file) {
        for (const fileData of [file]) {
          const obj = {
            fileName: fileData.name,
            fileSize: fileData.size,
          };
          setIsButtonVisible(true);
          // setIsOpen(false)
          const data = await dispatch(ChatUploadURL(chatTitle.threadID, obj));
          if (data) {
            dispatch(ChatUploadFile(data.uploadURL, fileData));
            const res = await dispatch(conversationList(id));

            if (res) {
              props.onClose();
              setIsClicked(false);
            }
          }
        }
      }
    }
  };

  const handleButtonClicked = () => {
    if (!isClicked) {
      setIsClicked(true);
      setIsButtonVisible(false);
      // Perform any additional actions on click
    }
  };
  //=================================================================================
  useEffect(() => {
    const handleUploadFiles = async () => {
      if (uploadedFiles.length === 0) return;

      props.isLoading();
      for (const fileData of uploadedFiles) {
        const { name, size, type } = fileData;

        if (fileData.type === "image/jpeg") {
          const image = new Image();
          image.src = URL.createObjectURL(fileData);
          // Load the image and get its dimensions
          image.onload = async () => {
            const width = image.width;
            const height = image.height;
            const obj = {
              fileName: fileData.name,
              fileSize: fileData.size,
              width: width, // Pass width and height to the obj
              height: height,
            };
            const data = await dispatch(ChatUploadURL(chatTitle.threadID, obj));
            let compress = 100 - data.compress;
            let originalSize = compress / 100;
            const maxSizeBytes = size * originalSize;
            const options = {
              maxSizeMB: maxSizeBytes / (1024 * 1024), // Convert maxSizeBytes to MB
              maxWidthOrHeight: "auto", // Set the maximum width or height (whichever is larger) of the compressed image
              useWebWorker: true, // Optional: Use a web worker to improve performance (if available)
            };
            const compressedImage = await imageCompression(fileData, options);
            const modifiedFile = new File([compressedImage], name, { type });

            await dispatch(ChatUploadFile(data.uploadURL, modifiedFile));
            socket.emit("sendFiles", { receiverID: id });
            const res = dispatch(conversationList(id));
            if (res) {
              setUploadedFiles([]);
              setFileLimit(false);
              props.onClose();
              props.isFalseLoading();
            }
          };
        } else {
          const obj = {
            fileName: fileData.name,
            fileSize: fileData.size,
          };
          const data = await dispatch(ChatUploadURL(chatTitle.threadID, obj));
          await dispatch(ChatUploadFile(data.uploadURL, fileData));

          socket.emit("sendFiles", { receiverID: id });
          const res = dispatch(conversationList(id));
          if (res) {
            setUploadedFiles([]);
            setFileLimit(false);
            props.onClose();
            props.isFalseLoading();
          }
        }
      }
    };
    handleUploadFiles();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles, dispatch]);
  //=============================================================================================

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        sx={{
          "& .MuiDialog-paper": { width: "98%", maxHeight: 435 },
          visibility: isOpen ? "visible" : "hidden",
        }}
        PaperProps={{
          sx: {
            bottom: "30px",
            position: "fixed",
          },
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <Box sx={{ textAlign: "center", backgroundColor: "#f5f5f5" }}>
          <Button
            onClick={() => setIsOpen(false)}
            sx={{ width: "100%", color: "#808080" }}
            component="label"
          >
            {t("chat.gallery")}
            <input
              id="fileUpload"
              type="file"
              accept=".png,.jpg"
              multiple
              style={{ display: "none" }}
              onChange={(e) => {
                handleFileEvent(e);
              }}
            />
          </Button>
          <Divider color="#7dbf41" sx={{ height: 2, width: "100%" }} />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {isButtonVisible && (
              <Button
                onClick={() => {
                  setIsOpen(false);
                }}
                sx={{ color: "#808080", marginLeft: "100px" }}
                component="label"
              >
                {t("chat.audio")}
                <input
                  id="AudioUpload"
                  type="file"
                  accept=".mp3"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleFileEvent(e);
                  }}
                />
              </Button>
            )}

            {isAudioVisible && (
              <Box
                sx={{
                  marginLeft: isButtonVisible ? "60px" : "10px",
                }}
                onClick={handleButtonClicked}
              >
                <AudioRecorder
                  onRecordingComplete={(blob) => addAudioElement(blob)}
                  // recorderControls={recorderControls}
                />
              </Box>
            )}
          </Box>
          <Divider color="#7dbf41" sx={{ height: 2, width: "100%" }} />
          <Button
            onClick={() => setIsOpen(false)}
            sx={{ width: "100%", color: "#808080" }}
            component="label"
          >
            {t("chat.document")}

            <input
              id="fileUpload"
              type="file"
              accept=".doc,.docx,.ppt,.pptx"
              multiple
              style={{ display: "none" }}
              onChange={(e) => {
                handleFileEvent(e);
              }}
            />
          </Button>
          <Divider color="#7dbf41" sx={{ height: 2, width: "100%" }} />
          <Button
            sx={{ width: "100%", color: "#808080" }}
            onClick={props.onClose}
          >
            {t("chat.cancel")}
          </Button>
        </Box>
      </Dialog>
    </div>
  );
}

import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNotes } from "store/action/note.action";
import { IconButton, Tooltip } from "@mui/material";
import {
  FormatItalic,
  FormatBold,
  FormatUnderlined,
  Delete,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import NoteSavedModal from "layout/Modal/NoteSavedModal";
const IconTooltip = ({ icon, tooltip, onClick, isActive }) => (
  <Tooltip title={tooltip}>
    <IconButton
      color={isActive ? "primary" : "default"}
      onClick={onClick}
      style={{ padding: 0 }}
    >
      {icon}
    </IconButton>
  </Tooltip>
);
const Create = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line
  const [text, setText] = useState("");
  const [titleText, setTitleText] = useState("");
  const [arrowLine, setArrowLine] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ButtonEvent = useSelector((state) => state.NoteReducer.buttonEvent);
  const ArrowButton = useSelector(
    (state) => state.NoteReducer.ArrowButtonEvent
  );
  const navigateEvent = useSelector((state) => state.NoteReducer.NavigateEvent);
  const selection = useSelector((state) => state.NoteReducer.selectedText);
  const [selectedText, setSelectedText] = useState(""); 

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  useEffect(() => {
    if (selectedText) {
      setIsBold(document.queryCommandState("bold"));
      setIsItalic(document.queryCommandState("italic"));
      setIsUnderlined(document.queryCommandState("underline"));
      
    }
  }, [selectedText]);
  
  useEffect(() => {
    document.oncopy = () => {
      return true;
    };

    document.onselectstart = () => {
      return true;
    };
  }, []);

  const handleBold = (e) => {
    e.preventDefault(); 
    document.execCommand("bold", false, null);
    setIsBold(!isBold);
    
  };

  const handleItalic = (e) => {
    e.preventDefault(); 
    document.execCommand("italic", false, null);
    setIsItalic(!isItalic)
  };

  const handleUnderline = (e) => {
    e.preventDefault(); 
    document.execCommand("underline", false, null);
    setIsUnderlined(!isUnderlined)
  };
  const handleSelected = (e) => {
    setSelectedText(window.getSelection().toString());
    const newContent = e.target.innerHTML;
    dispatch({
      type: "NOTE_SELECTED",
      payload: [newContent],
    });
    setHasChanges(true);
  };

  const handleTitleChange = (event) => {
    setTitleText(event.target.value);
    setHasChanges(true);
  };

  //========================================================================
  const handleDeleteClick = async () => {
    toast.error(("Note ID is Empty"), {
      autoClose: 50,
      hideProgressBar: true,
      theme: "colored",
    });
    navigate("/notes");
  };
  //==============detetct changes or not======================================
  const handleSaveChanges = () => {
    if (!hasChanges) {
      toast.error(("Note is empty. please add some note"), {
        autoClose: 50,
        hideProgressBar: true,
        theme: "colored",
      });
      // You can display a message to the user here.
      return;
    }
    const createdData = dispatch(createNotes(titleText, selection?.[0]));
    if (createdData) {
      navigate("/notes");
      toast.success(t("notes.note_saved"), {
        autoClose: 50,
        hideProgressBar: true,
        theme: "colored",
      });
    }
    setHasChanges(false);
  };
  //=========================================================================
  useEffect(() => {
    if (ButtonEvent) {
      handleSaveChanges();
      dispatch({
        type: "NOTE_BOOLEAN",
        payload: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ButtonEvent]);

  //=================================arrow---------------------------------
  useEffect(() => {
    if (ArrowButton) {
      handleClick();
      dispatch({
        type: "NOTE_ARROW_BOOLEAN",
        payload: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ArrowButton]);

  const handleClick = () => {
    setArrowLine((prevArrowLine) => !prevArrowLine);
  };

  const handleNavigateBack = () => {
    if (hasChanges) {
      setIsModalOpen(true);
    } else {
      navigate(-1);
    }
  };
  const handleNoteClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (navigateEvent) {
      handleNavigateBack();
      dispatch({
        type: "NOTE_NAVIGATE",
        payload: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigateEvent]);
  //=======================================================================================
  return (
    <div>
      <NoteSavedModal open={isModalOpen} onClose={handleNoteClose} />
      <Grid container justifyContent="center">
        {arrowLine ? (
          <Box
            sx={{
              backgroundColor: "#d6e8c6",
              padding: 1,
              width: "80%",
              height: "134px",
              position: "fixed",
              bottom: "65px",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff", // Inner background color
                padding: 2,
                borderRadius: "8px",
              }}
            >
              <input
                style={{ width: "100%", border: "0", outline: "none" }}
                type="text"
                placeholder="Enter Title"
                onChange={handleTitleChange}
                value={titleText}
              />
            </Box>
            <Box
              mt={1}
              sx={{
                backgroundColor: "#fff", // Inner background color
                padding: 2.2,
                display: "flex",
                borderRadius: "8px",
                justifyContent: "space-between",
              }}
            >
              <div>
              <Tooltip title="Bold">
              <IconButton
                color={isBold ? "primary" : "default"}
                onClick={handleBold}
                style={{ padding: 0 }}
              >
                <FormatBold />
              </IconButton>
            </Tooltip>
            <Tooltip title="Italic">
              <IconButton
                color={isItalic ? "primary" : "default"}
                onClick={handleItalic}
                style={{ padding: 0 }}
              >
                <FormatItalic />
              </IconButton>
            </Tooltip>
            <Tooltip title="Underline">
              <IconButton
                color={isUnderlined ? "primary" : "default"}
                onClick={handleUnderline}
                style={{ padding: 0 }}
              >
                <FormatUnderlined />
              </IconButton>
            </Tooltip>
              </div>
              <div>
                <IconTooltip
                  icon={<Delete style={{ color: "#7dbf41" }} />}
                  tooltip="Delete"
                  onClick={handleDeleteClick}
                />
              </div>
            </Box>
          </Box>
        ) : null}
        <Box width="100%" mt={2} border="none">
        <div
          id="editor"
          contentEditable="true"
          style={{
            width: "100%",
            resize: "none",
            fontSize: 16,
            border: "none",
            outline: "none",
            color: "#000"
          }}
          onBlur={(e) => handleSelected(e)}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Box>
      </Grid>
    </div>
  );
};

export default Create;

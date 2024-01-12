import * as React from "react";
import PopupState, {
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state";
import { useLocation, useNavigate } from "react-router-dom";

import MoreIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import {
  styled,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteChat,
  ArchiveChatData,
  RestoreChatData,
} from "store/action/chat.action";
import { toast } from "react-toastify";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 0,
    backgroundColor: "#FFF",
    marginTop: theme.spacing(-6.3),
    width: "200px",
    height: "50px",
    overflowY:"hidden",
    color: "#000",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "10px 0px 00px 0px",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.9),
      },
    },
  },
}));
const StyledMenuChat = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 0,
    backgroundColor: "#FFF",
    marginTop: theme.spacing(-6.3),
    width: "140px",
  },
}));

const ArchiveChat = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chat = useSelector((state) => state.ChatReducer.conversation);
  const chatArchiveList = useSelector(
    (state) => state.ChatReducer.archiveList.aChatList
  );


  const handleDelete = async () => {
    const res = await dispatch(DeleteChat(chat.threadID));
      if (res) {
        navigate("/chat");
    
    }
  };
  const handleArchive = async () => {
    const res = await dispatch(ArchiveChatData(chat.threadID));
      if (res === true) {
        navigate("/chat");

      } else {
        toast.error("Some thing was wrong");
      }
    }
  const handleRestore = async () => {
    const res = await dispatch(RestoreChatData(chat.threadID));
    
      if (res === true) {
        navigate("/chat/archive_chat");
        
      } else {
        toast.error("Some thing was wrong");
      }
    
  };
  const handleChatArchiveList = () => {
    navigate("/chat/archive_chat");
  };

  return (
    <>
      {location?.pathname === "/chat" && (
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <IconButton
                variant="contained"
                {...bindTrigger(popupState)}
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
              <StyledMenu {...bindMenu(popupState)}>
                <MenuItem
                  onClick={() => {
                    handleChatArchiveList();
                    popupState.close();
                  }}
                >
                  {t("chat.chatArchive")}
                </MenuItem>
              </StyledMenu>
            </div>
          )}
        </PopupState>
      )}

      {location?.pathname?.split("/")?.[2] === "conversation" && (
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <IconButton
                variant="contained"
                {...bindTrigger(popupState)}
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
              <StyledMenuChat {...bindMenu(popupState)}>
                <MenuItem
                  onClick={() => {
                    handleDelete();
                    popupState.close();
                  }}
                >
                  {t("chat.deleteChatArchive")}
                </MenuItem>
                {chat.receiverID === chatArchiveList?.[0]?.receiverID ? (
                  <MenuItem
                    onClick={() => {
                      handleRestore();
                      popupState.close();
                    }}
                  >
                  {t("chat.restore")}
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => {
                      handleArchive();
                      popupState.close();
                    }}
                  >
                    {t("chat.archive")}
                  </MenuItem>
                )}
              </StyledMenuChat>
            </div>
          )}
        </PopupState>
      )}
    </>
  );
};
export default ArchiveChat;

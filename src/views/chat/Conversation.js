import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Grid,
  List,
  ListItem,
} from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate, useParams } from "react-router-dom";

import {
  ReadMessage,
  conversationList,
  deleteMessage,
  sendMessage,
  userProfile,
} from "store/action/chat.action";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";
import Files from "./Files";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LongPressable from "react-longpressable";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ReplyIcon from "@mui/icons-material/Reply";
import ClearIcon from "@mui/icons-material/Clear";
import ArchiveChat from "../../layout/ChatLayout/ArchiveChat/index";
import ButtonBots from "./ButtonBots";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import moment from "moment";
import { AttachFile, Description } from "@mui/icons-material";
import { utcToZonedTime, format } from "date-fns-tz";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { RotatingLines } from "react-loader-spinner";

const formatTextWithLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const emailRegex = /(\S+@\S+\.\S+)/g;
  const phoneRegex = /(\+\d{1,3}\s?\(\d{1,3}\)\s?\d{3,4}-\d{4})/g;

  return text
    ?.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none">${url}</a>`;
    })
    .replace(emailRegex, (email) => {
      return `<a href="mailto:${email}" style="text-decoration: none">${email}</a>`;
    })
    .replace(phoneRegex, (phone) => {
      return `<a href="tel:${phone}" style="text-decoration: none">${phone}</a>`;
    });
};

const ChatBox = styled(List)({
  display: "flex",
  alignItem: "center",
  bottom: "0",
  width: "100%",
});
const SearchContainer = styled(List)({
  display: "flex",
  flexDirection: "row",
  borderRadius: "16px",
  width: "100%",
});

const MessageSenderStyle = styled(ListItem)({
  flexDirection: "column",
  alignItems: "flex-start",
});

const MessageReceiverStyle = styled(ListItem)({
  flexDirection: "column",
  alignItems: "flex-end",
});

const Message = styled(Typography)({
  background: "#fff",
  maxWidth: "80%",
  color: "#303030",
  padding: "12px 10px",
  borderRadius: "0px 15px 0px 15px",
  wordBreak: "break-word",
});

const MessageReply = styled(List)({
  display: "flex",
  flexDirection: "row",
  maxWidth: "100%",
  color: "#303030",
  padding: "12px 10px",
  fontSize: "14px",
  wordBreak: "break-word",
});

const MessageDate = styled(Typography)({
  display: "flex",
  backgroundColor: "rgba(20,19,19,0.5)",
  borderRadius: "20px",
  height: "30px",
  width: "120px",
  color: "#fff",
  justifyContent: "center",
  alignItems: "center",
});

const Conversation = () => {
  const socket = useSelector((state) => state.auth.socket_data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [OpenModal, setModal] = useState(false);
  const [chatSelected, setChatSelected] = useState(false);
  const [OpenFileModal, setFileModal] = useState(false);
  const messageEl = useRef(null);
  const [message, setMessage] = useState();
  const { id } = useParams();

  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState("");
  const zoomRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [lastOnlineTime, setLastOnlineTime] = useState(null);
  const [appBar, setAppBar] = useState(true);
  const [MdIsOpen, setMdIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const {
    conversation,
    selectedData: chatMsg,
    reply: chatMsgReply,
  } = useSelector((state) => state.ChatReducer);

  const ChatReducer = useSelector((state) => state.ChatReducer);
  const verifyData = useSelector((state) => state.SearchReducer.result);

  //========================================================
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setAppBar(false);
  };

  const handleClosed = () => {
    setSelectedImage(null);
    setAppBar(true);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = selectedImage;
    link.download = "image.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Typing Indicator
  useEffect(() => {
    const handleInput = () => {
      socket?.emit("typing", { intUID: id });
    };

    const handleBlur = () => {
      socket?.emit("stop_typing", { intUID: id });
    };

    const input = document.getElementById("input");

    input.addEventListener("input", handleInput);
    input.addEventListener("blur", handleBlur);

    if (socket) {
      socket.on("typing", (data) => {
        if (data.intUID === id) {
          setIsTyping(true);
        }
      });

      socket.on("stop_typing", (data) => {
        if (data.intUID === id) {
          setIsTyping(false);
        }
      });

      socket.on("onlineUser", (data) => {
        if (data?.intUID === Number(id)) {
          setOnlineUsers("Online");
        }
      });

      socket.on("offlineUser", (data) => {
        if (data && data?.intUID === id) {
          setOnlineUsers(data?.status);
        }
      });
    }

    return () => {
      input.removeEventListener("input", handleInput);
      input.removeEventListener("blur", handleBlur);
      if (socket) {
        socket?.off("typing");
        socket?.off("stop_typing");
        socket?.off("onlineUser");
        socket?.off("offlineUser");
      }
    };
    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    if (id) {
      getData();

      if (socket) {
        socket?.emit("isReadedAll", { intUID: id }); // once open the chat thenn make readable for all messages. and sent to sender
        socket?.on("getReadedAll", (data) => {
          dispatch({
            type: "MESSAGE_READ_RESPONSE_FOR_ALL",
            payload: true,
          });
        });

        socket.emit("checkOnlineStatus", { intUID: id });
        socket.on("onlineStatus", (data) => {
          if (data.isOnline) {
            setOnlineUsers("Online");
          } else {
            if (data.hasOwnProperty("lastonline")) {
              setOnlineUsers(data.lastonline);
            } else {
              setOnlineUsers("just offline");
            }
          }
        });
      }
      dispatch({
        type: "CONVERSATION_OPEN",
        payload: { userId: id },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, socket]);

  useEffect(() => {
    groupData(ChatReducer.conversation?.aChatOpen);
    if (ChatReducer.selectedData && ChatReducer.selectedData?.length > 0) {
      setChatSelected(true);
    } else {
      setChatSelected(false);
    }
  }, [ChatReducer]);

  const getData = async () => {
    if (verifyData.centerBtn === "chat") {
      await dispatch(conversationList(verifyData?.authorID, id));
    } else {
      await dispatch(conversationList(id));
    }
  };

  useEffect(() => {
    scrollerTo();
  }, [messageList]);

  const scrollerTo = () => {
    messageEl.current?.scrollIntoView({ behavior: "smooth" });
  };

  const readingMessage = () => {
    dispatch(ReadMessage());
  };

  // get send msg
  useEffect(() => {
    if (socket) {
      socket?.on("msg_send", async function (data) {
        if (data.isBoat) {
          const message = JSON.parse(data.message);
          if (id === message?.senderID) {
            dispatch({
              type: "MESSAGE_RESPONSE1",
              payload: message,
            });
            setIsTyping(false);
            socket?.emit("isReaded", {
              intUIDreceiver: id,
              message: message,
            });
            readingMessage();
          }
        } else {
          const message = JSON.parse(data.message, data.msgDateUTC);
          if (id === message?.senderID) {
            dispatch({
              type: "MESSAGE_RESPONSE1",
              payload: message,
            });
            setIsTyping(false);
            socket?.emit("isReaded", {
              intUIDreceiver: id,
              message: message,
            });
            readingMessage();
            getData();
          }
        }
      });

      socket?.on("getReadMsg", (data) => {
        dispatch({
          type: "MESSAGE_READ_RESPONSE",
          payload: data,
        });
      });

      return () => {
        socket?.off("getMessage");
        socket?.off("msg_send");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, socket]);

  const copyToClipboard = () => {
    const copyBoard = chatMsg?.map((data) => data.msg);
    const copy = navigator.clipboard.writeText(copyBoard);
    if (copy) {
      dispatch({
        type: "SELECTED_MESSAGE",
        payload: [],
      });
      setSelectedMessages([]);
      setChatSelected(false);
    }
  };

  useEffect(() => {
    if (socket) {
      socket?.on("typing", (message) => {
        if (message.userId === id) {
          setIsTyping(true);
        }
      });

      return () => {
        socket?.off("typing");
      };
    }
  }, [id, socket]);

  const handleSend = async () => {
    if (message !== "") {
      const now = new Date();
      const utcDateTime = utcToZonedTime(now, "UTC");
      const currentDateTime = format(utcDateTime, "yyyy-MM-dd HH:mm:ss");

      const replyData = chatMsgReply?.[0]?.msg ? chatMsgReply?.[0]?.msg : null;
      dispatch({
        type: "MESSAGE_RESPONSE1",
        payload: {
          receiverID: id,
          threadID: conversation?.threadID,
          msg: message,
          reply: "",
          msgID: "test",
          msgDate: now,
          msgDateUTC: currentDateTime,
        },
      });

      const res = await dispatch(
        sendMessage(conversation?.threadID, message, replyData)
      );

      if (res?.jLastMsg.length !== 0) {
        const data = res?.jLastMsg;
        const stringfy = JSON.stringify(res?.jLastMsg);

        socket?.emit("msg_send", {
          intUIDreceiver: id,
          message: stringfy,
        });

        dispatch({
          type: "MESSAGE_RESPONSE",
          payload: data,
        });

        dispatch({
          type: "REPLY_MESSAGE",
          payload: [],
        });

        if (data) {
          setMessage("");
        }
      } else {
        setMessage("");
      }
    }
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  const handleProfile = async () => {
    const res = await dispatch(userProfile(id));
    if (res) {
      navigate(`/search/details/21-${id}`);
    }
  };
  const handleDelete = async (messageId) => {
    const deleteMsgIds = chatMsg?.map((item) => item.msgID);

    if (deleteMsgIds && deleteMsgIds?.length > 0) {
      for (const msgID of deleteMsgIds) {
        await dispatch(deleteMessage(conversation.threadID, msgID));
      }
      dispatch({
        type: "SELECTED_MESSAGE",
        payload: [],
      });
      setSelectedMessages([]);
      setChatSelected(false);
      getData();
    }
  };

  const handleReply = () => {
    const MsgReply = chatMsg?.filter((item) => item);

    dispatch({
      type: "REPLY_MESSAGE",
      payload: MsgReply,
    });
    dispatch({
      type: "SELECTED_MESSAGE",
      payload: [],
    });

    setSelectedMessages([]);
    setChatSelected(false);
  };

  const handleClear = () => {
    dispatch({
      type: "SELECTED_MESSAGE",
      payload: [],
    });
    dispatch({
      type: "REPLY_MESSAGE",
      payload: [],
    });
    setSelectedMessages([]);
    setChatSelected(false);
  };
  const handleProfileClose = () => {
    setModal(false);
  };
  const handleAddFile = () => {
    setFileModal(true);
  };
  const handleFileClose = () => {
    setFileModal(false);
  };
  const handleLoading = () => {
    setIsLoading(true);
  };
  const handleLoadingFalse = () => {
    setIsLoading(false);
  };

  const groupData = async (chatData) => {
    const grouped = await chatData?.reduce((acc, el) => {
      const msgDate = el.msgDateUTC?.split(" ")[0]; // Extract the date from msgDateUTC
      if (!acc[msgDate]) {
        acc[msgDate] = [];
      }
      acc[msgDate].push(el);
      return acc;
    }, {});
    setMessageList(grouped);
  };

  const onLongPressClick = (e, messageId) => {
    e.preventDefault();

    if (messageId != null) {
      setSelectedMessages([...selectedMessages, messageId]);
      dispatch({
        type: "SELECTED_MESSAGE",
        payload: [...selectedMessages, messageId],
      });
      setChatSelected(true);
    }
  };

  const onShortPressClick = (e, messageId) => {
    e.preventDefault();
    const isSelected = selectedMessages?.find(
      (id) => id?.msgID === messageId?.msgID
    );
    if (!isSelected && selectedMessages?.length > 0) {
      if (messageId != null) {
        setSelectedMessages([...selectedMessages, messageId]);
        dispatch({
          type: "SELECTED_MESSAGE",
          payload: [...selectedMessages, messageId],
        });
        setChatSelected(true);
      }
    } else {
      setSelectedMessages(
        selectedMessages.filter((id) => id?.msgID !== messageId.msgID)
      );
      dispatch({
        type: "SELECTED_MESSAGE",
        payload: selectedMessages.filter((id) => id?.msgID !== messageId.msgID),
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Shift" && e.keyCode === 13) {
      setMessage((prevMessage) => prevMessage + "\n");
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePlayCircul = async (play) => {
    setMdIsOpen(false);
    const res = await dispatch(sendMessage(conversation?.threadID, play));
    setMdIsOpen(true);
    if (res?.jLastMsg.length !== 0) {
      const data = res?.jLastMsg;
      const stringfy = JSON.stringify(res?.jLastMsg);
      socket?.emit("msg_send", {
        intUIDreceiver: id,
        message: stringfy,
      });
      dispatch({
        type: "MESSAGE_RESPONSE",
        payload: data,
      });

      dispatch({
        type: "REPLY_MESSAGE",
        payload: [],
      });
      if (data) {
        getData();
      }
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType === "document") {
      return <Description />;
    } else {
      return <AttachFile />;
    }
  };
  const handleDetail = (msgJson) => {
    const jsonData = msgJson.match(/\d+-\d+/);
    const gId = jsonData[0];
    navigate(`/search/details/${gId}`);
  };

  return (
    <React.Fragment>
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(40, 40, 40, 0.6)",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <RotatingLines
            strokeColor="#fff"
            strokeWidth="5"
            width="50"
            visible={true}
          />
          <Typography
            sx={{
              position: "absolute",
              top: "55%",
              left: "50%",
              color: "#fff",
              transform: "translate(-50%, -50%)",
            }}
          >
            {t("chat.uploading")}
          </Typography>
        </Box>
      )}
      <Grid>
        {/*Header */}
        {appBar ? (
          <Grid item>
            {chatSelected ? (
              <AppBar
                sx={{
                  height: "48px",
                  boxShadow: "none",
                  backgroundColor: "#36454F",
                }}
              >
                <Toolbar>
                  <IconButton
                    size="large"
                    aria-label="display more actions"
                    edge="end"
                    color="inherit"
                    onClick={handleNavigate}
                  >
                    <WestIcon sx={{ color: "#fff" }} />
                  </IconButton>
                  <Box
                    sx={{
                      flexGrow: 1,
                      alignSelf: "flex-center",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    <ListItem
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {chatMsg.length === 1 ? (
                        <ReplyIcon
                          style={{ marginRight: "30px", cursor: "pointer" }}
                          onClick={handleReply}
                        />
                      ) : null}
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={handleDelete}
                      />
                      <ContentCopyIcon
                        style={{ marginLeft: "30px", cursor: "pointer" }}
                        onClick={copyToClipboard}
                      />
                      <ClearIcon
                        style={{ marginLeft: "40px", cursor: "pointer" }}
                        onClick={handleClear}
                      />
                    </ListItem>
                  </Box>
                </Toolbar>
              </AppBar>
            ) : (
              <AppBar sx={{ height: "48px", boxShadow: "none" }}>
                <Toolbar>
                  <ArchiveChat />

                  <Box
                    sx={{
                      flexGrow: 1,
                      alignSelf: "flex-center",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    <ListItem
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar
                        alt="Profile"
                        src={conversation.receiverAvaURL}
                        sx={{
                          width: 35,
                          height: 35,
                          position: "relative",
                          // bottom: "3px",
                          cursor: "pointer",
                        }}
                        onClick={handleProfile}
                      />

                      <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ p: 1, color: "#fff", cursor: "pointer" }}
                        onClick={handleProfile}
                      >
                        {conversation?.receiverName}
                        <Typography sx={{ fontSize: "0.6rem" }}>
                          {isTyping === true
                            ? t("chat.typing")
                            : onlineUsers === "Online"
                            ? onlineUsers
                            : conversation?.lastSeen || ""}
                        </Typography>
                      </Typography>
                    </ListItem>
                  </Box>
                  <IconButton
                    size="large"
                    aria-label="display more actions"
                    edge="end"
                    color="inherit"
                    onClick={handleNavigate}
                  >
                    <WestIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </Toolbar>
                <Profile
                  open={OpenModal}
                  onClose={handleProfileClose}
                  onButton={handleProfileClose}
                />
              </AppBar>
            )}
          </Grid>
        ) : null}

        <Grid
          item
          style={{
            position: "absolute",
            top: "45px",
            bottom: "55px",
            left: "0px",
            right: "0px",
            overflowX: "auto",
            // overflowX: "hidden",
            backgroundColor: "#e5ddd6",
          }}
        >
          {messageList &&
            Object.entries(messageList).map(([msgDate, item], i) => {
              return (
                <Grid key={i}>
                  <ListItem style={{ justifyContent: "center" }}>
                    <MessageDate>{msgDate}</MessageDate>
                  </ListItem>

                  {item.map((data, i) => (
                    <Grid key={i}>
                      <LongPressable
                        onShortPress={(e) => onShortPressClick(e, data)}
                        onLongPress={(e) => onLongPressClick(e, data)}
                        longPressTime={700}
                      >
                        <Grid
                          item
                          xs={12}
                          style={{
                            userSelect: "none",
                            WebkitUserSelect: "none",
                            cursor: "pointer",
                            backgroundColor:
                              chatMsg.filter(
                                (items) => items.msgID === data.msgID
                              ).length === 1
                                ? "#34495e"
                                : "inherit",
                            // opacity:_.includes(chatMsg, data) ? "0.4" : 1
                          }}
                        >
                          {id === data?.receiverID ? (
                            data.msg.includes("check#") ||
                            data.msg.includes("start#") ? null : (
                              <MessageReceiverStyle>
                                <Message
                                  sx={{
                                    backgroundColor: "#daf8cb",
                                    borderRadius: "15px 0px 15px px",
                                  }}
                                >
                                  {data.msgType === "image" ? (
                                    <Grid>
                                      <img
                                        src={
                                          conversation.chatBucketURL +
                                          `/${data.filePath}`
                                        }
                                        width={"100%"}
                                        alt="img"
                                        // className="image"
                                        onClick={() => {
                                          handleImageClick(
                                            conversation.chatBucketURL +
                                              `/${data.filePath}`
                                          );
                                        }}
                                      />
                                      {selectedImage && (
                                        <Lightbox
                                          mainSrc={selectedImage}
                                          onCloseRequest={() => handleClosed()}
                                          ref={zoomRef}
                                          toolbarButtons={[
                                            <button
                                              key="download"
                                              onClick={downloadImage}
                                            >
                                              <FontAwesomeIcon
                                                icon={faDownload}
                                              />
                                            </button>,
                                          ]}
                                        />
                                      )}
                                    </Grid>
                                  ) : data.msgType === "document" ? (
                                    <Grid item>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {getFileIcon(data?.msgType)}
                                        <a
                                          href={
                                            conversation.chatBucketURL +
                                            `/${data.filePath}`
                                          }
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          style={{
                                            marginLeft: "1px",
                                            textDecoration: "none",
                                            color: "black",
                                          }}
                                        >
                                          {data.msg}
                                        </a>
                                      </div>
                                    </Grid>
                                  ) : data.msgType === "audio" ? (
                                    <audio
                                      controls
                                      preload="none"
                                      style={{ width: "250px" }}
                                    >
                                      <source
                                        src={
                                          conversation.chatBucketURL +
                                          `/${data.filePath}`
                                        }
                                      />
                                    </audio>
                                  ) : data.msgType === "linkGlobalID" ? (
                                    <Typography
                                      onClick={() => {
                                        handleDetail(data.msgJson);
                                      }}
                                    >
                                      {data.msg}
                                    </Typography>
                                  ) : data?.reply !== "" ? (
                                    <Grid>
                                      <Typography
                                        variant="body1"
                                        component="div"
                                        sx={{
                                          background: "#d5e1df",
                                          maxWidth: "100%",
                                          color: "#303030",
                                          padding: "5px 5px 10px 10px",
                                          borderRadius: "10px 0px 5px 5px",
                                          wordBreak: "break-word",
                                        }}
                                      >
                                        {data.reply}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        component="div"
                                      >
                                        {data.msg}
                                      </Typography>
                                    </Grid>
                                  ) : (
                                    <Typography
                                      style={{
                                        fontSize: "16px",
                                        lineHeight: "1.75",
                                      }}
                                      dangerouslySetInnerHTML={{
                                        __html: formatTextWithLinks(data.msg),
                                      }}
                                    ></Typography>
                                  )}
                                  <Typography
                                    style={{
                                      float: "right",
                                      margin: "0px 0px -10px 20px",
                                      // margin:"-2px -60px -2px 0px",
                                      fontSize: "smaller",
                                    }}
                                  >
                                    {/* {data.msgDateUTC?.split(" ")[1].slice(0, 5)} */}
                                    {data.msgDateUTC
                                      ? moment
                                          .utc(data.msgDateUTC)
                                          .local()
                                          .format("HH:mm")
                                      : ""}

                                    {data.isReaded === "1" ? (
                                      <DoneAllIcon
                                        sx={{
                                          color: "#0002FF",
                                          width: "16px",
                                          margin: "0 5px -7px 5px",
                                        }}
                                      />
                                    ) : (
                                      <DoneIcon
                                        sx={{
                                          width: "16px",
                                          margin: "0 5px -7px 5px",
                                        }}
                                      />
                                    )}
                                  </Typography>
                                </Message>
                              </MessageReceiverStyle>
                            )
                          ) : (
                            <MessageSenderStyle>
                              <Message>
                                {data.msgType === "image" ? (
                                  <Grid>
                                    <img
                                      src={
                                        conversation.chatBucketURL +
                                        `/${data.filePath}`
                                      }
                                      width={"100%"}
                                      alt="img"
                                      // className="image"
                                      onClick={() => {
                                        handleImageClick(
                                          conversation.chatBucketURL +
                                            `/${data.filePath}`
                                        );
                                      }}
                                    />
                                    {selectedImage && (
                                      <Lightbox
                                        mainSrc={selectedImage}
                                        onCloseRequest={() => handleClosed()}
                                        ref={zoomRef}
                                        toolbarButtons={[
                                          <button
                                            key="download"
                                            onClick={downloadImage}
                                          >
                                            <FontAwesomeIcon
                                              icon={faDownload}
                                            />
                                          </button>,
                                        ]}
                                      />
                                    )}
                                  </Grid>
                                ) : data.msgType === "audio" ? (
                                  <audio
                                    controls
                                    preload="none"
                                    style={{ width: "250px" }}
                                  >
                                    <source
                                      src={
                                        conversation.chatBucketURL +
                                        `/${data.filePath}`
                                      }
                                    />
                                  </audio>
                                ) : data.msgType === "linkGlobalID" ? (
                                  <Typography
                                    onClick={() => {
                                      handleDetail(data.msgJson);
                                    }}
                                  >
                                    {data.msg}
                                  </Typography>
                                ) : data.msgType === "document" ? (
                                  <Grid item>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      {getFileIcon(data?.msgType)}
                                      <a
                                        href={
                                          conversation.chatBucketURL +
                                          `/${data.filePath}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          marginLeft: "1px",
                                          textDecoration: "none",
                                          color: "black",
                                        }}
                                      >
                                        {data.msg}
                                      </a>
                                    </div>
                                  </Grid>
                                ) : data?.reply !== "" ? (
                                  <Grid>
                                    <Typography
                                      variant="body1"
                                      component="div"
                                      sx={{
                                        background: "#d5e1df",
                                        maxWidth: "100%",
                                        color: "#303030",
                                        padding: "5px 5px 10px 10px",
                                        borderRadius: "10px 0px 5px 5px",
                                        wordBreak: "break-word",
                                      }}
                                    >
                                      {data.reply}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                      {data.msg}
                                    </Typography>
                                  </Grid>
                                ) : (
                                  <Typography
                                    style={{
                                      fontSize: "16px",
                                      lineHeight: "1.75",
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html: formatTextWithLinks(data.msg),
                                    }}
                                  ></Typography>
                                )}

                                <Typography
                                  style={{
                                    float: "right",
                                    margin: "0px 0px -10px 20px",

                                    fontSize: "smaller",
                                  }}
                                >
                                  {/* {data.msgDateUTC?.split(" ")[1].slice(0, 5)} */}
                                  {data.msgDateUTC
                                    ? moment
                                        .utc(data.msgDateUTC)
                                        .local()
                                        .format("HH:mm")
                                    : ""}
                                </Typography>
                              </Message>

                              {data?.msgJson ? (
                                <ButtonBots data={data?.msgJson} />
                              ) : (
                                ""
                              )}
                            </MessageSenderStyle>
                          )}
                        </Grid>
                      </LongPressable>
                    </Grid>
                  ))}
                </Grid>
              );
            })}

          {chatMsgReply.length === 1 ? (
            <MessageReply>
              <AppBar
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  height: "50px",
                  bottom: 60,
                  padding: "10px",
                  top: "unset",
                  zIndex: 1,
                  boxShadow: "2px",
                  backgroundColor: "#7e9a9a",
                  color: "#fff",
                }}
              >
                <ListItem
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "inline",
                    whiteSpace: "nowrap",
                  }}
                >
                  {chatMsgReply?.[0]?.msg}
                </ListItem>
                <ClearIcon
                  style={{ cursor: "pointer" }}
                  onClick={handleClear}
                />
              </AppBar>
            </MessageReply>
          ) : null}
          <Grid ref={messageEl}></Grid>
        </Grid>

        {/*footer */}

        <Grid item>
          <AppBar
            sx={{
              height: "60px",
              bottom: 0,
              top: "unset",
              zIndex: 1,
              boxShadow: "2px",
              backgroundColor: "white",
            }}
          >
            <Toolbar>
              <ChatBox>
                <Files
                  open={OpenFileModal}
                  onClose={handleFileClose}
                  onButton={handleFileClose}
                  isLoading={handleLoading}
                  isFalseLoading={handleLoadingFalse}
                />
                <SearchContainer>
                  <AddIcon
                    onClick={handleAddFile}
                    style={{
                      color: "#7dbf41",
                      position: "relative",
                      top: "6px",
                      right: "10px",
                      cursor: "pointer",
                    }}
                  />
                  {MdIsOpen ? (
                    conversation.startBtn === "1" ? (
                      <MdOutlinePlayCircleOutline
                        onClick={() => {
                          handlePlayCircul(conversation?.startCommand);
                          // setMdIsOpen(false);
                        }}
                        style={{
                          color: "#7dbf41",
                          position: "relative",
                          margin: "3px",
                          right: "6px",
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                      />
                    ) : null
                  ) : null}

                  <textarea
                    id="input"
                    style={{
                      width: "100%",
                      padding: "10px",
                      outline: "none",
                      // border: "none",
                      fontSize: "15px",
                      height: "40px",
                      border: "1px solid #72c02c",
                      borderRadius: "4px",
                      resize: "none",
                    }}
                    name="name"
                    type="text"
                    size="small"
                    component={"span"}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message || ""}
                    onKeyDown={handleKeyDown}
                  />

                  <SendIcon
                    style={{
                      position: "relative",
                      top: "6px",
                      left: "10px",
                      color: "#7dbf41",
                    }}
                    onClick={handleSend}
                  />
                </SearchContainer>
              </ChatBox>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Conversation;

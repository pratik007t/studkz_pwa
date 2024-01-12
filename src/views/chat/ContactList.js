import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import { ChatList } from "store/action/chat.action";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Grid } from "@mui/material";

const ContactItem = styled(List)({
  display: "flex",
  flexDirection: "row",
  borderBottom: "1px solid #f2f2f2",
  background: "white",
  cursor: "pointer",
});
const MessageCount = styled(Typography)({
  background: "#06d755",
  color: "#fff",
  maxWidth: "20px",
  height: "20px",
  borderRadius: "50%",
  textAlign: "end",
  margin: "20px -10px 0px 0px",
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "0.75em",
});

const ContactList = () => {
  const chat = useSelector((state) => state.ChatReducer.chatList);
  const TopUserData = useSelector(
    (state) => state.ChatReducer.topUser.topUsers
  );
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [page, setPage] = useState(1);
  const socket = useSelector((state) => state.auth.socket_data);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("msg_send", (response) => {
        const data = JSON.parse(response.message);

        let updatedChatList = chat?.aChatList?.map((item) => {
          if (item.receiverID === data.senderID) {
            return {
              ...item,
              threadID: data.threadID,
              msg: data.msg,
              countNewMsg: Number(item.countNewMsg) + 1,
              lastMsgDate: data.msgDate,
            };
          }
          return item;
        });

        dispatch({
          type: "A_CHAT_LIST",
          payload: updatedChatList,
        });
      });

      return () => {
        socket.off("getMessage");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat?.aChatList, socket]);

  const getData = async () => {
    await dispatch(ChatList(page));
    dispatch({
      type: "READ_MESSAGE",
      payload: [],
    });
    dispatch({
      type: "CHAT_CONVERSATION_LIST",
      payload: [],
    });
    dispatch({
      type: "RETRIEVE_DATA",
      payload: [],
    });
  };

  return (
    <React.Fragment>
      <Box>
        {chat?.aChatList?.length > 0 ? (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {chat?.aChatList &&
              chat.aChatList.map((data, i) => (
                <Box key={i}>
                  <ContactItem>
                    <ListItem
                      sx={{
                        "&": {},
                        "&.MuiListItem-root": {
                          paddingTop: "0",
                          paddingBottom: "0px",
                        },
                      }}
                    >
                      <Avatar
                        sx={{ width: 50, height: 50 }}
                        alt="profile"
                        src={data.avaURL}
                      />
                      <ListItemText sx={{ transform: "translate(10px,10px)" }}>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/chat/conversation/${data.receiverID}`}
                        >
                          <Typography variant="h4" style={{ fontSize: "15px" }}>
                            {data.receiverName}
                          </Typography>
                          <Typography
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              color: "#000",
                            }}
                          >
                            {data.msg}
                          </Typography>
                          {data.countNewMsg === "0" ? (
                            <Typography
                              sx={{
                                color: "#000",
                                textAlign: "end",

                                whiteSpace: "nowrap",
                                transform: "translate(0px,-40px)",
                              }}
                            >
                              {data.lastMsgDate}
                            </Typography>
                          ) : (
                            <Typography
                              sx={{
                                color: "#000",
                                textAlign: "end",

                                whiteSpace: "nowrap",
                                margin: "0px -10px 0px 0px",
                                transform: "translate(0px,-40px)",
                              }}
                            >
                              {data.lastMsgDate}
                            </Typography>
                          )}
                        </Link>
                      </ListItemText>

                      <Box>
                        {data.countNewMsg === "0" ? null : (
                          <MessageCount>{data.countNewMsg}</MessageCount>
                        )}
                      </Box>
                    </ListItem>
                  </ContactItem>
                </Box>
              ))}
          </Grid>
        ) : (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {TopUserData?.map((data, i) => (
              <Box key={i}>
                <ContactItem>
                  <ListItem>
                    <Avatar
                      sx={{ width: 50, height: 50 }}
                      alt="profile"
                      src={data.avaURL}
                    />
                    <ListItemText sx={{ transform: "translate(10px,0px)" }}>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/chat/conversation/${data.receiverID}`}
                      >
                        <Typography variant="h4" style={{ fontSize: "15px" }}>
                          {data.receiverName}
                        </Typography>
                      </Link>
                    </ListItemText>
                  </ListItem>
                </ContactItem>
              </Box>
            ))}
          </Grid>
        )}
      </Box>
    </React.Fragment>
  );
};
export default ContactList;

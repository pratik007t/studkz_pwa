import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArchiveChat from "../../layout/ChatLayout/ArchiveChat/index";

import ContactList from "./ContactList";
import { useDispatch, useSelector } from "react-redux";
import { getBotSystem } from "store/action/search.action";
import { useNavigate } from "react-router-dom";

export default function ChatAppBar() {
 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleAvatar = async () =>{
    const data = await dispatch(getBotSystem());
    if(data){
      navigate(`/chat/conversation/${data.receiverID}`);
    }

  }
  const chat = useSelector((state) => state.ChatReducer.chatList);
  return (
    <div>
      <AppBar sx={{ height: "48px", boxShadow: "none" }}>
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              my: 2,
              flexGrow: 1,
              alignSelf: "flex-center",
              textAlign: "center",
              color: "#fff",
              cursor:"pointer"
            }}
            onClick={handleAvatar}
          >
          {chat.chatTitle}
          </Typography>
          <ArchiveChat/>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ mt: 5 }}>
        <ContactList />
      </Box>
    </div>
  );
}

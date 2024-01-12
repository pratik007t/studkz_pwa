import * as React  from "react";
import { useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import {Box,Grid,ListItem,Avatar,ListItemText,List} from "@mui/material";
import { styled } from "@mui/material/styles";

import { Link } from "react-router-dom";
import moment from "moment";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import WestIcon from "@mui/icons-material/West";

import { useNavigate } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { ArchiveChatList } from "store/action/chat.action";

const ContactItem = styled(List)({
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #f2f2f2",
    background: "white",
    cursor: "pointer",
  });
const ArchivedChats = () => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.ChatReducer.archiveList);

  const navigate = useNavigate();

  useEffect(() => {
    getData()
     // eslint-disable-next-line 
  }, []);
  const handleNavigate = () => {
    navigate(-1);
  };
  const getData = async () => {
  await dispatch(ArchiveChatList());

   
  };
  return (
    <div>
      <AppBar sx={{ height: "48px", boxShadow: "none" }}>
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
            }}
          >
            Archived Chats
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ mt: 5 }}>
    
        {chat?.aChatList ? (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {chat?.aChatList &&
              chat.aChatList.map((data, i) => (
                <Box key={i}>
                  <ContactItem>
                    <ListItem
                      sx={{
                        // your root styles
                        "&": {
                          // your root styles but with higher CSS specificity
                        },
                        "&.MuiListItem-root": {
                          // your root styles but with even higher CSS specificity
                          paddingLeft: "0",
                          paddingRight: "0",
                          paddingTop: "0",
                          paddingBottom: "5px",
                         
                        },
                      }}
                    >
                      <Avatar
                        sx={{ width: 50, height: 50 }}
                        alt="profile"
                        src={data.avaURL}
                      />
                      <ListItemText sx={{transform: "translate(10px,10px)"}}>
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
                          <Typography sx={{color:"#000", textAlign: "end", whiteSpace: "nowrap",padding:"0px 10px 0px 0px",transform: "translate(0px,-40px)"}}>{moment(data.lastMsgDate).format('L')}</Typography>
                        </Link>
                      </ListItemText>

                      <Box >
                        
                       
                      </Box>
                    </ListItem>
                  </ContactItem>
                </Box>  
              ))}
          </Grid>
        ) : (
          <Grid
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              fontSize: "15px",
              width: "100px",
              height: "100px",
              margin: "-50px 0 0 -50px",
            }}
          >
            <Typography>{chat.msg}</Typography>
          </Grid>
        )}
      </Box>
    </div>
  );
};
export default ArchivedChats;

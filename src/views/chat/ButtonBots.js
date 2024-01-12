import React, { useState } from "react";
import { Button, Grid, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { conversationList, sendMessage } from "store/action/chat.action";


const ColorButton = styled(Button)(({ theme }) => ({
  color: "#0069d9",
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "#fff",
  },
}));

const ButtonBots = (props) => {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const { conversation } = useSelector((state) => state.ChatReducer);
  const socket = useSelector((state) => state.auth.socket_data);
  const { id } = useParams();

  const dispatch = useDispatch();

  const data = props;
  const jsonString = data?.data.replace(/'/g, '"');
  const parsedEntry = JSON.parse(jsonString);
  
  const msgDataOne = parsedEntry?.[0];
  const msgDataTwo = parsedEntry?.[1];


  const getData = async () => {
    await dispatch(conversationList(id));
   };
  

  const handleClickCommand = async (commandMsg, i) => {
    const res = await dispatch(sendMessage(conversation?.threadID, commandMsg));
    
    if( res?.jLastMsg.length !== 0){
      const data = res?.jLastMsg
      const stringfy = JSON.stringify(res?.jLastMsg)     
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
      getData()
      setIsButtonVisible(false)
    }
  }

  }
   

  return (
    <div> 
       <Grid>
          <Grid mt={5}>
            <Stack direction="row" spacing={2}>
              {isButtonVisible
                ? 
                msgDataOne?.map((data, i) => (
                    <ColorButton
                      key={i}
                      style={{ fontSize: "12px" }}
                      onClick={() => {
                        handleClickCommand(data.command, i);
                      }}
                      variant="contained"
                  
                    >
                      {data.label}
                    </ColorButton>
                  ))
                : null}
            </Stack>
          </Grid>
          <Grid mt={5}>
            <Stack direction="row" spacing={2}>
              {isButtonVisible
                ? msgDataTwo?.map((data, i) => (
                    <ColorButton
                      key={i}
                      style={{ fontSize: "12px" }}
                      onClick={() => {
                        handleClickCommand(data.command, i);
                      }}
                      variant="contained"
                     
                    >
                      {data.label}
                    </ColorButton>
                  ))
                : null}
            </Stack>
          </Grid>
        </Grid>
        
    </div>
  );
};

export default ButtonBots;

// assets
import { Translation } from "react-i18next";
import { RiChatSmile2Line } from "react-icons/ri";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// constant
const icons = { RiChatSmile2Line };

export const ChatGreenDot = () => {
  const chatDot = useSelector((state) => state.ChatReducer?.chatDot);
  return (
    <div>
      <Translation>
        {(t) => (
          <>
            {t("menu.menu_chat")}
            <Grid
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: chatDot.isNewMsg === true ? "#72c02c" : null,
                display: "inline-flex",
                margin: "0px 0px 0px 10px",
              }}
            ></Grid>
          </>
        )}
      </Translation>
    </div>
  );
};

const chat = {
  id: "chat",
  title: "",
  type: "group",
  children: [
    {
      id: "chat",
      title:<ChatGreenDot/>,
      type: "item",
      url: "/chat",
      icon: icons.RiChatSmile2Line,
      breadcrumbs: true,
    },
  ],
};

export default chat;

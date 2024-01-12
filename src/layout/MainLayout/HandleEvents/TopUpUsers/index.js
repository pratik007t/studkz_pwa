import React, { useEffect } from "react";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowDropUpTwoToneIcon from "@mui/icons-material/ArrowDropUpTwoTone";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";

import {
  BottomNavigationAction,
  styled,
  Menu,
  MenuItem,
  ListItemText,
  Box,
  ListItem,
  Avatar,
  List,
  Divider,
} from "@mui/material";
import { TopUpList } from "store/action/chat.action";

// Styles
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
    height:"auto",
    maxHeight:"50%",
    borderRadius: 1,
    backgroundColor: "#808080",
    marginTop: theme.spacing(-5),
    // width: "150px",

    color: "#fff",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      //   padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));
const ContactItem = styled(List)({
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#808080",
  cursor: "pointer",
});
const TopUpStateData = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const ListData = useSelector((state) => state.ChatReducer.topUser.topUsers);
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    await dispatch(TopUpList());
  };

  return (
    <>
      {location?.pathname === "/chat" && (
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <BottomNavigationAction
                {...bindTrigger(popupState)}
                icon={
                  popupState.isOpen ? (
                    <ArrowDropDownTwoToneIcon />
                  ) : (
                    <ArrowDropUpTwoToneIcon
                    // onClick={handleFavoriteData}
                    />
                  )
                }
              />

              <StyledMenu {...bindMenu(popupState)}>
                <MenuItem
                  onClick={() => {
                    getData();
                    popupState.close();
                  }}
                >
                  <Box>
                    {ListData?.map((data, i) => (
                      <Box key={i} onClick={() => navigate(`/chat/conversation/${data.receiverID}`)}>
                        <ContactItem>
                          <ListItem>
                            <Avatar
                              sx={{ width: 30, height: 30 }}
                              alt="profile"
                              src={data.avaURL}
                            />
                            <ListItemText sx={{ m: 1 }}>
                              <Link
                                style={{ textDecoration: "none", color: "#fff" }}
                                to={`/chat/conversation/${data.receiverID}`}
                              >
                                {data.receiverName}
                              </Link>
                            </ListItemText>
                          </ListItem>
                        </ContactItem>
                        <Divider sx={{ color: "white" }} />
                      </Box>
                    ))}
                  </Box>
                </MenuItem>
              </StyledMenu>
            </React.Fragment>
          )}
        </PopupState>
      )}
    </>
  );
};

export default TopUpStateData;

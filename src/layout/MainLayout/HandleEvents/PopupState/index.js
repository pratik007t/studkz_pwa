import React from 'react'
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { AddFavorite } from './../../../../store/action/favorite.action';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import ArrowDropUpTwoToneIcon from "@mui/icons-material/ArrowDropUpTwoTone";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { RWebShare } from "react-web-share";
import TextIncreaseTwoToneIcon from "@mui/icons-material/TextIncreaseTwoTone";
import TextDecreaseOutlinedIcon from "@mui/icons-material/TextDecreaseOutlined";
import {
    BottomNavigationAction,styled,Menu,MenuItem,Divider
  } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

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
      borderRadius: 0,
      backgroundColor: "#808080",
      marginTop: theme.spacing(-5),
      width: "150px",
  
      color: "#fff",
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
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

const PopupStateData = () => {
    const dispatch = useDispatch();
    const fId = useParams();
    const location = useLocation();
    const [design, setDes] = useState({ fontSize: "18px" });
    const { t } = useTranslation();
  
    const data = useSelector((state) => state.FavoriteReducer?.data?.favList);
   
    
    const def =  data?.some((item)=> item.globalID === fId.gId)

//-----------------------------------favorite-----------------------
    const handleFavorite = async () => {
       if(def === true){
        toast.warning("You have already add as a favorite")
       }else{
        await dispatch(AddFavorite(fId.gId));
      };
    }
 //-------------------Font Increase Decrease-----------------------
 const handleIncrease = async () => {
    let s = +design.fontSize.slice(0, -2);
    s = s + 2;
    let x = s.toString();
    x = x.concat("px");
    setDes({ fontSize: x });
    dispatch({
      type: "FONT_SIZE",
      payload: [
        {
          fontSize: s + "px",
        },
      ],
    });
  };
  const handleDecrease = async () => {
    let s = +design.fontSize.slice(0, -2);
    if (s > 2) {
      s = s - 2;
    }
    let x = s.toString();
    x = x.concat("px");
    setDes({ fontSize: x });
    dispatch({
      type: "FONT_SIZE",
      payload: [
        {
          fontSize: s + "px",
        },
      ],
    });
  };

  return (
    <>
    {location?.pathname?.split("/")?.[2] === "details" && (
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
                    handleFavorite();
                    popupState.close();
                  }}
                >
                  <TurnedInNotIcon style={{ color: "white" }} />
                  {t("arrow.favorite")}
                </MenuItem>
                <Divider />
                <RWebShare
                  data={{
                    url: `${fId.gId}`,
                  }}
                  
                >
                  <MenuItem onClick={popupState.close}>
                    <ShareOutlinedIcon style={{ color: "white" }} />
                    {t("arrow.share")}
                  </MenuItem>
                </RWebShare>

                <Divider />
                <MenuItem onClick={handleIncrease}>
                  <TextIncreaseTwoToneIcon
                    style={{ color: "white" }}
                  />
                  {t("arrow.font-plus")}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleDecrease}>
                  <TextDecreaseOutlinedIcon
                    style={{ color: "white" }}
                  />
                  {t("arrow.font-minus")}
                </MenuItem>
              </StyledMenu>
            </React.Fragment>
          )}
        </PopupState>
      )}
    </>
  )
}

export default PopupStateData
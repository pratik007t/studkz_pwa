import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import useLongPress from "./UseLongPress";
import {
  BottomNavigationAction,
  BottomNavigation,
  Grid,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RiChatSmile2Line from "@meronex/icons/ri/RiChatSmile2Line";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import { MdOutlinePlayCircleOutline } from "react-icons/md";

import icon from "../../../../assets/images/Logo/studkz_logo.png";
import { isBrowser } from "react-device-detect";

const NavigationButton = ({
  handleScrollTop,
  handleScrollDown,
  clickTopLongPress,
  clickBottomLongPress,
  clickPressEnd,
  handleTopBrowser,
  handleTopLongPressBrowser,
  handleDownBrowser,
  handleBottomLongPressBrowser
}) => {
  const fId = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const dispatch = useDispatch();

  const MainChainData = useSelector(
    (state) => state.SearchReducer.commonMainChain
  );
  const AllMainChain = useSelector(
    (state) => state.SearchReducer.lists.mainChain
  );
  const getByIDdata = useSelector(
    (state) => state.SearchReducer.result?.likeChain
  );
  const verifyData = useSelector((state) => state.SearchReducer.result);

  const MainChain =
    MainChainData === getByIDdata
      ? AllMainChain?.toString().split(",")
      : MainChainData?.toString().split(",");

  //------------------Navigation next previous-----------
  useEffect(() => {
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
    setIsAlertVisible(true);
  }, [fId.gId]);

  useEffect(() => {
    if (MainChainData === getByIDdata) {
      dispatch({
        type: "MAIN_CHAIN",
        payload: AllMainChain,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MainChainData, getByIDdata]);

  const getPrevious = (value, arr) => {
    const a = [undefined].concat(arr);
    const p = a.indexOf(value) - 1;
    return a[p] || false;
  };

  const handlePrevious = () => {
    const response = getPrevious(fId.gId, MainChain);

    if (response) {
      navigate(`search/details/${response}`);
    }
  };

  const getNext = (value, arr) => {
    const a = [undefined].concat(arr);
    const p = a.indexOf(value) + 1;
    return a[p] || false;
  };

  const handleNext = () => {
    const response = getNext(fId.gId, MainChain);

    if (response) {
      navigate(`search/details/${response}`);
    }
  };

  //------------------Navigation Up Down-----------
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };

  const longPressEvent = useLongPress(
    handleTopLongPressBrowser,
    handleTopBrowser,
    defaultOptions
  );
  const longPressEventBottom = useLongPress(
    handleBottomLongPressBrowser,
    handleDownBrowser,
    defaultOptions
  );
//==========================================================
  const handleTopLongPress = () => {
      clickTopLongPress();
  };

  const handlePressEnd = () => {
    clickPressEnd();
  };
  const handleTop = () => {
      handleScrollTop();
  };

  const handleBottomLongPress = () => {
      clickBottomLongPress();
  };

  const handleDown = () => { 
      handleScrollDown();
  };

  const handleGform = () => {
    //  navigate("/search/googleForm")
    alert("hey Open  the Google Form");
  };
  const handleNotes = () => {
     navigate(`/notes/${fId.gId}`)
  
  };

  function convertToOpacity(transparencyValue) {
    // Assuming transparencyValue is in the range of 0-100
    return transparencyValue / 100.0;
  }

  const LeftArrow = verifyData.fiveIcons?.[0];
  const UpArrow = verifyData.fiveIcons?.[1];
  const CenterArrow = verifyData.fiveIcons?.[2];
  const DownArrow = verifyData.fiveIcons?.[3];
  const RightArrow = verifyData.fiveIcons?.[4];

  const opacityLeft = convertToOpacity(LeftArrow);
  const opacityUp = convertToOpacity(UpArrow);
  const opacityCenter = convertToOpacity(CenterArrow);
  const opacityDown = convertToOpacity(DownArrow);
  const opacityRight = convertToOpacity(RightArrow);

  return (
    <Grid>
      <BottomNavigation
        showLabels
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          "& .MuiBottomNavigationAction-root, svg": {
            color: "#7dbf41",
            margin: "-10px",
            position: "fixed",
            bottom: "70px",
          },
        }}
      >
        {MainChainData?.toString()
          .split(",")
          .findIndex((item) => item === fId.gId) === 0 ||
        MainChainData === "" ||
        MainChainData?.length === 0
          ? null
          : location?.pathname?.split("/")?.[2] === "details" && (
              <BottomNavigationAction
                onClick={handlePrevious}
                icon={
                  <KeyboardArrowLeftIcon
                    style={{
                      fontSize: "40px",
                      position: "absolute",
                      right: "200px",
                      bottom: "10px",
                      opacity: opacityLeft,
                    }}
                  />
                }
              />
            )}
        {location?.pathname?.split("/")?.[2] === "details" && (
          isBrowser ? 
        <BottomNavigationAction
          icon={
            <KeyboardArrowUpIcon
              {...longPressEvent}
              style={{
                fontSize: "40px",
                position: "absolute",
                right: "115px",
                bottom: "10px",
                opacity:opacityUp,
              }}
            />
          }
        /> :
          <BottomNavigationAction
            icon={
              <KeyboardArrowUpIcon
                onClick={() => handleTop()}
                onTouchStart={() => handleTopLongPress()}
                onMouseDown={() => {
                  handleTopLongPress();
                }}
                onTouchEnd={() => handlePressEnd()}
                onMouseUp={handlePressEnd}
                style={{
                  fontSize: "40px",
                  position: "absolute",
                  right: "115px",
                  bottom: "10px",
                  opacity: opacityUp,
                }}
              />
            }
          />
        )}
        {isAlertVisible &&
          location?.pathname?.split("/")?.[2] === "details" && (
            <div
              style={{
                display: "flex",
                backgroundColor: "#393e46",
                padding: "2px 0px 0px 1px",
                borderRadius: "20px",
                height: "30px",
                width: "100px",
                color: "#fff",
                position: "fixed",
                bottom: "100px",
                justifyContent: "center",
                zIndex: "1",
              }}
            >
              <img src="/studkz_logo.png" alt="icon" width={25} height={25} />
              <Typography style={{ margin: "4px" }}>
                {MainChainData?.toString()
                  .split(",")
                  .findIndex((item) => item === fId.gId) + 1}
                /{MainChainData?.toString().split(",").length}
              </Typography>
            </div>
          )}
        {verifyData?.centerBtn === "chat"
          ? location?.pathname?.split("/")?.[2] === "details" && (
              <BottomNavigationAction
                icon={
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`chat/conversation/${verifyData?.globalID}`}
                  >
                    <RiChatSmile2Line
                      style={{
                        fontSize: "30px",
                        marginRight: "-15px",
                        marginBottom: "-5px",
                        opacity: opacityCenter,
                      }}
                    />
                  </Link>
                }
              />
            )
          : verifyData?.centerBtn === "note"
          ? location?.pathname?.split("/")?.[2] === "details" && (
              <BottomNavigationAction
                icon={
                  <NoteAltOutlinedIcon
                  onClick={() => {
                    handleNotes();
                  }}
                    style={{
                      fontSize: "30px",
                      marginRight: "-15px",
                      marginBottom: "-5px",
                      opacity: opacityCenter,
                    }}
                  />
                }
              />
            )
          : verifyData?.centerBtn === "reaction"
          ? location?.pathname?.split("/")?.[2] === "details" && (
              <BottomNavigationAction
                icon={
                  <AddReactionOutlinedIcon
                    style={{
                      fontSize: "30px",
                      marginRight: "-15px",
                      marginBottom: "-5px",
                      opacity: opacityCenter,
                    }}
                  />
                }
              />
            )
          : verifyData?.centerBtn === "gform"
          ? location?.pathname?.split("/")?.[2] === "details" && (
              <BottomNavigationAction
                icon={
                  <MdOutlinePlayCircleOutline
                    onClick={() => {
                      handleGform();
                    }}
                    style={{
                      fontSize: "30px",
                      marginRight: "-15px",
                      marginBottom: "-5px",
                      opacity: opacityCenter,
                    }}
                  />
                }
              />
            )
          : null}

        {location?.pathname?.split("/")?.[2] === "details" && (
          isBrowser ? 
          <BottomNavigationAction
            icon={
              <KeyboardArrowDownIcon
                {...longPressEventBottom}
                style={{
                  fontSize: "40px",
                  position: "absolute",
                  left: "115px",
                  bottom: "10px",
                  opacity: opacityDown,
                }}
              />
            }
          /> :
          <BottomNavigationAction
            icon={
              <KeyboardArrowDownIcon
                onClick={() => handleDown()}
                onTouchStart={() => handleBottomLongPress()}
                onMouseDown={() => {
                  handleBottomLongPress();
                }}
                onTouchEnd={() => handlePressEnd()}
                onMouseUp={handlePressEnd}
                style={{
                  fontSize: "40px",
                  position: "absolute",
                  left: "115px",
                  bottom: "10px",
                  opacity: opacityDown,
                }}
              />
            }
          />
        )}
        {MainChainData?.toString()
          .split(",")
          .findIndex((item) => item === fId.gId) ===
          MainChainData?.toString().split(",").length - 1 ||
        MainChainData === "" ||
        MainChainData?.length === 0
          ? null
          : location?.pathname?.split("/")?.[2] === "details" && (
              <BottomNavigationAction
                onClick={() => handleNext()}
                icon={
                  <KeyboardArrowRightIcon
                    style={{
                      fontSize: "40px",
                      position: "absolute",
                      left: "200px",
                      bottom: "10px",
                      opacity: opacityRight,
                    }}
                  />
                }
              />
            )}
      </BottomNavigation>
    </Grid>
  );
};

export default NavigationButton;

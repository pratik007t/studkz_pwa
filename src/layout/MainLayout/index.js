import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useParams,
  Outlet,
  useNavigate,
  useLocation,
  matchPath,
} from "react-router-dom";
import { styled, useTheme, useMediaQuery } from "@mui/material";
import { IconChevronRight, IconMenu2 } from "@tabler/icons";
import { toast } from "react-toastify";
import { deleteFavorite, favoriteList } from "store/action/favorite.action";
import { FLName, setStaticToken, userImage } from "store/action/auth.action";
import {
  FilterData,
  SparkFilter,
  SupportSystem,
} from "store/action/search.action";
import { SET_MENU } from "./../../store/actions";
import Breadcrumbs from "./../../ui-component/extended/Breadcrumbs";
import Sidebar from "./Sidebar";
import navigation from "./../../menu-items";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import {
  BottomNavigationAction,
  BottomNavigation,
  AppBar,
  Box,
  CssBaseline,
  Grid,
} from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { drawerWidth } from "./../../store/constant";
import FilterModal from "./../Modal/FilterModal";
import AuthModal from "layout/Modal/AuthModal";
import SparkFilterModal from "layout/Modal/SparkFilterModal";
import Exit from "layout/Modal/ExitModal";
import { staticToken, requestPermission } from "config/firebase";

import NavigationButton from "./HandleEvents/NavigationButtons";
import PopupStateData from "./HandleEvents/PopupState/index";
import TopUpStateData from "./HandleEvents/TopUpUsers";
import { BiSupport } from "react-icons/bi";
import AddIcon from "@mui/icons-material/Add";
import {
  BinaryFile,
  BinaryFileInfo,
  ChatGreenDot,
} from "store/action/chat.action";
import DownloadModal from "layout/Modal/DownloadModal";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import TopUpModal from "layout/Modal/TopUpModal";
import QuestionModal from "layout/Modal/QuestionModal";
import { isBrowser } from "react-device-detect";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import {
  NoteList,
  deleteNote,
  downloadNote,
  multiDownloadNote,
} from "store/action/note.action";
import NoteModal from "layout/Modal/NoteModal";
import Button from "@mui/material/Button";
import KeyDown from "./HandleEvents/Hidekeys/KeyDown";
import keymaster from "keymaster";
import SearchDialog from "views/SearchDialog";
const style = { fontSize: "22px" };
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("md")]: {
        marginLeft: -(drawerWidth - 10),
        width: `calc(100% - 30px)`,
        padding: "45px 43px 9px 21px",
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: "10px",
        width: `calc(100%  - 30px)`,
        padding: "5px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
        width: `calc(100%  - 30px)`,
        padding: "15px 5px 57px 5px",
        marginRight: "10px",
      },
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      padding: "15px 10px 30px 10px",
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
      },
    }),
  })
);

const MainLayout = ({ handleCloseEvent }) => {
  const [value, setValue] = useState(0);
  const [filterOpenModal, setFilterModal] = useState(false);
  const [sparkModal, setSparkModal] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [exitModal, setExitModal] = useState(false);
  const [binaryModal, setBinaryModal] = useState(false);
  const [topUpModal, setTopUpModal] = useState(false);
  const [questionModal, setQuestionModal] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const fId = useParams();
  const text = useParams();
  const id = fId.gId || fId.id;
  const scrollRef = useRef(null);

  const scrollTimeoutRef = useRef(null);

  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const allList = useSelector((state) => state.FavoriteReducer.delete);
  const allNotesList = useSelector((state) => state.NoteReducer.delete);

  const user = useSelector((state) => state.auth);
  const resultData = useSelector((state) => state.SearchReducer.result);
  const getByIdNotes = useSelector((state) => state.NoteReducer.getById);

  const language = localStorage.getItem("language");

  const UID = localStorage.getItem("userId");
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleSearch = (query) => {
    // console.log(`Searching for: ${query}`);
  };

  // useEffect(() => {
  //   if (UID) {
  //     requestPermission();
  //   }
  // }, [UID]);

  useEffect(() => {
    if (!user?.token && user?.token !== staticToken) {
      setStaticTokenData();
    }

    if (user?.token === staticToken && location?.pathname !== "/logout") {
      handleOpen();
    }

    if (location?.pathname === "/logout") {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [user, location?.pathname]);

  const setStaticTokenData = async () => {
    await dispatch(setStaticToken(staticToken));
  };

  useEffect(() => {
    // KeyDown()
    dispatch({ type: SET_MENU, opened: !matchDownMd });
    getAll();
    // eslint-disable-next-line
  }, [matchDownMd]);
  //========================key press==========================================
  useEffect(() => {
    const handleContextMenu = (event) => event.preventDefault();

    document.addEventListener("contextmenu", handleContextMenu);

    document.oncopy = () => {
      return false;
    };

    document.onselectstart = () => {
      return false;
    };

    document.onkeydown = (e) => {
      if (e.keyCode === 123) {
        return false;
      }
    };

    return () => {
      // Cleanup: Remove event listeners when the component unmounts
      document.removeEventListener("contextmenu", handleContextMenu);
      document.oncopy = null;
      document.onselectstart = null;
      document.onkeydown = null;
    };
  }, []);

  useEffect(() => {
    const enableCopy = resultData.copyFree === 1;
    document.oncopy = () => {
      return enableCopy;
    };

    document.onselectstart = () => {
      return enableCopy;
    };
  }, [resultData]);
  //========================key press==========================================
  const getAll = async () => {
    await dispatch(userImage());
    await dispatch(FLName());
  };

  const funR = () => {
    if (isBrowser) {
      // dispatch({ type: SET_MENU, opened: false });
    } else {
      dispatch({ type: SET_MENU, opened: false });
    }
  };
  //========================favorite==================================
  const handleDelete = async () => {
    if (allList == !allList) {
      toast.info("Nothing is Selected");
    } else {
      for (const element of allList) {
        const response = await dispatch(deleteFavorite(element));
        if (response) {
          dispatch({
            type: "DELETE_FAVORITE",
            payload: [],
          });
        }
      }
      await dispatch(favoriteList());
    }
  };

  //============================== notes ===================================>>
  const downloadNotes = async () => {
    const convertedNotes = allNotesList.map((note) => parseInt(note, 10));
    const response = await dispatch(
      convertedNotes.length > 1
        ? multiDownloadNote(convertedNotes)
        : downloadNote(convertedNotes)
    );
    if (response.status === "msg") {
      toast.error(response.msg, {
        autoClose: 50,
        hideProgressBar: true,
        theme: "colored",
      });
    } else if (response.status === "silent") {
      window.open(response.link, "_blank");
    }
  };
  //============================ another download note =====================>>
  const handleDownloadNote = async () => {
    const response = await dispatch(downloadNote(getByIdNotes.noteID));
    if (response.status === "msg") {
      toast.error(response.msg, {
        autoClose: 50,
        hideProgressBar: true,
        theme: "colored",
      });
    } else if (response.status === "silent") {
      window.open(response.link, "_blank");
    }
  };

  //=======================================================================>>
  const handleLeftDrawerToggle = async () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    await dispatch(ChatGreenDot());
  };

  const handleNavigate = () => {
    const targetPath = `/notes/${fId.id}`;
    const targetCreate = "/notes/create";
    if (
      targetPath === location.pathname ||
      targetCreate === location.pathname
    ) {
      dispatch({
        type: "NOTE_NAVIGATE",
        payload: true,
      });
    } else {
      navigate(-1);
    }
  };

  const handleClick = async () => {
    navigate(`search/file/${fId.gId}`);
  };

  const handleFilterOpen = () => {
    setFilterModal(true);
    dispatch(FilterData());
  };

  const handleSpark = () => {
    setSparkModal(true);
    dispatch(SparkFilter());
  };

  const handleFilterClose = () => {
    setFilterModal(false);
  };
  const handleSparkClose = () => {
    setSparkModal(false);
  };

  const handleBinaryClose = () => {
    setBinaryModal(false);
  };
  const handleTopUpClose = () => {
    setTopUpModal(false);
  };
  const handleQuestionClose = () => {
    setQuestionModal(false);
  };
  //---------------Download -------------------------------------->
  const handleClickDownload = async () => {
    try {
      const getBinaryFileInfo = await dispatch(BinaryFileInfo(id));

      if (getBinaryFileInfo.status == "silent") {
        const binary = await dispatch(BinaryFile(id));
        if (binary.status === "need_pay") {
          setTopUpModal(true);
        } else if (binary.status === "ok") {
          setBinaryModal(true);
        } else {
          toast.error("Something went wrong");
        }
      } else if (getBinaryFileInfo.status === "ok") {
        setQuestionModal(true);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  //---------------auth modal ---------------------
  const handleOpen = () => setOpenAuth(true);
  const handleClose = () => setOpenAuth(false);

  //===================handleSupport=====================
  const handleSupport = async () => {
    const data = await dispatch(SupportSystem());
    if (data) {
      navigate(`/chat/conversation/${data.receiverID}`);
    } else {
      toast.error("Message ID Not found");
    }
  };
  //============Note-modal================
  const handleNoteModal = () => {
    setNoteModal(true);
  };
  const handleNoteClose = () => {
    setNoteModal(false);
  };

  //============exit-modal================
  const handleExitModal = () => {
    setExitModal(true);
  };
  const handleExitClose = () => {
    setExitModal(false);
  };
  //======================================
  const handleWord = () => {
    navigate("/files/add-file");
  };
  const handlePresentation = () => {
    navigate("/files/add-file");
  };
  const handleStatic = () => {
    navigate("/files/add-file");
  };
  const handleBought = () => {
    navigate("/files/add-file");
  };
  //======================================

  const handleScrollTop = () => {
    if (scrollRef.current) {
      const height = scrollRef.current.clientHeight;
      const vhPixels = height * -0.9;
      scrollRef.current.scrollBy({
        top: vhPixels,
        behavior: "smooth",
      });
    }
  };

  const handleScrollDown = () => {
    if (scrollRef.current) {
      const height = scrollRef.current.clientHeight;
      const vhPixels = height * 0.9;
      scrollRef.current.scrollBy({
        top: vhPixels,
        behavior: "smooth",
      });
    }
  };

  const handleLongPressEventUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  const handleLongPressEventDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const clickTopLongPress = () => {
    scrollTimeoutRef.current = setTimeout(() => {
      handleLongPressEventUp();
    }, 1000);
  };

  const clickBottomLongPress = () => {
    scrollTimeoutRef.current = setTimeout(() => {
      handleLongPressEventDown();
    }, 1000);
  };

  const clickPressEnd = () => {
    clearTimeout(scrollTimeoutRef.current);
  };

  //=========================Browser======================
  const handleTopLongPressBrowser = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleTopBrowser = () => {
    const height = window.innerHeight;
    const vhPixels = height * -0.9;
    window.scrollBy({
      top: vhPixels,
      behavior: "smooth",
    });
  };
  const handleBottomLongPressBrowser = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  const handleDownBrowser = () => {
    const height = window.innerHeight;
    const vhPixels = height * 0.9;
    window.scrollBy({
      top: vhPixels,
      behavior: "smooth",
    });
  };

  //========================handleSaved================================
  const handleAdded = () => {
    navigate("/notes/create");
  };

  const handleSaved = () => {
    dispatch({
      type: "NOTE_BOOLEAN",
      payload: true,
    });
  };
  const handleArrowLined = () => {
    dispatch({
      type: "NOTE_ARROW_BOOLEAN",
      payload: true,
    });
  };
  //========================clear====================================
  const handleClear = () => {
    handleCloseEvent();
  };
  //========================clear====================================
  useEffect(() => {
    // Hook F2 key globally to open the dialog
    keymaster("f2", openDialog);
    return () => {
      keymaster.unbind("f2");
    };
  }, []);

  const openChatPage = () => {
    navigate("/chat");
  };
  useEffect(() => {
    // Hook F2 key globally to open the dialog
    keymaster("f4", openChatPage);
    return () => {
      keymaster.unbind("f4");
    };
  }, []);

  return (
    <Box>
      <NoteModal open={noteModal} onClose={handleNoteClose} />
      <SearchDialog
        open={dialogOpen}
        onClose={closeDialog}
        onSearch={handleSearch}
      />
      <Exit
        open={exitModal}
        onClose={handleExitClose}
        onButton={handleExitClose}
      />
      <FilterModal
        open={filterOpenModal}
        onClose={handleFilterClose}
        onButton={handleFilterClose}
      />
      <SparkFilterModal
        open={sparkModal}
        onClose={handleSparkClose}
        onButton={handleSparkClose}
      />
      <DownloadModal
        open={binaryModal}
        onClose={handleBinaryClose}
        onButton={handleBinaryClose}
      />
      <TopUpModal
        open={topUpModal}
        onClose={handleTopUpClose}
        onButton={handleTopUpClose}
      />
      <QuestionModal
        open={questionModal}
        onClose={handleQuestionClose}
        onButton={handleQuestionClose}
      />

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* drawer */}
        <Sidebar
          drawerOpen={leftDrawerOpened}
          drawerToggle={handleLeftDrawerToggle}
        />

        {/* main content */}
        <Main
          theme={theme}
          open={leftDrawerOpened}
          onClick={funR}
          sx={{
            WebkitUserSelect: resultData.copyFree === 1 ? "auto" : "none",
            MozUserSelect: resultData.copyFree === 1 ? "auto" : "none",
            MsUserSelect: resultData.copyFree === 1 ? "auto" : "none",
            userSelect: resultData.copyFree === 1 ? "auto" : "none",
          }}
        >
          {/* breadcrumb */}
          <Breadcrumbs
            separator={IconChevronRight}
            navigation={navigation}
            icon
            title
            rightAlign
          />
          {isBrowser ? (
            <div>
              <Outlet />
              <NavigationButton
                handleTopBrowser={handleTopBrowser}
                handleDownBrowser={handleDownBrowser}
                handleTopLongPressBrowser={handleTopLongPressBrowser}
                handleBottomLongPressBrowser={handleBottomLongPressBrowser}
              />
            </div>
          ) : (
            <div
              item
              ref={scrollRef}
              style={{
                position: "absolute",
                top: "0px",
                bottom: "58px",
                left: "10px",
                padding: "10px",
                right: "0px",
                overflowX: "auto",
                inset: "0px 0px 55px 0px",
              }}
            >
              <Outlet />
              <NavigationButton
                handleScrollTop={handleScrollTop}
                handleScrollDown={handleScrollDown}
                clickTopLongPress={clickTopLongPress}
                clickPressEnd={clickPressEnd}
                clickBottomLongPress={clickBottomLongPress}
              />
            </div>
          )}
        </Main>
      </Box>
      {/* Footer */}
      <Box>
        <AppBar
          sx={{
            bottom: 0,
            top: "unset",
            zIndex: 1,
            boxShadow: "none",
          }}
        >
          <Box height={2}>
            <hr />
          </Box>

          <Box sx={{ maxWidth: "100%" }}>
            <Grid>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                sx={{
                  "& .MuiBottomNavigationAction-root, svg": {
                    color: "#7dbf41",
                    margin: "-10px",
                  },
                }}
              >
                {(location?.pathname === "/search" ||
                  location?.pathname?.split("/")?.[2] === "details" ||
                  location?.pathname?.split("/")?.[2] === "file" ||
                  location?.pathname?.split("/")?.[2] === "list" ||
                  location?.pathname === "/search/file" ||
                  location?.pathname === "/favorites" ||
                  location?.pathname?.split("/")?.[3] === `${text?.filter}` ||
                  location?.pathname === "/files/add-file" ||
                  location?.pathname === "/files/word-file" ||
                  location?.pathname === "/files/presentations" ||
                  location?.pathname === "/files/statistics" ||
                  location?.pathname === "/files/bought" ||
                  location?.pathname === "/notes" ||
                  location?.pathname?.split("/")?.[1] === "notes" ||
                  location?.pathname === "/about" ||
                  location?.pathname === "/chat" ||
                  location?.pathname === "/chat/archive_chat" ||
                  location?.pathname === "/search/googleForm" ||
                  location?.pathname === "/search/filter") && (
                  <BottomNavigationAction
                    onClick={handleNavigate}
                    icon={<WestIcon />}
                  />
                )}

                {handleCloseEvent
                  ? location?.pathname?.split("/")?.[2] === "file" && (
                      <BottomNavigationAction
                        onClick={handleClear}
                        icon={<ClearIcon />}
                      />
                    )
                  : null}

                {location?.pathname?.split("/")?.[3] === `${text?.filter}` && (
                  <BottomNavigationAction
                    onClick={handleFilterOpen}
                    icon={<FilterAltOutlinedIcon />}
                  />
                )}

                {language === "en"
                  ? isDown
                  : location?.pathname?.split("/")?.[2] === "details" &&
                    ((resultData.canBuyFile === 0 &&
                      resultData.canViewPDF === 0) ||
                    resultData.issetAsPic === "0" ? null : (
                      <BottomNavigationAction
                        label=""
                        onClick={handleClick}
                        icon={<ImageIcon />}
                      />
                    ))}

                {(location?.pathname === "/search" ||
                  location?.pathname === "/favorites" ||
                  location?.pathname === "/search/file" ||
                  location?.pathname?.split("/")?.[3] === `${text?.filter}` ||
                  location?.pathname?.split("/")?.[2] === "list" ||
                  location?.pathname === "/files/add-file" ||
                  location?.pathname === "/files/word-file" ||
                  location?.pathname === "/files/presentations" ||
                  location?.pathname === "/files/statistics" ||
                  location?.pathname === "/files/bought" ||
                  location?.pathname === "/notes" ||
                  location?.pathname?.split("/")?.[1] === "notes" ||
                  location?.pathname === "/about" ||
                  location?.pathname === "/chat" ||
                  location?.pathname === "/chat/archive_chat" ||
                  location?.pathname?.split("/")?.[2] === "details" ||
                  location?.pathname?.split("/")?.[2] === "file" ||
                  location?.pathname === "/search/googleForm" ||
                  location?.pathname === "/search/filter") && (
                  <BottomNavigationAction
                    onClick={handleLeftDrawerToggle}
                    icon={<IconMenu2 />}
                  />
                )}

                {!allNotesList.length > 0 &&
                  location?.pathname === "/notes" && (
                    <BottomNavigationAction
                      onClick={handleAdded}
                      icon={<AddIcon style={style} />}
                    />
                  )}

                {location?.pathname?.split("/")?.[1] === "notes" &&
                  location?.pathname?.split("/")?.[2] === `${fId.id}` && (
                    <BottomNavigationAction
                      onClick={handleSaved}
                      icon={<SaveIcon style={style} />}
                    />
                  )}

                {location?.pathname?.split("/")?.[1] === "notes" &&
                  location?.pathname?.split("/")?.[2] === `${fId.id}` && (
                    <BottomNavigationAction
                      onClick={handleDownloadNote}
                      icon={<FileDownloadOutlinedIcon style={style} />}
                    />
                  )}

                {location?.pathname === "/notes/create" && (
                  <BottomNavigationAction
                    onClick={handleSaved}
                    icon={<SaveIcon style={style} />}
                  />
                )}

                {location?.pathname === "/notes/create" && (
                  <BottomNavigationAction
                    onClick={handleArrowLined}
                    icon={<KeyboardArrowUpOutlinedIcon style={style} />}
                  />
                )}

                {location?.pathname?.split("/")?.[1] === "notes" &&
                  location?.pathname?.split("/")?.[2] === `${fId.id}` && (
                    <BottomNavigationAction
                      onClick={handleArrowLined}
                      icon={<KeyboardArrowUpOutlinedIcon style={style} />}
                    />
                  )}

                {location?.pathname === "/files/add-file" && (
                  <BottomNavigationAction
                    onClick={handleSupport}
                    icon={<BiSupport style={style} />}
                  />
                )}

                {location?.pathname === "/files/word-file" && (
                  <BottomNavigationAction
                    onClick={handleWord}
                    icon={<AddIcon />}
                  />
                )}
                {location?.pathname === "/files/presentations" && (
                  <BottomNavigationAction
                    onClick={handlePresentation}
                    icon={<AddIcon />}
                  />
                )}
                {location?.pathname === "/files/statistics" && (
                  <BottomNavigationAction
                    onClick={handleStatic}
                    icon={<AddIcon />}
                  />
                )}
                {location?.pathname === "/files/bought" && (
                  <BottomNavigationAction
                    onClick={handleBought}
                    icon={<AddIcon />}
                  />
                )}

                {(location?.pathname?.split("/")?.[2] === "list" ||
                  location?.pathname === "/about") && (
                  <BottomNavigationAction
                    onClick={handleSupport}
                    icon={<BiSupport style={style} />}
                  />
                )}

                {(location?.pathname?.split("/")?.[2] === "details" ||
                  location?.pathname?.split("/")?.[2] === "file") &&
                  (resultData.canBuyFile === 0 &&
                  resultData.canViewPDF === 0 ? null : (
                    <BottomNavigationAction
                      onClick={handleClickDownload}
                      label=""
                      icon={<SaveAltOutlinedIcon />}
                    />
                  ))}
                {allList?.length !== 0
                  ? location?.pathname === "/favorites" && (
                      <BottomNavigationAction
                        onClick={handleDelete}
                        label=""
                        icon={<DeleteIcon />}
                      />
                    )
                  : null}

                {allNotesList?.length !== 0 && location?.pathname === "/notes"
                  ? [
                      <BottomNavigationAction
                        key="delete"
                        // onClick={handleNoteDelete}
                        onClick={handleNoteModal}
                        label=""
                        icon={<DeleteIcon />}
                      />,
                      <BottomNavigationAction
                        key="download"
                        onClick={downloadNotes}
                        label=""
                        icon={<FileDownloadOutlinedIcon />}
                      />,
                    ]
                  : null}

                {location?.pathname === "/search" && (
                  <BottomNavigationAction
                    onClick={handleSupport}
                    icon={<BiSupport style={style} />}
                  />
                )}
                {location?.pathname === "/about" && (
                  <BottomNavigationAction
                    onClick={handleExitModal}
                    icon={<ExitToAppIcon />}
                  />
                )}

                <PopupStateData />
                <TopUpStateData />
              </BottomNavigation>
            </Grid>
          </Box>

          <AuthModal
            open={openAuth}
            onClose={handleClose}
            onButton={handleClose}
          />
        </AppBar>
      </Box>
    </Box>
  );
};

export default MainLayout;

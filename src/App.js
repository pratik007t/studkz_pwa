import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import Routes from "./routes";
import themes from "./themes";
import NavigationScroll from "./layout/NavigationScroll";
import { firebaseConfig } from "./config/firebase";
import withClearCache from "./ClearCache";
import firebase from "firebase/compat/app";
import { DbContext } from "./config/dbContext";
import io from "socket.io-client";
import { isBrowser } from "react-device-detect";
import { SocketIo } from "store/action/auth.action";
import ReactGA from "react-ga4";
// const TRACKING_ID = "G-T9BY57R12Q"; //dev
const TRACKING_ID = "G-8PQTVY43ZK"; //riskk
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const ClearCacheComponent = withClearCache(MainApp);

const serverURL = process.env.REACT_APP_CONNECTED_URL;
let socket;

const App = () => {
  const customization = useSelector((state) => state.customization);
  const dispatch = useDispatch();
  const socketToken = localStorage.getItem("socketToken");
  const userId = localStorage.getItem("userId");
  const deviceToken = localStorage.getItem("deviceToken");

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []); 

  useEffect(() => {
    if (userId && socketToken ) {
      // requestPermission();
      const query = {
        intUID: userId,
        platform: "pwa",
        token: socketToken,
        deviceToken: deviceToken,
      };
      socket = io.connect(serverURL, { query });

      socket.on("connect", () => {
        dispatch({
          type: "SOCKET_DATA",
          payload: socket,
        });
        socket.emit("checkOnlineStatus", { intUID: userId });
      });

      socket.on("connect_error", (error) => {
        console.log("Socket connection error:", error);
      });

      socket.on("connect_timeout", () => {
        console.log("Socket connection timeout");
      });
      socket.on("re-connect", async (data) => {
        try {
          const token = await dispatch(SocketIo()); 
          if (token.socketToken) {
            query.token = token.socketToken;
            await socket.connect();
            console.log("Socket connected successfully");
          } else {
            console.log("No socket token available");
          }
        } catch (error) {
          console.error("Error during re-connect:", error);
        }
      });

      return () => {
        // Cleanup socket connection on component unmount
        socket.disconnect();
      };
    }
  }, [socketToken, userId, deviceToken, dispatch]);

  //=====================Remove Scroller=========================
  const scrollRemove = () => {
    if (!isBrowser) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  };
  useEffect(() => {
    scrollRemove();
  }, []);
  //=====================Remove Scroller=========================
  return (

    
    <DbContext.Provider value={{ db }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>        
            <Routes />
            <ClearCacheComponent />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </DbContext.Provider>
  );
};

function MainApp() {
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;

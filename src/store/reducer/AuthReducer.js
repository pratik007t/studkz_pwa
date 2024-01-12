import jwt_decode from "jwt-decode";
import { getToken } from "../../config/action";
import {
  LOG_OUT,
  SET_TOKEN,
  GET_BALANCE,
  CLEAR_LOGIN_ERRORS,
  SWITCH_NAV,
  SET_LOGIN_ERROR,
  SET_USER,
  SET_USER_AVA_URL,
  SET_FL_NAME,
  REFRESH_TOKEN,
} from "../constant/index";

const user = JSON.parse(localStorage.getItem("user"));
const initState = {
  token: null,
  refreshToken: null,
  user: user ? user : user,
  loginerror: { email: "", password: "" },
  isNav: false,
  avaUrl: null,
  flname: null,
  balance: null,
  socket_token: [],
  socket_data:null,
};

const verifytoken = (token) => {
  try {
    const decodedToken = jwt_decode(token);
    const ExpireIn = new Date(decodedToken.exp * 1000);
    if (new Date() > ExpireIn) {
      localStorage.removeItem("token");
      return null;
    } else {
      return decodedToken;
    }
  } catch (error) {
    return null;
  }
};

let token = getToken();

const setToken = (token) => {
  if (token) {
    const decodetoken = verifytoken(token);
    if (decodetoken) {
      initState.token = token;
      initState.user = decodetoken;
    }
  }
  return;
};

setToken(token);

const AuthReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'RESET_STORE':
      return initState;
    case SET_TOKEN:
      // setToken(payload);
      return { ...state, token: payload };
    case SET_USER:
      return { ...state, user: payload };
    case SET_USER_AVA_URL:
      return { ...state, avaUrl: payload };
    case SET_FL_NAME:
      return { ...state, flname: payload };
    case GET_BALANCE:
      return { ...state, balance: payload };
    case CLEAR_LOGIN_ERRORS:
      return { ...state, loginerror: { email: "", password: "" } };
    case SWITCH_NAV:
      return { ...state, isNav: !state.isNav };
    case SET_LOGIN_ERROR:
      return {
        ...state,
        loginerror: { email: payload.email, password: payload.password },
      };
    case LOG_OUT:
      return { ...state, user: "", token: "" };
    case REFRESH_TOKEN:
      return { ...state, refreshToken: payload };
    case "SOCKET":
      return { ...state, socket: payload };
    case "SOCKET_IO":
      return { ...state, socket_token: payload?.socketToken };
      case "SOCKET_DATA":
      return { ...state, socket_data: payload };

    default:
      return state;
  }
};

export default AuthReducer;

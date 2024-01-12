import {
  SET_TOKEN,
  SET_USER,
  SET_USER_AVA_URL,
  SET_FL_NAME,
  REFRESH_TOKEN
} from "../constant/index";
import axiosinstance from "../../config/axios";
import { toast } from "react-toastify";
let FormData = require("form-data");

export const setStaticToken = (accessToken) => {
  return async (dispatch) => {
    try {
      localStorage.setItem("token", accessToken);
      dispatch({ type: SET_TOKEN, payload: accessToken });
      return true;
    } catch (error) {
      return false;
    }
  };
};

export const authRedirectToken = (directToken) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      appendData.append('token',directToken);
      const { data } = await axiosinstance.post("checkDirectAuth", appendData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userID);
      localStorage.setItem("refreshToken", data?.refreshToken);
      localStorage.setItem("language", data.langCode);
      dispatch({ type: SET_TOKEN, payload: data.token });
      dispatch({ type: "SET_LOADER", payload: false });
      return data;
    } catch (error) {
      dispatch({ type: "SET_LOADER", payload: false });
      toast.error(
        (error.response?.data &&
          error.response?.data?.error &&
          error.response?.data?.error?.message) ||
        "Something went wrong"
      );
      return false;
    }
  };
};

export const refreshToken = (data) => (dispatch) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", data.userID);
  localStorage.setItem("refreshToken", data?.refreshToken);

  dispatch({
    type: REFRESH_TOKEN,
    payload: data?.refreshToken,
  })
  
  dispatch({
    type: SET_TOKEN,
    payload: data.token
  });
}

export const refreshTokenAction  = (data) => (dispatch) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", data.userID);
  localStorage.setItem("refreshToken", data?.refreshToken);

  dispatch({
    type: REFRESH_TOKEN,
    payload: data?.refreshToken,
  })
  
  dispatch({
    type: SET_TOKEN,
    payload: data.token
  });
}

export const login = (User, fireToken) => {
  return async (dispatch) => {
    try {
      let token = new FormData();
      dispatch({ type: "SET_LOADER", payload: true });
      token.append("fireToken", fireToken);
      const deviceToken = localStorage.getItem("deviceToken");
      token.append("deviceUID", deviceToken);
      const { data } = await axiosinstance.post("loginFirebase", token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userID);
      localStorage.setItem("refreshToken", data?.refreshToken);
      localStorage.setItem("language", "kz");
      localStorage.setItem("user", JSON.stringify(User.additionalUserInfo.profile));
      
      dispatch({ type: SET_TOKEN, payload: data.token });
      dispatch({ type: REFRESH_TOKEN, payload: data?.refreshToken });
      dispatch({ type: SET_USER, payload: User.additionalUserInfo.profile });
      dispatch({ type: "SET_LOADER", payload: false });
      return data;

    } catch (error) {
      dispatch({ type: "SET_LOADER", payload: false });
      return false;
    }
  };
};

export const SocketIo = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }

      const { data } = await axiosinstance.post("/chat/getSocketToken", appendData,config);

      localStorage.setItem("socketToken", data?.socketToken);

      dispatch({ type: "SOCKET_IO", payload: data });

      dispatch({ type: "SET_LOADER", payload: false });
      return data;
    } catch (error) {
      dispatch({ type: "SET_LOADER", payload: false });
      toast.error(
        (error.response?.data &&
          error.response?.data?.error &&
          error.response?.data?.error?.message) ||
        "Something went wrong"
      );
      return false;
    }
  };
};
export const userImage = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }

      const { data } = await axiosinstance.post("avaURL", appendData,config);

      dispatch({ type: SET_USER_AVA_URL, payload: data?.avaUrl });

      dispatch({ type: "SET_LOADER", payload: false });
      return true;
    } catch (error) {
      dispatch({ type: "SET_LOADER", payload: false });
      toast.error(
        (error.response?.data &&
          error.response?.data?.error &&
          error.response?.data?.error?.message) ||
        "Something went wrong"
      );
      return false;
    }
  };
};

export const FLName = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }

      const { data } = await axiosinstance.post("flname", appendData,config);
      dispatch({ type: SET_FL_NAME, payload: data?.flname });
      dispatch({ type: "SET_LOADER", payload: false });
      return true;
    } catch (error) {
      dispatch({ type: "SET_LOADER", payload: false });
      toast.error(
        (error.response?.data &&
          error.response?.data?.error &&
          error.response?.data?.error?.message) ||
        "Something went wrong"
      );
      return false;
    }
  };
};

export const Logout = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      dispatch({ type: 'RESET_STORE', payload: {} });
      dispatch({ type: "SET_LOADER", payload: false });
      return true;
    } catch (error) {
      dispatch({ type: "SET_LOADER", payload: false });
      toast.error(
        (error.response?.data &&
          error.response?.data?.error &&
          error.response?.data?.error?.message) ||
        "Something went wrong"
      );
      return false;
    }
  };
};


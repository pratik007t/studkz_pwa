import { API_URL } from "./Env";
import axios from "axios";
import store from "../store";
import TokenService from "./../services/token.service";

const axiosInstance = axios.create({
  baseURL: API_URL, // Replace with your API base URL
});

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addSubscriber(callback) {
  refreshSubscribers.push(callback);
}

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = store.getState().auth;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    if (response?.data?.error === "need_refresh") {
      const originalRequest = response.config;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { refreshToken } = store.getState().auth;

          let bodyData = new FormData();
          bodyData.append(
            "refreshToken",
            refreshToken ? refreshToken : TokenService.getLocalRefreshToken()
          );
          const refreshResponse = await axiosInstance.post(
            "/runTokenRefresh",
            bodyData
          );

          console.log({ refreshResponse });
          const newAccessToken = refreshResponse.data.token;

          store.dispatch({
            type: "REFRESH_TOKEN",
            payload: refreshResponse?.data?.refreshToken,
          });

          store.dispatch({
            type: "SET_TOKEN",
            payload: newAccessToken,
          });

          onRefreshed(newAccessToken);

          isRefreshing = false;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          store.dispatch({
            type: "REFRESH_TOKEN",
            payload: null,
          });

          store.dispatch({
            type: "SET_TOKEN",
            payload: null,
          });

          TokenService.updateLocalAccessToken(null);
          TokenService.updateRefreshToken(null);
         
        }
      } else {
        return new Promise((resolve) => {
          addSubscriber((token) => {
            response.config.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(response.config));
          });
        });
      }
    } 
    else if(response?.data?.error === "refresh token is old"){
      localStorage.clear()
      window.location.href = "/login"
    }
    else {
      return response;
    }
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken } = store.getState().auth;

      try {
        let bodyData = new FormData();
        bodyData.append("refreshToken", refreshToken);
        const response = await axiosInstance.post("/runTokenRefresh", bodyData);

        const newAccessToken = response.data.token;
        
        store.dispatch({
          type: "REFRESH_TOKEN",
          payload: response?.data?.refreshToken,
        });

        store.dispatch({
          type: "SET_TOKEN",
          payload: newAccessToken,
        });

        TokenService.updateLocalAccessToken(newAccessToken);
        TokenService.updateRefreshToken(response?.data?.refreshToken);

        onRefreshed(newAccessToken);

        isRefreshing = false;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch({
          type: "REFRESH_TOKEN",
          payload: null,
        });

        store.dispatch({
          type: "SET_TOKEN",
          payload: null,
        });
        
       

        // need to clear and redirect 
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

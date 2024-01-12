import axiosinstance from "../../config/axios";
import { toast } from "react-toastify";
import axios from "axios";

export const fileList = (langCode) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }
      const language = localStorage.getItem("language");
      appendData.append("langCode", language);
      const { data } = await axiosinstance.post("/addFileInfo", appendData,config);
      dispatch({
        type: "RETRIEVE_FILE",
        payload: data,
      });

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
export const UploadURL = (obj) => {
  return async (dispatch) => {
    try {
      // dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }
      appendData.append("fileName", obj.fileName);
      appendData.append("fileSize", obj.fileSize);
      const { data } = await axiosinstance.post("/getUploadURL", appendData,config);

      dispatch({
        type: "RETRIEVE_FILE_URL",
        payload: data,
      });
      // dispatch({ type: "SET_LOADER", payload: false });
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
export const UploadFile = (url, file) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      axios({
        method: "put",
        url: url,
        data: file,
      }).then(function (response) {
        console.log("response", response);
      });
      // toast.success("File Uploaded Successfully");
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

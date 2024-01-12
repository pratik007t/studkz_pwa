import axiosinstance from "../../config/axios";
import { toast } from "react-toastify";

export const presentationList = (page) => {
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();
        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }
        const language = localStorage.getItem("language");
        appendData.append('langCode',language);
        appendData.append('currentPageNum', page);
  
        const {data} = await axiosinstance.post("/myprezent/list", appendData,config);
      
  
        dispatch({
          type: "RETRIEVE_PRESENTATION",
          payload: data
        });
        dispatch({
          type: "MAIN_CHAIN",
          payload: data?.mainChain,
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
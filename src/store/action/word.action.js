import axiosinstance from "../../config/axios";
import { toast } from "react-toastify";

export const wordList = (page) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
     const config = { headers: { 'Authorization': 'Bearer ' + token } }
      appendData.append("currentPageNum", page);
      const language = localStorage.getItem("language");
      appendData.append("langCode", language);

      const { data } = await axiosinstance.post(`/mydoc/list`, appendData,config);

      dispatch({
        type: "RETRIEVE_WORD",
        payload: data,
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
export const editList = (id, price) => {
  
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
     const config = { headers: { 'Authorization': 'Bearer ' + token } }
      // appendData.append("currentPageNum", page);
      const language = localStorage.getItem("language");
      appendData.append("langCode", language);
      appendData.append('globalID',id);
      appendData.append('newPrice', price);
      const { data } = await axiosinstance.post(`/saveNewPrice`, appendData,config);
     
      dispatch({
        type: "EDIT_WORD",
        payload: data,
      });
   

      toast.success(<div style={{textAlign:"center",height:"15px"}}><span style={{fontSize:"30px",background: "#393e46" }}>👌</span></div>,{
        autoClose:100,
        hideProgressBar:true,
        // theme:"colored"
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

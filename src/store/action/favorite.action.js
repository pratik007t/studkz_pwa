import axiosinstance from "../../config/axios";
import { toast } from "react-toastify";

export const AddFavorite = (id) => {
  return async (dispatch) => {
    try {
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }


    
      const { data } = await axiosinstance.post(
        `favorite/add/${id}`,
        appendData,config
      );
      dispatch({
        type: "ADD_FAVORITE",
        payload: data,
      });
      toast.success(<div style={{textAlign:"center",height:"15px"}}><span style={{fontSize:"30px",background: "#393e46" }}>👌</span></div>,{
        autoClose:100,
        hideProgressBar:true,
        // theme:"colored"
      });

      return true;
    } catch (error) {
     
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

export const favoriteList = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }
      const language = localStorage.getItem("language");
       appendData.append('langCode',language);

      const data = await axiosinstance.post("favorite/list", appendData,config);
      dispatch({
        type: "RETRIEVE_FAVORITE",
        payload: data?.data,
      });

      dispatch({
        type:  "FAVORITE_DEFAULT",
        payload: data?.data,
      });

      dispatch({
        type: "MAIN_CHAIN",
        payload: data?.data?.mainChain,
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

export const deleteFavorite = (id) => {
  return async (dispatch) => {
    try {
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }

      const { data } = await axiosinstance.post(
        `favorite/delete/${id}`,
        appendData,config
      );

      toast.success(<div style={{textAlign:"center",height:"15px"}}><span style={{fontSize:"30px",background: "#393e46" }}>👌</span></div>,{
        autoClose:100,
        hideProgressBar:true,
        // theme:"colored"
      });
      dispatch({
        type: "DELETE_FAVORITE",
        payload: data,
      });

      return true;
    } catch (error) {
      
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
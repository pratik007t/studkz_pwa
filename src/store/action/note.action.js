import axiosinstance from "../../config/axios";
import { toast } from "react-toastify";


export const NoteList = (page) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }
      const language = localStorage.getItem("language");
      appendData.append('langCode',language);
      appendData.append('currentPageNum', page);
      const data = await axiosinstance.post("note/list", appendData,config);

      dispatch({
        type: "NOTE_LIST",
        payload: data?.data,
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

export const deleteNote = (id) => {
  return async (dispatch) => {
    try {
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }
      const language = localStorage.getItem("language");
      appendData.append('langCode',language);
      appendData.append('noteID',id);
      const { data } = await axiosinstance.post('note/delete',appendData,config);
      toast.success(<div style={{textAlign:"center",height:"15px"}}><span style={{fontSize:"30px",background: "#393e46" }}>👌</span></div>,{
      autoClose:50,
      hideProgressBar:true,
      // theme:"colored"
      });
      dispatch({
        type: "DELETE_NOTE_ID",
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

export const downloadNote = (id) => {
  return async (dispatch) => {
    try {
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }
      const language = localStorage.getItem("language");
      appendData.append('langCode',language);
      appendData.append('noteID',id);
      const { data } = await axiosinstance.post('note/download',appendData,config);
      dispatch({
        type: "NOTE_DOWNLOAD",
        payload: data,
      });
      return data;
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
export const multiDownloadNote = (id) => {
  return async (dispatch) => {
    try {
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }
      const language = localStorage.getItem("language");
      appendData.append('langCode',language);
      appendData.append('aNoteID',id);
      const { data } = await axiosinstance.post('note/download',appendData,config);
      dispatch({
        type: "NOTE_DOWNLOAD",
        payload: data,
      });
      return data;
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

export const getByIdNotes = (id) => {
  return async (dispatch) => {
    try {
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }
      const language = localStorage.getItem("language");
      appendData.append('langCode',language);
      appendData.append('globalID',id);
      const { data } = await axiosinstance.post('note/getByGlobalID',appendData,config);
      dispatch({
        type: "NOTE_GET_BY_ID",
        payload: data,
      });
      return data;
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

export const getBySaveNotes = (id,title,note) => {
  return async (dispatch) => {
    try {
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }
      const language = localStorage.getItem("language");
      appendData.append('langCode',language);
      appendData.append('globalID',id);
      appendData.append('title',title);
      appendData.append('note',note);
      const { data } = await axiosinstance.post('note/saveByGlobalID',appendData,config);
      dispatch({
        type: "NOTE_SAVE",
        payload: data,
      });
      return data;
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

export const createNotes = (title,note) => {
  return async (dispatch) => {
    try {
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }
      const language = localStorage.getItem("language");
      appendData.append('langCode',language);
      appendData.append('title',title);
      appendData.append('note',note);
      const { data } = await axiosinstance.post('note/saveByID',appendData,config);
      dispatch({
        type: "NOTE_CREATE",
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
import axiosinstance from "../../config/axios";
import { toast } from "react-toastify";
import axios from 'axios';

export const ChatList = (page) => {
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();
        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }
        const language = localStorage.getItem("language");
        appendData.append('langCode',language);
        appendData.append('currentPageNum',page);
        const {data} = await axiosinstance.post(`chat/list`, appendData,config);
        dispatch({
          type: "CHAT_LIST",
          payload: data
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

  export const conversationList = (receiverID,globalID=null) => {
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();
        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }

        const language = localStorage.getItem("language");
        appendData.append('langCode',language);
        appendData.append('currentPageNum','1');
        appendData.append('receiverID', receiverID);
        appendData.append('globalID', globalID);

        const {data} = await axiosinstance.post(`chat/open`, appendData,config);
        // const notReadedData = data.find(obj => obj.isReaded === "0");

        dispatch({
          type: "CHAT_CONVERSATION_LIST",
          payload: data
        });
  
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

  export const sendMessage = (threadID,msg, sendMessage=null)        => {
    
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();
        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }

        appendData.append('threadID',threadID);
        if(sendMessage) {
          appendData.append('reply',sendMessage);
          appendData.append('msg',msg);

        }else{
          appendData.append('msg',msg);
          appendData.append('reply',"");

        }
        const language    = localStorage.getItem("language");
        appendData.append('langCode',language);
        const {data} = await axiosinstance.post(`chat/send`, appendData,config);
        dispatch({
          type: "SEND_MSG",
          payload: data.jLastMsg
        });
  
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

  export const TopUpList = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();
        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }

        const language = localStorage.getItem("language");
        appendData.append('langCode',language);
        const {data} = await axiosinstance.post(`chat/topusers`, appendData,config);
        dispatch({
          type: "TOP_UP_LIST",
          payload: data
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

  export const ChatUploadURL = (threadID,obj) => {
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();
        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }
        appendData.append("fileName", obj.fileName);
        appendData.append("fileSize", obj.fileSize);
        const language = localStorage.getItem("language");
        appendData.append('langCode',language);
        appendData.append('threadID',threadID);
        appendData.append('width',obj.width || "");
        appendData.append('height',obj.height || "");
        const { data } = await axiosinstance.post("chat/getUploadURL", appendData,config);
   
        dispatch({
          type: "RETRIEVE_CHAT_FILE_URL",
          payload: data,
        });
  
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

  // export const ChatUploadFile = (url,file) => {
  //   return async (dispatch) => {
  //     try {
  //       dispatch({ type: "SET_LOADER", payload: true });
  //       axios({
  //         method: 'put',
  //         url: url,
  //         data: file
  //       })
  //      .then(function (response) {
  //           console.log('response', response);
  //         });
  //       // toast.success("File Uploaded Successfully");
  //       dispatch({ type: "SET_LOADER", payload: false });
  //       return true;
  //     } catch (error) {
  //       dispatch({ type: "SET_LOADER", payload: false });
  //       toast.error(
  //         (error.response?.data &&
  //           error.response?.data?.error &&
  //           error.response?.data?.error?.message) ||
  //           "Something went wrong"
  //       );
  //       return false;
  //     }
  //   };
  // };

  export const ChatUploadFile = (url, file) => {
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const response = await axios.put(url, file);
        console.log('response', response);
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

  export const DeleteChat = (threadID) => {
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();
        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }

        appendData.append('threadID',threadID);
        const { data } = await axiosinstance.post("chat/thread/delete", appendData,config);
        dispatch({
          type: "DELETE_CHAT",
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

  export const ArchiveChatData = (threadID) => {
  
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();
        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }

        appendData.append('threadID',threadID);
        const { data } = await axiosinstance.post("chat/archive/to", appendData,config);
        dispatch({
          type: "ARCHIVE_CHAT",
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
  export const ArchiveChatList = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();
        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }

        appendData.append('currentPageNum','1');
        const language = localStorage.getItem("language");
        appendData.append('langCode',language);
        const { data } = await axiosinstance.post("chat/archive/list", appendData,config);
        dispatch({
          type: "ARCHIVE_LIST",
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
  export const RestoreChatData = (threadID) => {
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();
        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }

        appendData.append('threadID',threadID);
        const { data } = await axiosinstance.post("chat/archive/from", appendData,config);
        dispatch({
          type: "RESTORE",
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

  export const userProfile = (id) => {
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();
        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }

        const { data } = await axiosinstance.post(`docGID/${id}`, appendData,config);
        dispatch({
          type: "USER_PROFILE",
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
  export const deleteMessage = (threadID,msgID) => {
   
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();
        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }

        appendData.append('threadID',threadID);
        appendData.append('msgID',msgID);
        const { data } = await axiosinstance.post('chat/delete/msg', appendData,config);
        dispatch({
          type: "DELETE_MESSAGE",
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
  
  

  export const ReadMessage = () => {
   
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();

        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }
        const { data } = await axiosinstance.post('chat/readed',appendData,config);
        dispatch({
          type: "READ_MESSAGE",
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

  export const BinaryFileInfo = (globalID) => {
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();
        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }
        appendData.append('globalID',globalID);
        const language = localStorage.getItem("language");
        appendData.append('langCode',language);
        const { data } = await axiosinstance.post("/getBinaryFileInfo", appendData,config);
        dispatch({
          type: "BINARY_FILE_INFO",
          payload: data,
        });
  
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

  export const BinaryFile = (globalID) => {
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();
        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }
        appendData.append('globalID',globalID);
        const language = localStorage.getItem("language");
        appendData.append('langCode',language);
        const { data } = await axiosinstance.post("/getBinaryFile", appendData,config);
        dispatch({
          type: "BINARY_FILE",
          payload: data,
        });
  
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

  export const ChatGreenDot = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: "SET_LOADER", payload: true });
        const appendData = new FormData();
        const token = localStorage.getItem("token");
        const config = { headers: { 'Authorization': 'Bearer ' + token } }
        const language = localStorage.getItem("language");
        appendData.append('langCode',language);
       const { data } = await axiosinstance.post("/chat/isNewMsg",appendData,config);
        dispatch({
          type: "CHAT_DOT",
          payload: data,
        });
        // localStorage.setItem("chatDot",data.isNewMsg);
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
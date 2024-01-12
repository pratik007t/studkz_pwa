import { toast } from "react-toastify";
import axiosinstance from "../../config/axios";
let FormData = require("form-data");

export const searchAction = (lists, filter = null, languageCode = null) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
     const config = { headers: { 'Authorization': 'Bearer ' + token } }
      appendData.append("searchStr", lists);

      if (filter) {
        appendData.append("filter", filter);
      }
      const language = localStorage.getItem("language");
      appendData.append(
        "langCode",
        languageCode ? languageCode : language ? language : "kz"
      );

      const { data } = await axiosinstance.post("search", appendData,config);

      dispatch({
        type: "RETRIEVE_SEARCH",
        payload: data,
      });

      dispatch({
        type: "MAIN_CHAIN",
        payload: data.mainChain,
      });

      dispatch({
        type: "PREVIOUS_CHAIN",
        payload: data.mainChain,
      });

      dispatch({
        type: "SEARCH_TEXT",
        payload: lists,
      });

      localStorage.setItem("lists", lists);
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

export const cleanData = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      dispatch({
        type: "RETRIEVE_SEARCH",
        payload: [],
      });
      dispatch({
        type: "SEARCH_TEXT",
        payload: [],
      });
      dispatch({
        type: "SELECTED_FILTER_ITEM",
        payload: [""],
      });
      dispatch({
        type: "SELECTED_SPARK_FILTER_ITEM",
        payload: [""],
      });
      dispatch({
        type: "FILTER_DATA",
        payload: [""],
      });
      dispatch({
        type: "RETRIEVE_DATA",
        payload: [""],
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

export const getData = (id, mainChain = null) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
     const config = { headers: { 'Authorization': 'Bearer ' + token } }
      if (mainChain) {
        appendData.append("mainChain", mainChain);
      }

      const { data } = await axiosinstance.post(`docGID/${id}`, appendData,config);

      dispatch({
        type: "RETRIEVE_DATA",
        payload: data,
      });

      if (data?.mainChain) {
        dispatch({
          type: "MAIN_CHAIN",
          payload: data?.mainChain,
        });
      }

      if (data?.likeChain) {
        dispatch({
          type: "LIKE_CHAIN",
          payload: data?.likeChain,
        });
      }

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

export const getPdfData = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
     const config = { headers: { 'Authorization': 'Bearer ' + token } }

      const { data } = await axiosinstance.post(`aspic/${id}`, appendData,config);
      const parseData = data.slice(12);

      dispatch({
        type: "RETRIEVE_DATA_BY_PDF",
        payload: JSON.parse(parseData),
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
export const FilterData = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
     const config = { headers: { 'Authorization': 'Bearer ' + token } }
      const language = localStorage.getItem("language");
      appendData.append("langCode", language);

      const { data } = await axiosinstance.post(`/searchFilters`, appendData,config);

      dispatch({
        type: "FILTER_DATA",
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

export const downloadInvoice = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
     const config = { headers: { 'Authorization': 'Bearer ' + token } }
      const language = localStorage.getItem("language");
      appendData.append("langCode", language);
      const { data } = await axiosinstance.post(`balance/${id}`, appendData,config);
      dispatch({
        type: "INVOICE_DATA",
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

export const SparkFilter = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
     const config = { headers: { 'Authorization': 'Bearer ' + token } }
      const language = localStorage.getItem("language");
      appendData.append("langCode", language);

      const { data } = await axiosinstance.post(`/searchSpark`, appendData,config);
      dispatch({
        type: "SPARK_FILTER_DATA",
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
export const SupportSystem = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }
      appendData.append("botname", "support");
      const { data } = await axiosinstance.post(`/chat/getBot`, appendData,config);
      dispatch({
        type: "SUPPORT_DATA",
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
export const getBotSystem = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", payload: true });
      const appendData = new FormData();
      const token = localStorage.getItem("token");
      const config = { headers: { 'Authorization': 'Bearer ' + token } }
      appendData.append("botname", "ava");
      const { data } = await axiosinstance.post(`/chat/getBot`, appendData,config);
      dispatch({
        type: "SUPPORT_DATA",
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



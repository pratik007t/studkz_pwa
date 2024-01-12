import React from "react";
import { useSelector } from "react-redux";

const KeyDown = () => {
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  document.oncopy = () => {
    return false;
  };
  document.onCopy = () => {
    return false;
  };
  document.onselectstart = () => {
    return false;
  };
  document.onkeydown = (e) => {
    if (e.keyCode === 123) {
      return false;
    }
  };
  return <div></div>;
};

export default KeyDown;

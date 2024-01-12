import { Navigate, redirect, useRoutes } from "react-router-dom";
// import { lazy } from 'react';
// routes
import MainRoutes from "./MainRoutes";
import Loadable from './../ui-component/Loadable';
import AuthenticationRoutes from "./AuthenticationRoutes";
import ChatRoutes from "./ChatRoutes";
import { useEffect } from "react";
// const Search = Loadable(lazy(() => import('views/search')));

export default function ThemeRoutes() {
  const token = localStorage.getItem("token");
  return useRoutes([
    AuthenticationRoutes(token),
    MainRoutes(token),
    ChatRoutes(token),
    { path: "*", 
      element: <Navigate to="/" /> },
  ]);
}


import 'core-js/stable';
import 'cross-fetch/polyfill';


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import App from "./App.js";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from "./i18next/i18n"
import { I18nextProvider } from 'react-i18next';  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
        <I18nextProvider i18n={i18n}>
        <ToastContainer />
          <App />
        </I18nextProvider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
);

// setupInterceptors(store);
reportWebVitals();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register();


import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./app.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
        <ToastContainer />
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";
// import Slide from '@material-ui/core/Slide';
import { AuthContextProvider } from "./store/auth-context";
// import { ViewportProvider } from "./store/use-viewport";

require("dotenv").config();

// window.onbeforeunload = function() {
//   localStorage.clear();
// }

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={1} preventDuplicate>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

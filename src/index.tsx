import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "react-widgets/styles.css";

import DateFnsLocalizer from "react-widgets-date-fns";
import pl from "date-fns/locale/pl";
import App from "./App";
import store from "./redux/reducers/index";
import AccountProvider from "./context/accountContext";

new DateFnsLocalizer({ locales: { pl: pl } });

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <AccountProvider>
        <App />
      </AccountProvider>
      <ToastContainer />
    </BrowserRouter>
  </Provider>
);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(app);

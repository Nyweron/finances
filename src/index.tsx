import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "react-widgets/styles.css";
import DateFnsLocalizer from "react-widgets-date-fns";
import pl from "date-fns/locale/pl";
import App from "./App";
import store from "./redux/reducers/index";

new DateFnsLocalizer({ locales: { pl: pl } });

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

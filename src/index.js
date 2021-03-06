import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-widgets/dist/css/react-widgets.css";
import dateFnsLocalizer from "react-widgets-date-fns";
import pl from "date-fns/locale/pl";
import App from "./App";
//import * as serviceWorker from "./serviceWorker";

dateFnsLocalizer({ locales: { pl: pl } });

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

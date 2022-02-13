import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "react-widgets/styles.css";
import DateFnsLocalizer from "react-widgets-date-fns";
import pl from "date-fns/locale/pl";
import App from "./App";

import { Provider } from "react-redux";
import { createStore } from "redux";


new DateFnsLocalizer({ locales: { pl: pl } });


const modalAdd = (state = false, action) => {
  switch(action.type) {
     case 'OPEN_MODAL_ADD':
       return state = true;

     case 'CLOSE_MODAL_ADD':
       return state = false;
     default:
       return state;
   }
};

const store = createStore(modalAdd);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));






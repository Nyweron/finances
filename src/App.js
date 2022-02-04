import React, { Component } from "react";
//import { FaCaretDown } from "react-icons/fa";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



import Header from "./component/header/header";
import Footer from "./component/footer/footer";
//import { expenses, incomes, savings } from "./shared/constData";

import Index3 from "./pages/index3";

import Expense from "./pages/expense";
import Expense2 from "./pages/expense2";
import Income from "./pages/income";
import Saving from "./pages/saving";

import styles from "./App.module.css";

class App extends Component {
  state = {
    isVisibleCollapseMenu: false,
    isVisibleModalAddIncome: false,
    collapseMenuClicked: -1,
  };

  render() {

    return (
      <>
        <div className={styles.header}>
          <Header />
        </div>
        <Router>
          <div>
            <div className={styles.topnav}>
              {/* <Link to="/expense">
                <span>Wydatki</span>
              </Link> */}
              <Link to="/expense2">
                <span>Wydatki2</span>
              </Link>
              <Link to="/income">
                <span>Przychody</span>
              </Link>
              <Link to="/saving">
                <span>Oszczędności</span>
              </Link>
            </div>

            <div>
              <Switch>
                <Route path="/expense">
                  <Expense />
                </Route>
                <Route path="/expense2">
                  <Expense2 />
                </Route>
                <Route path="/income">
                  <Income />
                </Route>
                <Route path="/saving">
                  <Saving />
                </Route>
                <Route path="/">
                  <Index3 />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
        <div className={styles.footer}>
          <Footer />
        </div>
      </>
    );
  }
}

export default App;

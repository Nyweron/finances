import React, { Component } from "react";
import { FaCaretDown } from "react-icons/fa";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import { expenses, incomes, savings } from "./shared/constData";

import Index3 from "./container/index3";

import Expense from "./container/expense";
import Income from "./container/income";
import Saving from "./container/saving";

import styles from "./App.module.css";


class App extends Component {
  state = {
    isVisibleCollapseMenu: false,
    isVisibleModalAddIncome: false,
    collapseMenuClicked: -1
  };

  displayCollapseMenu = id => {
    if (this.state.collapseMenuClicked === id) {
      this.setState({
        collapseMenuClicked: -1
      });
    } else if (expenses === id) {
      this.setState({
        collapseMenuClicked: id
      });
    } else if (incomes === id) {
      this.setState({
        collapseMenuClicked: id
      });
    } else if (savings === id) {
      this.setState({
        collapseMenuClicked: id
      });
    }
  };

  render() {
    let cleanField = <span></span>;

    let wydatkiFiled = this.state.collapseMenuClicked === expenses && (
      <div>
        <Link to="/expense">
          <span>Wydatki</span>
        </Link>
        {/* <Link to="/expense/add">
          <span onClick={this.isAddExpense}>Dodaj</span>
        </Link> */}
        <span>Zapisz</span>
        <span>...</span>
      </div>
    );
    let przychodyFiled = this.state.collapseMenuClicked === incomes && (
      <div>
        <Link to="/income">
          <span>Przychody</span>
        </Link>
        {/* <Link to="/income/add">
          <span onClick={this.isAddIncome}>Dodaj</span>
        </Link> */}
        <span>...</span>
      </div>
    );
    let oszczednosciFiled = this.state.collapseMenuClicked === savings && (
      <div>
        <Link to="/saving">
          <span>Oszczędności</span>
        </Link>
        <span>Link66</span>
        <span>...</span>
      </div>
    );

    return (
      <>
        <div className={styles.header}>
          <Header />
        </div>
        <Router>
          <div>
            <div className={styles.topnav}>
              <span onClick={() => this.displayCollapseMenu(0)}>
                Wydatki <FaCaretDown />
              </span>
              <span onClick={() => this.displayCollapseMenu(1)}>
                Przychody <FaCaretDown />
              </span>
              <span onClick={() => this.displayCollapseMenu(2)}>
                Oszczędności <FaCaretDown />
              </span>
              <span style={{ float: "right" }}>Link</span>
            </div>

            {this.state.collapseMenuClicked === -1 && cleanField}
            <div
              className={styles.topnav}
              style={{ backgroundColor: "#808080" }}
            >
              {this.state.collapseMenuClicked === expenses && wydatkiFiled}
              {this.state.collapseMenuClicked === incomes && przychodyFiled}
              {this.state.collapseMenuClicked === savings && oszczednosciFiled}
            </div>

            <div>
              <Switch>
                <Route path="/expense">
                  <Expense />
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

import React, { Component } from "react";
import { FaCaretDown } from "react-icons/fa";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import { expenses, revenues, savings } from "./shared/constData";

import Index3 from "./container/index3";

import Expense from "./container/expense";
import Revenue from "./container/revenue";

import styles from "./App.module.css";

import expenseJson from './json/expenses';

const columns = [
  { title: 'Id', field: 'Id', type: 'numeric' },
  { title: 'Data', field: 'Data' },
  { title: 'IdKategoriaOszczednosci', field: 'IdKategoriaOszczednosci', type: 'numeric'},
  { title: 'IdKategoriaWydatki', field: 'IdKategoriaWydatki', type: 'numeric'},
  { title: 'IdOsoba', field: 'IdOsoba', type: 'numeric'},
  { title: 'Ile', field: 'Ile', type: 'numeric'},
  { title: 'Komentarz', field: 'Komentarz'},
  { title: 'Zalacznik', field: 'Zalacznik'},
  { title: 'ZlecenieStale', field: 'ZlecenieStale', type: 'numeric'}
];

class App extends Component {
  state = {
    isVisibleCollapseMenu: false,
    isVisibleModalAddExpense: false,
    isVisibleModalAddRevenue: false,
    collapseMenuClicked: -1,

    expenseData: null
  };

  componentDidMount() {
    // const fetchData = fetch("http://localhost:8081/data").then(res =>
    //   res.json()
    // );
    // this.setState({ data: fetchData });


    this.setState({ expenseData: expenseJson });
  }

  displayCollapseMenu = id => {
    if (this.state.collapseMenuClicked === id) {
      this.setState({
        collapseMenuClicked: -1
      });
    } else if (expenses === id) {
      this.setState({
        collapseMenuClicked: id
      });
    } else if (revenues === id) {
      this.setState({
        collapseMenuClicked: id
      });
    } else if (savings === id) {
      this.setState({
        collapseMenuClicked: id
      });
    }
  };

  isAddExpense = props => {
    console.log("App.isAddExpense", props);
    this.setState({
      isVisibleModalAddExpense: !this.state.isVisibleModalAddExpense
    });
  };

  isAddExpenseSave = props => {
    console.log("isAddExpenseSave props, save", props);
  };

  isAddRevenue = props => {
    console.log("App.isAddRevenue", props);
    this.setState({
      isVisibleModalAddRevenue: !this.state.isVisibleModalAddRevenue
    });
  };

  isAddRevenueSave = props => {
    console.log("isAddRevenueSave props, save", props);
  };

  render() {
    let cleanField = <span></span>;

    let wydatkiFiled = this.state.collapseMenuClicked === expenses && (
      <div>
        <Link to="/expense">
          <span>Wydatki</span>
        </Link>
        <Link to="/expense/add">
        <span onClick={this.isAddExpense}>Dodaj</span>
        </Link>
        {/* <span onClick={this.isAddExpense}>Dodaj</span> */}
        <span>Zapisz</span>
        <span>...</span>
        {/* <Link to="/expense">
          <span>Wydatki</span>
        </Link>
        <span onClick={this.isAddExpense}>Dodaj</span>
        <span>Zapisz</span>
        <span>...</span> */}
      </div>
    );
    let przychodyFiled = this.state.collapseMenuClicked === revenues && (
      <div>
        <Link to="/revenue">
          <span>Przychody</span>
        </Link>
        <Link to="/revenue/add">
        <span onClick={this.isAddRevenue}>Dodaj</span>
        </Link>
        <span>...</span>
      </div>
    );
    let oszczednosciFiled = this.state.collapseMenuClicked === savings && (
      <div>
        <span>Link55</span>
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
              {this.state.collapseMenuClicked === revenues && przychodyFiled}
              {this.state.collapseMenuClicked === savings && oszczednosciFiled}
            </div>

            <div>
              <Switch>
                <Route path="/expense">
                  <Expense
                    isAdd={this.state.isVisibleModalAddExpense}
                    isAddExpense={this.isAddExpense}
                    isAddExpenseSave={this.isAddExpenseSave}
                    expenseData={expenseJson}
                    expenseColumns={columns}
                  />
                </Route>
                {/* <Route path="/expense" exact={true}>
                  <Expense isAdd={this.state.isVisibleModalAddExpense} />
                  { <Expense isAdd={this.state.isExpenseAdd} />
                </Route>
                <Route path="/expense/add" exact={true}>
                  <Expense isAdd={this.state.isVisibleModalAddExpense} />
                </Route> */}
                <Route path="/revenue">
                  <Revenue
                    isAdd={this.state.isVisibleModalAddRevenue}
                    isAddRevenue={this.isAddRevenue}
                    isAddRevenueSave={this.isAddRevenueSave}
                    revenueData={""}
                    revenueColumns={""}
                  />
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

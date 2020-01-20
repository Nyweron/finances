import React, { Component } from "react";
import { FaCaretDown } from "react-icons/fa";
import { expenses, revenues, savings } from "../shared/constData";

import ExpenseAddModal from "../component/expense/expenseAdd";
import ExpenseFilter from "../component/expense/expenseFilter";
import ExpenseTable from "../component/expense/expenseTable";

import styles from "../App.module.css";

class expense extends Component {
  state = { isVisibleAddExpense: false, isVisibleFilterSettings: false };

  displayFilterSettings = () => {
    this.setState({
      isVisibleFilterSettings: !this.state.isVisibleFilterSettings
    });
  };

  handleClose = () => {
    this.setState({ isVisibleAddExpense: false });
  };

  handleShow = () => {
    this.setState({ isVisibleAddExpense: true });
  };

  render() {
    let wydatkiFiled = this.state.collapseMenuClicked === expenses && (
      <div>
        <span>
          Wydatki
          <FaCaretDown />
        </span>
        <span onClick={this.handleShow}>Dodaj</span>
        <span>Zapisz</span>
        <span>...</span>
      </div>
    );

    return (
      <>
        <div>
          {this.state.isVisibleAddExpense && (
            <ExpenseAddModal
              handleClose={this.handleClose}
              handleShow={this.handleShow}
              isVisibleAddExpense={this.state.isVisibleAddExpense}
            />
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.card}>
            <button
              className="btn btn-primary"
              onClick={this.displayFilterSettings}
            >
              Filter settings
            </button>
            {this.state.isVisibleFilterSettings && <ExpenseFilter />}
          </div>
          <div className={styles.centerColumn}>
            <div className={styles.card}>
              <ExpenseTable />
            </div>
            <div className={styles.card}>
              <span>PAGINATION</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default expense;

import React, { Component } from "react";

import { connect } from "react-redux";

import { Icon } from "semantic-ui-react";

import { getAll } from "../lib/genericService";

import { Expense2List } from "../component/expense2";

import {
  OPEN_MODAL_ADD,
  OPEN_MODAL_CATEGORY_EXPENSE_ADD,
} from "../redux/actions/actions";
import { CategoryExpenseList } from "../component/categoryExpense";
import { toast } from "react-toastify";
import { AccountContext } from "../context/accountContext";
import { AccountContextType } from "../constants";

interface IRecipeProps {
  handleOpenModalAdd: any;
  handleOpenCategoryExpenseModalAdd: any;
}

interface IRecipeState {}

class Expense2 extends Component<IRecipeProps, IRecipeState> {
  state = {
    expenseListDataOnPage: [],
    categoryExpenseDataOnPage: [],
    isDisplayExpenseList: true,
    isDisplayCategoryExpenseList: false,
    path: "Wydatki -> lista",
  };

  static contextType = AccountContext;

  handleExpenseList = () => {
    let isLogin = false;
    if (this.context) {
      const { account } = this.context as AccountContextType;
      isLogin = account.isLogin;
    }

    getAll("expense")
      .then((rows) => {
        console.log(
          "🚀 ~ file: expense2.tsx:52 ~ Expense2 ~ .then ~ rows:",
          rows
        );
        this.setState({
          isDisplayExpenseList: true,
          isDisplayCategoryExpenseList: false,
          expenseListDataOnPage: rows,
          path: "Wydatki -> lista",
        });

        console.log(
          "🚀 ~ file: expense2.tsx:64 ~ Expense2 ~ .then ~ rows:",
          rows
        );
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: expense2.tsx:63 ~ Expense2 ~ getAll ~ error:",
          error
        );
        // console.log(
        //   "🚀 ~ file: expense2.tsx:64 ~ Expense2 ~ getAll ~ error:",
        //   new Error(error)
        // );

        this.setState({
          isDisplayExpenseList: true,
          expenseListDataOnPage: [],
          isDisplayCategoryExpenseList: false,
          path: "Wydatki -> lista",
        });

        if (!isLogin) {
          toast.error(`You are not authenticated. Token `);
        }

        throw error;
      });
    //console.log("🚀 ~ file: expense2.tsx:44 ~ Expense2 ~ getAll ~ expense:");
  };

  handleCategoryExpenseList = () => {
    getAll("categoryExpense").then((rows) => {
      this.setState({
        isDisplayExpenseList: false,
        isDisplayCategoryExpenseList: true,
        categoryExpenseDataOnPage: rows,
        path: "Wydatki -> kategorie -> lista",
      });
    });
  };

  render() {
    // console.log(
    //   "🚀 ~ file: expense2.tsx:89 ~ Expense2 ~ expenseListDataOnPage:",
    //   this.state
    // );

    return (
      <>
        <div className="ui centered grid">
          <div className="row"></div>
          <div className="row">
            <div className="seven wide column">
              <button
                className="ui orange button"
                onClick={() => this.handleExpenseList()}
              >
                Wydatki
              </button>
              {this.state.isDisplayExpenseList && (
                <button
                  className="ui blue button"
                  onClick={() => this.props.handleOpenModalAdd()}
                >
                  <Icon link name="plus circle" />
                  Dodaj wydatki
                </button>
              )}
            </div>
            <div className="seven wide column" data-floated="right">
              <button
                className="ui orange button"
                onClick={() => this.handleCategoryExpenseList()}
              >
                Kategorie
              </button>
              {this.state.isDisplayCategoryExpenseList && (
                <button
                  className="ui blue button"
                  onClick={() => this.props.handleOpenCategoryExpenseModalAdd()}
                >
                  <Icon link name="plus circle" />
                  Dodaj kategorię
                </button>
              )}
            </div>
          </div>
          <div className="row">
            <div className="fourteen wide column">
              <div>
                <span>{this.state.path}</span>
              </div>
            </div>
          </div>

          {this.state.isDisplayExpenseList && <Expense2List {...this.state} />}

          {this.state.isDisplayCategoryExpenseList && (
            <CategoryExpenseList {...this.state} />
          )}
        </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleOpenModalAdd: () => dispatch({ type: OPEN_MODAL_ADD }),
    handleOpenCategoryExpenseModalAdd: () =>
      dispatch({ type: OPEN_MODAL_CATEGORY_EXPENSE_ADD }),
  };
}

export default connect(null, mapDispatchToProps)(Expense2);

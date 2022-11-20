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

  handleExpenseList = () => {
    getAll("expense").then((rows) => {
      this.setState({
        isDisplayExpenseList: true,
        isDisplayCategoryExpenseList: false,
        expenseListDataOnPage: rows,
        path: "Wydatki -> lista",
      });
    });
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

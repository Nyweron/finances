import React, { Component } from "react";

import { connect } from "react-redux";

import { Icon } from "semantic-ui-react";

import { getAll } from "../lib/incomeService";

import { IncomeList } from "../component/income";

import { CategoryIncomeList } from "../component/categoryIncome";

import {
  OPEN_MODAL_ADD,
  OPEN_MODAL_CATEGORY_INCOME_ADD,
} from "../redux/actions/actions";

interface IRecipeProps {
  handleOpenModalAdd: any;
  handleOpenCategoryIncomeModalAdd: any;
}

interface IRecipeState {}

class Income extends Component<IRecipeProps, IRecipeState> {
  state = {
    allData: [],
    incomeDataOnPage: [],
    categoryIncomeDataOnPage: [],
    begin: 0,
    end: 4,
    isDisplayIncomeList: true,
    isDisplayCategoryIncomeList: false,
    path: "Przychody -> lista",
  };

  handleIncomeList = () => {
    getAll("income").then((rows) => {
      this.setState({
        isDisplayIncomeList: true,
        isDisplayCategoryIncomeList: false,
        allData: rows,
        incomeDataOnPage: rows.slice(this.state.begin, this.state.end),
        path: "Przychody -> lista",
      });
    });
  };

  handleCategoryIncomeList = () => {
    getAll("categorysaving").then((rows) => {
      this.setState({
        isDisplayIncomeList: false,
        isDisplayCategoryIncomeList: true,
        allData: rows,
        categoryIncomeDataOnPage: rows.slice(this.state.begin, this.state.end),
        path: "Przychody -> kategorie -> lista",
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
                onClick={() => this.handleIncomeList()}
              >
                Przychody
              </button>
              {this.state.isDisplayIncomeList && (
                <button
                  className="ui blue button"
                  onClick={() => this.props.handleOpenModalAdd()}
                >
                  <Icon link name="plus circle" />
                  Dodaj przychody
                </button>
              )}
            </div>
            <div className="seven wide column" data-floated="right">
              <button
                className="ui orange button"
                onClick={() => this.handleCategoryIncomeList()}
              >
                Kategorie
              </button>
              {this.state.isDisplayCategoryIncomeList && (
                <button
                  className="ui blue button"
                  onClick={() => this.props.handleOpenCategoryIncomeModalAdd()}
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

          {this.state.isDisplayIncomeList && <IncomeList {...this.state} />}

          {this.state.isDisplayCategoryIncomeList && (
            <CategoryIncomeList {...this.state} />
          )}
        </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleOpenModalAdd: () => dispatch({ type: OPEN_MODAL_ADD }),
    handleOpenCategoryIncomeModalAdd: () =>
      dispatch({ type: OPEN_MODAL_CATEGORY_INCOME_ADD }),
  };
}

export default connect(null, mapDispatchToProps)(Income);

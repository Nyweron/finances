import React, { Component } from "react";

import { connect } from "react-redux";

import { Icon } from "semantic-ui-react";

import { getAll } from "../lib/genericService";

import { Expense2List } from "../component/expense2";

import { OPEN_MODAL_ADD } from "../redux/actions/actions";

interface IRecipeProps {
  handleOpenModalAdd: any;
}

interface IRecipeState {}

class Expense2 extends Component<IRecipeProps, IRecipeState> {
  state = {
    allData: [],
    expenseDataOnPage: [],
    begin: 0,
    end: 4,
  };

  componentDidMount() {
    getAll("expense").then((rows) => {
      this.setState({
        allData: rows,
        expenseDataOnPage: rows.slice(this.state.begin, this.state.end),
      });
    });
  }

  handleExpenseList = () => {
    getAll("expense").then((rows) => {
      this.setState({
        allData: rows,
        expenseDataOnPage: rows.slice(this.state.begin, this.state.end),
      });
    });
  };

  render() {
    return (
      <>
        <div className="ui centered grid">
          <div className="row"></div>
          <div className="row">
            <div className="fourteen wide column">
              <button
                className="ui orange button"
                onClick={() => this.handleExpenseList()}
              >
                Oszczędności
              </button>
              <button
                className="ui blue button"
                onClick={() => this.props.handleOpenModalAdd()}
              >
                <Icon link name="plus circle" />
                Dodaj wydatki
              </button>
            </div>
          </div>

          <Expense2List {...this.state} />
        </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleOpenModalAdd: () => dispatch({ type: OPEN_MODAL_ADD }),
  };
}

export default connect(null, mapDispatchToProps)(Expense2);

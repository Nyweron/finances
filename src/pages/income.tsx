import React, { Component } from "react";

import { connect } from "react-redux";

import { Icon } from "semantic-ui-react";

import { getAll } from "../lib/incomeService";

import { IncomeList } from "../component/income";

import { OPEN_MODAL_ADD } from "../redux/actions/actions";

interface IRecipeProps {
  handleOpenModalAdd: any;
}

interface IRecipeState {}

class Income extends Component<IRecipeProps, IRecipeState> {
  state = {
    allData: [],
    incomeDataOnPage: [],
    begin: 0,
    end: 4,
  };

  componentDidMount() {
    getAll("income").then((rows) => {
      this.setState({
        allData: rows,
        incomeDataOnPage: rows.slice(this.state.begin, this.state.end),
      });
    });
  }

  handleIncomeList = () => {
    getAll("income").then((rows) => {
      this.setState({
        allData: rows,
        incomeDataOnPage: rows.slice(this.state.begin, this.state.end),
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
                onClick={() => this.handleIncomeList()}
              >
                Przychody
              </button>
              <button
                className="ui blue button"
                onClick={() => this.props.handleOpenModalAdd()}
              >
                <Icon link name="plus circle" />
                Dodaj przychód
              </button>
            </div>
          </div>

          <IncomeList {...this.state} />
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

export default connect(null, mapDispatchToProps)(Income);

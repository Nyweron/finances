import React, { Component } from "react";

import { connect } from "react-redux";

import { Icon } from "semantic-ui-react";

import { getAll } from "../lib/genericService";

import { SavingList } from "../component/saving";

import { CategorySavingList } from "../component/categorySaving";

import { OPEN_MODAL_ADD } from "../redux/actions/actions";

interface IRecipeProps {
  handleOpenModalAdd: any;
}

interface IRecipeState {}

class Saving extends Component<IRecipeProps, IRecipeState> {
  state = {
    allData: [],
    savingDataOnPage: [],
    begin: 0,
    end: 4,
    isDisplaySavingList: true,
    isDisplayCategorySavingList: false,
  };

  handleSavingList = () => {
    console.log("🚀 ~ file: saving.js ~ line 131 ~ Saving ~ handleSavingList");

    getAll("saving").then((rows) => {
      this.setState({
        isDisplaySavingList: true,
        isDisplayCategorySavingList: false,
        allData: rows,
        savingDataOnPage: rows.slice(this.state.begin, this.state.end),
      });
    });
  };

  handleCategorySavingList = () => {
    console.log("🚀 ~ file: saving.js ~ line 131 ~ Saving ~ handleSavingList");

    getAll("saving").then((rows) => {
      this.setState({
        isDisplaySavingList: false,
        isDisplayCategorySavingList: true,
        allData: rows,
        savingDataOnPage: rows.slice(this.state.begin, this.state.end),
      });
    });
  };

  render() {
    return (
      <>
        <div className="ui centered grid">
          <div className="row"></div>
          <div className="row">
            <div className="seven wide column" data-floated="left">
              <button
                className="ui orange button"
                onClick={() => this.handleSavingList()}
              >
                Oszczędności
              </button>
              <button
                className="ui blue button"
                onClick={() => this.props.handleOpenModalAdd()}
              >
                <Icon link name="plus circle" />
                Dodaj oszczędności
              </button>
            </div>
            <div className="seven wide column" data-floated="right">
              <button
                className="ui orange button"
                onClick={() => this.handleCategorySavingList()}
              >
                Kategorie
              </button>
              <button className="ui blue button">
                <Icon link name="plus circle" />
                Dodaj kategorię
              </button>
            </div>
          </div>

          {this.state.isDisplaySavingList && <SavingList {...this.state} />}

          {this.state.isDisplayCategorySavingList && (
            <CategorySavingList {...this.state} />
          )}
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

export default connect(null, mapDispatchToProps)(Saving);

import React, { Component } from "react";

import { connect } from "react-redux";

import { Icon } from "semantic-ui-react";

import { getAll } from "../lib/genericService";

import { SavingList } from "../component/saving";

import { CategorySavingList } from "../component/categorySaving";

import {
  OPEN_MODAL_ADD,
  OPEN_MODAL_CATEGORY_SAVING_ADD,
} from "../redux/actions/actions";

interface IRecipeProps {
  handleOpenModalAdd: any;
  handleOpenCategorySavingModalAdd: any;
}

interface IRecipeState {}

class Saving extends Component<IRecipeProps, IRecipeState> {
  state = {
    allData: [],
    savingDataOnPage: [],
    categorySavingDataOnPage: [],
    begin: 0,
    end: 4,
    isDisplaySavingList: true,
    isDisplayCategorySavingList: false,
    path: "Oszczędności -> lista",
  };

  handleSavingList = () => {
    // console.log("🚀 ~ file: saving.js ~ line 131 ~ Saving ~ handleSavingList");

    getAll("saving").then((rows) => {
      this.setState({
        isDisplaySavingList: true,
        isDisplayCategorySavingList: false,
        allData: rows,
        savingDataOnPage: rows.slice(this.state.begin, this.state.end),
        path: "Oszczędności -> lista",
      });
    });
  };

  handleCategorySavingList = () => {
    // console.log("🚀 ~ file: saving.js ~ line 131 ~ Saving ~ handleSavingList");

    getAll("categorysaving").then((rows) => {
      this.setState({
        isDisplaySavingList: false,
        isDisplayCategorySavingList: true,
        allData: rows,
        categorySavingDataOnPage: rows.slice(this.state.begin, this.state.end),
        path: "Oszczędności -> kategorie -> lista",
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
              {this.state.isDisplaySavingList && (
                <button
                  className="ui blue button"
                  onClick={() => this.props.handleOpenModalAdd()}
                >
                  <Icon link name="plus circle" />
                  Dodaj oszczędności
                </button>
              )}
            </div>
            <div className="seven wide column" data-floated="right">
              <button
                className="ui orange button"
                onClick={() => this.handleCategorySavingList()}
              >
                Kategorie
              </button>
              {this.state.isDisplayCategorySavingList && (
                <button
                  className="ui blue button"
                  onClick={() => this.props.handleOpenCategorySavingModalAdd()}
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
    handleOpenCategorySavingModalAdd: () =>
      dispatch({ type: OPEN_MODAL_CATEGORY_SAVING_ADD }),
  };
}

export default connect(null, mapDispatchToProps)(Saving);

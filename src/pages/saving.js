import React, { Component } from "react";

import {  Icon } from "semantic-ui-react";

import { getAll, create, edit, remove } from "../lib/genericService";

import {
  SavingList
} from "../component/saving";

import { CategorySavingList } from "../component/categorySaving";

class Saving extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      allData: [],
      dataEdit: {},
      dataRemove: {},
      savingDataOnPage: [],
      begin: 0,
      end: 4,
      showModalAdd: false,
      showModalEdit: false,
      showModalRemove: false,
      isCreated: false,
      isEdited: false,
      isRemoved: false,
      isDisplaySavingList: true,
      isDisplayCategorySavingList: false,
    };
  }

  handleOpenModalAddSaving = (props) => {
    this.setState({ showModalAdd: !this.state.showModalAdd });
  };

  handleAddSaving = (props) => {
    console.log("🚀 ~ file: saving.js ~ line 89 ~ Saving ~ props", props);
    this.setState({ showModalAdd: !this.state.showModalAdd });

    const savingObj = {
      howMuch: parseFloat(props.howMuch),
      date: new Date(props.calendarDate),
      comment: props.comment,
      categorySavingId: parseInt(props.categorySavingId),
      savingType: 1,
    };

    create(savingObj, "saving").then((res) => {
      this.setState({ isCreated: true });
    });
  };

  handleOpenModalRemoveSaving = (savingRemove) => {
    this.setState({ showModalRemove: !this.state.showModalRemove });
    this.setState({ dataRemove: savingRemove });
  };

  handleRemoveSaving = (savingRemove) => {
    this.setState({ showModalRemove: !this.state.showModalRemove });

    remove(savingRemove.id, "saving").then((res) => {
      this.setState({ isRemoved: true });
    });
  };

  handleOpenModalEditSaving = (savingEdit) => {
    this.setState({ showModalEdit: !this.state.showModalEdit });
    this.setState({ dataEdit: savingEdit });
  };

  handleEditSaving = (savingEdit) => {
    this.setState({ showModalEdit: !this.state.showModalEdit });

    const savingObj = {
      id: savingEdit.id,
      howMuch: parseFloat(savingEdit.howMuch),
      date: new Date(savingEdit.calendarDate),
      comment: savingEdit.comment,
      categorySavingId: parseInt(savingEdit.categorySavingId),
      savingType: 1,
    };

    edit(savingObj, "saving").then((res) => {
      this.setState({ isEdited: true });
    });
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
            <div className="seven wide column" floated="left">
              <button
                className="ui orange button"
                onClick={() => this.handleSavingList()}
              >
                Oszczędności
              </button>
              <button
                className="ui blue button"
                onClick={() => this.handleOpenModalAddSaving()}
              >
                <Icon link name="plus circle" />
                Dodaj oszczędności
              </button>
            </div>
            <div className="seven wide column" floated="right">
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

export default Saving;

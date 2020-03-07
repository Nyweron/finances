import React, { Component } from "react";

import SavingFilter from "../component/saving/savingFilter";
import SavingEdit from "../component/saving/savingEdit";
import SavingAdd from "../component/saving/savingAdd";
import TableContainer from "../component/myCustomCRUDTable/TableContainer";

import {getAll} from "../lib/savingService";
import {getKeyFromJson} from "../lib/crudHelper";

import styles from "../App.module.css";


class Saving extends Component {
  state = {
    isVisibleFilterSettings: false,
    data: null,
    columns: null
  };

  componentDidMount(){
    getAll().then(rows => {
      this.setState({ data: rows });
      const keys = getKeyFromJson(rows);
      if (keys !== null) {
        this.setState({ columns: keys });
      }
    });
  }

  displayFilterSettings = () => {
    this.setState({
      isVisibleFilterSettings: !this.state.isVisibleFilterSettings
    });
  };

  addSaving = addObj => {
    console.log("saving.js addSaving", addObj);

    // if (
    //   addObj === undefined ||
    //   addObj === null ||
    //   addObj.firstName === null ||
    //   addObj.firstName === undefined ||
    //   addObj.firstName === ""
    // ) {
    //   this.showTempMessage("Firstname is required");
    //   return;
    // }

    // const allRows = this.state.rowsFromDbJson;
    // const sortedIds = sortIds(allRows);
    // if (sortedIds.length === 0) {
    //   sortedIds.push("");
    // }
    // const newId = generateNewId(sortedIds);

    // const newPerson = {
    //   id: newId,
    //   firstName: addObj.firstName,
    //   lastName: addObj.lastName,
    //   age: addObj.age,
    //   isActive: true,
    //   hobby: addObj.hobby
    // };

    // createPerson(newPerson).then(
    //   () => this.showTempMessage("person created"),
    //   this.setState(
    //     {
    //       rowsFromDbJson: [...this.state.rowsFromDbJson, newPerson]
    //     },
    //     () => {
    //       this.invokePaginationOnPageChanged();
    //     }
    //   )
    // );

    // for (var key in addObj) {
    //   delete addObj[key];
    // }
  };

  removeSaving = id => {
    console.log("saving.js removeSaving", id);

    // let listOfRows = this.state.rowsFromDbJson;
    // const newListWithoutRemovedItem = removeRowById(listOfRows, id);

    // deleteRow(id).then(
    //   () => this.showTempMessage("row deleted"),
    //   this.setState({ rowsFromDbJson: newListWithoutRemovedItem }, () => {
    //     this.invokePaginationOnPageChanged();
    //   })
    // );
  };

  editSaving = editObj => {
    console.log("saving.js editSaving", editObj);
  };

  render() {
    if(this.state.data === null || this.state.columns === null){
      return null;
    }

    return (
      <>
        <div className={styles.row}>
          <div className={styles.card}>
            <button
              className="btn btn-primary"
              onClick={this.displayFilterSettings}
            >
              Filter settings
            </button>
            {this.state.isVisibleFilterSettings && <SavingFilter />}
          </div>
          <div className={styles.centerColumn}>
            <div className={styles.card}>
              <TableContainer
                columns={this.state.columns}
                data={this.state.data}
                addRow={this.addSaving}
                removeRow={this.removeSaving}
                editRow={this.editSaving}
                EditComponent={SavingEdit}
                AddComponent={SavingAdd}
              />
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

export default Saving;

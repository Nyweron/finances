import React, { Component } from "react";

import IncomeFilter from "../component/income/incomeFilter";
import IncomeEdit from "../component/income/incomeEdit";
import IncomeAdd from "../component/income/incomeAdd";
import TableContainer from "../component/myCustomCRUDTable/TableContainer";

import { getAll, createIncome } from "../lib/incomeService";
import { getKeyFromJson, sortIds, generateNewId } from "../lib/crudHelper";

import styles from "../App.module.css";

class Income extends Component {
  state = {
    isVisibleFilterSettings: false,
    data: null,
    columns: null,
    isRowCreated: false,
  };

  componentDidMount() {
    console.log("componentDidMount - income.js");
    getAll("income").then((rows) => {
      this.setState({ data: rows });
      const keys = getKeyFromJson(rows);
      if (keys !== null) {
        this.setState({ columns: keys });
      }
    });
  }

  componentDidUpdate() {
    console.log("componentDidUpdate - income.js");
    if (this.state.isRowCreated === true) {
      console.log("componentDidUpdate IF - income.js");
      getAll("income").then((rows) => {
        this.setState({ data: rows, isRowCreated: false });
        const keys = getKeyFromJson(rows);
        if (keys !== null) {
          this.setState({ columns: keys });
        }
      });
    }
  }

  displayFilterSettings = () => {
    this.setState({
      isVisibleFilterSettings: !this.state.isVisibleFilterSettings,
    });
  };

  addIncome = (addObj) => {
    console.log("Income.js addIncome", addObj);

    const allRows = this.state.data;
    console.log("TEST56 income allRows ", allRows);
    const sortedIds = sortIds(allRows);
    if (sortedIds && sortedIds.length === 0) {
      sortedIds.push("");
    }

    console.log("TEST56 income sortedIds ", sortedIds);
    //TODO FIX generateNewId for empty rows when table is empty
    const newId = generateNewId(sortedIds);

    console.log("TEST56 income newId ", newId);

     //TODO: Check problems with date...
    //TODO: ADD validate...
    console.log("TEST55 ", addObj.date);
    let dateFromForm = addObj.date.split("-");
    const day = dateFromForm[0];
    const month = dateFromForm[1]; /*from 0 to 11. 0 - january etc...;*/
    const year = dateFromForm[2];

    const actualDate = new Date();
    const actualHour = actualDate.getHours(); //Different time on server -2h. Front 19:00 backend 17:00
    const actualMinutes = actualDate.getMinutes();

    const builtDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(actualHour),
      parseInt(actualMinutes)
    );

    const incomeFromFront = {
      id: newId,
      howMuch: parseFloat(addObj.howMuch),
      date: builtDate,
      comment: addObj.comment,
      standingOrder: addObj.autoSubtractAmount,
      attachment: addObj.attachment,
      userId: parseInt(addObj.who),
      categorySavingId: parseInt(addObj.whatWasPaidFor),
      categoryIncomeId: parseInt(addObj.categoryIncomeId),
    };

    createIncome(incomeFromFront).then((res) => {
      this.setState({ isRowCreated: true });
    });

    for (let key in addObj) {
      delete addObj[key];
    }
  };

  removeIncome = (id) => {
    console.log("Income.js removeIncome", id);

    // let listOfRows = this.state.rowsFromDbJson;
    // const newListWithoutRemovedItem = removeRowById(listOfRows, id);

    // deleteRow(id).then(
    //   () => this.showTempMessage("row deleted"),
    //   this.setState({ rowsFromDbJson: newListWithoutRemovedItem }, () => {
    //     this.invokePaginationOnPageChanged();
    //   })
    // );
  };

  editIncome = (editObj) => {
    console.log("Income.js editIncome", editObj);
  };

  render() {
    if (this.state.data === null || this.state.columns === null) {
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
            {this.state.isVisibleFilterSettings && <IncomeFilter />}
          </div>
          <div className={styles.centerColumn}>
            <div className={styles.card}>
              <TableContainer
                columns={this.state.columns}
                data={this.state.data}
                addRow={this.addIncome}
                removeRow={this.removeIncome}
                editRow={this.editIncome}
                EditComponent={IncomeEdit}
                AddComponent={IncomeAdd}
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

export default Income;

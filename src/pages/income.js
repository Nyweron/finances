import React, { Component } from "react";

import IncomeFilter from "../component/income/incomeFilter";
import IncomeEdit from "../component/income/incomeEdit";
import IncomeAdd from "../component/income/incomeAdd";
import TableContainer from "../component/myCustomCRUDTable/TableContainer";

import { getAll, createIncome, editPutIncome } from "../lib/incomeService";
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

    const sortedIds = sortIds(allRows);

    const newId = generateNewId(sortedIds);

    //TODO: Check problems with date...
    //TODO: ADD validate...

    const actualDate = new Date();

    let dateFromForm =
      addObj.date !== null
        ? addObj.date.split("-")
        : `${actualDate.getFullYear()}-${actualDate.getMonth()}-${actualDate.getDay()}`.split("-")

    const day = dateFromForm[0];
    const month = dateFromForm[1]; /*from 0 to 11. 0 - january etc...;*/
    const year = dateFromForm[2];

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
      userId: parseInt(addObj.userId),
      categorySavingId: parseInt(addObj.categorySavingId),
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

    const dateFromForm = editObj.date.split("-");
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
      id: editObj.id,
      howMuch: parseFloat(editObj.howMuch),
      date: builtDate,
      comment: editObj.comment,
      standingOrder: editObj.autoSubtractAmount,
      attachment: editObj.attachment,
      userId: parseInt(editObj.userId),
      categorySavingId: parseInt(editObj.categorySavingId),
      categoryIncomeId: parseInt(editObj.categoryIncomeId),
    };

    console.log("🚀 ~ file: income.js ~ line 154 ~ Income ~ editPutIncome ~ incomeFromFront", incomeFromFront)
    editPutIncome(incomeFromFront).then((res) => {
      console.log("🚀 ~ file: income.js ~ line 155 ~ Income ~ editPutIncome ~ res", res)
      this.setState({ isRowCreated: true });
    });
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
              Filter settings income
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

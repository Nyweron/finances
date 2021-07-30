import React, { Component } from "react";

import ExpenseFilter from "../component/expense/expenseFilter";
import ExpenseEdit from "../component/expense/expenseEdit";
import ExpenseAdd from "../component/expense/expenseAdd";
import TableContainer from "../component/myCustomCRUDTable/TableContainer";

import {
  getAll,
  createExpense,
  deleteRowExpense,
  editPutExpense,
} from "../lib/expenseService";
import { getKeyFromJson, sortIds, generateNewId } from "../lib/crudHelper";

import styles from "../App.module.css";

class Expense extends Component {
  state = {
    isVisibleFilterSettings: false,
    data: null,
    columns: null,
    isRowCreated: false,
  };

  componentDidMount() {
    console.log("componentDidMount - expense.js");
    getAll("expense").then((rows) => {
      this.setState({ data: rows });
      const keys = getKeyFromJson(rows);
      if (keys !== null) {
        this.setState({ columns: keys });
      }
    });
  }

  componentDidUpdate() {
    console.log("componentDidUpdate - expense.js");
    if (this.state.isRowCreated === true) {
      console.log("componentDidUpdate IF - expense.js");
      getAll("expense").then((rows) => {
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

  showTempMessage = (msg) => {
    //react-toastify
    console.log("expense.showTempMessage", msg);
    // this.setState({ message: msg });
    // setTimeout(() => {
    //   this.setState({ message: "" });
    // }, 2000);
  };

  addExpense = (addObj) => {
    console.log("expense.js addExpense", addObj);

    const allRows = this.state.data;

    const sortedIds = sortIds(allRows);
    if (sortedIds && sortedIds.length === 0) {
      sortedIds.push("");
    }
    const newId = generateNewId(sortedIds);

    //TODO: Check problems with date...
    //TODO: ADD validate...
    console.log("TEST44 ", addObj.date);
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

    const expenseFromFront = {
      id: newId,
      howMuch: parseFloat(addObj.howMuch),
      date: builtDate,
      comment: addObj.comment,
      attachment: addObj.attachment,
      standingOrder: addObj.autoSubtractAmount,
      userId: parseInt(addObj.who),
      categorySavingId: parseInt(addObj.whatWasPaid),
      categoryExpenseId: parseInt(addObj.forWhat),
    };

    createExpense(expenseFromFront).then((res) => {
      this.setState({ isRowCreated: true });
    });

    for (let key in addObj) {
      delete addObj[key];
    }
  };

  removeExpense = (id) => {
    console.log("expense.js removeExpense", id);

    //const listOfRows = this.state.data;
    //const newListWithoutRemovedItem = removeRowById(listOfRows, id);

    deleteRowExpense(id);
  };

  editExpense = (editObj) => {
    console.log("expense.js editExpense", editObj);

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

    // var year = editObj.date.substring(0, 4);
    // var month = editObj.date.substring(5, 7);
    // var day = editObj.date.substring(8, 10);
    //console.log(year)
    //console.log(month)
    //console.log(day)

    //var builtDate = new Date(year, month, day);

    console.log("TEST111 expense.js builtDate", builtDate);

    const expenseFromFront = {
      id: editObj.id,
      howMuch: parseFloat(editObj.howMuch),
      date: builtDate,
      comment: editObj.comment,
      attachment: editObj.attachment,
      standingOrder: editObj.autoSubtractAmount,
      userId: parseInt(editObj.userId),
      categorySavingId: parseInt(editObj.categorySavingId),
      categoryExpenseId: parseInt(editObj.categoryExpenseId),
    };

    editPutExpense(expenseFromFront).then((res) => {
      this.setState({ isRowCreated: true });
      //console.log("res",res)
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
              Filter settings
            </button>
            {this.state.isVisibleFilterSettings && <ExpenseFilter />}
          </div>
          <div className={styles.centerColumn}>
            <div className={styles.card}>
              <TableContainer
                columns={this.state.columns}
                data={this.state.data}
                addRow={this.addExpense}
                removeRow={this.removeExpense}
                editRow={this.editExpense}
                EditComponent={ExpenseEdit}
                AddComponent={ExpenseAdd}
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

export default Expense;

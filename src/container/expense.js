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
import {
  getKeyFromJson,
  sortIds,
  generateNewId,
  removeRowById,
} from "../lib/crudHelper";

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
    if (this.state.isRowCreated === true) {
      console.log("componentDidUpdate - expense.js true");
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
    //console.log("expense.js addExpense", addObj);

    const allRows = this.state.data;

    const sortedIds = sortIds(allRows);
    if (sortedIds && sortedIds.length === 0) {
      sortedIds.push("");
    }
    const newId = generateNewId(sortedIds);

    //TODO: Check problems with date...
    //TODO: ADD validate...
    let monthRemove = 0;
    if (parseInt(addObj.whenMonth) !== 0) {
      monthRemove = parseInt(addObj.whenMonth) - 1;
    }

    const builtDate = new Date(
      parseInt(addObj.whenYear),
      monthRemove,
      parseInt(addObj.whenDay) + 1
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

    for (var key in addObj) {
      delete addObj[key];
    }
  };

  removeExpense = (id) => {
    console.log("expense.js removeExpense", id);

    const listOfRows = this.state.data;
    const newListWithoutRemovedItem = removeRowById(listOfRows, id);

    deleteRowExpense(id);
  };

  editExpense = (editObj) => {
    console.log("expense.js editExpense", editObj);

    var year =  editObj.date.substring(0, 4);
    var month =  editObj.date.substring(5, 7);
    var day =  editObj.date.substring(8, 10);
    console.log(year)
    console.log(month)
    console.log(day)

    var builtDate =  new Date(year, month, day)

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
      console.log("res",res)
    });
  };

  render() {
    if (this.state.data === null || this.state.columns === null) {
      return null;
    }

    //console.log("ComponentDidupdate expense.js", this.state.data);

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

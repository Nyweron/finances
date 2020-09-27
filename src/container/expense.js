import React, { Component } from "react";

import ExpenseFilter from "../component/expense/expenseFilter";
import ExpenseEdit from "../component/expense/expenseEdit";
import ExpenseAdd from "../component/expense/expenseAdd";
import TableContainer from "../component/myCustomCRUDTable/TableContainer";

import {getAll, createExpense} from "../lib/expenseService";
import {getKeyFromJson, sortIds, generateNewId} from "../lib/crudHelper";

import styles from "../App.module.css";


class Expense extends Component {
  state = {
    isVisibleFilterSettings: false,
    data: null,
    columns: null
  };

  componentDidMount(){
    getAll("expense").then(rows => {
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

  showTempMessage = msg => {
    console.log("expense.showTempMessage", msg);
    // this.setState({ message: msg });
    // setTimeout(() => {
    //   this.setState({ message: "" });
    // }, 2000);
  };

  addExpense = addObj => {
    console.log("expense.js addExpense", addObj);

    const allRows = this.state.data;
    console.log("expense.js addExpense allRows", allRows);
    const sortedIds = sortIds(allRows);
    if (sortedIds && sortedIds.length === 0) {
      sortedIds.push("");
    }
    const newId = generateNewId(sortedIds);


    //TODO: Check problems with date...
    //TODO: ADD validate...
    let monthRemove = 0;
    if(parseInt(addObj.whenMonth) != 0){
      monthRemove = parseInt(addObj.whenMonth) - 1;
    }
    const builtDate = new Date(parseInt(addObj.whenYear), monthRemove, parseInt(addObj.whenDay)+1,);
    const ExpenseFromFront = {
     id: newId,
      howMuch: parseFloat(addObj.howMuch),
      date: builtDate,
      comment: addObj.comment,
      attachment: addObj.attachment,
      //standingorder
      userId: parseInt(addObj.who),
      categorySavingId: parseInt(addObj.whatWasPaid),
      categoryExpenseId : parseInt(addObj.forWhat)
    };



    createExpense(ExpenseFromFront);

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

    for (var key in addObj) {
      delete addObj[key];
    }
  };

  removeExpense = id => {
    console.log("expense.js removeExpense", id);

    // let listOfRows = this.state.rowsFromDbJson;
    // const newListWithoutRemovedItem = removeRowById(listOfRows, id);

    // deleteRow(id).then(
    //   () => this.showTempMessage("row deleted"),
    //   this.setState({ rowsFromDbJson: newListWithoutRemovedItem }, () => {
    //     this.invokePaginationOnPageChanged();
    //   })
    // );
  };

  editExpense = editObj => {
    console.log("expense.js editExpense", editObj);

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

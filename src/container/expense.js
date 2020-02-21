import React, { Component } from "react";
import { FaCaretDown } from "react-icons/fa";
import { expenses, revenues, savings } from "../shared/constData";

import ExpenseAddModal from "../component/expense/expenseAdd";
import ExpenseFilter from "../component/expense/expenseFilter";
// import ExpenseTable from "../component/expense/expenseTable";

import TableContainer from '../component/myCustomCRUDTable/TableContainer';

import styles from "../App.module.css";

class expense extends Component {
  state = {
    // isVisibleAddExpense: false,
    isVisibleFilterSettings: false,
    data: this.props.expenseData,
    columns: this.props.expenseColumns
  };

  displayFilterSettings = () => {
    this.setState({
      isVisibleFilterSettings: !this.state.isVisibleFilterSettings
    });
  };

  handleClose = () => {
    this.props.isAddExpense(false);
  };

  handleShow = () => {
    this.props.isAddExpense(true);
  };

  addExpense = addObj => {
    console.log("expense.js addExpense", addObj);

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
  }

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
  }

  editExpense = editObj => {
    console.log("expense.js editExpense", editObj);
  }

  render() {
   // console.log("Data", this.state.data);

    return (
      <>
        <div>
          {this.props.isAdd && (
            <ExpenseAddModal
              handleClose={this.handleClose}
              handleShow={this.handleShow}
              isVisibleAddExpense={this.props.isAdd}
            />
          )}
        </div>
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
              {/* <ExpenseTable
                expenseData={this.state.data}
                expenseColumns={this.state.columns}
              /> */}

              {/* HOW pass component into component, i need passExpenseForm, revenueForm itp... somethink like modal... */}
                  <TableContainer
                    columns={this.state.columns}
                    data={this.state.data}
                    addRow={this.addExpense}
                    removeRow={this.removeExpense}
                    editRow={this.editExpense}
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

export default expense;

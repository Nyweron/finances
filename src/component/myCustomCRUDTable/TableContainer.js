import React, { Component } from "react";
import { TableListRows } from "../myCustomCRUDTable/table/TableListRows";
import TableAdd from "../myCustomCRUDTable/table/TableAdd";
import Pagination from "./pagination/Pagination";
import { filterTable } from "../../lib/crudHelper";
// import {
//   getAll,
//   getKeyFromJson,
//   filterTable,
//   createPerson,
//   deleteRow,
//   updateRow
// } from "../lib/personService";
// import {
//   removeRowById,
//   updateByObjectId,
//   sortIds,
//   generateNewId
// } from "../lib/personHelpers";

class TableContainer extends Component {
  state = {
    rowsFromDbJson: this.props.data,
    keysFromDbJson: this.props.columns,
    sort: true,
    columnName: "",
    previousColumnName: "",
    add: false,
    currentRows: [],
    currentPage: 1,
    pageLimit: 5,
    pageNeighbours: 5
  };

  componentDidMount() {
    console.log("TableContainer.componentDidMount");
    // getAll().then(rows => {
    //   this.setState({ rowsFromDbJson: rows });
    //   const keys = getKeyFromJson(rows);
    //   if (keys !== null) {
    //     this.setState({ keysFromDbJson: keys });
    //   }
    // });
  }

  handleSubmitAddRow = addObj => {
    console.log("TableContainer.handleSubmitAddRow", addObj);
    this.props.addRow(addObj);
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

  handleChange = event => {
    console.log("TableContainer.handleChange", event);
    // event.preventDefault();
    // if (this.state.keysFromDbJson.length === 0) {
    //   this.setState({
    //     keysFromDbJson: this.state.keysFromDbJson.push(event.target.name)
    //   });
    // }
    // for (let index = 0; index < this.state.keysFromDbJson.length; index++) {
    //   if (event.target.name === this.state.keysFromDbJson[index].toString()) {
    //     this.setState({ [event.target.name]: event.target.value });
    //   }
    // }
  };

  handleRemove = id => {
    console.log("TableContainer.handleRemove", id);

    this.props.removeRow(id);
    // let listOfRows = this.state.rowsFromDbJson;
    // const newListWithoutRemovedItem = removeRowById(listOfRows, id);

    // deleteRow(id).then(
    //   () => this.showTempMessage("row deleted"),
    //   this.setState({ rowsFromDbJson: newListWithoutRemovedItem }, () => {
    //     this.invokePaginationOnPageChanged();
    //   })
    // );
  };

  invokePaginationOnPageChanged = () => {
    console.log("TableContainer.invokePaginationOnPageChanged");
    // const data = {};
    // data.totalRecords = this.state.rowsFromDbJson.length;
    // data.pageLimit = this.state.pageLimit;
    // data.pageNeighbours = this.state.pageNeighbours;
    // data.currentPage = this.state.currentPage;
    // this.onPageChanged(data);
  };

  handleEdit = editObj => {
    console.log("TableContainer.handleEdit", editObj);
    this.props.editRow(editObj);
    // let listOfRows = this.state.rowsFromDbJson;

    // const editExistRow = {
    //   id: editObj.id,
    //   firstName: editObj.firstName,
    //   lastName: editObj.lastName,
    //   age: editObj.age,
    //   isActive: true,
    //   hobby: editObj.hobby
    // };

    // const newUpdatedRowList = updateByObjectId(listOfRows, editExistRow);

    // updateRow(editExistRow).then(
    //   () => this.showTempMessage("row updated"),
    //   this.setState(
    //     {
    //       rowsFromDbJson: newUpdatedRowList
    //     },
    //     () => {
    //       this.invokePaginationOnPageChanged();
    //     }
    //   )
    // );
  };

  showTempMessage = msg => {
    console.log("TableContainer.showTempMessage", msg);
    // this.setState({ message: msg });
    // setTimeout(() => {
    //   this.setState({ message: "" });
    // }, 2000);
  };

  sortColumn = currentColumnName => {
    console.log("TableContainer.sortColumn", currentColumnName);
    /* We use 2 because in list always will be empty row with id=0 and new row which we will create. */
    if (this.state.rowsFromDbJson & (this.state.rowsFromDbJson.length === 2)) {
      return;
    }
    if (this.state.previousColumnName === currentColumnName) {
      this.setState({ columnName: currentColumnName });
      this.setState(prevState => ({
        sort: !prevState.sort
      }));
    } else {
      this.setState({
        columnName: currentColumnName,
        previousColumnName: currentColumnName
      });
      this.setState(prevState => ({
        sort: !prevState.sort
      }));
    }
  };

  negationAdd = () => {
    console.log("TableContainer.negationAdd");
    this.setState({ add: !this.state.add });
  };

  handleClose = () => {
    console.log("TableContainer.handleClose");
    this.setState({ add: false });
  };

  onPageChanged = data => {
    console.log("TableContainer.onPageChanged", data);
    const offset = (data.currentPage - 1) * data.pageLimit;
    const currentRows = this.state.rowsFromDbJson.slice(
      offset,
      offset + data.pageLimit
    );

    this.setState({
      currentPage: data.currentPage,
      rowsFromDbJson: this.state.rowsFromDbJson,
      currentRows
    });
  };

  render() {
    console.log("TableContainer", this.state);

    if (
      this.state.rowsFromDbJson === undefined ||
      this.state.rowsFromDbJson.length === 0
    ) {
      return null;
    }

    const displayTable = filterTable(
      this.state.keysFromDbJson,
      this.state.currentRows,
      this.state.columnName,
      this.state.sort
    );

    return (
      <div className="container">
        <div className="row">
          <button className="btn btn-primary" onClick={this.negationAdd}>
            Add row
          </button>
          {this.state.message && (
            <span className="success">{this.state.message}</span>
          )}
        </div>

        <this.props.AddComponent
          show={this.state.add}
          handleClose={this.handleClose}
        />

        {/* <TableAdd
          show={this.state.add}
          handleSubmitAddRow={this.handleSubmitAddRow}
          handleChange={this.handleChange}
          negationAdd={this.negationAdd}
        />


        <this.props.FormAddComponent
          show={this.state.add}
          handleSubmitAddRow={this.handleSubmitAddRow}
          handleChange={this.handleChange}
          negationAdd={this.negationAdd}
        />

        <this.props.EditComponent /> */}

        <div className="row">
          <TableListRows
            rows={displayTable}
            keys={
              this.state.keysFromDbJson === null
                ? null
                : this.state.keysFromDbJson
            }
            classCss="table table-striped table-bordered"
            handleChange={this.handleChange}
            sortColumn={this.sortColumn}
            handleRemove={this.handleRemove}
            handleEdit={this.handleEdit}
          />
        </div>
        <div className="container mb-5">
          <div className="d-flex flex-row py-4 align-items-center justify-content-center">
            <Pagination
              totalRecords={this.state.rowsFromDbJson.length}
              pageLimit={this.state.pageLimit}
              pageNeighbours={this.state.pageNeighbours}
              onPageChanged={this.onPageChanged}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TableContainer;

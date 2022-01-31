import React, { Component } from "react";

import { Table, Icon, Pagination } from "semantic-ui-react";

import { getAll, createExpense, editPutExpense, deleteRowExpense } from "../lib/expenseService";

import {
  Expense2Add,
  Expense2Edit,
  Expense2Remove,
} from "../component/expense2";

import { sortIds, generateNewId } from "../lib/crudHelper";

class expense2 extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      allData: [],
      dataEdit: {},
      dataRemove: {},
      expenseDataOnPage: [],
      begin: 0,
      end: 4,
      showModalAdd: false,
      showModalEdit: false,
      showModalRemove: false,
      isCreated: false,
      isEdited: false,
      ieRemoved: false,
    };
  }

  componentDidMount() {
    getAll("expense").then((rows) => {
      this.setState({
        allData: rows,
        expenseDataOnPage: rows.slice(this.state.begin, this.state.end),
      });
    });
  }

  componentDidUpdate() {
    if (this.state.isCreated || this.state.isEdited || this.state.ieRemoved) {
      getAll("expense")
        .then((rows) => {
          this.setState({
            allData: rows,
            expenseDataOnPage: rows.slice(this.state.begin, this.state.end),
            isCreated: false,
            isEdited: false,
            ieRemoved: false,
          });
        })
        .catch((error) => {
          this.setState({
            isCreated: false,
            isEdited: false,
            ieRemoved: false,
          });
        });
    }
  }

  onChangePage = async (event: React.MouseEvent<HTMLAnchorElement>, data) => {
    await this.setState({
      activePage: data.activePage,
      begin: data.activePage * 4 - 4,
      end: data.activePage * 4,
    });

    this.setState({
      expenseDataOnPage: this.state.allData.slice(
        this.state.begin,
        this.state.end
      ),
    });
  };

  handleRemoveExpense = (expenseRemove) => {
    console.log(
      "🚀 ~ file: expense2.js ~ line 43 ~ expense2 handleRemoveExpense ~ expenseRemove",
      expenseRemove
    );

    this.setState({ showModalRemove: !this.state.showModalRemove });
    this.setState({ dataRemove: expenseRemove });
  };

  handleRemoveExpenseTwo = (expenseRemove) => {
    console.log(
      "🚀 ~ file: expense2.js ~ line 81 ~ expense2 ~ handleRemoveExpenseTwo expenseRemove",
      expenseRemove
    );

    this.setState({ showModalRemove: !this.state.showModalRemove });
    deleteRowExpense(expenseRemove.id).then((res) => {
    console.log("🚀 ~ file: expense2.js ~ line 98 ~ expense2 ~ deleteRowExpense ~ res", res)

      this.setState({ isRemoved: true });
    });
  };

  handleEditExpense = (expenseEdit) => {
    console.log(
      "🚀 ~ file: expense2.js ~ line 52 ~ expense2 handleEditExpense ~ expenseEdit",
      expenseEdit
    );

    this.setState({ showModalEdit: !this.state.showModalEdit });
    this.setState({ dataEdit: expenseEdit });
  };

  handleEditExpenseTwo = (expenseEdit) => {
    console.log(
      "🚀 ~ file: expense2.js ~ line 61 ~ expense2 handleEditExpenseTwo ~ expenseEdit",
      expenseEdit
    );

    this.setState({ showModalEdit: !this.state.showModalEdit });

    const expenseObj = {
      id: expenseEdit.id,
      howMuch: parseFloat(expenseEdit.howMuch),
      date: new Date(expenseEdit.calendarDate),
      comment: expenseEdit.comment,
      attachment: expenseEdit.attachment,
      standingOrder: expenseEdit.autoSubtractAmount,
      userId: parseInt(expenseEdit.userId),
      categorySavingId: parseInt(expenseEdit.categorySavingId),
      categoryExpenseId: parseInt(expenseEdit.categoryExpenseId),
    };
    console.log(
      "🚀 ~ file: expense2.js ~ line 102 ~  EDIT expense2 ~ expenseObj",
      expenseObj
    );

    editPutExpense(expenseObj).then((res) => {
      console.log(
        "🚀 ~ file: expense2.js ~ line 109 ~ expense2 ~ createExpense ~ res",
        res
      );
      this.setState({ isCreated: true });
    });
  };

  handleAddExpense = (props) => {
    console.log(
      "🚀 ~ file: expense2.js ~ line 58 ~ expense2 ADD~ props",
      props
    );
    this.setState({ showModalAdd: !this.state.showModalAdd });
  };

  handleAddExpenseTwo = (props) => {
    // console.log(
    //   "🚀 ~ file: expense2.js ~ line 66 ~ handleAddExpenseTwo ADD~ props",
    //   props
    //   );

    this.setState({ showModalAdd: !this.state.showModalAdd });

    const expenseObj = {
      howMuch: parseFloat(props.howMuch),
      date: new Date(props.calendarDate),
      comment: props.comment,
      attachment: props.attachment,
      standingOrder: props.autoSubtractAmount,
      userId: parseInt(props.userId),
      categorySavingId: parseInt(props.categorySavingId),
      categoryExpenseId: parseInt(props.categoryExpenseId),
    };
    console.log(
      "🚀 ~ file: expense2.js ~ line 96 ~ expense2 ~ expenseObj",
      expenseObj
    );

    createExpense(expenseObj).then((res) => {
      console.log(
        "🚀 ~ file: expense2.js ~ line 109 ~ expense2 ~ createExpense ~ res",
        res
      );
      this.setState({ isCreated: true });
    });
  };

  render() {
    return (
      <>
        <div className="ui centered grid">
          <div className="row"></div>
          <div className="row">
            <div className="fourteen wide column">
              <button
                className="ui blue button"
                onClick={() => this.handleAddExpense()}
              >
                Dodaj wydatki
              </button>
            </div>
          </div>
          <div className="row">
            <div className="fourteen wide column">
              <Table celled selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Kwota</Table.HeaderCell>
                    <Table.HeaderCell>Na co</Table.HeaderCell>
                    <Table.HeaderCell>Czym zapłacono</Table.HeaderCell>
                    <Table.HeaderCell>Kiedy</Table.HeaderCell>
                    <Table.HeaderCell>Kto</Table.HeaderCell>
                    <Table.HeaderCell>Komentarz</Table.HeaderCell>
                    <Table.HeaderCell>Załącznik?</Table.HeaderCell>
                    <Table.HeaderCell>Usuń</Table.HeaderCell>
                    <Table.HeaderCell>Edytuj</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.expenseDataOnPage.map((item, i) => {
                    return (
                      <Table.Row key={`expenseRow_${i}`}>
                        <Table.Cell key={`id${i}`}>{item.id}</Table.Cell>
                        <Table.Cell key={`howMuch_${i}`}>
                          {item.howMuch}
                        </Table.Cell>
                        <Table.Cell key={`categoryExpenseDescription_${i}`}>
                          {item.categoryExpenseDescription}
                        </Table.Cell>
                        <Table.Cell key={`categorySavingDescription_${i}`}>
                          {item.categorySavingDescription}
                        </Table.Cell>
                        <Table.Cell key={`date_${i}`}>{item.date}</Table.Cell>
                        <Table.Cell key={`userDescription_${i}`}>
                          {item.userDescription}
                        </Table.Cell>
                        <Table.Cell key={`comment_${i}`}>
                          {item.comment}
                        </Table.Cell>
                        <Table.Cell key={`attachment_${i}`}>
                          {item.attachment}
                        </Table.Cell>
                        <Table.Cell
                          key={`remove_${i}`}
                          className="center aligned"
                        >
                          <button
                            className="ui red button"
                            onClick={() => this.handleRemoveExpense(item)}
                          >
                            Usuń
                          </button>
                        </Table.Cell>
                        <Table.Cell
                          key={`Edit_${i}`}
                          className="center aligned"
                        >
                          <button
                            className="ui green button "
                            onClick={() => this.handleEditExpense(item)}
                          >
                            Edytuj
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>

                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan={10}>
                      <Pagination
                        ellipsisItem={{
                          content: <Icon name="ellipsis horizontal" />,
                          icon: true,
                        }}
                        firstItem={{
                          content: <Icon name="angle double left" />,
                          icon: true,
                        }}
                        lastItem={{
                          content: <Icon name="angle double right" />,
                          icon: true,
                        }}
                        prevItem={{
                          content: <Icon name="angle left" />,
                          icon: true,
                        }}
                        nextItem={{
                          content: <Icon name="angle right" />,
                          icon: true,
                        }}
                        defaultActivePage={1}
                        totalPages={Math.ceil(this.state.allData.length / 4)}
                        onPageChange={this.onChangePage}
                      />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </div>
          </div>

          {this.state.showModalAdd && (
            <Expense2Add
              showModal={this.state.showModalAdd}
              handleSubmit={this.handleAddExpenseTwo}
            />
          )}
          {this.state.showModalEdit && (
            <Expense2Edit
              showModal={this.state.showModalEdit}
              handleSubmit={this.handleEditExpenseTwo}
              data={this.state.dataEdit}
            />
          )}
          {this.state.showModalRemove && (
            <Expense2Remove
              showModal={this.state.showModalRemove}
              handleSubmit={this.handleRemoveExpenseTwo}
              data={this.state.dataRemove}
            />
          )}
        </div>
      </>
    );
  }
}
export default expense2;

import React, { Component } from "react";

import { Table, Icon, Pagination } from "semantic-ui-react";

import { getAll } from "../lib/expenseService";

import  {Expense2Add } from "../component/expense2";

class expense2 extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      expenseData: [],
      begin: 0,
      end: 4,
      showModal: false,
    };
  }

  componentDidMount() {
    getAll("expense").then((rows) => {
      this.setState({
        data: rows,
        expenseData: rows.slice(this.state.begin, this.state.end),
      });
    });
  }

  onChangePage = async (event: React.MouseEvent<HTMLAnchorElement>, data) => {
    await this.setState({
      activePage: data.activePage,
      begin: data.activePage * 4 - 4,
      end: data.activePage * 4,
    });

    this.setState({
      expenseData: this.state.data.slice(this.state.begin, this.state.end),
    });
  };

  handleRemoveExpense = (expenseId) => {
    console.log(
      "🚀 ~ file: expense2.js ~ line 43 ~ expense2  REMOVE ~ expenseId",
      expenseId
    );
  };

  handleEditExpense = (expense) => {
    console.log(
      "🚀 ~ file: expense2.js ~ line 50 ~ expense2 EDIT ~ expense",
      expense
    );
  };

  handleAddExpense = (props) => {
    console.log(
      "🚀 ~ file: expense2.js ~ line 58 ~ expense2 ADD~ props",
      props
    );
    this.setState({ showModal: !this.state.showModal });
  };

  handleAddExpenseTwo = (props) => {
    console.log(
      "🚀 ~ file: expense2.js ~ line 66 ~ handleAddExpenseTwo ADD~ props",
      props
      );
      this.setState({ showModal: !this.state.showModal });

    };

    render() {
      // console.log(
        //   "🚀 ~ file: expense2.js ~ line 49 ~ expense2 ~ expenseData",
        //   this.state.expenseData
        // );

       // console.log("🚀 ~ file: expense2.js ~ line 79 ~ expense2 ~ render ~ this.state.showModal", this.state.showModal)
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
                  {this.state.expenseData.map((item, i) => {
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
                            onClick={() => this.handleRemoveExpense(item.id)}
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
                        totalPages={Math.ceil(this.state.data.length / 4)}
                        onPageChange={this.onChangePage}
                      />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </div>
          </div>


          {this.state.showModal && <Expense2Add showModal={this.state.showModal} handleSubmit={this.handleAddExpenseTwo} />}

        </div>
      </>
    );
  }
}
export default expense2;

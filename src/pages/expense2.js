import React, { Component } from "react";

import { Table, Icon, Pagination } from "semantic-ui-react";

import { getAll } from "../lib/expenseService";

class expense2 extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      expenseData: [],
      articles: [],
      articleDatas: [],
      begin: 0,
      end: 4,
      activePage: 1,
      columnHeader: Array.from(Array(4).keys()),
    };
  }

  componentDidMount() {
    getAll("expense").then((rows) => {
      this.setState({
        data: rows,
        articles: rows,

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

  handleClickEdit = (itemId) => {
    // console.log("🚀 ~ file: expense2.js ~ line 49 ~ expense2 ~ itemId", itemId);
  };

  handleRemoveExpense = (expenseId) => {
    console.log(
      "🚀 ~ file: expense2.js ~ line 50 ~ expense2  REMOVE ~ expenseId",
      expenseId
    );
  };

  handleEditExpense = (expense) => {
    console.log(
      "🚀 ~ file: expense2.js ~ line 55 ~ expense2 EDIT ~ expense",
      expense
    );
  };

  render() {
    console.log(
      "🚀 ~ file: expense2.js ~ line 49 ~ expense2 ~ expenseData",
      this.state.expenseData
    );

    return (
      <>
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
                <Table.Row
                  key={`expenseRow_${i}`}
                  onClick={() => {
                    this.handleClickEdit(item);
                  }}
                >
                  <Table.Cell key={`id${i}`}>{item.id}</Table.Cell>
                  <Table.Cell key={`howMuch_${i}`}>{item.howMuch}</Table.Cell>
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
                  <Table.Cell key={`comment_${i}`}>{item.comment}</Table.Cell>
                  <Table.Cell key={`attachment_${i}`}>
                    {item.attachment}
                  </Table.Cell>
                  <Table.Cell key={`remove_${i}`}>
                    <button
                      className="ui red button"
                      onClick={() => this.handleRemoveExpense(item.id)}
                    >
                      Usuń
                    </button>
                  </Table.Cell>
                  <Table.Cell key={`Edit_${i}`}>
                    <button
                      className="ui green button"
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
                  prevItem={{ content: <Icon name="angle left" />, icon: true }}
                  nextItem={{
                    content: <Icon name="angle right" />,
                    icon: true,
                  }}
                  defaultActivePage={1}
                  totalPages={Math.ceil(this.state.articles.length / 4)}
                  onPageChange={this.onChangePage}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </>
    );
  }
}
export default expense2;

import React, { Component } from "react";

import { Table, Icon, Pagination } from "semantic-ui-react";

import { getAll } from "../lib/incomeService";

import {
  IncomeAdd,
  IncomeEdit,
  IncomeRemove,
} from "../component/income";

//import styles from "../App.module.css";

class Income extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      allData: [],
      dataEdit: {},
      dataRemove: {},
      incomeDataOnPage: [],
      begin: 0,
      rowPerPage: 4,
      showModalAdd: false,
      showModalEdit: false,
      showModalRemove: false,
      isCreated: false,
      isEdited: false,
      isRemoved: false,
    };
  }

  componentDidMount() {
    getAll("income").then((rows) => {
      console.log("🚀 ~ file: income.js ~ line 38 ~ Income ~ getAll ~ rows", rows)
      this.setState({
        allData: rows,
        incomeDataOnPage: rows.slice(this.state.begin, this.state.rowPerPage),
      });
    });
  }

  componentDidUpdate() {
    if (this.state.isCreated || this.state.isEdited || this.state.isRemoved) {
      getAll("income")
        .then((rows) => {
          this.setState({
            allData: rows,
            incomeDataOnPage: rows.slice(this.state.begin, this.state.rowPerPage),
            isCreated: false,
            isEdited: false,
            isRemoved: false,
          });
        })
        .catch((error) => {
          this.setState({
            isCreated: false,
            isEdited: false,
            isRemoved: false,
          });
        });
    }
  }

  onChangePage = async (event: React.MouseEvent<HTMLAnchorElement>, data) => {
    await this.setState({
      activePage: data.activePage,
      begin: data.activePage * 4 - 4,
      rowPerPage: data.activePage * 4,
    });

    this.setState({
      incomeDataOnPage: this.state.allData.slice(
        this.state.begin,
        this.state.rowPerPage
      ),
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
                onClick={() => this.handleAddIncome()}
              >
                Dodaj przychód
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
                    <Table.HeaderCell>Tytuł przychodu</Table.HeaderCell>
                    <Table.HeaderCell>Wpłacono na</Table.HeaderCell>
                    <Table.HeaderCell>Kiedy</Table.HeaderCell>
                    <Table.HeaderCell>Kto</Table.HeaderCell>
                    <Table.HeaderCell>Komentarz</Table.HeaderCell>
                    <Table.HeaderCell>Usuń</Table.HeaderCell>
                    <Table.HeaderCell>Edytuj</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.incomeDataOnPage.map((item, i) => {
                    return (
                      <Table.Row key={`incomeRow_${i}`}>
                        <Table.Cell key={`id${i}`}>{item.id}</Table.Cell>
                        <Table.Cell key={`howMuch_${i}`}>
                          {item.howMuch}
                        </Table.Cell>
                        <Table.Cell key={`categoryIncomeDescription_${i}`}>
                          {item.categoryIncomeDescription}
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
                        <Table.Cell
                          key={`remove_${i}`}
                          className="center aligned"
                        >
                          <button
                            className="ui red button"
                            onClick={() => this.handleRemoveIncome(item)}
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
                            onClick={() => this.handleEditIncome(item)}
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
            <IncomeAdd
              showModal={this.state.showModalAdd}
              handleSubmit={this.handleAddIncomeTwo}
            />
          )}
          {this.state.showModalEdit && (
            <IncomeEdit
              showModal={this.state.showModalEdit}
              handleSubmit={this.handleEditIncomeTwo}
              data={this.state.dataEdit}
            />
          )}
          {this.state.showModalRemove && (
            <IncomeRemove
              showModal={this.state.showModalRemove}
              handleSubmit={this.handleRemoveIncomeTwo}
              data={this.state.dataRemove}
            />
          )}
        </div>
      </>
    );
  }
}

export default Income;

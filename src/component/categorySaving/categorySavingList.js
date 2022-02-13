import React, { Component } from "react";

import { Table, Icon, Pagination } from "semantic-ui-react";

import { SavingAdd, SavingEdit, SavingRemove } from "./index";

import { getAll, create, edit, remove } from "../../lib/genericService";

class CategorySavingList extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
    allData: [],

    savingDataOnPage: [],
    begin: 0,

    end: 4,
    }
  }

  componentDidMount() {
    getAll("categorySaving").then((rows) => {
      this.setState({
        allData: rows,
        savingDataOnPage: rows.slice(this.state.begin, this.state.end),
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
      savingDataOnPage: this.state.allData.slice(
        this.state.begin,
        this.state.end
      ),
    });
  };


  render() {

    console.log("🚀 ~ file: categorySavingList.js ~ line 8 ~ categorySavingList ~ this.props", this.props)
    console.log("🚀 ~ file: categorySavingList.js ~ line 8 ~ categorySavingList ~ this.state", this.state)


    return (
      <>
        <div className="row">
          <div className="fourteen wide column">
            <Table celled selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Id</Table.HeaderCell>
                  <Table.HeaderCell>Opis</Table.HeaderCell>
                  <Table.HeaderCell>Widoczność</Table.HeaderCell>
                  <Table.HeaderCell>Możliwość zapłaty</Table.HeaderCell>
                  <Table.HeaderCell>Charakter długu</Table.HeaderCell>
                  <Table.HeaderCell>Usuń</Table.HeaderCell>
                  <Table.HeaderCell>Edytuj</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.savingDataOnPage.map((item, i) => {
                  console.log("🚀 ~ file: categorySavingList.js ~ line 72 ~ CategorySavingList ~ {this.state.savingDataOnPage.map ~ item", item)
                  return (
                    <Table.Row key={`categorySavingRow_${i}`}>
                      <Table.Cell key={`id${i}`}>{item.id}</Table.Cell>
                      <Table.Cell key={`description_${i}`}>
                        {item.description}
                      </Table.Cell>
                      <Table.Cell key={`isDeleted${i}`}>{item.isDeleted === false ? "false" : "true"}</Table.Cell>
                      <Table.Cell key={`canPay_${i}`}>{item.canPay=== false ? "false" : "true"}</Table.Cell>
                      <Table.Cell key={`dept${i}`}>{item.dept=== false ? "false" : "true"}</Table.Cell>
                      <Table.Cell key={`remove_${i}`} className="center aligned">
                        <button
                          className="ui red button"
                          onClick={() => this.handleOpenModalRemoveSaving(item)}
                        >
                          Usuń
                        </button>
                      </Table.Cell>
                      <Table.Cell key={`edit_${i}`} className="center aligned">
                        <button
                          className="ui green button "
                          onClick={() => this.handleOpenModalEditSaving(item)}
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


      </>
    );
  }
};

export default CategorySavingList;

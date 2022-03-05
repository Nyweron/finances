import React, { Component } from "react";
import { connect } from "react-redux";

import { Table, Icon, Pagination } from "semantic-ui-react";
import { CategorySavingModelList } from "../../constants";

import { getAll } from "../../lib/genericService";
import {
  OPEN_MODAL_EDIT,
  OPEN_MODAL_REMOVE,
} from "../../redux/actions/actions";

interface IRecipeProps {
  handleOpenModalRemove: any;
  handleOpenModalEdit: any;
  categorySavingDataOnPage: CategorySavingModelList[];
  modalAdd: boolean;
  modalEdit: boolean;
  modalRemove: boolean;
}

interface IRecipeState {}

class CategorySavingList extends Component<IRecipeProps, IRecipeState> {
  state = {
    allData: [],
    dataEdit: {},
    dataRemove: {},
    categorySavingDataOnPage: [],
    begin: 0,
    end: 4,
    isCreated: false,
    isEdited: false,
    isRemoved: false,
  };

  componentDidMount() {
    getAll("categorySaving").then((rows) => {
      this.setState({
        allData: rows,
        categorySavingDataOnPage: rows.slice(this.state.begin, this.state.end),
      });
    });
  }

  onChangePage = async (event: any, data: any) => {
    await this.setState({
      activePage: data.activePage,
      begin: data.activePage * 4 - 4,
      end: data.activePage * 4,
    });

    this.setState({
      categorySavingDataOnPage: this.state.allData.slice(
        this.state.begin,
        this.state.end
      ),
    });
  };

  handleOpenModalRemoveCategorySaving = (categorySavingRemove: any) => {
    this.props.handleOpenModalRemove();
    this.setState({ dataRemove: categorySavingRemove });
  };

  handleOpenModalEditCategorySaving = (categorySavingEdit: any) => {
    this.props.handleOpenModalEdit();
    this.setState({ dataEdit: categorySavingEdit });
  };

  render() {
    console.log(
      "🚀 ~ file: categorySavingList.js ~ line 8 ~ categorySavingList ~ this.props",
      this.props
    );
    console.log(
      "🚀 ~ file: categorySavingList.js ~ line 8 ~ categorySavingList ~ this.state",
      this.state
    );

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
                {this.state.categorySavingDataOnPage.map(
                  (item: CategorySavingModelList, i) => {
                    console.log(
                      "🚀 ~ file: categorySavingList.js ~ line 72 ~ CategorySavingList ~ {this.state.categorySavingDataOnPage.map ~ item",
                      item
                    );
                    return (
                      <Table.Row key={`categorySavingRow_${i}`}>
                        <Table.Cell key={`id${i}`}>{item.id}</Table.Cell>
                        <Table.Cell key={`description_${i}`}>
                          {item.description}
                        </Table.Cell>
                        <Table.Cell key={`isDeleted${i}`}>
                          {item.isDeleted === false ? "false" : "true"}
                        </Table.Cell>
                        <Table.Cell key={`canPay_${i}`}>
                          {item.canPay === false ? "false" : "true"}
                        </Table.Cell>
                        <Table.Cell key={`debt${i}`}>
                          {item.debt === false ? "false" : "true"}
                        </Table.Cell>
                        <Table.Cell
                          key={`remove_${i}`}
                          className="center aligned"
                        >
                          <button
                            className="ui red button"
                            onClick={() =>
                              this.handleOpenModalRemoveCategorySaving(item)
                            }
                          >
                            Usuń
                          </button>
                        </Table.Cell>
                        <Table.Cell
                          key={`edit_${i}`}
                          className="center aligned"
                        >
                          <button
                            className="ui green button "
                            onClick={() =>
                              this.handleOpenModalEditCategorySaving(item)
                            }
                          >
                            Edytuj
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  }
                )}
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
                      onPageChange={(e) => this.onChangePage}
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
}

function mapStateToProps(state: any) {
  return {
    modalAdd: state.modalAdd,
    modalEdit: state.modalEdit,
    modalRemove: state.modalRemove,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleOpenModalEdit: () => dispatch({ type: OPEN_MODAL_EDIT }),
    handleOpenModalRemove: () => dispatch({ type: OPEN_MODAL_REMOVE }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySavingList);

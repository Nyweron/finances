import React, { Component, SyntheticEvent } from "react";
import { connect } from "react-redux";

import { Table, Icon, Pagination, Select } from "semantic-ui-react";
import { CategoryExpenseModelList } from "../../constants";

import { create, getAll, remove } from "../../lib/genericService";
import {
  OPEN_MODAL_EDIT,
  OPEN_MODAL_REMOVE,
} from "../../redux/actions/actions";
import { CategoryExpenseAdd, CategoryExpenseRemove } from "./index";

const rowsPerListOptions = [
  { key: "4", value: "4", text: "4" },
  { key: "10", value: "10", text: "10" },
  { key: "25", value: "25", text: "25" },
  { key: "50", value: "50", text: "50" },
  { key: "100", value: "100", text: "100" },
];

interface IRecipeProps {
  handleOpenModalRemove: any;
  handleOpenModalEdit: any;
  categoryExpenseDataOnPage: CategoryExpenseModelList[];
  modalAdd: boolean;
  modalEdit: boolean;
  modalRemove: boolean;
}

interface IRecipeState {}

class CategoryExpenseList extends Component<IRecipeProps, IRecipeState> {
  state = {
    allData: [],
    dataEdit: {},
    dataRemove: {},
    categoryExpenseDataOnPage: [],
    begin: 0,
    end: 4,
    perPage: 4,
    activePage: 1,
    isCreated: false,
    isEdited: false,
    isRemoved: false,
  };

  componentDidMount() {
    getAll("categoryExpense").then((rows) => {
      this.setState({
        allData: rows,
        categoryExpenseDataOnPage: rows.slice(this.state.begin, this.state.end),
      });
    });
  }

  componentDidUpdate() {
    if (this.state.isCreated || this.state.isEdited || this.state.isRemoved) {
      getAll("categoryExpense")
        .then((rows) => {
          this.setState({
            allData: rows,
            categoryExpenseDataOnPage: rows.slice(
              this.state.begin,
              this.state.end
            ),
            isCreated: false,
            isEdited: false,
            isRemoved: false,
          });
        })
        .catch((error) => {})
        .finally(() => {
          this.setState({
            isCreated: false,
            isEdited: false,
            isRemoved: false,
          });
        });
    }
  }

  onChangePage = async (event: any, data: any) => {
    await this.setState({
      activePage: data.activePage,
      begin: data.activePage * this.state.perPage - this.state.perPage,
      end: data.activePage * this.state.perPage,
    });

    this.setState({
      categoryExpenseDataOnPage: this.state.allData.slice(
        this.state.begin,
        this.state.end
      ),
    });
  };

  handleAddCategoryExpense = (props: any) => {
    const expenseCategoryObj = {
      description: props.description,
      isDeleted: props.isDeleted,
      categoryGroupId: -1,
    };

    create(expenseCategoryObj, "categoryExpense").then((res) => {
      this.setState({ isCreated: true });
    });
  };

  handleOpenModalRemoveCategoryExpense = (categoryExpenseRemove: any) => {
    this.props.handleOpenModalRemove();
    this.setState({ dataRemove: categoryExpenseRemove });
  };

  handleRemoveCategoryExpense = (categoryExpenseRemove: any) => {
    remove(categoryExpenseRemove.id, "categoryExpense").then((res) => {
      this.setState({ isRemoved: true });
    });
  };

  handleOpenModalEditCategoryExpense = (categoryExpenseEdit: any) => {
    this.props.handleOpenModalEdit();
    this.setState({ dataEdit: categoryExpenseEdit });
  };

  handleDisplayRowsPerPage = async (
    event: SyntheticEvent<HTMLElement, Event>,
    d: any
  ) => {
    await this.setState({ perPage: d.value });

    await this.setState({
      activePage: this.state.activePage,
      begin: this.state.activePage * this.state.perPage - this.state.perPage,
      end: this.state.activePage * this.state.perPage,
    });

    this.setState({
      categoryExpenseDataOnPage: this.state.allData.slice(
        this.state.begin,
        this.state.end
      ),
    });
  };

  render() {
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
                  <Table.HeaderCell>Usuń</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.categoryExpenseDataOnPage.map(
                  (item: CategoryExpenseModelList, i) => {
                    return (
                      <Table.Row key={`categoryExpenseRow_${i}`}>
                        <Table.Cell key={`id${i}`}>{item.id}</Table.Cell>
                        <Table.Cell key={`description_${i}`}>
                          {item.description}
                        </Table.Cell>
                        <Table.Cell key={`isDeleted${i}`}>
                          {item.isDeleted === false ? "false" : "true"}
                        </Table.Cell>
                        <Table.Cell
                          key={`remove_${i}`}
                          className="center aligned"
                        >
                          <button
                            className="ui red button"
                            onClick={() =>
                              this.handleOpenModalRemoveCategoryExpense(item)
                            }
                          >
                            Usuń
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  }
                )}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan={5}>
                    <Table.Cell>
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
                        totalPages={Math.ceil(
                          this.state.allData.length / this.state.perPage
                        )}
                        onPageChange={this.onChangePage}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Select
                        placeholder="Wiersze per strona"
                        options={rowsPerListOptions}
                        onChange={this.handleDisplayRowsPerPage}
                      />
                    </Table.Cell>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
        </div>

        {this.props.modalAdd && (
          <CategoryExpenseAdd handleSubmit={this.handleAddCategoryExpense} />
        )}
        {this.props.modalRemove && (
          <CategoryExpenseRemove
            handleSubmit={this.handleRemoveCategoryExpense}
            data={this.state.dataRemove}
          />
        )}
      </>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    modalAdd: state.categoryExpenseModalAdd,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryExpenseList);

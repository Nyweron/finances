import React, { Component } from "react";
import { connect } from "react-redux";

import { Table, Icon, Pagination } from "semantic-ui-react";
import { CategoryIncomeModelList } from "../../constants";

import { create, getAll, remove } from "../../lib/genericService";
import {
  OPEN_MODAL_EDIT,
  OPEN_MODAL_REMOVE,
} from "../../redux/actions/actions";
import { CategoryIncomeAdd, CategoryIncomeRemove } from "./index";

interface IRecipeProps {
  handleOpenModalRemove: any;
  handleOpenModalEdit: any;
  categoryIncomeDataOnPage: CategoryIncomeModelList[];
  modalAdd: boolean;
  modalEdit: boolean;
  modalRemove: boolean;
}

interface IRecipeState {}

class CategoryIncomeList extends Component<IRecipeProps, IRecipeState> {
  state = {
    allData: [],
    dataEdit: {},
    dataRemove: {},
    categoryIncomeDataOnPage: [],
    begin: 0,
    end: 4,
    isCreated: false,
    isEdited: false,
    isRemoved: false,
  };

  componentDidMount() {
    getAll("categoryIncome").then((rows) => {
      this.setState({
        allData: rows,
        categoryIncomeDataOnPage: rows.slice(this.state.begin, this.state.end),
      });
    });
  }

  componentDidUpdate() {
    if (this.state.isCreated || this.state.isEdited || this.state.isRemoved) {
      getAll("categoryIncome")
        .then((rows) => {
          this.setState({
            allData: rows,
            categoryIncomeDataOnPage: rows.slice(
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
      begin: data.activePage * 4 - 4,
      end: data.activePage * 4,
    });

    this.setState({
      categoryIncomeDataOnPage: this.state.allData.slice(
        this.state.begin,
        this.state.end
      ),
    });
  };

  handleAddCategoryIncome = (props: any) => {
    console.log(
      "🚀 ~ file: categoryIncomeList.tsx ~ line 63 ~ CategoryIncomeList ~ props",
      props
    );
    const incomeCategoryObj = {
      description: props.description,
      isDeleted: props.isDeleted,
      categoryGroupId: -1,
    };

    create(incomeCategoryObj, "categoryIncome").then((res) => {
      this.setState({ isCreated: true });
    });
  };

  handleOpenModalRemoveCategoryIncome = (categoryIncomeRemove: any) => {
    this.props.handleOpenModalRemove();
    this.setState({ dataRemove: categoryIncomeRemove });
  };

  handleRemoveCategoryIncome = (categoryIncomeRemove: any) => {
    remove(categoryIncomeRemove.id, "categoryIncome").then((res) => {
      this.setState({ isRemoved: true });
    });
  };

  handleOpenModalEditCategoryIncome = (categoryIncomeEdit: any) => {
    this.props.handleOpenModalEdit();
    this.setState({ dataEdit: categoryIncomeEdit });
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
                {this.state.categoryIncomeDataOnPage.map(
                  (item: CategoryIncomeModelList, i) => {
                    return (
                      <Table.Row key={`categoryIncomeRow_${i}`}>
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
                              this.handleOpenModalRemoveCategoryIncome(item)
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

        {this.props.modalAdd && (
          <CategoryIncomeAdd handleSubmit={this.handleAddCategoryIncome} />
        )}
        {this.props.modalRemove && (
          <CategoryIncomeRemove
            handleSubmit={this.handleRemoveCategoryIncome}
            data={this.state.dataRemove}
          />
        )}
      </>
    );
  }
}

function mapStateToProps(state: any) {
  console.log(
    "🚀 ~ file: categoryIncomeList.tsx ~ line 234 ~ mapStateToProps ~ state",
    state
  );
  return {
    modalAdd: state.categoryIncomeModalAdd,
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryIncomeList);

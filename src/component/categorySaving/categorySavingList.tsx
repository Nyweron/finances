import React, { Component } from "react";
import { connect } from "react-redux";

import { Table, Icon, Pagination } from "semantic-ui-react";
import { CategorySavingModelList } from "../../constants";

import { create, getAll, remove } from "../../lib/genericService";
import {
  OPEN_MODAL_EDIT,
  OPEN_MODAL_REMOVE,
} from "../../redux/actions/actions";
import { CategorySavingAdd, CategorySavingRemove } from "./index";

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

  componentDidUpdate() {
    if (this.state.isCreated || this.state.isEdited || this.state.isRemoved) {
      getAll("categorySaving")
        .then((rows) => {
          this.setState({
            allData: rows,
            categorySavingDataOnPage: rows.slice(
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
      categorySavingDataOnPage: this.state.allData.slice(
        this.state.begin,
        this.state.end
      ),
    });
  };

  handleAddCategorySaving = (props: any) => {
    console.log(
      "🚀 ~ file: categorySavingList.tsx ~ line 63 ~ CategorySavingList ~ props",
      props
    );
    const savingCategoryObj = {
      description: props.description,
      isDeleted: props.isDeleted,
      debt: props.debt,
      canPay: props.canPay,
      categoryGroupId: -1,
    };

    create(savingCategoryObj, "categorySaving").then((res) => {
      this.setState({ isCreated: true });
    });
  };

  handleOpenModalRemoveCategorySaving = (categorySavingRemove: any) => {
    this.props.handleOpenModalRemove();
    this.setState({ dataRemove: categorySavingRemove });
  };

  handleRemoveCategorySaving = (categorySavingRemove: any) => {
    remove(categorySavingRemove.id, "categorySaving").then((res) => {
      this.setState({ isRemoved: true });
    });
  };

  handleOpenModalEditCategorySaving = (categorySavingEdit: any) => {
    this.props.handleOpenModalEdit();
    this.setState({ dataEdit: categorySavingEdit });
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
                  <Table.HeaderCell>Możliwość zapłaty</Table.HeaderCell>
                  <Table.HeaderCell>Charakter długu</Table.HeaderCell>
                  <Table.HeaderCell>Usuń</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.categorySavingDataOnPage.map(
                  (item: CategorySavingModelList, i) => {
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
          <CategorySavingAdd handleSubmit={this.handleAddCategorySaving} />
        )}
        {this.props.modalRemove && (
          <CategorySavingRemove
            handleSubmit={this.handleRemoveCategorySaving}
            data={this.state.dataRemove}
          />
        )}
      </>
    );
  }
}

function mapStateToProps(state: any) {
  console.log(
    "🚀 ~ file: categorySavingList.tsx ~ line 234 ~ mapStateToProps ~ state",
    state
  );
  return {
    modalAdd: state.categorySavingModalAdd,
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

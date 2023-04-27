import React, { Component, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { Table, Icon, Pagination, Select } from "semantic-ui-react";

import { Expense2Add, Expense2Edit, Expense2Remove } from "./index";

import { getAll, create, edit, remove } from "../../lib/genericService";

import {
  OPEN_MODAL_EDIT,
  OPEN_MODAL_REMOVE,
} from "../../redux/actions/actions";

import {
  AccountContextType,
  ExpenseModel,
  ExpenseModelList,
} from "../../constants";
import { AccountContext } from "../../context/accountContext";

const rowsPerListOptions = [
  { key: "4", value: "4", text: "4" },
  { key: "10", value: "10", text: "10" },
  { key: "25", value: "25", text: "25" },
  { key: "50", value: "50", text: "50" },
  { key: "100", value: "100", text: "100" },
];

const expense = "expense";

interface IRecipeProps {
  handleOpenModalRemove: any;
  handleOpenModalEdit: any;
  expenseListDataOnPage: ExpenseModelList[];
  modalAdd: boolean;
  modalEdit: boolean;
  modalRemove: boolean;
}

interface IRecipeState {}

class Expense2List extends Component<IRecipeProps, IRecipeState> {
  state = {
    allData: [],
    dataEdit: {},
    dataRemove: {},
    expenseListDataOnPage: [],
    begin: 0,
    end: 4,
    perPage: 4,
    activePage: 1,
    isCreated: false,
    isEdited: false,
    isRemoved: false,
  };

  static contextType = AccountContext;

  componentDidMount() {
    let token = "";

    if (this.context) {
      console.log(
        "🚀 ~ file: expense2List.tsx:65 ~ Expense2List ~ componentDidMount ~ this.context:",
        this.context
      );
      const state = this.context as AccountContextType;
      token = state.account.token;
    }

    getAll(expense, token)
      .then((rows) => {
        console.log(
          "🚀 ~ file: expense2List.tsx:55 ~ Expense2List ~ .then ~ rows",
          rows
        );
        this.setState({
          allData: rows,
          expenseListDataOnPage: rows.slice(this.state.begin, this.state.end),
        });
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: expense2List.tsx:62 ~ Expense2List ~ componentDidMount ~ error",
          error
        );
      });
  }

  componentDidUpdate() {
    if (this.state.isCreated || this.state.isEdited || this.state.isRemoved) {
      getAll(expense)
        .then((rows) => {
          this.setState({
            allData: rows,
            expenseListDataOnPage: rows.slice(this.state.begin, this.state.end),
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

  onChangePage = async (event: any, data: any) => {
    await this.setState({
      activePage: data.activePage,
      begin: data.activePage * this.state.perPage - this.state.perPage,
      end: data.activePage * this.state.perPage,
    });

    this.setState({
      expenseListDataOnPage: this.state.allData.slice(
        this.state.begin,
        this.state.end
      ),
    });
  };

  handleAddExpense = (props: ExpenseModel) => {
    console.log(
      "🚀 ~ file: expense2List.tsx ~ line 92 ~ Expense2List ~ props",
      props
    );
    const expenseObj: ExpenseModel = {
      howMuch: props.howMuch,
      date: new Date(props.date),
      comment: props.comment,
      attachment: props.attachment,
      standingOrder: props.standingOrder,
      userId: props.userId,
      categorySavingId: props.categorySavingId,
      categoryExpenseId: props.categoryExpenseId,
    };

    create(expenseObj, expense)
      .then((res) => {
        console.log(
          "🚀 ~ file: expense2List.tsx:116 ~ Expense2List ~ .then ~ res",
          res
        );
        if (res >= 200 && res <= 299) {
          this.setState({ isCreated: true });
          toast.success("Expense was added!");
          return;
        }

        this.setState({ isCreated: false });
        toast.error("Expense was not added! (1)");
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: expense2List.tsx:121 ~ Expense2List ~ err",
          err
        );
        toast.error("Expense was not added! (2)");
      });
  };

  handleOpenModalRemoveExpense = (expenseRemove: any) => {
    this.props.handleOpenModalRemove();
    this.setState({ dataRemove: expenseRemove });
  };

  handleRemoveExpense = (expenseRemove: ExpenseModel) => {
    console.log(
      "🚀 ~ file: expense2List.tsx:158 ~ Expense2List ~ expenseRemove",
      expenseRemove
    );

    remove(expenseRemove.id!, expense)
      .then((res) => {
        if (res >= 200 && res <= 299) {
          this.setState({ isRemoved: true });
          toast.success("Expense was removed!");
          return;
        }

        this.setState({ isRemoved: false });
        toast.error("Expense was not removed! (1)");
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: expense2List.tsx:171 ~ Expense2List ~ remove ~ err",
          err
        );
        toast.error("Expense was not removed! (2)");
      });
  };

  handleOpenModalEditExpense = (expenseEdit: any) => {
    this.props.handleOpenModalEdit();
    this.setState({ dataEdit: expenseEdit });
  };

  handleEditExpense = (expenseEdit: ExpenseModel) => {
    console.log(
      "🚀 ~ file: expense2List.tsx ~ line 130 ~ Expense2List ~ expenseEdit",
      expenseEdit
    );
    const expenseObj: ExpenseModel = {
      id: expenseEdit.id,
      howMuch: expenseEdit.howMuch,
      date: new Date(expenseEdit.date),
      comment: expenseEdit.comment,
      attachment: expenseEdit.attachment,
      standingOrder: expenseEdit.standingOrder,
      userId: expenseEdit.userId,
      categorySavingId: expenseEdit.categorySavingId,
      categoryExpenseId: expenseEdit.categoryExpenseId,
    };

    edit(expenseObj, expense)
      .then((res) => {
        console.log(
          "🚀 ~ file: expense2List.tsx:205 ~ Expense2List ~ edit ~ res",
          res
        );

        if (res >= 200 && res <= 299) {
          this.setState({ isEdited: true });
          toast.success("Expense was edited!");
          return;
        }
        this.setState({ isCreated: false });
        toast.error("Expense was not edited! (1)");
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: expense2List.tsx:220 ~ Expense2List ~ err",
          err
        );
        toast.error("Expense was not edited! (2)");
      });
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
      expenseListDataOnPage: this.state.allData.slice(
        this.state.begin,
        this.state.end
      ),
    });
  };

  render() {
    console.log(
      "🚀 ~ file: expense2List.tsx:258 ~ Expense2List ~ render ~ this.context:",
      this.context
    );

    return (
      <>
        <div className="row">
          <div className="fourteen wide column">
            <Table celled selectable>
              <Table.Header>
                <Table.Row>
                  {/* https://react.semantic-ui.com/collections/table/#variations-sortable> */}
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
                {this.state.expenseListDataOnPage.map(
                  (item: ExpenseModelList, i) => {
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
                        <Table.Cell key={`date_${i}`}>
                          {item.date.toString()}
                        </Table.Cell>
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
                            onClick={() =>
                              this.handleOpenModalRemoveExpense(item)
                            }
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
                            onClick={() =>
                              this.handleOpenModalEditExpense(item)
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
                  <Table.HeaderCell colSpan="12">
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
                    <span style={{ marginLeft: "1%" }}>
                      <Select
                        placeholder="Wiersze per strona"
                        options={rowsPerListOptions}
                        onChange={this.handleDisplayRowsPerPage}
                      />
                    </span>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
        </div>

        {this.props.modalAdd && (
          <Expense2Add handleSubmit={this.handleAddExpense} />
        )}
        {this.props.modalEdit && (
          <Expense2Edit
            handleSubmit={this.handleEditExpense}
            data={this.state.dataEdit}
          />
        )}
        {this.props.modalRemove && (
          <Expense2Remove
            handleSubmit={this.handleRemoveExpense}
            data={this.state.dataRemove}
          />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Expense2List);

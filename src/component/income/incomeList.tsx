import React, { Component } from "react";

import { connect } from "react-redux";

import { Table, Icon, Pagination } from "semantic-ui-react";

import { IncomeAdd, IncomeEdit, IncomeRemove } from "./index";

import { getAll, create, edit, remove } from "../../lib/genericService";

import {
  OPEN_MODAL_EDIT,
  OPEN_MODAL_REMOVE,
} from "../../redux/actions/actions";

import { IncomeModelList } from "../../constants";

interface IRecipeProps {
  handleOpenModalRemove: any;
  handleOpenModalEdit: any;
  incomeDataOnPage: IncomeModelList[];
  modalAdd: boolean;
  modalEdit: boolean;
  modalRemove: boolean;
}

interface IRecipeState {}

class IncomeList extends Component<IRecipeProps, IRecipeState> {
  state = {
    allData: [],
    dataEdit: {},
    dataRemove: {},
    incomeDataOnPage: [],
    begin: 0,
    end: 4,
    isCreated: false,
    isEdited: false,
    isRemoved: false,
  };

  componentDidMount() {
    getAll("income").then((rows) => {
      this.setState({
        allData: rows,
        incomeDataOnPage: rows.slice(this.state.begin, this.state.end),
      });
    });
  }

  componentDidUpdate() {
    if (this.state.isCreated || this.state.isEdited || this.state.isRemoved) {
      getAll("income")
        .then((rows) => {
          this.setState({
            allData: rows,
            incomeDataOnPage: rows.slice(this.state.begin, this.state.end),
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
      begin: data.activePage * 4 - 4,
      end: data.activePage * 4,
    });

    this.setState({
      incomeDataOnPage: this.state.allData.slice(
        this.state.begin,
        this.state.end
      ),
    });
  };

  handleAddIncome = (props: any) => {
    //TODO standingOrder develop logic for add howMuch to savings...
    const incomeObj = {
      howMuch: parseFloat(props.howMuch),
      categoryIncomeId: parseInt(props.categoryIncomeId),
      categorySavingId: parseInt(props.categorySavingId),
      date: new Date(props.date),
      userId: parseInt(props.userId),
      comment: props.comment,
      standingOrder: props.standingOrder,
    };

    create(incomeObj, "income").then((res) => {
      this.setState({ isCreated: true });
    });
  };

  handleOpenModalRemoveIncome = (incomeRemove: any) => {
    this.props.handleOpenModalRemove();
    this.setState({ dataRemove: incomeRemove });
  };

  handleRemoveIncome = (incomeRemove: any) => {
    console.log(
      "🚀 ~ file: income2List.tsx ~ line 115 ~ Income2List ~ incomeRemove",
      incomeRemove
    );
    remove(incomeRemove.id, "income").then((res) => {
      this.setState({ isRemoved: true });
    });
  };

  handleOpenModalEditIncome = (incomeEdit: any) => {
    this.props.handleOpenModalEdit();
    this.setState({ dataEdit: incomeEdit });
  };

  handleEditIncome = (incomeEdit: any) => {
    console.log(
      "🚀 ~ file: income.js ~ line 61 ~ income handleEditIncome ~ incomeEdit",
      incomeEdit
    );

    const incomeObj = {
      id: incomeEdit.id,
      howMuch: parseFloat(incomeEdit.howMuch),
      categoryIncomeId: parseInt(incomeEdit.categoryIncomeId),
      categorySavingId: parseInt(incomeEdit.categorySavingId),
      date: new Date(incomeEdit.date),
      userId: parseInt(incomeEdit.userId),
      comment: incomeEdit.comment,
      standingOrder: incomeEdit.standingOrder,
    };

    console.log(
      "🚀 ~ file: income.js ~ line 102 ~  EDIT income ~ incomeObj",
      incomeObj
    );

    edit(incomeObj, "income").then((res) => {
      this.setState({ isEdited: true });
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
                {this.state.incomeDataOnPage.map((item: IncomeModelList, i) => {
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
                          onClick={() => this.handleOpenModalRemoveIncome(item)}
                        >
                          Usuń
                        </button>
                      </Table.Cell>
                      <Table.Cell key={`Edit_${i}`} className="center aligned">
                        <button
                          className="ui green button "
                          onClick={() => this.handleOpenModalEditIncome(item)}
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

        {this.props.modalAdd && (
          <IncomeAdd handleSubmit={this.handleAddIncome} />
        )}
        {this.props.modalEdit && (
          <IncomeEdit
            handleSubmit={this.handleEditIncome}
            data={this.state.dataEdit}
          />
        )}
        {this.props.modalRemove && (
          <IncomeRemove
            handleSubmit={this.handleRemoveIncome}
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

export default connect(mapStateToProps, mapDispatchToProps)(IncomeList);

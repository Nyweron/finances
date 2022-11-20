import React, { Component, SyntheticEvent } from "react";

import { connect } from "react-redux";

import { Table, Icon, Pagination, Select } from "semantic-ui-react";

import { SavingAdd, SavingEdit, SavingRemove } from "./index";

import { getAll, create, edit, remove } from "../../lib/genericService";

import {
  OPEN_MODAL_EDIT,
  OPEN_MODAL_REMOVE,
} from "../../redux/actions/actions";

import { SavingModelList } from "../../constants";

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
  savingListDataOnPage: SavingModelList[];
  modalAdd: boolean;
  modalEdit: boolean;
  modalRemove: boolean;
}

interface IRecipeState {}

class SavingList extends Component<IRecipeProps, IRecipeState> {
  state = {
    allData: [],
    dataEdit: {},
    dataRemove: {},
    savingListDataOnPage: [],
    begin: 0,
    end: 4,
    perPage: 4,
    activePage: 1,
    isCreated: false,
    isEdited: false,
    isRemoved: false,
  };

  componentDidMount() {
    getAll("saving").then((rows) => {
      this.setState({
        allData: rows,
        savingListDataOnPage: rows.slice(this.state.begin, this.state.end),
      });
    });
  }

  componentDidUpdate() {
    if (this.state.isCreated || this.state.isEdited || this.state.isRemoved) {
      getAll("saving")
        .then((rows) => {
          this.setState({
            allData: rows,
            savingListDataOnPage: rows.slice(this.state.begin, this.state.end),
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
      savingListDataOnPage: this.state.allData.slice(
        this.state.begin,
        this.state.end
      ),
    });
  };

  handleAddSaving = (props: any) => {
    console.log("🚀 ~ file: saving.js ~ line 89 ~ Saving ~ props", props);

    const savingObj = {
      howMuch: parseFloat(props.howMuch),
      date: new Date(props.calendarDate),
      comment: props.comment,
      categorySavingId: parseInt(props.categorySavingId),
      savingType: 1,
    };

    create(savingObj, "saving").then((res) => {
      this.setState({ isCreated: true });
    });
  };

  handleOpenModalRemoveSaving = (savingRemove: any) => {
    this.props.handleOpenModalRemove();
    this.setState({ dataRemove: savingRemove });
  };

  handleRemoveSaving = (savingRemove: any) => {
    remove(savingRemove.id, "saving").then((res) => {
      this.setState({ isRemoved: true });
    });
  };

  handleOpenModalEditSaving = (savingEdit: any) => {
    this.props.handleOpenModalEdit();
    this.setState({ dataEdit: savingEdit });
  };

  handleEditSaving = (savingEdit: any) => {
    const savingObj = {
      id: savingEdit.id,
      howMuch: parseFloat(savingEdit.howMuch),
      date: new Date(savingEdit.calendarDate),
      comment: savingEdit.comment,
      categorySavingId: parseInt(savingEdit.categorySavingId),
      savingType: 1,
    };

    edit(savingObj, "saving").then((res) => {
      this.setState({ isEdited: true });
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
      savingListDataOnPage: this.state.allData.slice(
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
                  <Table.HeaderCell>Rodzaj</Table.HeaderCell>
                  <Table.HeaderCell>Kwota</Table.HeaderCell>
                  <Table.HeaderCell>Stan na dzień</Table.HeaderCell>
                  <Table.HeaderCell>Komentarz</Table.HeaderCell>
                  <Table.HeaderCell>Usuń</Table.HeaderCell>
                  <Table.HeaderCell>Edytuj</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.savingListDataOnPage.map(
                  (item: SavingModelList, i) => {
                    return (
                      <Table.Row key={`savingRow_${i}`}>
                        <Table.Cell key={`id${i}`}>{item.id}</Table.Cell>
                        <Table.Cell key={`categorySavingDescription_${i}`}>
                          {item.categorySavingDescription}
                        </Table.Cell>
                        <Table.Cell key={`howMuch${i}`}>
                          {item.howMuch}
                        </Table.Cell>
                        <Table.Cell key={`date_${i}`}>
                          {item.date.toString()}
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
                            onClick={() =>
                              this.handleOpenModalRemoveSaving(item)
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
                            onClick={() => this.handleOpenModalEditSaving(item)}
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
          <SavingAdd handleSubmit={this.handleAddSaving} />
        )}
        {this.props.modalEdit && (
          <SavingEdit
            handleSubmit={this.handleEditSaving}
            data={this.state.dataEdit}
          />
        )}
        {this.props.modalRemove && (
          <SavingRemove
            handleSubmit={this.handleRemoveSaving}
            data={this.state.dataRemove}
          />
        )}
      </>
    );
  }
}

function mapStateToProps(state: any) {
  console.log(
    "🚀 ~ file: savingList.tsx ~ line 249 ~ mapStateToProps ~ state",
    state
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(SavingList);

import React, { Component } from "react";

import { Table, Icon, Pagination } from "semantic-ui-react";

import { SavingAdd, SavingEdit, SavingRemove } from "./index";

import { getAll, create, edit, remove } from "../../lib/genericService";

class SavingList extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      allData: [],
      dataEdit: {},
      dataRemove: {},
      savingDataOnPage: [],
      begin: 0,
      end: 4,
      showModalAdd: props.showModalAdd,
      showModalEdit: false,
      showModalRemove: false,
      isCreated: false,
      isEdited: false,
      isRemoved: false,
    };
  }

  componentDidMount() {
    getAll("saving").then((rows) => {
      this.setState({
        allData: rows,
        savingDataOnPage: rows.slice(this.state.begin, this.state.end),
      });
    });
  }

  componentDidUpdate(previous, current) {

    console.log("🚀 ~ file: savingList.js ~ line 38 ~ SavingList ~ componentDidUpdate ~ previous", previous.showModalAdd)
    console.log("🚀 ~ file: savingList.js ~ line 38 ~ SavingList ~ componentDidUpdate ~ current", current.showModalAdd)
  // if(current.showModalAdd === false){
  //   console.log("🚀 ~ file: savingList.js ~ line 38 ~ SavingList ~ componentDidUpdate ~ current", current)
  //   console.log("🚀 ~ file: savingList.js ~ line 38 ~ SavingList ~ componentDidUpdate ~ previous", previous)
  //   this.setState({showModalAdd: !this.state.showModalAdd})
  // }

    if (this.state.isCreated || this.state.isEdited || this.state.isRemoved) {
      getAll("saving")
        .then((rows) => {
          this.setState({
            allData: rows,
            savingDataOnPage: rows.slice(this.state.begin, this.state.end),
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
      end: data.activePage * 4,
    });

    this.setState({
      savingDataOnPage: this.state.allData.slice(
        this.state.begin,
        this.state.end
      ),
    });
  };

  handleOpenModalAddSaving = (props) => {
    this.setState({ showModalAdd: !this.state.showModalAdd });
  };

  handleAddSaving = (props) => {
    console.log("🚀 ~ file: saving.js ~ line 89 ~ Saving ~ props", props);
    this.setState({ showModalAdd: !this.state.showModalAdd });

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

  handleOpenModalRemoveSaving = (savingRemove) => {
    this.setState({ showModalRemove: !this.state.showModalRemove });
    this.setState({ dataRemove: savingRemove });
  };

  handleRemoveSaving = (savingRemove) => {
    this.setState({ showModalRemove: !this.state.showModalRemove });

    remove(savingRemove.id, "saving").then((res) => {
      this.setState({ isRemoved: true });
    });
  };

  handleOpenModalEditSaving = (savingEdit) => {
    this.setState({ showModalEdit: !this.state.showModalEdit });
    this.setState({ dataEdit: savingEdit });
  };

  handleEditSaving = (savingEdit) => {
    this.setState({ showModalEdit: !this.state.showModalEdit });

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

  handleSavingList = () => {
    console.log("🚀 ~ file: saving.js ~ line 131 ~ Saving ~ handleSavingList");

    getAll("saving").then((rows) => {
      this.setState({
        isDisplaySavingList: true,
        isDisplayCategorySavingList: false,
        allData: rows,
        savingDataOnPage: rows.slice(this.state.begin, this.state.end),
      });
    });
  };

  handleCategorySavingList = () => {
    console.log("🚀 ~ file: saving.js ~ line 131 ~ Saving ~ handleSavingList");

    getAll("saving").then((rows) => {
      this.setState({
        isDisplaySavingList: false,
        isDisplayCategorySavingList: true,
        allData: rows,
        savingDataOnPage: rows.slice(this.state.begin, this.state.end),
      });
    });
  };

  render() {
    console.log(
      "🚀 ~ file: savingList.js ~ line 8 ~ SavingList ~ this.props",
      this.props.showModalAdd
    );

    console.log(
      "🚀 ~ file: savingList.js ~ line 8 ~ SavingList ~ this.state",
      this.state.showModalAdd
    );

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
                {this.state.savingDataOnPage.map((item, i) => {
                  return (
                    <Table.Row key={`savingRow_${i}`}>
                      <Table.Cell key={`id${i}`}>{item.id}</Table.Cell>
                      <Table.Cell key={`categorySavingDescription_${i}`}>
                        {item.categorySavingDescription}
                      </Table.Cell>
                      <Table.Cell key={`howMuch${i}`}>
                        {item.howMuch}
                      </Table.Cell>
                      <Table.Cell key={`date_${i}`}>{item.date}</Table.Cell>
                      <Table.Cell key={`comment_${i}`}>
                        {item.comment}
                      </Table.Cell>
                      <Table.Cell
                        key={`remove_${i}`}
                        className="center aligned"
                      >
                        <button
                          className="ui red button"
                          onClick={() => this.handleOpenModalRemoveSaving(item)}
                        >
                          Usuń
                        </button>
                      </Table.Cell>
                      <Table.Cell key={`Edit_${i}`} className="center aligned">
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
        {this.props.showModalAdd && (
            <SavingAdd
              showModal={this.props.showModalAdd}
              handleCloseModal={() =>
                this.setState({ showModalAdd: !this.state.showModalAdd })
              }
              handleSubmit={this.handleAddSaving}
            />
        )}
        {this.state.showModalEdit && (
          <SavingEdit
            showModal={this.state.showModalEdit}
            handleCloseModal={() =>
              this.setState({ showModalEdit: !this.state.showModalEdit })
            }
            handleSubmit={this.handleEditSaving}
            data={this.state.dataEdit}
          />
        )}
        {this.state.showModalRemove && (
          <SavingRemove
            showModal={this.state.showModalRemove}
            handleCloseModal={() =>
              this.setState({ showModalRemove: !this.state.showModalRemove })
            }
            handleSubmit={this.handleRemoveSaving}
            data={this.state.dataRemove}
          />
        )}
      </>
    );
  }
}

export default SavingList;

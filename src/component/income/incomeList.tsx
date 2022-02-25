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

  handleOpenModalRemoveIncome = (expenseRemove: any) => {
    this.props.handleOpenModalRemove();
    this.setState({ dataRemove: expenseRemove });
  };
}

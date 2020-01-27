import React, { Component } from "react";
import RevenueTable from "../component/revenue/revenueTable";
import RevenueAddModal from "../component/revenue/revenueAdd";

import styles from "../App.module.css";
class revenue extends Component {
  state = {
    // isVisibleAddExpense: false,
    isVisibleFilterSettings: false
  };

  displayFilterSettings = () => {
    this.setState({
      isVisibleFilterSettings: !this.state.isVisibleFilterSettings
    });
  };

  handleClose = () => {
    // this.setState({ isVisibleAddExpense: false });
    this.props.isAddRevenue(false);
  };

  handleShow = () => {
    this.props.isAddRevenue(true);
  };

  render() {
    console.log("revenue.js props.isAdd", this.props.isAdd);
    return (
      <>
        <div>
          {this.props.isAdd && (
            <RevenueAddModal
              handleClose={this.handleClose}
              handleShow={this.handleShow}
              isVisibleAddRevenue={this.props.isAdd}
            />
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.card}>
            <button
              className="btn btn-primary"
              onClick={this.displayFilterSettings}
            >
              Filter settings
            </button>
            {/* {this.state.isVisibleFilterSettings && <RevenueFilter />} */}
          </div>
          <div className={styles.centerColumn}>
            <div className={styles.card}>
              <RevenueTable />
            </div>
            <div className={styles.card}>
              <span>PAGINATION</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default revenue;

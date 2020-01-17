import React, { Component } from "react";
// import NavigationItem from "./component/navigationItem";

import styles from "./App.module.css";
import { FaCaretDown } from "react-icons/fa";

const wydatki = 0;
const przychody = 1;
const oszczednosci = 2;

class App extends Component {
  state = {
    isVisibleFilterSettings: false,
    isVisibleCollapseMenu: false,
    collapseMenuClicked: -1
  };

  displayFilterSettings = () => {
    this.setState({
      isVisibleFilterSettings: !this.state.isVisibleFilterSettings
    });
  };

  displayCollapseMenu = id => {
    if (this.state.collapseMenuClicked === id) {
      this.setState({
        collapseMenuClicked: -1
      });
    } else if (wydatki === id) {
      this.setState({
        collapseMenuClicked: id
      });
    } else if (przychody === id) {
      this.setState({
        collapseMenuClicked: id
      });
    } else if (oszczednosci === id) {
      this.setState({
        collapseMenuClicked: id
      });
    }
  };

  render() {
    let cleanField = <span></span>;

    let wydatkiFiled = this.state.collapseMenuClicked === wydatki && (
      <div>
        <span>
          Wydatki
          <FaCaretDown />
        </span>
        <span>Dodaj</span>
        <span>Zapisz</span>
        <span>...</span>
      </div>
    );
    let przychodyFiled = this.state.collapseMenuClicked === przychody && (
      <div>
        <span>Link33</span>
        <span>Link44</span>
        <span>...</span>
      </div>
    );
    let oszczednosciFiled = this.state.collapseMenuClicked === oszczednosci && (
      <div>
        <span>Link55</span>
        <span>Link66</span>
        <span>...</span>
      </div>
    );

    return (
      <div>
        <div className={styles.header}>
          <h1>My Website</h1>
          <p>Resize the browser window to see the effect.</p>
        </div>

        <div className={styles.topnav}>
          <span onClick={() => this.displayCollapseMenu(0)}>
            Wydatki <FaCaretDown />
          </span>
          <span onClick={() => this.displayCollapseMenu(1)}>
            Przychody <FaCaretDown />
          </span>
          <span onClick={() => this.displayCollapseMenu(2)}>
            Oszczędności <FaCaretDown />
          </span>
          <span style={{ float: "right" }}>Link</span>
        </div>

        {this.state.collapseMenuClicked === -1 && cleanField}
        <div className={styles.topnav} style={{ backgroundColor: "#808080" }}>
          {this.state.collapseMenuClicked === wydatki && wydatkiFiled}
          {this.state.collapseMenuClicked === przychody && przychodyFiled}
          {this.state.collapseMenuClicked === oszczednosci && oszczednosciFiled}
        </div>

        <div className={styles.row}>
          <div className={styles.card}>
            <button onClick={this.displayFilterSettings}>
              Filter settings
            </button>
            {this.state.isVisibleFilterSettings && (
              <div>
                {/* */}
                <br />
                <form className="needs-validation">
                  <div className="form-row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="validationCustom01">First name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        placeholder="First name"
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="validationCustom02">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom02"
                        placeholder="Last name"
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="validationCustomUsername">Username</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend"
                          >
                            @
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustomUsername"
                          placeholder="Username"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <div className="invalid-feedback">
                          Please choose a username.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom03">City</label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom03"
                        placeholder="City"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid city.
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationCustom04">State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom04"
                        placeholder="State"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid state.
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationCustom05">Zip</label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom05"
                        placeholder="Zip"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid zip.
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="invalidCheck"
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="invalidCheck"
                      >
                        Agree to terms and conditions
                      </label>
                      <div className="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Submit form
                  </button>
                </form>
                {/* */}
              </div>
            )}
          </div>
          <div className={styles.centerColumn}>
            <div className={styles.card}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.card}>
              <span>PAGINATION</span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <h2>Footer</h2>
        </div>
      </div>
    );
  }
}

export default App;

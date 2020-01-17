import React, { Component } from "react";
// import NavigationItem from "./component/navigationItem";

import styles from "./App.module.css";

class App extends Component {
  state = {
    isVisible: false
  };

  displayFilterSettings = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return (
      <div>
        <div className={styles.header}>
          <h1>My Website</h1>
          <p>Resize the browser window to see the effect.</p>
        </div>

        <div className={styles.topnav}>
          <a href="/#">Link</a>
          <a href="/#">Link</a>
          <a href="/#">Link</a>
          <a href="/#" style={{ float: "right" }}>
            Link
          </a>
        </div>

        <div className={styles.row}>
          <div className={styles.card}>
            <button onClick={this.displayFilterSettings}>
              Filter settings
            </button>
            {this.state.isVisible && (
              <div>
                {/* */}
                <br />
                <form class="needs-validation">
                  <div class="form-row">
                    <div class="col-md-4 mb-3">
                      <label for="validationCustom01">First name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustom01"
                        placeholder="First name"
                        value="Mark"
                        required
                      />
                      <div class="valid-feedback">Looks good!</div>
                    </div>
                    <div class="col-md-4 mb-3">
                      <label for="validationCustom02">Last name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustom02"
                        placeholder="Last name"
                        value="Otto"
                        required
                      />
                      <div class="valid-feedback">Looks good!</div>
                    </div>
                    <div class="col-md-4 mb-3">
                      <label for="validationCustomUsername">Username</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="inputGroupPrepend">
                            @
                          </span>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          id="validationCustomUsername"
                          placeholder="Username"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <div class="invalid-feedback">
                          Please choose a username.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-6 mb-3">
                      <label for="validationCustom03">City</label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustom03"
                        placeholder="City"
                        required
                      />
                      <div class="invalid-feedback">
                        Please provide a valid city.
                      </div>
                    </div>
                    <div class="col-md-3 mb-3">
                      <label for="validationCustom04">State</label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustom04"
                        placeholder="State"
                        required
                      />
                      <div class="invalid-feedback">
                        Please provide a valid state.
                      </div>
                    </div>
                    <div class="col-md-3 mb-3">
                      <label for="validationCustom05">Zip</label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustom05"
                        placeholder="Zip"
                        required
                      />
                      <div class="invalid-feedback">
                        Please provide a valid zip.
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="invalidCheck"
                        required
                      />
                      <label class="form-check-label" for="invalidCheck">
                        Agree to terms and conditions
                      </label>
                      <div class="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                  </div>
                  <button class="btn btn-primary" type="submit">
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

import React, { Component } from "react";
// import NavigationItem from "./component/navigationItem";

import styles from "./App.module.css";

class App extends Component {
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
            <span>Filter</span>

            {/* */}

            <div id="filter-panel" className="collapse filter-panel">
              <div className="panel panel-default">
                <div className="panel-body">
                  <form>
                    <div className="form-group">
                      <label
                        className={styles.filterCol}
                        style={{ marginRight: "0" }}
                        for="pref-perpage"
                      >
                        Rows per page:
                      </label>
                      <select id="pref-perpage" className="form-control">
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option selected="selected" value="10">
                          10
                        </option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label
                        className={styles.filterCol}
                        style={{ marginRight: "0" }}
                        for="pref-search"
                      >
                        Search:
                      </label>
                      <input
                        type="text"
                        className="form-control input-sm"
                        id="pref-search"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        className={styles.filterCol}
                        style={{ marginRight: 0 }}
                        for="pref-orderby"
                      >
                        Order by:
                      </label>
                      <select id="pref-orderby" className="form-control">
                        <option>Descendent</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <div
                        className="checkbox"
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                      >
                        <label>
                          <input type="checkbox" /> Remember parameters
                        </label>
                      </div>
                      <button
                        type="submit"
                        className={("btn btn-default", styles.filterCol)}
                      >
                        <span className="glyphicon glyphicon-record"></span>{" "}
                        Save Settings
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="collapse"
              data-target="#filter-panel"
            >
              <span className="glyphicon glyphicon-cog"></span> Advanced Search
            </button>

            {/* */}
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

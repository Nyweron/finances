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
            <div className={styles.card}></div>
            {this.state.isVisible ? (
              <span>
                cursus odio lorem, condimentum varius felis aliquet sit
                amet.Proin cursus, arcu ut porttitor dictum, dolor nisl ornare
                lacus,ut varius nibh lorem vel mi. Curabitur sapien quam,
                scelerisque non ligula sit amet, vulputate vulputate nisl. Duis
                auctor risus ac dolor tempus, vel molestie diam suscipit. Morbi
                pulvinar est quis vehicula eleifend. Sed felis sem, facilisis
                nec vulputate at, consequat non mi. Etiam laoreet vel dui eget
                semper. Cras sit amet ipsum laoreet, molestie eros nec, finibus
                velit. In magna nisl, feugiat vel sem vitae, ullamcorper
                venenatis neque. Maecenas id sodales sem, sed ultricies dolor.
                Praesent ullamcorper varius posuere. Donec bibendum orci vitae
                magna mollis molestie. Suspendisse lectus magna, tincidunt ut
                molestie pulvinar, ornare non sem. Nunc mattis maximus viverra.
                Donec malesuada pretium dui vel tincidunt. Quisque non diam et
                nisl malesuada feugiat id ut enim. Integer mattis massa vitae
                laoreet malesuada. Nam ullamcorper porta risus, sit amet tempor
                odio tincidunt ut. Sed sed augue et nulla hendrerit dignissim.
                Suspendisse vel posuere neque. Ut id cursus sapien, ut blandit
                ante. In nisl quam, egestas in eleifend vitae, vulputate non
                elit. Etiam tempus a turpis vitae bibendum. In laoreet, dolor
                non ultrices rhoncus, massa tortor consequat lacus, vitae
                gravida risus arcu ut felis. Morbi quis velit varius, varius
                turpis sed, consectetur dui. Ut sed eros eu lectus cursus
                maximus. Aliquam erat volutpat. Mauris at lacus accumsan arcu
                sollicitudin facilisis eget sed eros. In hac habitasse platea
                dictumst.
              </span>
            ) : (
              <span>niewyswietl</span>
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

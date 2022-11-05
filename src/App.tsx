import React, { Component } from "react";
//import { FaCaretDown } from "react-icons/fa";

import { Routes, Route, Link } from "react-router-dom";

import Header from "./component/header/header";
import Footer from "./component/footer/footer";
//import { expenses, incomes, savings } from "./shared/constData";

import Index3 from "./pages/index3";

import Expense from "./pages/expense";
import Expense2 from "./pages/expense2";
import Income from "./pages/income";
import Saving from "./pages/saving";

import styles from "./App.module.css";

class App extends Component {
  render() {
    return (
      <>
        <div className={styles.header}>
          <Header />
        </div>
        <div>
          <div className={styles.topnav}>
            {/* <Link to="/expense">
                <span>Wydatki</span>
              </Link> */}
            <Link to="/expense2">
              <span>Wydatki2</span>
            </Link>
            <Link to="/income">
              <span>Przychody</span>
            </Link>
            <Link to="/saving">
              <span>Oszczędności</span>
            </Link>
          </div>

          <div>
            <Routes>
              <Route path="/expense" element={<Expense />} />
              <Route path="/expense2" element={<Expense2 />} />
              <Route path="/income" element={<Income />} />
              <Route path="/saving" element={<Saving />} />
              <Route path="/" element={<Index3 />} />
            </Routes>
          </div>
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </>
    );
  }
}

export default App;

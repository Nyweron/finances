import React, { Component } from "react";
//import { FaCaretDown } from "react-icons/fa";

import { Routes, Route, Link } from "react-router-dom";

import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import SessionTimer from "./component/sessionTimer/sessionTimer";

import { AccountContextType } from "./constants";

import Index3 from "./pages/index3";

import Expense from "./pages/expense";
import Income from "./pages/income";
import Saving from "./pages/saving";
import Login from "./pages/login";
import Logoff from "./pages/logoff";
import RegisterNewUser from "./pages/registerNewUser";

import { AccountContext } from "./context/accountContext";

import styles from "./App.module.css";

class App extends Component {
  static contextType = AccountContext;

  render() {
    const { account } = this.context as AccountContextType;
    // console.log("🚀 ~ file: App.tsx:29 ~ App ~ render ~ state:", account);

    return (
      <>
        <SessionTimer />
        <div className={styles.header}>
          <Header />
        </div>
        <div>
          <div className={styles.topnav}>
            <Link to="/expense">
              <span>Wydatki</span>
            </Link>
            <Link to="/income">
              <span>Przychody</span>
            </Link>
            <Link to="/saving">
              <span>Oszczędności</span>
            </Link>
            {account.isLogin ? (
              <Link to="/logoff">
                <span>Wyloguj</span>
              </Link>
            ) : (
              <Link to="/login">
                <span>Zaloguj</span>
              </Link>
            )}
          </div>

          <div>
            <Routes>
              <Route path="/expense" element={<Expense />} />
              <Route path="/income" element={<Income />} />
              <Route path="/saving" element={<Saving />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logoff" element={<Logoff />} />
              <Route path="/registration" element={<RegisterNewUser />} />
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

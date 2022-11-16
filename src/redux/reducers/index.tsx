import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import modalAdd from "./modalAdd";
import modalEdit from "./modalEdit";
import modalRemove from "./modalRemove";
import categorySavingModalAdd from "./categorySaving/categorySavingModalAdd";
import categoryIncomeModalAdd from "./categoryIncome/categoryIncomeModalAdd";
import categoryExpenseModalAdd from "./categoryExpense/categoryExpenseModalAdd";

const rootReducer = combineReducers({
  modalAdd,
  modalEdit,
  modalRemove,
  categorySavingModalAdd,
  categoryIncomeModalAdd,
  categoryExpenseModalAdd,
});

const store = configureStore({ reducer: rootReducer });

export default store;

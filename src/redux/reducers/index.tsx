import { createStore, combineReducers } from "redux";
import modalAdd from "./modalAdd";
import modalEdit from "./modalEdit";
import modalRemove from "./modalRemove";
import categorySavingModalAdd from "./categorySaving/categorySavingModalAdd";
import categoryIncomeModalAdd from "./categoryIncome/categoryIncomeModalAdd";
import categoryExpenseModalAdd from "./categoryExpense/categoryExpenseModalAdd";

const reducer = combineReducers({
  modalAdd,
  modalEdit,
  modalRemove,
  categorySavingModalAdd,
  categoryIncomeModalAdd,
  categoryExpenseModalAdd,
});

const store = createStore(reducer);

export default store;

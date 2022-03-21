import { createStore, combineReducers } from "redux";
import modalAdd from "./modalAdd";
import modalEdit from "./modalEdit";
import modalRemove from "./modalRemove";
import categorySavingModalAdd from "./categorySaving/categorySavingModalAdd";
import categoryIncomeModalAdd from "./categoryIncome/categoryIncomeModalAdd";

const reducer = combineReducers({
  modalAdd,
  modalEdit,
  modalRemove,
  categorySavingModalAdd,
  categoryIncomeModalAdd,
});

const store = createStore(reducer);

export default store;

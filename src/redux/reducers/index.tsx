import { createStore, combineReducers } from "redux";
import modalAdd from "./modalAdd";
import modalEdit from "./modalEdit";
import modalRemove from "./modalRemove";
import categorySavingModalAdd from "./categorySaving/categorySavingModalAdd";

const reducer = combineReducers({
  modalAdd,
  modalEdit,
  modalRemove,
  categorySavingModalAdd,
});

const store = createStore(reducer);

export default store;

import { createStore, combineReducers } from "redux";
import categorySavingAdd from "../../../component/categorySaving/categorySavingAdd";

const reducer = combineReducers({
  categorySavingAdd,
});

const store = createStore(reducer);

export default store;

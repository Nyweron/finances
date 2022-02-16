import { createStore, combineReducers } from 'redux'
import modalAdd from './modalAdd'
import modalEdit from './modalEdit'
import modalRemove from './modalRemove'

const reducer = combineReducers({
  modalAdd,
  modalEdit,
  modalRemove
})

const store = createStore(reducer)

export default store;
import { createStore, combineReducers } from 'redux'
import modalAdd from './modalAdd'
import modalEdit from './modalEdit'

const reducer = combineReducers({
  modalAdd,
  modalEdit
})

const store = createStore(reducer)

export default store;
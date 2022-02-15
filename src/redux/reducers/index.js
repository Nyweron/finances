import { combineReducers } from 'redux'
import modalAdd from './modalAdd'
import modalEdit from './modalEdit'

export default combineReducers({
  modalAdd,
  modalEdit
})
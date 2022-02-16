import {OPEN_MODAL_EDIT, CLOSE_MODAL_EDIT} from '../actions/actions'

const modalEdit = (state = false, action) => {
console.log("🚀 ~ file: modalEdit.js ~ line 2 ~ modalEdit ~ action", action)
  switch(action.type) {
     case OPEN_MODAL_EDIT:
       return true;
     case CLOSE_MODAL_EDIT:
       return false;
     default:
       return state;
   }
};

export default modalEdit;
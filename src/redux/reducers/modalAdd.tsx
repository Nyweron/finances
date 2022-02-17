import { OPEN_MODAL_ADD, CLOSE_MODAL_ADD } from "../actions/actions";

const modalAdd = (state = false, action: any) => {
  console.log("🚀 ~ file: modalAdd.js ~ line 2 ~ modalAdd ~ action", action);
  switch (action.type) {
    case OPEN_MODAL_ADD:
      return true;
    case CLOSE_MODAL_ADD:
      return false;
    default:
      return state;
  }
};

export default modalAdd;

import { OPEN_MODAL_REMOVE, CLOSE_MODAL_REMOVE } from "../actions/actions";

const modalRemove = (state = false, action: any) => {
  console.log(
    "🚀 ~ file: modalRemove.js ~ line 2 ~ modalRemove ~ action",
    action
  );
  switch (action.type) {
    case OPEN_MODAL_REMOVE:
      return true;
    case CLOSE_MODAL_REMOVE:
      return false;
    default:
      return state;
  }
};

export default modalRemove;

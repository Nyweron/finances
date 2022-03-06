import {
  OPEN_MODAL_CATEGORY_SAVING_ADD,
  CLOSE_MODAL_CATEGORY_SAVING_ADD,
} from "../../actions/actions";

const categorySavingModalAdd = (state = false, action: any) => {
  switch (action.type) {
    case OPEN_MODAL_CATEGORY_SAVING_ADD:
      return true;
    case CLOSE_MODAL_CATEGORY_SAVING_ADD:
      return false;
    default:
      return state;
  }
};

export default categorySavingModalAdd;

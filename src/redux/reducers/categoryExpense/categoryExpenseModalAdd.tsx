import {
  OPEN_MODAL_CATEGORY_EXPENSE_ADD,
  CLOSE_MODAL_CATEGORY_EXPENSE_ADD,
} from "../../actions/actions";

const categoryExpenseModalAdd = (state = false, action: any) => {
  switch (action.type) {
    case OPEN_MODAL_CATEGORY_EXPENSE_ADD:
      return true;
    case CLOSE_MODAL_CATEGORY_EXPENSE_ADD:
      return false;
    default:
      return state;
  }
};

export default categoryExpenseModalAdd;

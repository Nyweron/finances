import {
  OPEN_MODAL_CATEGORY_INCOME_ADD,
  CLOSE_MODAL_CATEGORY_INCOME_ADD,
} from "../../actions/actions";

const categoryIncomeModalAdd = (state = false, action: any) => {
  switch (action.type) {
    case OPEN_MODAL_CATEGORY_INCOME_ADD:
      return true;
    case CLOSE_MODAL_CATEGORY_INCOME_ADD:
      return false;
    default:
      return state;
  }
};

export default categoryIncomeModalAdd;

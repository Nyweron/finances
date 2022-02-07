import { backendUrl } from "../shared/apiUrl";

export const getAll = (controller) => {
  return fetch(backendUrl + "" + controller).then((res) => res.json());
};

export const GetCategoryIncomeForSelect = () => {
  return fetch(
    backendUrl + "categoryIncome/GetCategoryIncomesForSelect"
  ).then((res) => res.json());
};

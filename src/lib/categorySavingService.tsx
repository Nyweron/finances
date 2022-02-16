import { backendUrl } from "../shared/apiUrl";

export const GetCategorySavingsForSelect = () => {
  return fetch(
    backendUrl + "categorySaving/GetCategorySavingsForSelect"
  ).then((res) => res.json());
};

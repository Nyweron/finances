import { backendUrl } from "../shared/apiUrl";

export const GetUsersForSelect = () => {
  return fetch(
    backendUrl + "user/GetUsersForSelect"
  ).then((res) => res.json());
};

import { backendUrl } from "../shared/apiUrl";

export const getAll = (controller: string) => {
  return fetch(backendUrl + controller).then((res) => res.json());
};

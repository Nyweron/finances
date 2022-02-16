import {backendUrl} from '../shared/apiUrl';

export const getAll = (controller) => {
  return fetch(backendUrl + "" + controller).then((res) => res.json());
};


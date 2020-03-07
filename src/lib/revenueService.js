import {revenueUrl} from '../shared/apiUrl';

export const getAll = () => {
  return fetch(revenueUrl).then(res => res.json());
};

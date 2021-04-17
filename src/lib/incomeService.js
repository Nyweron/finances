import {incomeUrl} from '../shared/apiUrl';

export const getAll = () => {
  return fetch(incomeUrl).then(res => res.json());
};

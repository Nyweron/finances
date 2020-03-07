import {expenseUrl} from '../shared/apiUrl';

export const getAll = () => {
  return fetch(expenseUrl).then(res => res.json());
};


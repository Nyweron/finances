import {savingUrl} from '../shared/apiUrl';

export const getAll = () => {
  return fetch(savingUrl).then(res => res.json());
};


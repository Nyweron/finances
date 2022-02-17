import {backendUrl} from '../shared/apiUrl';

export const getAll = (controller) => {
  return fetch(backendUrl + "" + controller).then((res) => res.json());
};

export const createIncome = async (temp) => {
  return await fetch(backendUrl + "income", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(temp),
  })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      //console.log(res.status);
      return res.status;
    })
    .then((data) => {
      //console.log(data);
      return data;
    })
    .catch((error) => console.log(error));
};

export const editPutIncome = async (temp) => {
  console.log("temp1", temp);
  console.log("temp2", temp.id);
  //console.log("temp2", JSON.stringify(temp));
  return await fetch(backendUrl + "income/" + temp.id, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(temp),
  })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      //console.log(res.status);
      return res.status;
    })
    .then((data) => {
      //console.log(data);
      return data;
    })
    .catch((error) => console.log(error));
};

export const deleteRowIncome = async (id) => {
  return await fetch(backendUrl + "income/" + id, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res.status;
    })
    .catch((err) => {
      console.error(err);
    });
};
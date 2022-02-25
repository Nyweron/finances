import { IncomeModel } from "../constants";
import { backendUrl } from "../shared/apiUrl";

export const getAll = (controller: string) => {
  return fetch(backendUrl + controller).then((res) => res.json());
};

export const createIncome = async (income: IncomeModel) => {
  return await fetch(backendUrl + "income", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(income),
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

export const editPutIncome = async (income: IncomeModel) => {
  console.log("temp1", income);
  console.log("temp2", income.id);
  //console.log("temp2", JSON.stringify(temp));
  return await fetch(backendUrl + "income/" + income.id, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(income),
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

export const deleteRowIncome = async (id: number) => {
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

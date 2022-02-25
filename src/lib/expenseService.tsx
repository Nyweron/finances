import { ExpenseModel } from "../constants";
import { mockBackendUrl, backendUrl } from "../shared/apiUrl";

export const getAll = (controller: string) => {
  // console.log("process.env_MOCK_JSON_SERVER",process.env_MOCK_JSON_SERVER)
  if (process.env.MOCK_JSON_SERVER) {
    //  console.log("tes1");
    return fetch(mockBackendUrl + "" + controller).then((res) => res.json());
  } else {
    //  console.log("tes2");
    return fetch(backendUrl + "" + controller).then((res) => res.json());
  }
};

export const createExpense = async (expense: ExpenseModel) => {
  return await fetch(backendUrl + "expense", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(expense),
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

export const editPutExpense = async (expense: ExpenseModel) => {
  console.log("temp1", expense);
  console.log("temp2", expense.id);
  //console.log("temp2", JSON.stringify(temp));
  return await fetch(backendUrl + "expense/" + expense.id, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(expense),
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

export const deleteRowExpense = async (id: number) => {
  return await fetch(backendUrl + "expense/" + id, {
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

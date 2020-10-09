import { mockBackendUrl, backendUrl } from "../shared/apiUrl";

export const getAll = (controller) => {
  // console.log("process.env_MOCK_JSON_SERVER",process.env_MOCK_JSON_SERVER)
  if (process.env.MOCK_JSON_SERVER) {
    //  console.log("tes1");
    return fetch(mockBackendUrl + "" + controller).then((res) => res.json());
  } else {
    //  console.log("tes2");
    return fetch(backendUrl + "" + controller).then((res) => res.json());
  }
};

export const createExpense = async (temp) => {
  //console.log("temp1", temp);
  //console.log("temp2", JSON.stringify(temp));
  return await fetch(backendUrl + "expense", {
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
      return res.status
    })
    .then((data) => {
      //console.log(data);
      return data
    })
    .catch((error) => console.log(error));
};

export const deleteRowExpense = (id) => {
  fetch(backendUrl + "expense/" + id, {
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

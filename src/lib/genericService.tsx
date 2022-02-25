import { backendUrl } from "../shared/apiUrl";

export const getAll = (controller: string) => {
  return fetch(backendUrl + controller).then((res) => res.json());
};

export const create = async (obj: any, controllerName: string) => {
  return await fetch(backendUrl + controllerName, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(obj),
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

export const edit = async (obj: any, controllerName: string) => {
  console.log("temp1", obj);
  console.log("temp2", obj.id);
  //console.log("temp2", JSON.stringify(temp));
  return await fetch(backendUrl + controllerName + "/" + obj.id, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(obj),
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

export const remove = async (id: number, controllerName: string) => {
  return await fetch(backendUrl + controllerName + "/" + id, {
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

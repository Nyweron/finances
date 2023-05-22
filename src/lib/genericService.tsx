import { backendUrl } from "../shared/apiUrl";

export const getAll = (controller: string) => {
  //console.log("🚀 ~ file: genericService.tsx:4 ~ getAll ~ token:", token);

  const token = localStorage.getItem("Authorization"); //Cookies instead localStorage
  // console.log("🚀 ~ file: genericService.tsx:7 ~ getAll ~ token:", token);

  return fetch(backendUrl + controller, {
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("🚀 ~ file: genericService.tsx:13 ~ .then ~ res:", res);
        return res.json();
      }

      console.log("🚀 ~ file: genericService.tsx:20 ~ .then ~ res:", res);

      console.log(
        "🚀 ~ file: genericService.tsx:24 ~ .then ~ res.status:",
        res.status
      );
      throw res;
    })
    .catch((error) => {
      //console.log("🚀 ~ file: genericService.tsx:16 ~ getAll ~ error:", error);
      var temp = new Error(error);

      // console.log(
      //   "🚀 ~ file: genericService.tsx:19 ~ getAll ~ error.text():",
      //   temp.text()
      // );
      // console.log("🚀 ~ file: genericService.tsx:22 ~ getAll ~ temp:", temp);
      console.log("🚀 ~ file: genericService.tsx:23 ~ getAll ~ error:", error);
      throw error;
    });
};

export const create = async (
  obj: any,
  controllerName: string,
  token?: string
) => {
  return await fetch(backendUrl + controllerName, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!}`,
    },
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((res) => {
      if (!res.ok) {
        res.text().then((dataFromBackendError) => {
          console.log(
            "🚀 ~ file: genericService.tsx:21 ~ .then ~ x",
            dataFromBackendError
          );
          throw new Error(dataFromBackendError);
        });

        //throw Error(res.statusText);
      }
      //console.log(res.status);
      return res.status;
    })

    .then((data) => {
      console.log("🚀 ~ file: genericService.tsx:34 ~ .then ~ data", data);
      //console.log(data);
      return data;
    })
    .catch((error) =>
      console.log("🚀 ~ file: genericService.tsx:39 ~ create ~ error", error)
    );
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

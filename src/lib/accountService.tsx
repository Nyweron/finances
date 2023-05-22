import { throws } from "assert";
import { AccountModel, AccountRefreshTokenModel } from "../constants";
import { backendUrl } from "../shared/apiUrl";

export const registerUser = async (obj: AccountModel) => {
  return await fetch(backendUrl + "account", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((res) => {
      if (!res.ok) {
        res.text().then((dataFromBackendError) => {
          console.log(
            "🚀 ~ file: accountService.tsx:16 ~ res.text ~ dataFromBackendError:",
            dataFromBackendError
          );

          throw new Error(dataFromBackendError);
        });
      }

      console.log("🚀 ~ file: accountService.tsx:26 ~ .then ~ res:", res);
      return res.status;
    })

    .then((data) => {
      console.log("🚀 ~ file: accountService.tsx:34 ~ .then ~ data", data);

      return data;
    })
    .catch((error) =>
      console.log("🚀 ~ file: accountService.tsx:39 ~ create ~ error", error)
    );
};

export const loginUser = async (obj: AccountModel) => {
  return await fetch(backendUrl + "account/login", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((res) => {
      // console.log("🚀 ~ file: accountService.tsx:49 ~ .then ~ res:", res);
      if (!res.ok) {
        console.log("🚀 ~ file: accountService.tsx:50 ~ .then ~ res:", res);

        return res.json().then((text) => {
          console.log(
            "🚀 ~ file: accountService.tsx:53 ~ returnres.json ~ text:",
            text
          );
          throw text;
        });
      } else {
        console.log("🚀 ~ file: accountService.tsx:58 ~ .then ~ res:", res);
        return res.json();
      }
    })
    .catch((error) => {
      //console.log("🚀 ~ file: accountService.tsx:39 ~ create ~ error", error)
      throw error;
    });
};
export const refreshJWTToken = async (obj: AccountRefreshTokenModel) => {
  console.log("🚀 ~ file: accountService.tsx:72 ~ refreshJWTToken ~ obj:", obj);

  return await fetch(backendUrl + "account/refresh", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((res) => {
      // console.log("🚀 ~ file: accountService.tsx:49 ~ .then ~ res:", res);
      if (!res.ok) {
        console.log("🚀 ~ file: accountService.tsx:50 ~ .then ~ res:", res);

        return res.json().then((text) => {
          console.log(
            "🚀 ~ file: accountService.tsx:53 ~ returnres.json ~ text:",
            text
          );
          throw text;
        });
      } else {
        console.log("🚀 ~ file: accountService.tsx:58 ~ .then ~ res:", res);
        return res.json();
      }
    })
    .catch((error) => {
      //console.log("🚀 ~ file: accountService.tsx:39 ~ create ~ error", error)
      throw error;
    });
};

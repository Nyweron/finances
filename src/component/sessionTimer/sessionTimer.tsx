import React, { FC, useEffect } from "react";
import { useAccountContext } from "../../context/accountContext";
import { toast } from "react-toastify";
//import { useNavigate, useLocation } from "react-router-dom";
import { refreshJWTToken } from "../../lib/accountService";

interface JwtPayload {
  exp: number;
}

function parseJwt(token: string): JwtPayload {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function createExpirationTimeAsUnixTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}

function calculateDifferenceBetweenCurrentAndExpirationTime(
  expirationTime: Date
): number {
  return Math.floor((expirationTime.getTime() - Date.now()) / 1000);
}

const SessionTimer: FC<any> = () => {
  const { account, logOff, saveToken } = useAccountContext();
  console.log("🚀 ~ file: sessionTimer.tsx:37 ~ account:", account);

  let token = account.token;
  console.log("🚀 ~ file: sessionTimer.tsx:40 ~ token:", token);
  let refreshToken = account.refreshToken;
  let canRefreshJWTToken = true; // This is necessary?
  //const navigate = useNavigate();
  //const location = useLocation();

  useEffect(() => {
    if (token) {
      console.log("🚀 ~ file: sessionTimer.tsx:52 ~ account:", account);
      const parsedJwt = parseJwt(token);
      const sessionExpirationTime = parsedJwt.exp;

      const unixTimestamp = sessionExpirationTime;
      const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
      const formattedDateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

      console.log(
        "🚀 ~ file: sessionTimer.tsx:57 ~ useEffect ~ formattedDateTime:",
        formattedDateTime
      );
      canRefreshJWTToken = true;
      console.log(
        "🚀 ~ file: sessionTimer.tsx:61 ~ useEffect ~ canRefreshJWTToken:",
        canRefreshJWTToken
      );
      const intervalId = window.setInterval(() => {
        if (compareJwtTokenExpirationTime(sessionExpirationTime)) {
          clearInterval(intervalId);
          console.log("Interval stopped!");
          logOff();
        }
      }, 1000);

      return () => {
        window.clearInterval(intervalId);
      };
    } else {
      canRefreshJWTToken = false;
      console.log(
        "🚀 ~ file: sessionTimer.tsx:74 ~ useEffect ~ canRefreshJWTToken:",
        canRefreshJWTToken
      );
      sessionStorage.clear();
    }
  }, [token]);

  function CustomToastWithLink() {
    const loginAgain = () => {
      console.log(
        "🚀 ~ file: sessionTimer.tsx:81 ~ loginAgain ~ canRefreshJWTToken:",
        canRefreshJWTToken
      );
      if (canRefreshJWTToken === false) {
        return;
      }

      refreshJWTToken({ token, refreshToken })
        .then((res) => {
          console.log(
            "🚀 ~ file: sessionTimer.tsx:65 ~ refreshJWTToken ~ res:",
            res
          );
          saveToken({
            token: res.token,
            email: account.email,
            refreshToken: res.refreshToken,
            userName: account.userName,
            someNumber: 456,
            isLogin: account.isLogin,
          });
        })
        .catch((error) => {
          console.log(
            "🚀 ~ file: sessionTimer.tsx:68 ~ refreshJWTToken ~ error:",
            error
          );
          return;
        });
      //navigate("/login");
      //TODO method to refreshToken
    };

    return (
      <div onClick={() => loginAgain()}>
        After 15 seconds you will be logout. Click to login
      </div>
    );
  }

  function displayExpirationMessageIfNecessary(secondsUntilExpiration: number) {
    if (secondsUntilExpiration === 10) {
      toast.warning(CustomToastWithLink, {
        autoClose: 10000,
        pauseOnHover: false,
      });
    }
  }

  function compareJwtTokenExpirationTime(
    sessionExpirationTime: number
  ): boolean {
    const timeNow = createExpirationTimeAsUnixTimestamp();
    const dateTimeNow = new Date(timeNow * 1000);
    const expirationTime = new Date(sessionExpirationTime * 1000);

    if (expirationTime > dateTimeNow) {
      console.log("Jesteś zalogowany");
      canRefreshJWTToken = true;
    } else if (expirationTime < dateTimeNow) {
      console.log("Zostałeś wylogowany!");
      canRefreshJWTToken = false;
      return true;
    } else {
      console.log("Token 1 and token 2 expire at the same time");
    }

    const secondsUntilExpiration =
      calculateDifferenceBetweenCurrentAndExpirationTime(expirationTime);

    displayExpirationMessageIfNecessary(secondsUntilExpiration);

    return false;
  }

  return null;
};

export default SessionTimer;

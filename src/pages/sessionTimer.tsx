import React, { useEffect } from "react";
import { AccountContext, useAccountContext } from "../context/accountContext";

function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function createExpirationTimeAsUnixTimestamp() {
  // Set the expiration time to 24 hours from now
  return Math.floor(Date.now() / 1000) + 60 * 60 * 0;

  // Convert the expiration time to a Date object
  // const expirationTime = new Date(expirationTimeSeconds * 1000);
}

function compareJwtTokenExpirationTime(sessionExpirationTime: any) {
  console.log(
    "🚀 ~ file: sessionTimer.tsx:29 ~ compareJwtTokenExpirationTime ~ sessionExpirationTime:",
    sessionExpirationTime
  );
  const timeNow = createExpirationTimeAsUnixTimestamp();
  console.log(
    "🚀 ~ file: sessionTimer.tsx:31 ~ compareJwtTokenExpirationTime ~ timeNow:",
    timeNow
  );

  const sessionExpirationTime1 = new Date(sessionExpirationTime * 1000);
  console.log(
    "🚀 ~ file: sessionTimer.tsx:40 ~ compareJwtTokenExpirationTime ~ sessionE:",
    sessionExpirationTime1
  );
  const timeNow1 = new Date(timeNow * 1000);
  console.log(
    "🚀 ~ file: sessionTimer.tsx:42 ~ compareJwtTokenExpirationTime ~ timeNow1:",
    timeNow1
  );

  if (sessionExpirationTime1 > timeNow1) {
    console.log("Jestes zalogowany");
  } else if (sessionExpirationTime1 < timeNow1) {
    console.log("Zostałeś wylogowany!");
    return true;
  } else {
    console.log("Token 1 and token 2 expire at the same time");
  }

  // Calculate the time difference between the current time and the first expiration time
  const timeDiffSeconds = Math.floor(
    (sessionExpirationTime1.getTime() - Date.now()) / 1000
  );

  // Display a console log message if there are 30 seconds or less left until expiration
  if (timeDiffSeconds <= 30) {
    console.log("Token 1 will expire in less than 30 seconds!");
  }
}

const SessionTimer = () => {
  const { account } = useAccountContext();
  const token = account.token;

  useEffect(() => {
    if (token) {
      const parsedJwt = parseJwt(token);
      const sessionExpirationTime = parsedJwt.exp;
      console.log(
        "🚀 ~ file: sessionTimer.tsx:47 ~ useEffect ~ sessionExpirationTime:",
        sessionExpirationTime
      );
      const dateTimeNow = createExpirationTimeAsUnixTimestamp();
      console.log(
        "🚀 ~ file: sessionTimer.tsx:48 ~ useEffect ~ dateTimeNow:",
        dateTimeNow
      );

      const intervalId = window.setInterval(() => {
        if (compareJwtTokenExpirationTime(sessionExpirationTime)) {
          clearInterval(intervalId);
          console.log("Interval stopped!");
        }
      }, 1000);

      // setTimeout(() => {
      //   clearInterval(intervalId);
      //   console.log("Interval stopped!");
      // }, 5000);

      return () => {
        console.log(
          "🚀 ~ file: sessionTimer.tsx:93 ~ return ~ intervalId:",
          intervalId
        );
        window.clearInterval(intervalId);
      };
    }
  }, [token]);

  return null;
};

export default SessionTimer;

import { FC, useEffect } from "react";
import { useAccountContext } from "../../context/accountContext";

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

function displayExpirationMessageIfNecessary(secondsUntilExpiration: number) {
  if (secondsUntilExpiration <= 30) {
    console.log("Token 1 will expire in less than 30 seconds!");
  }
}

function compareJwtTokenExpirationTime(sessionExpirationTime: number): boolean {
  const timeNow = createExpirationTimeAsUnixTimestamp();
  const dateTimeNow = new Date(timeNow * 1000);
  const expirationTime = new Date(sessionExpirationTime * 1000);

  if (expirationTime > dateTimeNow) {
    console.log("Jesteś zalogowany");
  } else if (expirationTime < dateTimeNow) {
    console.log("Zostałeś wylogowany!");
    return true;
  } else {
    console.log("Token 1 and token 2 expire at the same time");
  }

  const secondsUntilExpiration =
    calculateDifferenceBetweenCurrentAndExpirationTime(expirationTime);

  displayExpirationMessageIfNecessary(secondsUntilExpiration);

  return false;
}

const SessionTimer: FC<any> = () => {
  const { account, logOff } = useAccountContext();
  const token = account.token;

  useEffect(() => {
    if (token) {
      const parsedJwt = parseJwt(token);
      const sessionExpirationTime = parsedJwt.exp;

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
    }
  }, [token]);

  return null;
};

export default SessionTimer;

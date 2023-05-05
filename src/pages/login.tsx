import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

import { loginUser } from "../lib/accountService";
import {
  AccountContextModel,
  AccountContextType,
  AccountModel,
} from "../constants";
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

const Login: React.FC<any> = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);

  const { saveToken } = useAccountContext();

  const handleSetEmail = (email: string) => {
    //console.log("🚀 ~ file: loginForm.tsx:104 ~ email:", email);
    setFormError(false);
    setEmail(email);
  };

  const handleSetPassword = (password: string) => {
    // console.log(
    //   "🚀 ~ file: loginForm.tsx:28 ~ handleSetPassword ~ password:",
    //   password
    // );
    setPassword(password);
  };

  const handleSubmit = () => {
    let accountUser: AccountModel = {
      email: email,
      password: password,
    };

    loginUser(accountUser)
      .then((bearerJwtToken) => {
        console.log(
          "🚀 ~ file: loginForm.tsx:43 ~ .then ~ res:",
          bearerJwtToken
        );

        const temp = parseJwt(bearerJwtToken);
        console.log("🚀 ~ file: login.tsx:71 ~ .then ~ temp:", temp);
        const sessionExpirationTime = temp.exp;
        console.log(
          "🚀 ~ file: login.tsx:77 ~ .then ~ sessionExpirationTime:",
          sessionExpirationTime
        );

        const unixTimestamp = sessionExpirationTime;
        const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
        const formattedDateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

        console.log(formattedDateTime); // Output: "02/01/2023 02:46:17 AM"

        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.getDate():",
          date.getDate()
        );

        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.getFullYear():",
          date.getFullYear()
        );
        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.getMonth():",
          date.getMonth()
        );
        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.getDay():",
          date.getDay()
        );
        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.getHours():",
          date.getHours()
        );
        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.getMinutes():",
          date.getMinutes()
        );
        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.getSeconds():",
          date.getSeconds()
        );
        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.getMilliseconds():",
          date.getMilliseconds()
        );
        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.getUTCDate():",
          date.getUTCDate()
        );
        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.getUTCDay():",
          date.getUTCDay()
        );
        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.toDateString():",
          date.toDateString()
        );
        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.toISOString():",
          date.toISOString()
        );
        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.toLocaleDateString():",
          date.toLocaleDateString()
        );
        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.toLocaleString():",
          date.toLocaleString()
        );
        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.toLocaleTimeString():",
          date.toLocaleTimeString()
        );
        console.log(
          "🚀 ~ file: login.tsx:86 ~ .then ~ date.toUTCString():",
          date.toUTCString()
        );

        localStorage.setItem("Authorization", `Bearer ${bearerJwtToken}`);

        const accountContextType: AccountContextModel = {
          email: " loginUser email",
          someNumber: 10,
          token: bearerJwtToken,
          userName: "user name",
          isLogin: true,
        };

        saveToken(accountContextType);
        navigate("/");
        //TODO in this section add react context, keep token jwt. And use it in other services, to take data from DB expense controller
      })
      .catch((err) => {
        console.log("🚀 ~ file: loginForm.tsx:48 ~ handleSubmit ~ err:", err);
      });
  };

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "70vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="/logo.png" /> Log-in to your account
          </Header>
          <Form onSubmit={() => handleSubmit()} error={formError}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                type="string"
                value={email}
                onChange={(e) => handleSetEmail(e.target.value)}
                // error={howMuchError}
              />

              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Hasło"
                type="password"
                value={password}
                onChange={(e) => handleSetPassword(e.target.value)}
              />

              <Button color="teal" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Nie masz konta?{" "}
            <Link to={"/registration"}>
              <Button primary>Zarejestruj się</Button>
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Login;

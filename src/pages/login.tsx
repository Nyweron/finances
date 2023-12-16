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
import { toast } from "react-toastify";

import { loginUser } from "../lib/accountService";
import { AccountContextModel, AccountModel } from "../constants";
import { useAccountContext } from "../context/accountContext";

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
    setFormError(false);
    setEmail(email);
  };

  const handleSetPassword = (password: string) => {
    setPassword(password);
  };

  const handleSubmit = () => {
    let accountUser: AccountModel = {
      email: email,
      password: password,
    };

    loginUser(accountUser)
      .then((token) => {
        console.log("🚀 ~ file: loginForm.tsx:43 ~ .then ~ res:", token);

        const temp = parseJwt(token.token);
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

        const accountContextType: AccountContextModel = {
          email: " loginUser email",
          someNumber: 10,
          token: token.token,
          refreshToken: token.refreshToken,
          userName: "user name",
          isLogin: true,
        };

        sessionStorage.setItem(
          "Authorization",
          `Bearer ${accountContextType.token}`
        );

        saveToken(accountContextType);
        navigate("/");
        //TODO in this section add react context, keep token jwt. And use it in other services, to take data from DB expense controller
      })
      .catch((err) => {
        console.log("🚀 ~ file: loginForm.tsx:48 ~ handleSubmit ~ err:", err);
        toast.error(`Error: ${err.message}`);
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

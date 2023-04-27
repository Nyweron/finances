import React, { useState } from "react";
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
import { AccountContext } from "../context/accountContext";

const Login: React.FC<any> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);

  const { saveToken } = React.useContext(AccountContext) as AccountContextType;

  const handleSetEmail = (email: string) => {
    //console.log("🚀 ~ file: loginForm.tsx:104 ~ email:", email);
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

        localStorage.setItem("Authorization", `Bearer ${bearerJwtToken}`);

        const accountContextType: AccountContextModel = {
          email: " loginUser email",
          someNumber: 10,
          token: bearerJwtToken,
          userName: "user name",
        };

        saveToken(accountContextType);
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
        style={{ height: "50vh" }}
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
            New to us? <a href="#">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Login;

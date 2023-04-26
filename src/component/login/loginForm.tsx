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

import { registerUser } from "../../lib/accountService";
import { AccountModel } from "../../constants";

const LoginForm: React.FC<any> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);

  const handleSetEmail = (email: string) => {
    console.log("🚀 ~ file: loginForm.tsx:104 ~ email:", email);
    setEmail(email);
  };

  const handleSetPassword = (password: string) => {
    console.log(
      "🚀 ~ file: loginForm.tsx:28 ~ handleSetPassword ~ password:",
      password
    );
    setPassword(password);
  };

  const handleSubmit = () => {
    let accountUser: AccountModel = {
      email: "",
      password: "",
    };

    registerUser(accountUser)
      .then((res) => {
        console.log("🚀 ~ file: loginForm.tsx:43 ~ .then ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ file: loginForm.tsx:48 ~ handleSubmit ~ err:", err);
      });
  };

  return (
    <>
      <Form onSubmit={() => handleSubmit()} error={formError}>
        <Grid
          textAlign="center"
          style={{ height: "50vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src="/logo.png" /> Log-in to your account
            </Header>
            <Form size="large">
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
      </Form>
    </>
  );
};

export default LoginForm;

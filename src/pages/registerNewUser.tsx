import React from "react";

import { Grid, Message } from "semantic-ui-react";

const RegisterNewUser: React.FC<any> = () => {
  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "50vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Message>REGISTRATION PAGE</Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default RegisterNewUser;

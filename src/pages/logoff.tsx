import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Grid, Message, Segment } from "semantic-ui-react";
import { useAccountContext } from "../context/accountContext";

const Logoff: React.FC<any> = () => {
  const navigate = useNavigate();

  const { logOff } = useAccountContext();

  useEffect(() => {
    console.log("🚀 ~ file: logoff.tsx:18 ~ useEffect ~ logOff():");
    logOff();
  }, []);

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "50vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment stacked>
            <Message>Zostałeś wylogowany </Message>

            <Button
              color="teal"
              fluid
              size="large"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Logoff;

import React, { useState } from "react";

import { Button, Checkbox, Form, Icon, Modal } from "semantic-ui-react";

const Expense2Add = (props) => {
  const [open, setOpen] = useState(props.showModal);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (data) => {
    console.log(
      "🚀 ~ file: expense2Add.js ~ line 10 ~ handleSubmit ~ data",
      data
      );

      console.log("🚀 ~ file: expense2Add.js ~ line 8 ~ Expense2Add ~ firstName", firstName)
      console.log("🚀 ~ file: expense2Add.js ~ line 8 ~ Expense2Add ~ lastName", lastName)
    //props.handleSubmit()
  };

  return (
    <div className="ui centered grid">
      <div className="row">
        <div className="fourteen wide column">
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Form onSubmit={(event) => handleSubmit(event)}>
              <Modal.Header>Profile Picture</Modal.Header>
              <Modal.Content scrolling>
                <Modal.Description>
                  <Form.Field>
                    <Form.Input
                      label="FirstName"
                      placeholder="FirstName"
                      name="firstName"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Form.Input
                      label="LastName"
                      placeholder="LastName"
                      name="lastName"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Checkbox label="I agree to the Terms and Conditions" />
                  </Form.Field>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={() => setOpen(false)} primary>
                  Proceed <Icon name="chevron right" />
                </Button>
                <Button type="submit">Submit</Button>
              </Modal.Actions>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default Expense2Add;

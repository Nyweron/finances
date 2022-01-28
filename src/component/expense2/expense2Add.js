import React, { useState } from "react";

import { Button, Checkbox, Form, Icon, Message } from "semantic-ui-react";

import Modal from "react-bootstrap/Modal";

const Expense2Add = (props) => {
  const [showModal, setShowModal] = useState(props.showModal);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (data) => {
    let error = false;

    if (firstName === "") {
      setFirstNameError(true);
      error = true;
    } else {
      setFirstNameError(false);
    }

    if (lastName === "") {
      setLastNameError(true);
      error = true;
    } else {
      setLastNameError(false);
    }

    if (error) {
      setFormError(true);
      return; //error
    }

    const expenseFormData = {
      firstName,
      lastName,
    };

    setFormError(false);
    setShowModal(false);
    props.handleSubmit(expenseFormData);
  };

  return (
    <Modal
      size={"lg"}
      show={showModal}
      onHide={() => {
        handleCloseModal();
      }}
    >
      <Form onSubmit={(event) => handleSubmit(event)} error={formError}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading Expense Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formError ? (
            <Message
              error
              header="Blad w formularzy"
              content="Lorem ipsum es dolores"
            />
          ) : null}

          <Form.Field>
            <Form.Input
              label="FirstName"
              placeholder="FirstName"
              name="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              error={firstNameError}
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
        </Modal.Body>
        <Modal.Footer>
          <Form.Group widths="equal">
            <Form.Button
              secondary
              type="reset"
              onClick={() => handleCloseModal()}
            >
              Close
            </Form.Button>
            <Form.Button
              primary
              color="blue"
              type="submit"
              disabled={!lastName}
            >
              Submit
            </Form.Button>
          </Form.Group>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default Expense2Add;

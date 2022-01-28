import React, { useState } from "react";

import {
  Button,
  Checkbox,
  Form,
  Message,
  Input,
} from "semantic-ui-react";

import Modal from "react-bootstrap/Modal";

const Expense2Add = (props) => {
  const [showModal, setShowModal] = useState(props.showModal);
  const [howMuch, setHowMuch] = useState("");
  const [forWhat, setForWhat] = useState("");
  const [howMuchError, setHowMuchError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [formError, setFormError] = useState(false);


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (data) => {
    let error = false;

    if (howMuch === "") {
      setHowMuchError(true);
      error = true;
    } else {
      setHowMuchError(false);
    }

    if (forWhat === "") {
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
      howMuch,
      forWhat,
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
              header="Blad w formularzu"
              content="Lorem ipsum es dolores"
            />
          ) : null}

          <Form.Field inline>
            <div className="form-group row">
              <label className={"col-sm-3 col-form-label"}>
                Kwota
              </label>
              <div className={"col-sm-9"}>
                <Input
                  fluid
                  placeholder="Kwota"
                  name="howMuch"
                  type="number"
                  value={howMuch}
                  onChange={(event) => setHowMuch(event.target.value)}
                  error={howMuchError}
                />
              </div>
            </div>
          </Form.Field>

          <Form.Field inline>
            <div className="form-group row">
              <label className={"col-sm-3 col-form-label"}>Na co</label>
              <div className={"col-sm-9"}>
                <Input
                  fluid
                  placeholder="Na co"
                  name="forWhat"
                  value={forWhat}
                  onChange={(event) => setForWhat(event.target.value)}
                />
              </div>
            </div>
          </Form.Field>

          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
        </Modal.Body>
        <Modal.Footer>
          <Form.Group widths="equal">
            <Form.Button
              color='grey'
              type="reset"
              onClick={() => handleCloseModal()}
            >
              Close
            </Form.Button>
            <Form.Button primary color="blue" type="submit" disabled={!forWhat}>
              Submit
            </Form.Button>
          </Form.Group>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default Expense2Add;

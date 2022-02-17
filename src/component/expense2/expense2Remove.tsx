import React, { useState } from "react";

import { Form } from "semantic-ui-react";

import Modal from "react-bootstrap/Modal";
import { ExpenseModelProps } from "../../constants";

const Expense2Remove: React.FC<ExpenseModelProps> = (props) => {
  const [showModal, setShowModal] = useState(props.showModal);

  const handleCloseModal = () => {
    setShowModal(false);
    props.handleCloseModal(false);
  };

  const handleSubmit = (data: React.FormEvent<HTMLFormElement>) => {
    console.log(
      "🚀 ~ file: expense2Remove.js ~ line 15 ~ handleSubmit ~ data",
      data
    );
    //let error = false;

    setShowModal(false);
    props.handleSubmit(data);
  };

  return (
    <Modal
      size={"lg"}
      show={showModal}
      onHide={() => {
        handleCloseModal();
      }}
    >
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading Expense Remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group row">
            <label className={"col-sm-12"}>
              Na pewno chcesz usunąć ten wiersz?
            </label>
            <br />
            <div className={"col-sm-12"}>
              <code>id: {props.id}</code>
              <br />
              <code>Kwota: {props.howMuch}</code>
              <br />
              <code>Czym zapłacono: {props.categorySavingDescription}</code>
              <br />
              <code>Kiedy: {props.date}</code>
              <br />
              <code>Kto: {props.userDescription}</code>
              <br />
              <code>Komentarz: {props.comment}</code>
              <br />
              <code>Załącznik: {props.attachment}</code>
              <br />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Form.Group widths="equal">
            <Form.Button
              color="grey"
              type="reset"
              onClick={() => handleCloseModal()}
            >
              Close
            </Form.Button>
            <Form.Button primary color="blue" type="submit">
              Submit
            </Form.Button>
          </Form.Group>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Expense2Remove;

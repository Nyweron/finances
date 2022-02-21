import React from "react";

import { connect } from "react-redux";

import { Form } from "semantic-ui-react";

import Modal from "react-bootstrap/Modal";

import { CLOSE_MODAL_REMOVE } from "../../redux/actions/actions";

const Expense2Remove: React.FC<any> = (props) => {
  const handleCloseModal = () => {
    props.handleCloseModalRemove();
  };

  const handleSubmit = (data: React.FormEvent<HTMLFormElement>) => {
    console.log(
      "🚀 ~ file: expense2Remove.js ~ line 15 ~ handleSubmit ~ data",
      data
    );
    //let error = false;

    props.handleSubmit(data);
  };

  return (
    <Modal
      size={"lg"}
      show={props.showModal}
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

function mapStateToProps(state: any) {
  return {
    showModal: state.modalRemove,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleCloseModalRemove: () => dispatch({ type: CLOSE_MODAL_REMOVE }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Expense2Remove);

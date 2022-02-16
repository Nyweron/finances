import React from "react";

import { connect } from "react-redux";

import { Form } from "semantic-ui-react";

import Modal from "react-bootstrap/Modal";

import { CLOSE_MODAL_REMOVE } from "../../redux/actions/actions";

const SavingRemove = (props) => {
  const handleCloseModal = () => {
    props.handleCloseModalRemove();
  };

  const handleSubmit = (data) => {
  console.log("🚀 ~ file: saving2Remove.js ~ line 15 ~ handleSubmit ~ data", data)
    //let error = false;

    props.handleCloseModalRemove();
    props.handleSubmit(props.data);
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
          <Modal.Title>Modal heading Saving Remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group row">
            <label className={"col-sm-12"}>
              Na pewno chcesz usunąć ten wiersz?
            </label>
            <br />
            <div className={"col-sm-12"}>
              <code>id: {props.data.id}</code><br/>
              <code>Kwota: {props.data.howMuch}</code><br/>
              <code>Czym zapłacono: {props.data.categorySavingDescription}</code><br/>
              <code>Kiedy: {props.data.date}</code><br/>
              <code>Kto: {props.data.userDescription}</code><br/>
              <code>Komentarz: {props.data.comment}</code><br/>
              <code>Załącznik: {props.data.attachment}</code><br/>
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

function mapStateToProps(state) {
  return {
    showModal: state.modalRemove,
  };
}

function mapDispatchToProps(dispatch) {
  return {
   handleCloseModalRemove: () => dispatch({type: CLOSE_MODAL_REMOVE})
  };
 }

export default connect (mapStateToProps, mapDispatchToProps) (SavingRemove);

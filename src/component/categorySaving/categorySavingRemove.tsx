import React from "react";

import { connect } from "react-redux";

import { Form } from "semantic-ui-react";

import Modal from "react-bootstrap/Modal";

import { CLOSE_MODAL_REMOVE } from "../../redux/actions/actions";

const CategorySavingRemove: React.FC<any> = (props) => {
  const handleCloseModal = () => {
    props.handleCloseModalRemove();
  };

  const handleSubmit = () => {
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
      <Form onSubmit={() => handleSubmit()}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading Category Saving Remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group row">
            <label className={"col-sm-12"}>
              Na pewno chcesz usunąć ten wiersz?
            </label>
            <br />
            <div className={"col-sm-12"}>
              <code>Opis: {props.data.description}</code>
              <br />
              <code>Widoczność: {props.data.isDeleted.toString()}</code>
              <br />
              <code>Możliwość zapłaty: {props.data.canPay.toString()}</code>
              <br />
              <code>Charakter długu: {props.data.debt.toString()}</code>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySavingRemove);

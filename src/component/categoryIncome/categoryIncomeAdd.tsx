import React, { useState } from "react";

import { connect } from "react-redux";

import { Checkbox, Form, Message, Input } from "semantic-ui-react";

import Modal from "react-bootstrap/Modal";

import { CLOSE_MODAL_CATEGORY_INCOME_ADD } from "../../redux/actions/actions";

const CategoryIncomeAdd: React.FC<any> = (props) => {
  const [isDeleted, setIsDeleted] = useState(true);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  // const [categoryIncomeError, setCategoryIncomeError] = useState(false);
  // const [categoryIncomeError, setCategoryIncomeError] = useState(false);
  // const [userIdError, setUserIdError] = useState(false);

  const [formError, setFormError] = useState(false);

  const handleCloseModal = () => {
    props.handleCloseModalAdd();
  };

  const handleSubmit = () => {
    let error = false;
    if (description === "") {
      setDescriptionError(true);
      error = true;
    } else {
      setDescriptionError(false);
    }
    if (error) {
      setFormError(true);
      return; //error
    }
    const categoryIncomeFormData = {
      description,
      isDeleted,
    };
    setFormError(false);
    props.handleCloseModalAdd();
    props.handleSubmit(categoryIncomeFormData);
  };

  return (
    <Modal
      size={"lg"}
      show={props.showModal}
      onHide={() => {
        handleCloseModal();
      }}
    >
      <Form onSubmit={(event) => handleSubmit()} error={formError}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading Category Income Add</Modal.Title>
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
              <label className={"col-sm-3 col-form-label"}>Nazwa</label>
              <div className={"col-sm-9"}>
                <Input
                  fluid
                  placeholder="Nazwa kategorii"
                  name="Nazwa"
                  type="string"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value as string)
                  }
                  error={descriptionError}
                />
              </div>
            </div>
          </Form.Field>

          <Form.Field inline>
            <div className="form-group row">
              <div className={"col-sm-12 col-form-label"}>
                <Checkbox
                  label="Widoczny na liście"
                  name="isDeleted"
                  checked={isDeleted}
                  onChange={() => setIsDeleted(!isDeleted)}
                />
              </div>
            </div>
          </Form.Field>
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
            <Form.Button
              primary
              color="blue"
              type="submit"
              disabled={!description}
            >
              Submit
            </Form.Button>
          </Form.Group>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

function mapStateToProps(state: any) {
  console.log(
    "🚀 ~ file: categoryIncomeAdd.tsx ~ line 110 ~ mapStateToProps ~ state",
    state
  );
  return {
    showModal: state.categoryIncomeModalAdd,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleCloseModalAdd: () =>
      dispatch({ type: CLOSE_MODAL_CATEGORY_INCOME_ADD }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryIncomeAdd);

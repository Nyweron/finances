import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Field } from "react-final-form";

import RenderDatePicker from "../DateInput/RenderDatePicker";

class IncomeEdit extends Component {
  state = {
    show: false
  };

  onSubmit = temp => {
    console.log("IncomeEdit.onSubmit", temp);
    this.hideModal();
    this.props.handleEdit(temp);
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  editForm = () => {
    this.showModal();
  };

  render() {
    //  console.log("IncomeEditProps", this.props);

    return (
      <>
        <Button variant="success" onClick={this.editForm}>
          edit
        </Button>
        <Form
          onSubmit={this.onSubmit}
          initialValues={{ ...this.props.row, autoSubtractAmount: true }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <Modal
              size={"lg"}
              show={this.state.show}
              onHide={() => {
                this.hideModal();
                form.reset();
              }}
            >
              <form
                onSubmit={async event => {
                  await handleSubmit(event);
                  form.reset();
                }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading Income Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className={"form-group row"}>
                    <label className={"col-sm-2 col-form-label"}>Kwota</label>
                    <div className={"col-sm-10"}>
                      <Field
                        name="howMuch"
                        component="input"
                        type="number"
                        placeholder="Kwota"
                        className={"form-control"}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className={"col-sm-2 col-form-label"}>Tytuł przychodu:</label>
                    <div className={"col-sm-10"}>
                      <Field
                        name="categoryIncomeId"
                        component="select"
                        className={"custom-select"}
                      >
                        <option />
                        <option value="1">Darowizna</option>
                        <option value="2">Nadgodziny</option>
                        <option value="3">Odsetki</option>
                      </Field>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className={"col-sm-2 col-form-label"}>
                    Na co wpłacono
                    </label>
                    <div className={"col-sm-10"}>
                      <Field
                        name="categorySavingId"
                        component="select"
                        className={"custom-select"}
                      >
                        <option />
                        <option value="1">Konto banku X(firmowe)</option>
                        <option value="2">Karta banku Y(oszczędnościowe)</option>
                        <option value="3">Konto banku Z(ogólne)</option>
                      </Field>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      style={{ fontSize: "small" }}
                      className={"col-sm-12"}
                    >
                      Aktualny stan wybranych oszczędności: "Konto banku X
                      value=1..."
                    </label>
                  </div>
                  <div className={"form-group row"}>
                    <label className={"col-sm-2 col-form-label"}>Kiedy:</label>
                    <div className={"col-sm-5"}>
                      <Field name="date" editDate={this.props.row.date} component={RenderDatePicker} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className={"col-sm-2 col-form-label"}>Kto</label>
                    <div className={"col-sm-10"}>
                      <Field
                        name="userId"
                        component="select"
                        className={"form-control"}
                      >
                        <option />
                        <option value="1">Ja</option>
                        <option value="2">Brat</option>
                        <option value="3">Siostra</option>
                      </Field>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className={"col-sm-2 col-form-label"}>
                      Komentarz
                    </label>
                    <div className={"col-sm-10"}>
                      <Field
                        name="comment"
                        component="textarea"
                        placeholder="Komentarz"
                        className={"form-control"}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      style={{ fontSize: "small" }}
                      className={"col-sm-12"}
                    >
                      Automatycznie odejmi wpisaną kwotę z wybranego typu
                      oszczędności (pole Czym zapłacono)
                    </label>
                    <div className="form-check">
                      <Field
                        name="autoSubtractAmount"
                        component="input"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => {
                      form.reset();
                      this.hideModal();
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={submitting || pristine}
                  >
                    Save Changes
                  </Button>

                  <pre>{JSON.stringify(values, 0, 2)}</pre>
                </Modal.Footer>
              </form>
            </Modal>
          )}
        />
      </>
    );
  }
}

export default IncomeEdit;

import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Field } from "react-final-form";

class SavingAdd extends Component {
  onSubmit = temp => {
    console.log("SavingAdd.onSubmit", temp);
    this.props.handleClose();
  };

  render() {
    console.log("SavingAddProps", this.props);
    return (
      <>
        <Form
          onSubmit={this.onSubmit}
          initialValues={{ amount: 55.01, autoSubtractAmount: true }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <Modal
              show={this.props.show}
              onHide={() => {
                this.props.handleClose();
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
                  <Modal.Title>Modal heading Saving Add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className={"form-group row"}>
                    <label className={"col-sm-2 col-form-label"}>
                      Rodzaj oszczędności
                    </label>
                    <div className={"col-sm-10"}>
                      <Field
                        name="TypeOfSavings"
                        component="select"
                        className={"custom-select"}
                      >
                        <option />
                        <option value="56">Konto internetowe</option>
                        <option value="77">konto z X banku</option>
                        <option value="88">Konto z Y banku</option>
                      </Field>
                    </div>
                  </div>
                  <div className={"form-group row"}>
                    <label className={"col-sm-2 col-form-label"}>Kwota</label>
                    <div className={"col-sm-10"}>
                      <Field
                        name="HowMuch"
                        component="input"
                        type="number"
                        placeholder="Kwota"
                        className={"form-control"}
                      />
                    </div>
                  </div>
                  <div className={"form-group row"}>
                    <div className="form-check col-sm-2">
                      <Field
                        name="autoSubtractAmount"
                        component="input"
                        type="checkbox"
                      />
                    </div>
                    <div className={"col-sm-10"}>
                      <label style={{ fontSize: "small" }}>
                        Stan dodawanej oszczędności (kwota)
                      </label>
                    </div>
                  </div>

                  <div className={"form-group row"}>
                    <label className={"col-sm-2 col-form-label"}>Kiedy:</label>
                  </div>
                  <div className={"form-group row"}>
                    <label className={"col-2 col-form-label"}>Dzień:</label>
                    <div className={"col-4"}>
                      <Field
                        name="whenDay"
                        component="input"
                        type="number"
                        placeholder="Dzień"
                        className={"form-control"}
                      />
                    </div>
                    <label className={"col-2 col-form-label"}>Miesiąc:</label>
                    <div className={"col-4"}>
                      <Field
                        name="whenMonth"
                        component="input"
                        type="number"
                        placeholder="Miesiąc"
                        className={"form-control"}
                      />
                    </div>
                    <label className={"col-2 col-form-label"}>Rok:</label>
                    <div className={"col-4"}>
                      <Field
                        name="whenYear"
                        component="input"
                        type="number"
                        placeholder="Rok"
                        className={"form-control"}
                      />
                    </div>
                  </div>
                  <div className={"form-group row"}>
                    <label className={"col-sm-2 col-form-label"}>
                      Komentarz
                    </label>
                    <div className={"col-sm-10"}>
                      <Field
                        name="notes"
                        component="textarea"
                        placeholder="Komentarz"
                        className={"form-control"}
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
                      this.props.handleClose();
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

export default SavingAdd;

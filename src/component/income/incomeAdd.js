import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Field } from "react-final-form";

class IncomeAdd extends Component {
  onSubmit = temp => {
    console.log("IncomeAdd.onSubmit", temp);
    this.props.handleClose();
  };

  render() {
    console.log("IncomeAddProps", this.props);
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
                  <Modal.Title>Modal heading Income Add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                  <div className="form-group row">
                    <label className={"col-sm-2 col-form-label"}>Na co</label>
                    <div className={"col-sm-10"}>
                      <Field
                        name="forWhat"
                        component="select"
                        className={"custom-select"}
                      >
                        <option />
                        <option value="56">Artykuły spożywcze</option>
                        <option value="77">Lekarz</option>
                        <option value="88">Samochód</option>
                      </Field>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className={"col-sm-2 col-form-label"}>
                      Czym zapłacono
                    </label>
                    <div className={"col-sm-10"}>
                      <Field
                        name="whatWasPaid"
                        component="select"
                        className={"custom-select"}
                      >
                        <option />
                        <option value="1">Konto banku X</option>
                        <option value="2">Karta banku X</option>
                        <option value="3">Konto banku Y</option>
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
                  <div className="form-group row">
                    <label className={"col-sm-2 col-form-label"}>Kiedy:</label>
                  </div>
                  <div className="form-group row">
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
                  <div className="form-group row">
                    <label className={"col-sm-2 col-form-label"}>Kto</label>
                    <div className={"col-sm-10"}>
                      <Field
                        name="who"
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
                        name="notes"
                        component="textarea"
                        placeholder="Komentarz"
                        className={"form-control"}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className={"col-sm-2 col-form-label"}>
                      Załącznik
                    </label>
                    <div className={"col-sm-10"}>
                      <Field
                        name="attachment"
                        component="input"
                        type="text"
                        placeholder="Załącznik"
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

export default IncomeAdd;

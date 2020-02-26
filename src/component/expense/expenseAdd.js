import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Field } from "react-final-form";

class ExpenseAdd extends Component {
  onSubmit = temp => {
    console.log("ExpenseAdd.onSubmit", temp);
    this.props.handleClose();
  };

  render() {
    console.log("ExpenseAddProps", this.props);
    return (
      <>
        <Form
          onSubmit={this.onSubmit}
          initialValues={{ stooge: "larry", autoSubtractAmount: true }}
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
                  <Modal.Title>Modal heading Expense Add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <label>Kwota</label>
                    <Field
                      name="amount"
                      component="input"
                      type="number"
                      placeholder="Kwota"
                    />
                  </div>
                  <div>
                    <label>Na co</label>
                    <Field name="forWhat" component="select">
                      <option />
                      <option value="56">Artykuły spożywcze</option>
                      <option value="77">Lekarz</option>
                      <option value="88">Samochód</option>
                    </Field>
                  </div>
                  <div>
                    <label>Czym zapłacono</label>
                    <Field name="whatWasPaid" component="select">
                      <option />
                      <option value="1">Konto banku X</option>
                      <option value="2">Karta banku X</option>
                      <option value="3">Konto banku Y</option>
                    </Field>
                  </div>
                  <div>
                    <label style={{ fontSize: "small" }}>
                      Aktualny stan wybranych oszczędności: "Konto banku X
                      value=1..."
                    </label>
                  </div>
                  <div>
                  <label>Kiedy</label>
                    <Field
                      name="when"
                      component="input"
                      type="number"
                      placeholder="Kiedy datepicker"
                    />
                  </div>
                  <div>
                    <label>Kto</label>
                    <Field name="who" component="select">
                      <option />
                      <option value="1">Ja</option>
                      <option value="2">Brat</option>
                      <option value="3">Siostra</option>
                    </Field>
                  </div>
                  <div>
                    <label>Komentarz</label>
                    <Field
                      name="notes"
                      component="textarea"
                      placeholder="Komentarz"
                    />
                  </div>

                  <div>
                    <label>Załącznik</label>
                    <Field
                      name="notes"
                      component="input"
                      type="text"
                      placeholder="Załącznik"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "small" }}>Automatycznie odejmi wpisaną kwotę z wybranego typu oszczędności (pole Czym zapłacono)</label>
                    <Field
                    name="autoSubtractAmount"
                    component="input"
                    type="checkbox"
                    />
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

export default ExpenseAdd;

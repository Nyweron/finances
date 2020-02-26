import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Field } from "react-final-form";

class ExpenseAdd extends Component {
  state = {};

  componentDidMount() {}

  saveData = addObj => {
    console.log("ExpenseAdd.saveData", addObj);
  };

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
          initialValues={{ stooge: "larry", employed: false }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
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
                    <label>First Name</label>
                    <Field
                      name="firstName"
                      component="input"
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label>Last Name</label>
                    <Field
                      name="lastName"
                      component="input"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                  <div>
                    <label>Employed</label>
                    <Field name="employed" component="input" type="checkbox" />
                  </div>
                  <div>
                    <label>Favorite Color</label>
                    <Field name="favoriteColor" component="select">
                      <option />
                      <option value="#ff0000">❤️ Red</option>
                      <option value="#00ff00">💚 Green</option>
                      <option value="#0000ff">💙 Blue</option>
                    </Field>
                  </div>
                  <div>
                    <label>Toppings</label>
                    <Field name="toppings" component="select" multiple>
                      <option value="chicken">🐓 Chicken</option>
                      <option value="ham">🐷 Ham</option>
                      <option value="mushrooms">🍄 Mushrooms</option>
                      <option value="cheese">🧀 Cheese</option>
                      <option value="tuna">🐟 Tuna</option>
                      <option value="pineapple">🍍 Pineapple</option>
                    </Field>
                  </div>
                  <div>
                    <label>Sauces</label>
                    <div>
                      <label>
                        <Field
                          name="sauces"
                          component="input"
                          type="checkbox"
                          value="ketchup"
                        />{" "}
                        Ketchup
                      </label>
                      <label>
                        <Field
                          name="sauces"
                          component="input"
                          type="checkbox"
                          value="mustard"
                        />{" "}
                        Mustard
                      </label>
                      <label>
                        <Field
                          name="sauces"
                          component="input"
                          type="checkbox"
                          value="mayonnaise"
                        />{" "}
                        Mayonnaise
                      </label>
                      <label>
                        <Field
                          name="sauces"
                          component="input"
                          type="checkbox"
                          value="guacamole"
                        />{" "}
                        Guacamole 🥑
                      </label>
                    </div>
                  </div>
                  <div>
                    <label>Best Stooge</label>
                    <div>
                      <label>
                        <Field
                          name="stooge"
                          component="input"
                          type="radio"
                          value="larry"
                        />{" "}
                        Larry
                      </label>
                      <label>
                        <Field
                          name="stooge"
                          component="input"
                          type="radio"
                          value="moe"
                        />{" "}
                        Moe
                      </label>
                      <label>
                        <Field
                          name="stooge"
                          component="input"
                          type="radio"
                          value="curly"
                        />{" "}
                        Curly
                      </label>
                    </div>
                  </div>
                  <div>
                    <label>Notes</label>
                    <Field
                      name="notes"
                      component="textarea"
                      placeholder="Notes"
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={form.reset}
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

                  {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
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

import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Field } from "react-final-form";

class ExpenseAdd extends Component {
  state = {
    show: this.props.show
  };

  saveData = addObj => {
    console.log("ExpenseAdd.saveData", addObj);
  };

  onSubmit = temp => {
    console.log("ExpenseAdd.onSubmit", temp);
  };

  render() {
    console.log("ExpenseAddModal", this.props);
    console.log("ExpenseAdd", this.state);
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading Expense Add</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Woohoo, you're reading this text in a modal!
            <div>
              {/* */}
              <br />
              <form>
                <div className="form-group">
                  <label htmlFor="name" className="cols-sm-2 control-label">
                    Firstname
                  </label>
                  <div className="cols-sm-5">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-user fa" aria-hidden="true" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="firstName"
                        name="firstName"
                        value={this.props.firstName}
                        onChange={this.props.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="name" className="cols-sm-2 control-label">
                    Lastname
                  </label>
                  <div className="cols-sm-5">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-user fa" aria-hidden="true" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="lastName"
                        name="lastName"
                        value={this.props.lastName}
                        onChange={this.props.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="name" className="cols-sm-2 control-label">
                    Age
                  </label>
                  <div className="cols-sm-5">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-user fa" aria-hidden="true" />
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="age"
                        name="age"
                        min="0"
                        max="100"
                        value={this.props.age}
                        onChange={this.props.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="name" className="cols-sm-2 control-label">
                    Hobby
                  </label>
                  <div className="cols-sm-5">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-user fa" aria-hidden="true" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="hobby"
                        name="hobby"
                        value={this.props.hobby}
                        onChange={this.props.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
              {/* */}
            </div>
            <Form
              onSubmit={this.onSubmit}
              initialValues={{ stooge: "larry", employed: false }}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values
              }) => (
                <form onSubmit={handleSubmit}>
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
                  <div className="buttons">
                    <button type="submit" disabled={submitting || pristine}>
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={form.reset}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </button>
                  </div>
                  <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
              )}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.saveData}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ExpenseAdd;

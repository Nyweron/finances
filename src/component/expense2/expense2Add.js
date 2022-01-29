import React, { useState } from "react";

import {
  Checkbox,
  Form,
  Message,
  Input,
} from "semantic-ui-react";

import DatePicker from "react-widgets/DatePicker";
import Modal from "react-bootstrap/Modal";

const Expense2Add = (props) => {
  const [showModal, setShowModal] = useState(props.showModal);

  const [howMuch, setHowMuch] = useState("");
  const [categoryExpense, setCategoryExpense] = useState("");
  const [categorySaving, setCategorySaving] = useState("");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("");
  const [attachment, setAttachment] = useState("");
  const [autoSubtractAmount, setAutoSubtractAmount] = useState(true);

  const [howMuchError, setHowMuchError] = useState(false);
  const [categoryExpenseError, setCategoryExpenseError] = useState(false);
  const [categorySavingError, setCategorySavingError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const [formError, setFormError] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (data) => {
    let error = false;

    console.log(
      "🚀 ~ file: expense2Add.js ~ line 90 ~ handleSubmit ~ howMuch",
      howMuch
    );
    console.log(
      "🚀 ~ file: expense2Add.js ~ line 90 ~ handleSubmit ~ categoryExpense",
      categoryExpense
    );
    console.log(
      "🚀 ~ file: expense2Add.js ~ line 90 ~ handleSubmit ~ categorySaving",
      categorySaving
    );
    console.log(
      "🚀 ~ file: expense2Add.js ~ line 90 ~ handleSubmit ~ userId",
      userId
    );

    if (howMuch === "") {
      setHowMuchError(true);
      error = true;
    } else {
      setHowMuchError(false);
    }

    if (categoryExpense === "") {
      setCategoryExpenseError(true);
      error = true;
    } else {
      setCategoryExpenseError(false);
    }

    if (categorySaving === "") {
      setCategorySavingError(true);
      error = true;
    } else {
      setCategorySavingError(false);
    }

    if (userId === "") {
      setUserIdError(true);
      error = true;
    } else {
      setUserIdError(false);
    }

    if (error) {
      setFormError(true);
      return; //error
    }

    const expenseFormData = {
      howMuch,
      categoryExpense,
      categorySaving,
      calendarDate,
      userId,
      comment,
      attachment,
      autoSubtractAmount,
    };

    setFormError(false);
    setShowModal(false);
    props.handleSubmit(expenseFormData);
  };

  const options = [
    { key: "m", text: "Male", value: "male" },
    { key: "f", text: "Female", value: "female" },
    { key: "f2", text: "Female2", value: "female2" },
    { key: "o", text: "Other", value: "other" },
  ];

  return (
    <Modal
      size={"lg"}
      show={showModal}
      onHide={() => {
        handleCloseModal();
      }}
    >
      <Form onSubmit={(event) => handleSubmit(event)} error={formError}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading Expense Add</Modal.Title>
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
              <label className={"col-sm-3 col-form-label"}>Kwota</label>
              <div className={"col-sm-9"}>
                <Input
                  fluid
                  placeholder="Kwota"
                  name="howMuch"
                  type="number"
                  value={howMuch}
                  onChange={(event) => setHowMuch(event.target.value)}
                  error={howMuchError}
                />
              </div>
            </div>
          </Form.Field>

          <Form.Field inline>
            <div className="form-group row">
              <label className={"col-sm-3 col-form-label"}>Na co</label>
              <div className={"col-sm-9"}>
                <Form.Select
                  fluid
                  placeholder="Na co"
                  name="categoryExpense"
                  defaultValue={options[0].value}
                  onChange={(e, d) => setCategoryExpense(d.value)}
                  options={options}
                />
              </div>
            </div>
          </Form.Field>

          <Form.Field inline>
            <div className="form-group row">
              <label className={"col-sm-3 col-form-label"}>
                Czym zapłacono
              </label>
              <div className={"col-sm-9"}>
                <Form.Select
                  fluid
                  placeholder="Czym zapłacono"
                  name="categorySaving"
                  defaultValue={options[0].value}
                  onChange={(e, {value}) => setCategorySaving(value)}
                  options={options}
                />
              </div>
            </div>
          </Form.Field>

          <div className="form-group row">
            <label style={{ fontSize: "small" }} className={"col-sm-12"}>
              Aktualny stan wybranych oszczędności: "Konto banku X value=1..."
            </label>
          </div>

          <Form.Field inline>
            <div className="form-group row">
              <label className={"col-sm-3 col-form-label"}>Data</label>
              <div className={"col-sm-9"}>
                <Form.Input
                  control={DatePicker}
                  value={calendarDate}
                  name="date"
                  onChange={(e, d) => setCalendarDate(new Date(e))}
                />
              </div>
            </div>
          </Form.Field>

          <Form.Field inline>
            <div className="form-group row">
              <label className={"col-sm-3 col-form-label"}>Kto</label>
              <div className={"col-sm-9"}>
                <Form.Select
                  fluid
                  placeholder="Kto"
                  name="userId"
                  onChange={(e, d) => setUserId(d.value)}
                  options={options}
                />
              </div>
            </div>
          </Form.Field>

          <Form.Field inline>
            <div className="form-group row">
              <label className={"col-sm-3 col-form-label"}>Komentarz</label>
              <div className={"col-sm-9"}>
                <Form.TextArea
                  placeholder="Komentarz"
                  name="comment"
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
          </Form.Field>

          <Form.Field inline>
            <div className="form-group row">
              <label className={"col-sm-3 col-form-label"}>Załącznik</label>
              <div className={"col-sm-9"}>
                <Input
                  fluid
                  placeholder="Załącznik"
                  name="attachment"
                  type="string"
                  onChange={(e) => setAttachment(e.target.value)}
                />
              </div>
            </div>
          </Form.Field>

          <Form.Field inline>
            <div className="form-group row">
              <div className={"col-sm-12 col-form-label"}>
                <Checkbox
                  label="Automatycznie odejmi wpisaną kwotę z wybranego typu oszczędności (pole Czym zapłacono)"
                  name="autoSubtractAmount"
                  checked={autoSubtractAmount}
                  onChange={() => setAutoSubtractAmount(!autoSubtractAmount)}
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
            <Form.Button primary color="blue" type="submit" disabled={!categoryExpense}>
              Submit
            </Form.Button>
          </Form.Group>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Expense2Add;

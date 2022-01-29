import React, { useEffect, useState } from "react";

import { Checkbox, Form, Message, Input } from "semantic-ui-react";

import DatePicker from "react-widgets/DatePicker";
import Modal from "react-bootstrap/Modal";

import { getAll } from "../../lib/genericService";
import { GetCategoryExpensesForSelect } from "../../lib/categoryExpenseService";


const Expense2Add = (props) => {
  const [showModal, setShowModal] = useState(props.showModal);

  const [howMuch, setHowMuch] = useState("");
  const [categoryExpenseId, setCategoryExpense] = useState("");
  const [categorySavingId, setCategorySaving] = useState("");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("");
  const [attachment, setAttachment] = useState("");
  const [autoSubtractAmount, setAutoSubtractAmount] = useState(true);

  const [howMuchError, setHowMuchError] = useState(false);
  // const [categoryExpenseError, setCategoryExpenseError] = useState(false);
  // const [categorySavingError, setCategorySavingError] = useState(false);
  // const [userIdError, setUserIdError] = useState(false);

  const [formError, setFormError] = useState(false);

  const [categoryExpenseList, setCategoryExpenseList] = useState([]);

  useEffect(() => {
    GetCategoryExpensesForSelect().then((rows) => {
      setCategoryExpenseList(rows);
    });


  }, [setCategoryExpenseList]);



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
      "🚀 ~ file: expense2Add.js ~ line 90 ~ handleSubmit ~ categoryExpenseId",
      categoryExpenseId
    );
    console.log(
      "🚀 ~ file: expense2Add.js ~ line 90 ~ handleSubmit ~ categorySavingId",
      categorySavingId
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

    // if (categoryExpenseId === "") {
    //   setCategoryExpenseError(true);
    //   error = true;
    // } else {
    //   setCategoryExpenseError(false);
    // }

    // if (categorySavingId === "") {
    //   setCategorySavingError(true);
    //   error = true;
    // } else {
    //   setCategorySavingError(false);
    // }

    // if (userId === "") {
    //   setUserIdError(true);
    //   error = true;
    // } else {
    //   setUserIdError(false);
    // }

    if (error) {
      setFormError(true);
      return; //error
    }

    const expenseFormData = {
      howMuch,
      categoryExpenseId,
      categorySavingId,
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
                  name="categoryExpenseId"
                 // defaultValue={}
                  onChange={(e, d) => {
                    console.log("🚀 ~ file: expense2Add.js ~ line 174 ~ Expense2Add ~ e", e)
                    console.log("🚀 ~ file: expense2Add.js ~ line 174 ~ Expense2Add ~ d", d)

                   return setCategoryExpense(d.value)
                  }}
                  options={categoryExpenseList}
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
                  name="categorySavingId"
                  defaultValue={options[0].value}
                  onChange={(e, { value }) => setCategorySaving(value)}
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
            <Form.Button primary color="blue" type="submit" disabled={!howMuch}>
              Submit
            </Form.Button>
          </Form.Group>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Expense2Add;

import React, { useState } from "react";

import {
  Button,
  Checkbox,
  Form,
  Message,
  Input,
  Select,
} from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";

import Modal from "react-bootstrap/Modal";


const Expense2Add = (props) => {
  const [showModal, setShowModal] = useState(props.showModal);

  const [howMuch, setHowMuch] = useState("");
  const [forWhat, setForWhat] = useState("");
  const [whatWasPaid, setWhatWasPaid] = useState("");
  const [calendarDate, setCalendarDate] = useState("");

  const [howMuchError, setHowMuchError] = useState(false);
  const [forWhatError, setForWhatError] = useState(false);
  const [whatWasPaidError, setWhatWasPaidError] = useState(false);

  const [formError, setFormError] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectWhatWasPaid = (e, d) => {
    console.log(
      "🚀 ~ file: expense2Add.js ~ line 34 ~ handleSelectWhatWasPaid ~ e",
      e
    );
    console.log(
      "🚀 ~ file: expense2Add.js ~ line 35 ~ handleSelectWhatWasPaid ~ d",
      d
    );
    console.log(
      "🚀 ~ file: expense2Add.js ~ line 35 ~ handleSelectWhatWasPaid ~ d.value",
      d.value
    );
  };

  const handleSelectForWhat = (e, d) => {
    console.log(
      "🚀 ~ file: expense2Add.js ~ line 34 ~ handleSelectWhatWasPaid ~ e",
      e
    );
    console.log(
      "🚀 ~ file: expense2Add.js ~ line 35 ~ handleSelectWhatWasPaid ~ d",
      d
    );
    console.log(
      "🚀 ~ file: expense2Add.js ~ line 35 ~ handleSelectWhatWasPaid ~ d.value",
      d.value
    );
  };

  const HandlesetCalendarDate = (e, d) => {
    console.log(
      "🚀 ~ file: expense2Add.js ~ line 67 ~ HandlesetCalendarDate ~ e",
      e
    );
    console.log(
      "🚀 ~ file: expense2Add.js ~ line 68 ~ HandlesetCalendarDate ~ d",
      d
    );
    setCalendarDate(d.value);
  };

  const handleSubmit = (data) => {
    let error = false;

    if (howMuch === "") {
      setHowMuchError(true);
      error = true;
    } else {
      setHowMuchError(false);
    }

    if (forWhat === "") {
      setForWhatError(true);
      error = true;
    } else {
      setForWhatError(false);
    }

    if (error) {
      setFormError(true);
      return; //error
    }

    const expenseFormData = {
      howMuch,
      forWhat,
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
                  name="forWhat"
                  defaultValue={options[0].value}
                  onChange={(e, d) => handleSelectForWhat(e, d)}
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
                  name="whatWasPaid"
                  defaultValue={options[0].value}
                  onChange={(e, d) => handleSelectWhatWasPaid(e, d)}
                  // onChange={(e:any, {value}) => {
                  //   console.log("🚀 ~ file: expense2Add.js ~ line 144 ~ Expense2Add ~ e", e)

                  //   console.log("🚀 ~ file: expense2Add.js ~ line 140 ~ Expense2Add ~ value", value?.toString())
                  // }}

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
                <DateInput
                  name="date"
                  placeholder="Date"
                  value={calendarDate}
                  iconPosition="left"
                  onChange={(e, d) => HandlesetCalendarDate(e, d)}
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
                  //onChange={(e, d) => handleSelectWhatWasPaid(e, d)}
                  // onChange={(e:any, {value}) => {
                  //   console.log("🚀 ~ file: expense2Add.js ~ line 144 ~ Expense2Add ~ e", e)

                  //   console.log("🚀 ~ file: expense2Add.js ~ line 140 ~ Expense2Add ~ value", value?.toString())
                  // }}

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
                  fluid
                  placeholder="Komentarz"
                  name="comment"

                  //onChange={(e, d) => handleSelectWhatWasPaid(e, d)}
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
                />
              </div>
            </div>
          </Form.Field>


          <div className="form-group row">
            <label style={{ fontSize: "small" }} className={"col-sm-12"}>
            Automatycznie odejmi wpisaną kwotę z wybranego typu oszczędności (pole Czym zapłacono)
            </label>
          </div>



          <Form.Field>
            <Checkbox label="" />
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
            <Form.Button primary color="blue" type="submit" disabled={!forWhat}>
              Submit
            </Form.Button>
          </Form.Group>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default Expense2Add;

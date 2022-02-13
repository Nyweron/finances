import React, { useState, useEffect } from "react";

import {  Form, Message, Input } from "semantic-ui-react";

import DatePicker from "react-widgets/DatePicker";
import Modal from "react-bootstrap/Modal";

import { GetCategorySavingsForSelect } from "../../lib/categorySavingService";

const SavingEdit = (props) => {
  const [showModal, setShowModal] = useState(props.showModal);

  const [howMuch, setHowMuch] = useState(props.data.howMuch);
  const [categorySavingId, setCategorySavingId] = useState(
    props.data.categorySavingId
  );
  const [calendarDate, setCalendarDate] = useState(new Date(props.data.date));
  const [comment, setComment] = useState(props.data.comment);

  const [howMuchError, setHowMuchError] = useState(false);
  const [formError, setFormError] = useState(false);

  const [categorySavingList, setCategorySavingList] = useState([]);

  useEffect(() => {
    GetCategorySavingsForSelect().then((rows) => {
      setCategorySavingList(rows);
    });
  }, [setCategorySavingList]);

  const handleCloseModal = () => {
    setShowModal(false);
    props.handleCloseModal(false);
  };

  const handleSetHowMuch = (value) => {
    if (value.includes(".") || value.includes(",")) {
      const splitedDecimal = value.split("." || ",");
      if (splitedDecimal[1].length > 2) {
        const decimalPartValueAfterDot = splitedDecimal[1].substring(0, 2);
        value = splitedDecimal[0] + "." + decimalPartValueAfterDot;
        setHowMuch(value);
        return;
      }
    }
    setHowMuch(value);
  };

  const handleSubmit = (data) => {
    let error = false;

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


    if (error) {
      setFormError(true);
      return; //error
    }


    const savingFormData = {
      id: props.data.id,
      howMuch,
      calendarDate,
      comment,
      categorySavingId,
      savingType: 1,
    };

    console.log("🚀 ~ file: saving2Edit.js ~ line 129 ~ handleSubmit ~ savingFormData", savingFormData)
    setFormError(false);
    setShowModal(false);
    props.handleSubmit(savingFormData);
  };

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
          <Modal.Title>Modal heading Saving Add</Modal.Title>
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
              <label className={"col-sm-3 col-form-label"}>
                Rodzaj oszczędności
              </label>
              <div className={"col-sm-9"}>
                <Form.Select
                  fluid
                  placeholder="Rodzaj oszczędności"
                  name="categorySavingId"
                  defaultValue={categorySavingId.toString()}
                  onChange={(e, d) => setCategorySavingId(d.value)}
                  options={categorySavingList}
                />
              </div>
            </div>
          </Form.Field>

          {/*
          ...
           Typ oszcednosci
           ...
           */}

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
                  onChange={(event) => handleSetHowMuch(event.target.value)}
                  error={howMuchError}
                />
              </div>
            </div>
          </Form.Field>

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
              <label className={"col-sm-3 col-form-label"}>Komentarz</label>
              <div className={"col-sm-9"}>
                <Form.TextArea
                  placeholder="Komentarz"
                  name="comment"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
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

}

export default SavingEdit;

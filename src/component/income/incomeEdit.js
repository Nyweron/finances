import React, { useState, useEffect } from "react";

import { Checkbox, Form, Message, Input } from "semantic-ui-react";

import DatePicker from "react-widgets/DatePicker";
import Modal from "react-bootstrap/Modal";

import { GetCategoryIncomesForSelect } from "../../lib/categoryIncomeService";
import { GetCategorySavingsForSelect } from "../../lib/categorySavingService";
import { GetUsersForSelect } from "../../lib/userService";


const IncomeEdit = (props) => {
  const [showModal, setShowModal] = useState(props.showModal);

  const [howMuch, setHowMuch] = useState(props.data.howMuch);
  const [categoryIncomeId, setCategoryIncomeId] = useState(
    props.data.categoryIncomeId
  );
  const [categorySavingId, setCategorySavingId] = useState(
    props.data.categorySavingId
  );
  const [calendarDate, setCalendarDate] = useState(new Date(props.data.date));
  const [userId, setUserId] = useState(props.data.userId);
  const [comment, setComment] = useState(props.data.comment);
  const [standingOrder, setStandingOrder] = useState(true);

  const [howMuchError, setHowMuchError] = useState(false);

  const [formError, setFormError] = useState(false);

  const [categoryIncomeList, setCategoryIncomeList] = useState([]);
  const [categorySavingList, setCategorySavingList] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    GetCategoryIncomesForSelect().then((rows) => {
      setCategoryIncomeList(rows);
    });

    GetCategorySavingsForSelect().then((rows) => {
      setCategorySavingList(rows);
    });

    GetUsersForSelect().then((rows) => {
      setUserList(rows);
    });
  }, [setCategoryIncomeList, setCategorySavingList, setUserList]);

  const handleCloseModal = () => {
    setShowModal(false);
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

    console.log(
      "🚀 ~ file: income2Edit.js ~ line 90 ~ handleSubmit ~ howMuch",
      howMuch
    );
    console.log(
      "🚀 ~ file: income2Edit.js ~ line 90 ~ handleSubmit ~ categoryExpenseId",
      categoryIncomeId
    );
    console.log(
      "🚀 ~ file: income2Edit.js ~ line 90 ~ handleSubmit ~ categorySavingId",
      categorySavingId
    );
    console.log(
      "🚀 ~ file: income2Edit.js ~ line 90 ~ handleSubmit ~ userId",
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

    const incomeFormData = {
      id: props.data.id,
      howMuch,
      categoryIncomeId,
      categorySavingId,
      calendarDate,
      userId,
      comment,
      standingOrder,
    };

    console.log("🚀 ~ file: income2Edit.js ~ line 129 ~ handleSubmit ~ incomeFormData", incomeFormData)
    setFormError(false);
    setShowModal(false);
    props.handleSubmit(incomeFormData);
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
          <Modal.Title>Modal heading Income Edit</Modal.Title>
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
                  onChange={(event) => handleSetHowMuch(event.target.value)}
                  error={howMuchError}
                />
              </div>
            </div>
          </Form.Field>

          <Form.Field inline>
            <div className="form-group row">
              <label className={"col-sm-3 col-form-label"}>Tytuł przychodu</label>
              <div className={"col-sm-9"}>
                <Form.Select
                  fluid
                  placeholder="Tytuł przychodu"
                  name="categoryIncomeId"
                  defaultValue={categoryIncomeId.toString()}
                  onChange={(e, d) => setCategoryIncomeId(d.value)}
                  options={categoryIncomeList}
                />
              </div>
            </div>
          </Form.Field>

          <Form.Field inline>
            <div className="form-group row">
              <label className={"col-sm-3 col-form-label"}>Wpłacono na</label>
              <div className={"col-sm-9"}>
                <Form.Select
                  fluid
                  placeholder="Wpłacono na"
                  name="categorySavingId"
                  defaultValue={categorySavingId.toString()}
                  onChange={(e, { value }) => setCategorySavingId(value)}
                  options={categorySavingList}
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
              <label className={"col-sm-3 col-form-label"}>Kto</label>
              <div className={"col-sm-9"}>
                <Form.Select
                  fluid
                  placeholder="Kto"
                  name="userId"
                  onChange={(e, d) => setUserId(d.value)}
                  defaultValue={userId.toString()}
                  options={userList}
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

          <Form.Field inline>
            <div className="form-group row">
              <div className={"col-sm-12 col-form-label"}>
                <Checkbox
                  label="Automatycznie dodaj wpisaną kwotę do wybranego typu oszczędności (pole Na co wpłacono)"
                  name="standingOrder"
                  checked={standingOrder}
                  onChange={() => setStandingOrder(!standingOrder)}
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

export default IncomeEdit;

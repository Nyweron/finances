import React, { useEffect, useState } from "react";

import { Form, Message, Input } from "semantic-ui-react";

import DatePicker from "react-widgets/DatePicker";
import Modal from "react-bootstrap/Modal";

import { GetCategoryIncomeForSelect } from "../../lib/categoryIncomeService";
import { GetCategorySavingsForSelect } from "../../lib/categorySavingService";
import { GetUsersForSelect } from "../../lib/userService";

const IncomeAdd = (props) => {
  const [showModal, setShowModal] = useState(props.showModal);

  const [howMuch, setHowMuch] = useState("");
  const [categoryIncomeId, setCategoryIncomeId] = useState("");
  const [categorySavingId, setCategorySavingId] = useState("");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("");

  const [howMuchError, setHowMuchError] = useState(false);

  const [formError, setFormError] = useState(false);

  const [categoryIncomeList, setCategoryIncomeList] = useState([]);
  const [categorySavingList, setCategorySavingList] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    GetCategoryIncomeForSelect().then((rows) => {
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
      howMuch,
      categoryIncomeId,
      categorySavingId,
      calendarDate,
      userId,
      comment,
    };

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
          <Modal.Title>Modal heading Income Add</Modal.Title>
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

export default IncomeAdd;

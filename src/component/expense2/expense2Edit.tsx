import React, { useState, useEffect } from "react";

import { Checkbox, Form, Message, Input } from "semantic-ui-react";

import DatePicker from "react-widgets/DatePicker";
import Modal from "react-bootstrap/Modal";

import { GetCategoryExpensesForSelect } from "../../lib/categoryExpenseService";
import { GetCategorySavingsForSelect } from "../../lib/categorySavingService";
import { GetUsersForSelect } from "../../lib/userService";
import { ExpenseModel, ExpenseModelProps } from "../../constants";

const Expense2Edit: React.FC<ExpenseModelProps> = (props) => {
  console.log(
    "🚀 ~ file: expense2Edit.js ~ line 9 ~ Expense2Edit ~ props",
    props
  );
  const [showModal, setShowModal] = useState(props.showModal);

  const [howMuch, setHowMuch] = useState<string>(props.howMuch.toString());
  const [categoryExpenseId, setCategoryExpenseId] = useState<string>(
    props.categoryExpenseId.toString()
  );
  const [categorySavingId, setCategorySavingId] = useState<string>(
    props.categorySavingId.toString()
  );
  const [calendarDate, setCalendarDate] = useState(new Date(props.date));
  const [userId, setUserId] = useState<string>(props.userId.toString());
  const [comment, setComment] = useState(props.comment);
  const [attachment, setAttachment] = useState(props.attachment);
  const [autoSubtractAmount, setAutoSubtractAmount] = useState(true);

  const [howMuchError, setHowMuchError] = useState(false);
  // const [categoryExpenseError, setCategoryExpenseError] = useState(false);
  // const [categorySavingError, setCategorySavingError] = useState(false);
  // const [userIdError, setUserIdError] = useState(false);

  const [formError, setFormError] = useState(false);

  const [categoryExpenseList, setCategoryExpenseList] = useState([]);
  const [categorySavingList, setCategorySavingList] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    GetCategoryExpensesForSelect().then((rows) => {
      setCategoryExpenseList(rows);
    });

    GetCategorySavingsForSelect().then((rows) => {
      setCategorySavingList(rows);
    });

    GetUsersForSelect().then((rows) => {
      setUserList(rows);
    });
  }, [setCategoryExpenseList, setCategorySavingList, setUserList]);

  const handleCloseModal = () => {
    setShowModal(false);
    props.handleCloseModal(false);
  };

  const handleSetHowMuch = (value: string) => {
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

  const handleSubmit = (data: React.FormEvent<HTMLFormElement>) => {
    let error = false;

    console.log(
      "🚀 ~ file: expense2Edit.js ~ line 90 ~ handleSubmit ~ howMuch",
      howMuch
    );
    console.log(
      "🚀 ~ file: expense2Edit.js ~ line 90 ~ handleSubmit ~ categoryExpenseId",
      categoryExpenseId
    );
    console.log(
      "🚀 ~ file: expense2Edit.js ~ line 90 ~ handleSubmit ~ categorySavingId",
      categorySavingId
    );
    console.log(
      "🚀 ~ file: expense2Edit.js ~ line 90 ~ handleSubmit ~ userId",
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

    const expenseFormData: ExpenseModel = {
      id: props.id,
      howMuch: parseInt(howMuch),
      categoryExpenseId: parseInt(categoryExpenseId),
      categorySavingId: parseInt(categorySavingId),
      date: calendarDate,
      userId: parseInt(userId),
      comment,
      attachment,
      standingOrder: autoSubtractAmount,
    };

    console.log(
      "🚀 ~ file: expense2Edit.js ~ line 129 ~ handleSubmit ~ expenseFormData",
      expenseFormData
    );
    setFormError(false);
    setShowModal(false);
    props.handleSubmit(expenseFormData);
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
          <Modal.Title>Modal heading Expense Edit</Modal.Title>
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
              <label className={"col-sm-3 col-form-label"}>Na co</label>
              <div className={"col-sm-9"}>
                <Form.Select
                  fluid
                  placeholder="Na co"
                  name="categoryExpenseId"
                  defaultValue={categoryExpenseId.toString()}
                  onChange={(e, d) =>
                    setCategoryExpenseId(
                      (e.target as HTMLTextAreaElement).value
                    )
                  }
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
                  defaultValue={categorySavingId.toString()}
                  onChange={(e, { value }) =>
                    setCategorySavingId((e.target as HTMLTextAreaElement).value)
                  }
                  options={categorySavingList}
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
                  onChange={(e, d) => setCalendarDate(new Date(e.target.value))}
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
                  onChange={(e, d) =>
                    setUserId((e.target as HTMLTextAreaElement).value)
                  }
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
              <label className={"col-sm-3 col-form-label"}>Załącznik</label>
              <div className={"col-sm-9"}>
                <Input
                  fluid
                  placeholder="Załącznik"
                  name="attachment"
                  type="string"
                  onChange={(e) => setAttachment(e.target.value)}
                  value={attachment}
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

export default Expense2Edit;

import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import { Checkbox, Form, Message, Input } from "semantic-ui-react";

import DatePicker from "react-widgets/DatePicker";
import Modal from "react-bootstrap/Modal";

import { GetCategoryIncomesForSelect } from "../../lib/categoryIncomeService";
import { GetCategorySavingsForSelect } from "../../lib/categorySavingService";
import { GetUsersForSelect } from "../../lib/userService";

import { CLOSE_MODAL_ADD } from "../../redux/actions/actions";
import { IncomeModel } from "../../constants";

const IncomeAdd: React.FC<any> = (props) => {
  const [howMuch, setHowMuch] = useState("");
  const [categoryIncomeId, setCategoryIncomeId] = useState("");
  const [categorySavingId, setCategorySavingId] = useState("");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("");
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
    props.handleCloseModalAdd();
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

  const handleSubmit = () => {
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

    const incomeFormData: IncomeModel = {
      id: -1,
      howMuch: parseFloat(howMuch),
      categoryIncomeId: parseInt(categoryIncomeId),
      categorySavingId: parseInt(categorySavingId),
      date: calendarDate,
      userId: parseInt(userId),
      comment,
      attachment: "",
      standingOrder: null,
    };

    setFormError(false);
    props.handleCloseModalAdd();
    props.handleSubmit(incomeFormData);
  };

  return (
    <Modal
      size={"lg"}
      show={props.showModal}
      onHide={() => {
        handleCloseModal();
      }}
    >
      <Form onSubmit={() => handleSubmit()} error={formError}>
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
              <label className={"col-sm-3 col-form-label"}>
                Tytuł przychodu
              </label>
              <div className={"col-sm-9"}>
                <Form.Select
                  fluid
                  placeholder="Tytuł przychodu"
                  name="categoryIncomeId"
                  onChange={(e, d) => setCategoryIncomeId(d.value as string)}
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
                  onChange={(e, { value }) =>
                    setCategorySavingId(value as string)
                  }
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
                  onChange={(e: any, d) => setCalendarDate(new Date(e))}
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
                  onChange={(e, d) => setUserId(d.value as string)}
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

function mapStateToProps(state: any) {
  return {
    showModal: state.modalAdd,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleCloseModalAdd: () => dispatch({ type: CLOSE_MODAL_ADD }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomeAdd);

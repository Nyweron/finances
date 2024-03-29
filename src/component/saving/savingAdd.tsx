import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import { Form, Message, Input } from "semantic-ui-react";

import DatePicker from "react-widgets/DatePicker";
import Modal from "react-bootstrap/Modal";

import { GetCategorySavingsForSelect } from "../../lib/categorySavingService";

import { CLOSE_MODAL_ADD } from "../../redux/actions/actions";

const SavingAdd: React.FC<any> = (props) => {
  //console.log("🚀 ~ file: savingAdd.js ~ line 11 ~ SavingAdd ~ props", props)
  const [howMuch, setHowMuch] = useState("");
  const [categorySavingId, setCategorySavingId] = useState("");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [comment, setComment] = useState("");

  const [howMuchError, setHowMuchError] = useState(false);
  // const [categorySavingError, setCategorySavingError] = useState(false);
  // const [categorySavingError, setCategorySavingError] = useState(false);
  // const [userIdError, setUserIdError] = useState(false);

  const [formError, setFormError] = useState(false);

  const [categorySavingList, setCategorySavingList] = useState([]);

  useEffect(() => {
    GetCategorySavingsForSelect().then((rows) => {
      setCategorySavingList(rows);
    });
  }, [setCategorySavingList]);

  const handleCloseModal = () => {
    props.handleCloseModalAdd();
  };

  const handleSubmit = () => {
    let error = false;

    if (howMuch === "") {
      setHowMuchError(true);
      error = true;
    } else {
      setHowMuchError(false);
    }

    if (error) {
      setFormError(true);
      return; //error
    }

    const savingFormData = {
      howMuch,
      categorySavingId,
      calendarDate,
      comment,
    };

    setFormError(false);
    props.handleCloseModalAdd();
    props.handleSubmit(savingFormData);
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

  return (
    <Modal
      size={"lg"}
      show={props.showModal}
      onHide={() => {
        handleCloseModal();
      }}
    >
      <Form onSubmit={(event) => handleSubmit()} error={formError}>
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
                  onChange={(e, d) => {
                    return setCategorySavingId(d.value as string);
                  }}
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
                  onChange={(e: any, d) => setCalendarDate(new Date(e))}
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

function mapStateToProps(state: any) {
  console.log(
    "🚀 ~ file: savingAdd.tsx ~ line 190 ~ mapStateToProps ~ state",
    state
  );
  return {
    showModal: state.modalAdd,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleCloseModalAdd: () => dispatch({ type: CLOSE_MODAL_ADD }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SavingAdd);

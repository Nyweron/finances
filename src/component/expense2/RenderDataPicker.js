import React from "react";
import DatePicker from "react-widgets/DatePicker";
import { format, isValid } from "date-fns";

const RenderDatePicker = ({
  input,
  editDate = null,
}) => {
  return (
    <DatePicker
      name="date"
      placeholder="Date"
      defaultValue={
        editDate !== null || editDate !== undefined || editDate !== ""
          ? new Date(editDate)
          : new Date()
      }
      format="dd-MM-yyyy"
      culture={"pl"}
      onChange={(date) => {
        // On Change, you should use final-form Field Input prop to change the value
        if (isValid(date)) {
          input.onChange(format(new Date(date), "dd-MM-yyyy"));
        } else {
          input.onChange(null);
        }
      }}
    />
  );
};

export default RenderDatePicker;

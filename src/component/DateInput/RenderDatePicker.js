import React from "react";
import { DateTimePicker } from "react-widgets";
import { format, isValid } from "date-fns";

const RenderDatePicker = ({
  name,
  input,
  input: { value, onChange },
  editDate,
}) => {
  // console.log("editDate", editDate);
  return (
    <DateTimePicker
      name="date"
      time={false}
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

import React from "react";
import DatePicker from "react-widgets/DatePicker";
import { format, isValid } from "date-fns";

const RenderDatePicker = ({
  name,
  input,
  input: { value, onChange },
  editDate = null,
}) => {
//   console.log("🚀 ~ file: RenderDatePicker.js ~ line 11 ~ value", value);
//   const year = new Date().getFullYear();
//   console.log("🚀 ~ file: RenderDatePicker.js ~ line 13 ~ year", year)
//   const month = new Date().getMonth();
//   console.log("🚀 ~ file: RenderDatePicker.js ~ line 15 ~ month", month)
//   const day = new Date().getDate();
//   console.log("🚀 ~ file: RenderDatePicker.js ~ line 17 ~ day", day)

//   const date = `${day}-${month}-${year}`
// const dateTwo = new Date(year,month,day);
// console.log("🚀 ~ file: RenderDatePicker.js ~ line 21 ~ dateTwo", dateTwo)
  // console.log("editDate", editDate);
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

import React, { useState } from "react";
import { DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

function BasicDateTimePicker(props) {
  const { label, value, onChange } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        label={label}
        inputVariant="outlined"
        value={new Date(value)}
        onChange={(value) => {
          onChange(value);
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default BasicDateTimePicker;

import React from "react";
//import Radio from '@material-ui/core/Radio';
import RadioGroup from "@material-ui/core/RadioGroup";
import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

export default function RadioButtonsGroup({ onChange, value }) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Plan</FormLabel>
      <MuiRadioGroup>
        <RadioGroup aria-label="plan">
          <FormControlLabel
            value="Virtual"
            name="plan"
            checked={value === "Virtual"}
            control={<Radio />}
            label="Virtual"
            onChange={onChange}
          />
          <FormControlLabel
            value="In-person"
            name="plan"
            checked={value === "In-person"}
            control={<Radio />}
            label="In-person"
            onChange={onChange}
          />
        </RadioGroup>
      </MuiRadioGroup>
    </FormControl>
  );
}

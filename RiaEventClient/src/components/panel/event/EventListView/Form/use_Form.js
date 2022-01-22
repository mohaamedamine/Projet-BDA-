import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState({
    ...initialState,
    startDate: new Date(),
    endDate: new Date(),
  });

  const onChange = (event, start = null, end = null) => {
    if (start) setValues({ ...values, startDate: start.toISOString() });
    else if (end) setValues({ ...values, endDate: end.toISOString() });
    else setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};

export function validateEvent(values) {
  var errors = {
    title: "",
    description: "",
    plan: "",
    location: "",
    startDate: "",
    endDate: "",
  };
  for (let key of Object.keys(values))
    if (values[key].trim().length === 0)
      errors = { ...errors, [key]: "Field required" };

  var valid = true;
  for (let key of Object.keys(errors))
    if (errors[key].length > 0) valid = false;
  console.log(errors);
  return { _errors: errors, valid };
}

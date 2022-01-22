export default function validateGuest(values) {
  console.log(values);
  var errors = {
    email: "",
    reference: "",
  };
  for (let key of Object.keys(values))
    if (values[key].trim().length === 0)
      errors = { ...errors, [key]: "Field required" };

  var regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!values.email.match(regex))
    errors = { ...errors, email: "Invalid email address" };

  var valid = true;
  for (let key of Object.keys(errors))
    if (errors[key].length > 0) valid = false;
  console.log({ errors, valid });
  return { _errors: errors, valid };
}

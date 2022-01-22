import React, { useState, useEffect, useContext } from "react";
import { Button, Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./Form/useForm";
import { useMutation } from "@apollo/client";
import { ADD_GUEST } from "../../../Queries&Mutation/mutations";
import { sendEmail } from "../../../../AxiosFunctions";
import { AuthContext } from "../../../../context/authContext";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const initialFValues = {
  //id: 0,
  firstName: "",
  lastName: "",
  email: "",
  reference: "",
};

export default function GuestForm(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const { addOrEdit, recordForEdit } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [add_guest, { error, loading }] = useMutation(ADD_GUEST, {
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : {}
      );
    },
    onCompleted(data) {
      const ev = context.state.events.find((e) => e.reference === reference);
      console.log(context.state.events);
      //window.location.reload(false);
      if (ev) {
        sendEmail({
          destination: email,
          object: "RiaEvent Invitation",
          body: `You have been added as a guest to assist Ria event.
          Customer : ${context.user.firstName} ${context.user.lastName}.
           Event title : ${ev.title} 
           Event description : ${ev.description} 
           Start Date : ${new Date(ev.startDate).toLocaleTimeString(
             "en-US",
             dateOptions
           )}.
           End Date :${new Date(ev.endDate).toLocaleTimeString(
             "en-US",
             dateOptions
           )}.
           Event  reference : ${ev.reference} .
           Plan :  ${ev.plan}
           Location :  ${ev.location}.

           You are invited to consult RiaEvent Platform to assist your event.

           `,
        }).catch((err) => console.error(err));
      }
      props.setOpenPopup(false);
      //  window.location.reload(false);
    },
  });
  const addGuest = () => {
    add_guest({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        reference: reference,
      },
    });
  };

  const {
    values,
    setValues,

    //handleInputChange,
  } = useForm(initialFValues, true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ maxWidth: "xs" }}>
        <PersonAddIcon
          style={{
            marginLeft: "120px",
            fontSize: "120px",
            color: "	#6082B6",
          }}
        />

        <Grid style={{ paddingTop: "20px" }}>
          <Controls.Input
            style={{
              width: "250px",
              marginTop: "30px",
              marginLeft: "70px",
            }}
            fullWidth
            name="firstName"
            label="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            error={errors.firstName}
          />
          <Controls.Input
            style={{
              width: "250px",

              marginLeft: "70px",
            }}
            fullWidth
            name="lastName"
            label="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            error={errors.lastName}
          />

          <Controls.Input
            style={{
              width: "250px",

              marginLeft: "70px",
            }}
            label="Email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={errors.email}
          />

          <Controls.ComboBox
            label="Event Reference"
            fullWidth
            setReference={setReference}
            name="event"
            onChange={(e, r) => {
              setReference(r);
            }}
            error={errors.reference}
          />
        </Grid>
        <div>
          <Button
            style={{
              backgroundColor: "#303f9f",
              color: "#FFF",
              width: "250px",
              marginTop: "30px",
              marginLeft: "70px",
            }}
            type="submit"
            text="Submit"
            onClick={addGuest}
          >
            Add
          </Button>
        </div>
      </Grid>
    </Form>
  );
}

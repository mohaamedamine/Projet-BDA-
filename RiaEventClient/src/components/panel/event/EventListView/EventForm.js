import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { Form } from "./Form/useForm";
import Button from "@material-ui/core/Button";
//import GoogleMaps from './controls/GoogleMaps';
import { ADD_EVENT } from "../../../Queries&Mutation/mutations";
import { useMutation } from "@apollo/client";
import { useForm } from "./Form/use_Form";
import { EVENT_QUERY } from "../../../Queries&Mutation/Queries";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
export default function EventForm() {
  function Reference() {
    var ref = "Event-";
    var possible = "0123456789";

    for (var i = 0; i < 5; i++)
      ref += possible.charAt(Math.floor(Math.random() * possible.length));

    return ref;
  }

  //console.log(Reference());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    location: "",
  });
  const { values, onChange, onSubmit } = useForm(createEventCallback, {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    reference: Reference(),
    location: "",
    plan: "Virtual",
  });
  const [createEvent, { loading }] = useMutation(ADD_EVENT, {
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : {}
      );
    },
    onCompleted(data) {
      window.location.reload(false);
    },
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: EVENT_QUERY,
      });
      //data.getEvents = [result.data.createEvent, ...data.getEvents];
      proxy.writeQuery({ query: EVENT_QUERY, data });
      values.title = "";
      values.description = "";
      values.location = "";
      values.plan = "";
      values.startDate = "";
      values.endDate = "";
      //values.reference = "";
    },
  });
  function createEventCallback() {
    createEvent();
  }

  return (
    <>
      <Form
        onSubmit={(e) => onSubmit(e, startDate, endDate)}
        style={{ maxWidth: "100%" }}
      >
        <Grid container>
          <>
            <EventAvailableIcon
              style={{
                marginBottom: "50px",
                marginLeft: "200px",
                fontSize: "120px",
                color: "	#6082B6",
              }}
            />
          </>

          <Grid item xs={6}>
            <Controls.Input
              variant="outlined"
              name="title"
              label="Title"
              onChange={onChange}
              value={values.title}
              error={errors.title}
            />

            <Controls.Input
              variant="outlined"
              label="Description"
              name="description"
              onChange={onChange}
              value={values.description}
              error={errors.description}
            />

            <Controls.Input
              label="Reference"
              name="reference"
              disabled
              value={values.reference}
              // error={errors.firstName}
            />
            <Controls.Input
              label="Location"
              variant="outlined"
              name="location"
              onChange={onChange}
              value={values.location}
              error={errors.location}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.BasicDateTimePicker
              name="startDate"
              label="Start Date"
              onChange={(e) => {
                setStartDate(e);
                onChange(e, e, null);
              }}
              value={startDate}
            />
            <Controls.BasicDateTimePicker
              name="endDate"
              label="End Date"
              onChange={(e) => {
                setEndDate(e);
                onChange(e, null, e);
                console.log(e);
              }}
              value={endDate}
            />
            <Controls.RadioButtonGroup
              onChange={(e) => onChange(e, null, null)}
              value={values.plan}
            />

            <div>
              <Button
                style={{
                  backgroundColor: "#303f9f",
                  color: "#FFF",
                  width: "230px",
                  marginTop: "20px",
                }}
                type="submit"
                text="Submit"
                // onClick={refreshPage}
              >
                Add
              </Button>
            </div>
          </Grid>
        </Grid>
      </Form>
    </>
  );
}

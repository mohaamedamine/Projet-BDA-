import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { Form } from "./Form/useForm";
import Button from "@material-ui/core/Button";
//import GoogleMaps from './controls/GoogleMaps';
import { UPDATE_EVENT } from "../../../Queries&Mutation/mutations";
import { useMutation } from "@apollo/client";
import { useForm } from "./Form/use_Form";
import { EVENT_QUERY } from "../../../Queries&Mutation/Queries";
//import { AuthContext } from "../../../../context/authContext";

export default function UpdateForm({ event }) {
  // const context = useContext(AuthContext);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    location: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { values, onChange, onSubmit } = useForm(updateEventCallback, event);
  const [updateEvent, { error }] = useMutation(UPDATE_EVENT, {
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : {}
      );
    },
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: EVENT_QUERY,
      });
      //data.getEvents = [result.data.createEvent, ...data.getEvents];
      proxy.writeQuery({ query: EVENT_QUERY, data });
      values.id = "";
      values.title = "";
      values.description = "";
      values.location = "";
      values.plan = "virtual";
      values.startDate = "";
      values.endDate = "";
    },
  });
  function updateEventCallback() {
    updateEvent();
  }
  console.log(event);
  return (
    <>
      <Form onSubmit={onSubmit} style={{ maxWidth: "100%" }}>
        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              name="title"
              label="Title"
              onChange={onChange}
              value={values.title}
              error={errors.title}
            />
            <Controls.Input
              label="Description"
              name="description"
              onChange={onChange}
              value={values.description}
              error={errors.description}
            />
            <Controls.Input
              label="Location"
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
              //label="Virtual/in-person"
              name="plan"
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
                onClick={refreshPage}
              >
                Update
              </Button>
            </div>
          </Grid>
        </Grid>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li></li>
          </ul>
        </div>
      )}
    </>
  );
}
function refreshPage() {
  window.location.reload(false);
}

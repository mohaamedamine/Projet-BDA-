import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useQuery } from "@apollo/client";
import { EVENT_QUERY } from "../../../../Queries&Mutation/Queries";

export default function ComboBox(props) {
  const { name, label, value, setReference } = props;
  const { loading, error, data } = useQuery(EVENT_QUERY);
  if (loading) return <p>Loading events</p>;
  if (error) return <p>Something went wrong</p>;
  const EventTitles = data.getEvents.map((event) => event.reference);

  return (
    <Autocomplete
      onChange={(event, value) => setReference(value)}
      ChipProps
      id="combo-box-demo"
      options={EventTitles}
      getOptionLabel={(option) => option}
      style={{ width: 200 }}
      renderInput={(params) => (
        <TextField
          style={{
            width: "250px",

            marginLeft: "70px",
          }}
          name={name}
          label={label}
          value={value}
          {...params}
          variant="outlined"
        />
      )}
    />
  );
}

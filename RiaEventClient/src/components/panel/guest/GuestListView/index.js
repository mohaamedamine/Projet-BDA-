/* eslint-disable linebreak-style */
import React from "react";
import { Box, Container } from "@material-ui/core";
//import Page from 'src/components/Page';
import Results from "./Results";
import Toolbar from "./Toolbar";
//import data from "./data";
import Navbar from "../../Navbar/Navbar";
import { useQuery } from "@apollo/client";
import { GUEST_QUERY } from "../../../Queries&Mutation/Queries";

const GuestListView = () => {
  //const classes = useStyles();

  const { loading, error, data } = useQuery(GUEST_QUERY);
  // if (data) console.log(data);
  if (loading) return "Loading";
  //if (!data) return "No Available Guest";
  //if (error) return "Error ";
  //const [guests] = useState(data.getGuests);

  return data && data.getGuests.length > 0 ? (
    <>
      <Navbar />
      <Container maxWidth={false}>
        <Toolbar />
        <Box sx={{ mt: 3 }}>
          <Results guests={data.getGuests} />
        </Box>
      </Container>
    </>
  ) : (
    <div>
      <Navbar />
      <Container maxWidth={false}>
        <Toolbar />
        <Box sx={{ mt: 3 }}></Box>
      </Container>{" "}
    </div>
  );
};

export default GuestListView;

import React, { useContext } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { Pagination } from "@material-ui/lab";
import Page from "../../../page/Page";
import Navbar from "../../Navbar/Navbar";
import Toolbar from "./Toolbar";
import EventCard from "./EventCard";
import { AuthContext } from "../../../../context/authContext";
import { EVENT_QUERY } from "../../../Queries&Mutation/Queries";
import { eventContext } from "../../../../context/eventContext";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  eventCard: {
    height: "100%",
  },
}));

function EventListView() {
  const { user } = useContext(AuthContext);
  const context = useContext(eventContext);
  const classes = useStyles();
  const { loading, error } = useQuery(EVENT_QUERY, {
    update(_, { data: { getEvents: eventData } }) {
      // console.log("logging in 1");
      context.login(eventData);
      // console.log("logging in 2");

      //  history.push("/Events");
      //console.log(userData);
    },
  });
  //const events = data.getEvents;
  // const events = useState(data);
  if (loading) return "Loading";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Navbar />
      <Page>
        <Toolbar />

        <div style={{ padding: "1rem" }}>
          {user && (
            <>
              {loading ? (
                <h1>Loading Events ...</h1>
              ) : (
                <Box
                  sx={{
                    minHeight: "100%",
                    py: 3,
                  }}
                >
                  <div>
                    <div
                      style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                    >
                      <EventCard className={classes.card} />
                    </div>
                    <Box
                      style={{
                        paddingTop: "10px",
                        display: "flex",
                        justifyContent: "center",
                        pt: 3,
                      }}
                    >
                      <Pagination color="primary" count={3} size="small" />
                    </Box>
                  </div>
                </Box>
              )}
            </>
          )}
        </div>
      </Page>
    </>
  );
}

export default EventListView;

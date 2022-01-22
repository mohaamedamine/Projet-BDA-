import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";
import ClosedCaptionIcon from "@material-ui/icons/ClosedCaption";
import { AuthContext } from "../../../../context/authContext";
import { useMutation } from "@apollo/react-hooks";
//import { EVENT_QUERY } from "../../../Queries&Mutation/Queries";
import { DELETE_EVENT } from "../../../Queries&Mutation/mutations";
import Popup from "./Popup";
import UpdateForm from "./UpdateForm";
import { ExternalLink } from "react-external-link/dist/index.cjs";
//import { Test } from "../../../../AxiosFunctions";
//import { eventContext } from "../../../../context/eventContext";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 32%",
    maxWidth: `calc( (100% - 32px) / 3) `,
    minWidth: `calc( (100% - 32px) / 3) `,
    [theme.breakpoints.down("md")]: {
      flex: "1 1 49%",
      minWidth: `calc( (100% - 32px) / 2) `,
    },
    [theme.breakpoints.down("xs")]: {
      flex: "1 1 100%",
      minWidth: `calc( (100% - 32px)) `,
    },
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
  card: {},
}));
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function EventCard(props) {
  //const eventId = props.match.params.eventId;
  //Update Mutation

  //
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [updated, setUpdated] = useState(false);

  React.useEffect(() => {
    console.log("refreshing");
  }, [updated]);

  return context.state.events.map((event) => {
    return (
      <>
        {context.user && (
          <ECard
            event={event}
            classes={classes}
            setUpdated={setUpdated}
            updated={updated}
          />
        )}
      </>
    );
  });
}
EventCard.propTypes = {
  className: PropTypes.string,
  event: PropTypes.object.isRequired,
};
function refreshPage() {
  window.location.reload(false);
}
export default EventCard;
const ECard = ({ event, classes, setUpdated, updated }) => {
  const [deleteEvent] = useMutation(DELETE_EVENT, {
    variables: { id: event.id, reference: event.reference },
    onCompleted() {
      window.location.reload(false);
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [openUpdatePopup, setUpdatePopup] = useState(false);
  console.log(event);
  return (
    <>
      <Card
        className={classes.root}
        sx={{
          display: "flex",
          flexDirection: "column",
          // height: "100%",
        }}
      >
        <CardHeader
          avatar={
            <ExternalLink href="https://zoom.us/wc/join/3934750781?wpk=wcpkbd200d7434b21a844325d6f70c3b3d19">
              <IconButton onClick>
                <PlayArrowIcon style={{ color: "#1c2237" }} />
              </IconButton>
            </ExternalLink>
          }
          action={
            <>
              <IconButton onClick={() => setUpdatePopup(true)}>
                <UpdateIcon style={{ color: "#00FF00" }} />
              </IconButton>

              <IconButton>
                <DeleteIcon
                  reference={event.reference}
                  style={{ color: "#F45" }}
                  onClick={() => {
                    deleteEvent();
                    setUpdated(!updated);
                  }}
                />
              </IconButton>
            </>
          }
        />
        <CardContent>
          <Box
            style={{ paddingLeft: "45%", paddingBottom: "1rem" }}
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 3,
            }}
          >
            <Avatar alt="Event" variant="square" />
          </Box>

          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {event.title}
          </Typography>
          <Typography align="center" color="textPrimary" variant="body1">
            {event.description}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
            <Grid className={classes.statsItem} item>
              <AccessTimeIcon className={classes.statsIcon} color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Start Date :
                {new Date(event.startDate).toLocaleTimeString(
                  "en-US",
                  dateOptions
                )}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item>
              <ClosedCaptionIcon className={classes.statsIcon} color="action" />
              <Button>
                <Typography
                  color="textSecondary"
                  display="inline"
                  variant="body2"
                >
                  Reference : {event.reference}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <Popup
        title="Delete Event ?"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Button
          onClick={() => {
            refreshPage();
          }}
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            setOpenPopup(false);
          }}
        >
          No{" "}
        </Button>
      </Popup>
      <Popup
        openPopup={openUpdatePopup}
        setOpenPopup={setUpdatePopup}
        title="Update Event"
      >
        <UpdateForm event={event} />
      </Popup>
    </>
  );
};
EventCard.propTypes = {
  event: PropTypes.object.isRequired,
};

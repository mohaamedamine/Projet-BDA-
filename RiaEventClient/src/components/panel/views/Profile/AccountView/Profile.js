import React, { useContext } from "react";
import { AuthContext } from "../../../../../context/authContext";
import PropTypes from "prop-types";
//import clsx from "clsx";
import moment from "moment";
import { Avatar, Card, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  return (
    <Card
      style={{
        flex: "1",
        padding: "0.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      {...rest}
    >
      <Avatar className={classes.avatar} src={user.avatar} />
      <Typography color="textPrimary" gutterBottom variant="h6">
        {user.firstName} {user.lastName}
      </Typography>

      <Typography
        // className={classes.dateText}
        color="textSecondary"
        variant="body1"
      >
        {`${moment().format("hh:mm A")}`}
      </Typography>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;

import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../../context/authContext";

import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../../../../Queries&Mutation/mutations";
import { useForm } from "../../../../../util/hooks";

const useStyles = makeStyles(() => ({
  root: {},
}));

const ProfileDetails = ({ className, ...rest }) => {
  const { user } = useContext(AuthContext);

  const classes = useStyles();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
  });

  const { onChange, onSubmit, values } = useForm(UpdateUserCallback, {
    firstName: `${user.firstName}`,
    lastName: `${user.lastName}`,
    email: `${user.email}`,
    phone: `${user.phone}`,
    id: `${user.id}`,
  });

  const [UpdateProfile, { loading }] = useMutation(UPDATE_PROFILE, {
    update(_, { data: { user: userData } }) {},
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : {}
      );
    },
    onCompleted(data) {
      console.log(data.UpdateProfile);
      context.login(data.UpdateProfile);
    },
    variables: values,
  });

  function UpdateUserCallback() {
    UpdateProfile();
  }

  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                onChange={onChange}
                required
                variant="outlined"
                value={values.firstName}
                helperText={errors.firstName}
                error={Boolean(errors.firstName)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={onChange}
                required
                variant="outlined"
                value={values.lastName}
                helperText={errors.lastName}
                error={Boolean(errors.lastName)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                required
                disabled
                variant="outlined"
                value={values.email}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={onChange}
                variant="outlined"
                value={values.phone}
                helperText={errors.phone}
                error={Boolean(errors.phone)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                onChange={onChange}
                variant="outlined"
                helperText={errors.password}
                error={Boolean(errors.password)}
              />
            </Grid>
            <Grid item md={6} xs={12}></Grid>
          </Grid>
        </CardContent>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "1rem ",
          }}
        >
          <Button type="submit" color="primary" variant="contained">
            Save details
          </Button>
        </div>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;

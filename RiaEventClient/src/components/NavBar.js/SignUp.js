import React, { useState, useContext } from "react";
//import * as Yup from "yup";
import { Formik } from "formik";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import SignIn from "./SignIn";
import Popup from "./Popup";
import { CREATE_USER } from "../Queries&Mutation/mutations";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../util/hooks";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
export default function SignUp(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const [openPopup, setOpenPopup] = useState(false);

  // Mutations //
  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [register, { loading }] = useMutation(CREATE_USER, {
    update(_, { data: { register: userData } }) {
      // console.log("logging in 1");
      context.login(userData);
      // console.log("logging in 2");

      history.push("/Events");
      // console.log(userData);
    },
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : {}
      );
    },
    variables: values,
  });

  function registerUserCallback() {
    register();
  }

  return (
    <div>
      <Formik>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <AccountBoxIcon
              style={{
                marginLeft: "100px",
                fontSize: "120px",
                color: "	#6082B6",
              }}
            />

            <Typography
              style={{
                marginLeft: "125px",
                fontSize: "20px",
                color: "	#6082B6",
              }}
            >
              Sign Up
            </Typography>
            <form
              style={{ marginTop: "30px" }}
              noValidate
              onSubmit={onSubmit}
              className={loading ? "loading" : ""}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    helperText={errors.firstName}
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="First Name"
                    onChange={onChange}
                    error={Boolean(errors.firstName)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    helperText={errors.lastName}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="Last Name"
                    onChange={onChange}
                    error={Boolean(errors.lastName)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    helperText={errors.email}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={onChange}
                    error={Boolean(errors.email)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    helperText={errors.password}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={onChange}
                    error={Boolean(errors.password)}
                  />
                </Grid>
              </Grid>
              <Button
                style={{ marginTop: "20px" }}
                type="submit"
                fullWidth
                variant="contained"
                //className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link
                    onClick={() => {
                      setOpenPopup(true);
                    }}
                    variant="body2"
                  >
                    Don't have account yet? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}></Box>

          <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
            <SignIn />
          </Popup>
        </Container>
      </Formik>
    </div>
  );
}

import React, { useState, useContext } from "react";
import { Formik } from "formik";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import SignUp from "./SignUp";
import Popup from "./Popup";
import { LOGIN } from "../Queries&Mutation/mutations";
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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function SignIn(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const [openPopup, setOpenPopup] = useState(false);

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN, {
    update(_, { data: { login: userData } }) {
      // console.log("logging in 1");
      //context.login(userData);
      // console.log("logging in 2");
      //history.push("/Events");
      //console.log(userData);
    },
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : {}
      );
    },
    onCompleted(data) {
      context.login(data.login);
      history.push("/Events");
    },
    variables: values,
  });

  function loginUserCallback() {
    login();
  }

  return (
    <div>
      <Formik>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <ExitToAppIcon
              style={{
                marginLeft: "100px",
                fontSize: "120px",
                color: "	#6082B6",
              }}
            />

            <Typography
              style={{
                marginLeft: "130px",
                fontSize: "20px",
                color: "	#6082B6",
              }}
            >
              Sign In
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
                Sign In
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link
                    onClick={() => {
                      setOpenPopup(true);
                    }}
                    variant="body2"
                  >
                    Don't have account yet? Sign up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}></Box>

          <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
            <SignUp />
          </Popup>
        </Container>
      </Formik>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li style={{ color: "#FF0000" }} key={value}>
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

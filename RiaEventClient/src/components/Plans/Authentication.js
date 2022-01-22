import React, { useState } from "react";
import { Formik } from "formik";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
//import { AUTHENTICATION_GUEST } from "../Queries&Mutation/mutations";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";

import PeopleIcon from "@material-ui/icons/People";
//import { AuthContext } from "../../context/authContext";
//import { useForm } from "../../util/hooks";
import Popup from "../panel/guest/GuestListView/Popup";
import GetQR from "../GuestPanel/Views/GetQR";
import axios from "axios";
import validateGuest from "./logicGuest";

export default function SignInGuest(props) {
  // const context = useContext(AuthContext);
  const [errors, setErrors] = useState({
    email: "",
    reference: "",
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [values, setValues] = useState({
    email: "",
    reference: "",
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };
  //const history = useHistory();

  return (
    <div>
      <Formik>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <PeopleIcon
              style={{
                marginLeft: "110px",
                fontSize: "120px",
                color: "	#6082B6",
              }}
            />

            <Typography
              style={{
                marginLeft: "110px",
                fontSize: "20px",
                color: "	#6082B6",
              }}
            >
              Virtual Event
            </Typography>
            <form style={{ marginTop: "30px" }} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    helperText={errors.email}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    onChange={onChange}
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={errors.email !== ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    helperText={errors.reference}
                    variant="outlined"
                    required
                    fullWidth
                    name="reference"
                    label="Event Reference"
                    type="password"
                    id="reference"
                    autoComplete="current-reference"
                    onChange={onChange}
                    error={errors.reference !== ""}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={() => {
                    const { valid, _errors } = validateGuest(values);
                    if (!valid) {
                      setErrors(_errors);
                      return;
                    }
                    console.log("checking");
                    //console.log(scanResultFile);
                    axios({
                      url: "http://localhost:5000/graphql",
                      method: "post",
                      data: {
                        query: `mutation   loginGuest($email:String! $reference:String!) {

   loginGuest(email:$email reference:$reference)
  }
    
    `,
                        variables: {
                          email: values.email,
                          reference: values.reference,
                        },
                      },
                    })
                      .then((result) => {
                        console.log(result.data.data.loginGuest);
                        if (result.data.data.loginGuest === "Invited") {
                          console.log(result.data.data.loginGuest);
                          window.location.href =
                            "https://zoom.us/wc/join/3934750781?wpk=wcpkbd200d7434b21a844325d6f70c3b3d19";
                        } else alert("Not Invited");
                      })
                      .catch((err) => console.error(err));
                  }}
                  fullWidth
                  variant="contained"
                  style={{ marginTop: "20px" }}
                  //className={classes.submit}
                >
                  Join Event
                </Button>
              </Grid>
              <Grid item>
                <Link
                  onClick={() => {
                    setOpenPopup(true);
                  }}
                  variant="body2"
                >
                  In-Person Event? Get Qr{" "}
                </Link>
              </Grid>
            </form>
          </div>
          <Box mt={5}></Box>
        </Container>
      </Formik>

      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <GetQR setOpenPopup={setOpenPopup} />
      </Popup>
    </div>
  );
}

import React, { useState } from "react";

import { Formik } from "formik";

import CssBaseline from "@material-ui/core/CssBaseline";

import Grid from "@material-ui/core/Grid";
import {
  Box,
  Button,
  Container,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import Authentication from "../../Plans/Authentication";
import QRCode from "qrcode";
import Popup from "../../panel/guest/GuestListView/Popup";
import validateQr from "./logicQR";

function GetQR() {
  const [imageUrl, setImageUrl] = useState("");
  const [Open, setOpen] = useState(true);
  const generateQrCode = async (firstName, lastName, email, reference) => {
    const { valid, _errors } = validateQr(values);
    if (!valid) {
      setErrors(_errors);
      return;
    }
    try {
      const response = await QRCode.toDataURL(
        `Name :${firstName}${lastName} Email: ${email} Event Reference:${reference}`
      );
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  const [openPopup, setOpenPopup] = useState(false);
  // const [openForm, setClose] = useState(true);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    reference: "",
  });
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    reference: "",
  });
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

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
                marginLeft: "100px",
                fontSize: "20px",
                color: "	#6082B6",
              }}
            >
              In-Person Event
            </Typography>

            <form setOpen={Open} style={{ marginTop: "30px" }} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    name="firstName"
                    required
                    fullWidth
                    onChange={onChange}
                    label="First Name"
                    autoComplete="firstName"
                    helperText={errors.firstName}
                    error={errors.firstName !== ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    name="lastName"
                    fullWidth
                    onChange={onChange}
                    helperText={errors.lastName}
                    error={errors.lastName !== ""}
                    label="last Name"
                    autoComplete="lastName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    variant="outlined"
                    label="Email"
                    onChange={onChange}
                    helperText={errors.email}
                    error={errors.email !== ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="reference"
                    variant="outlined"
                    label="Event Reference"
                    onChange={onChange}
                    helperText={errors.reference}
                    error={errors.reference !== ""}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  style={{ marginTop: "20px" }}
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    generateQrCode(
                      values.firstName,
                      values.lastName,
                      values.email,
                      values.reference
                    );
                    setOpen(false);
                  }}
                >
                  Generate
                </Button>
              </Grid>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link
                    onClick={() => {
                      setOpenPopup(true);
                    }}
                    variant="body2"
                  >
                    Virtual Event?{" "}
                  </Link>
                </Grid>
              </Grid>
              {imageUrl ? (
                <>
                  <p>Click to download your code </p>
                  <a href={imageUrl} download>
                    <img src={imageUrl} alt="img" />
                  </a>
                </>
              ) : null}
            </form>
          </div>
          <Box mt={5}></Box>
          <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
            <Authentication />
          </Popup>
        </Container>
      </Formik>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#1c2237",
    color: "#fff",
    padding: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));
export default GetQR;

/* eslint-disable linebreak-style */
import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../../../../page/Page";
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";
import Navbar from "../../../Navbar/Navbar";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

function Account() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Page className={classes.root} title="Account">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Profile />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <ProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
}

export default Account;

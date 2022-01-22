import React from "react";
import { Container, Grid } from "@material-ui/core";
//import Page from 'src/components/Page';
import Budget from "./Events";
import LatestOrders from "./LatestOrders";
import LatestEvents from "./LatestEvents";
import Presence from "./Presence";
import TasksProgress from "./TasksProgress";
import TotalGuests from "./TotalGuests";
import TotalProfit from "./TotalProfit";
import Navbar from "../../Navbar/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalGuests />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Presence />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestEvents />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}></Grid>
          <Grid item lg={12} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;

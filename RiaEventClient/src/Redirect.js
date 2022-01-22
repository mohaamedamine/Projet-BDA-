import Home from "./components/pages/HomePage/Home";
import { Route, Switch } from "react-router-dom";
import SignUp from "./components/NavBar.js/SignUp";
import SignIn from "./components/NavBar.js/SignIn";
import Footer from "./components/pages/Footer.js/Footer";
import Check from "./components/panel/views/Check/check";
import GetQR from "./components/GuestPanel/Views/GetQR";
import Stats from "./components/panel//Stats/Stats";
import AccountView from "./components/panel/views/Profile/AccountView";
import AuthRoute from "./util/AuthRoute";
import EventListView from "./components/panel/event/EventListView/index";
import Meeting from "./components/call/Meeting";
import GuestListView from "./components/panel/guest/GuestListView/index";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { useQuery } from "@apollo/client";
import { EVENT_QUERY } from "./components/Queries&Mutation/Queries";

function Redirect() {
  const context = useContext(AuthContext);

  var { loading, error, data } = useQuery(EVENT_QUERY);
  if (data && context.state.events.length < 1) {
    context.setEvents(data.getEvents);
    console.log("context setup");
  } 

  return (
    (data && (
      <>
        <Switch>
          <Route path="/Check" exact component={Check}></Route>
          <AuthRoute path="/GetQr" exact component={GetQR}></AuthRoute>
          <Route path="/" exact component={Home}></Route>
          <Route path="/Events" exact component={EventListView}></Route>
          <Route path="/guests" exact component={GuestListView}></Route>
          <Route path="/Meeting" exact component={Meeting}></Route>
          <AuthRoute path="/sign-up" exact component={SignUp}></AuthRoute>
          <AuthRoute path="/sign-in" exact component={SignIn}></AuthRoute>
          <Route path="/Stats" exact component={Stats}></Route>
          <Route path="/Profile" exact component={AccountView}></Route>
        </Switch>
        {/*<Route path='/sign-up' component={AccountBox} />*/}
        {/*     <AuthRoute exact path="/login" component = {LoginForm} />
            <AuthRoute exact path="/login" component = {SignupForm} />
           */}
        <Footer />
      </>
    )) || (
      <>
        <Switch>
          <Route path="/Check" exact component={Check}></Route>
          <AuthRoute path="/GetQr" exact component={GetQR}></AuthRoute>
          <Route path="/" exact component={Home}></Route>
          <Route path="/Events" exact component={EventListView}></Route>
          <Route path="/guests" exact component={GuestListView}></Route>
          <Route path="/Meeting" exact component={Meeting}></Route>
          <AuthRoute path="/sign-up" exact component={SignUp}></AuthRoute>
          <AuthRoute path="/sign-in" exact component={SignIn}></AuthRoute>
          <Route path="/Stats" exact component={Stats}></Route>
          <Route path="/Profile" exact component={AccountView}></Route>
        </Switch>
        {/*<Route path='/sign-up' component={AccountBox} />*/}
        {/*     <AuthRoute exact path="/login" component = {LoginForm} />
            <AuthRoute exact path="/login" component = {SignupForm} />
           */}
        <Footer />
      </>
    )
  );
}

export default Redirect;

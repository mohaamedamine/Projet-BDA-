import React, { Component } from "react";
import "./App.css";
//import Home from "./components/pages/HomePage/Home";
import { BrowserRouter } from "react-router-dom";
//import SignUp from "./components/NavBar.js/SignUp";
//import SignIn from "./components/NavBar.js/SignIn";
//import Footer from "./components/pages/Footer.js/Footer";
//import Check from "./components/panel/views/Check/check";

//import GetQR from "./components/GuestPanel/Views/GetQR";
//import Stats from "./components/panel//Stats/Stats";
//import AccountView from "./components/panel/views/Profile/AccountView";
//import AuthRoute from "./util/AuthRoute";
//import EventListView from "./components/panel/event/EventListView/index";
//import Meeting from "./components/call/Meeting";
import { AuthProvider } from "./context/authContext";
import Redirect from "./Redirect";
class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: [],
    };
  }

  render() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Redirect />
        </BrowserRouter>
      </AuthProvider>
    );
  }
}

export default App;

// var { loading, error, data } = useQuery(EVENT_QUERY);
// if (data && context.state.events.length < 1) {
//   context.setEvents(data.getEvents);
//   console.log("context setup");
// }

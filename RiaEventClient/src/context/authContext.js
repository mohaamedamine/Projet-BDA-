import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  events: [],
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  setEvents: (eventData) => {},
  getEvents: () => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "SET_EVENTS":
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  }

  function setEvents(eventData) {
    // localStorage.setItem("jwtToken", userData.token);
    console.log("Setting events...");
    dispatch({
      type: "SET_EVENTS",
      payload: eventData,
    });
  }

  function getEvents() {
    return state;
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, state, login, logout, setEvents, getEvents }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };

import React, { useReducer, createContext } from "react";
const initialState = {
  events: [],
};
const eventContext = createContext({
  event: null,
  setEvents: (eventData) => {},
  getEvents: () => {},
  logout: () => {},
});

function eventReducer(state, action) {
  switch (action.type) {
    case "SET_EVENTS":
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
}
function EventsProvider(props) {
  const [state, dispatch] = useReducer(eventReducer, initialState);

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
    <eventContext.Provider
      value={{ events: state, getEvents, setEvents }}
      {...props}
    />
  );
}

export { EventsProvider, eventContext };

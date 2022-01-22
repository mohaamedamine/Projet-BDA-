import { gql } from "graphql-tag";
export const EVENT_QUERY = gql`
  query {
    getEvents {
      id
      title
      description
      plan
      location
      startDate
      endDate
      reference
    }
  }
`;
export const GUEST_QUERY = gql`
  query {
    getGuests {
      id
      firstName
      lastName
      email
      createdAt
      reference
    }
  }
`;
export const MESSAGE_QUERY = gql`
  {
    getMessage
  }
`;
export const FETCH_Event_QUERY = gql`
  query ($eventId: ID!) {
    getEvent(eventId: $eventId) {
      id
      title
      description
      startDate

      guests {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

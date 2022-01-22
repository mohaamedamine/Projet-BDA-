import gql from "graphql-tag";
export const CREATE_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
      email
      firstName
      lastName
      createdAt
      token
    }
  }
`;
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      firstName
      lastName
      createdAt
      token
    }
  }
`;
export const AUTHENTICATION_GUEST = gql`
  mutation loginGuest($email: String!, $reference: String!) {
    loginGuest(email: $email, reference: $reference) {
      id
      email
      firstName
      lastName
      createdAt
      token
    }
  }
`;
export const ADD_EVENT = gql`
  mutation createEvent(
    $title: String!
    $description: String!
    $plan: String!
    $location: String!
    $startDate: String!
    $endDate: String!
    $reference: String!
  ) {
    createEvent(
      title: $title
      description: $description
      plan: $plan
      location: $location
      startDate: $startDate
      endDate: $endDate
      reference: $reference
    ) {
      id
    }
  }
`;
export const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!, $reference: String!) {
    deleteEvent(id: $id, reference: $reference)
  }
`;
export const DELETE_GUEST = gql`
  mutation deleteGuest($id: ID!) {
    deleteGuest(id: $id)
  }
`;
export const UPDATE_EVENT = gql`
  mutation updateEvent(
    $id: ID!
    $title: String!
    $description: String!
    $plan: String!
    $location: String!
    $startDate: String!
    $endDate: String!
  ) {
    updateEvent(
      id: $id
      title: $title
      description: $description
      plan: $plan
      location: $location
      startDate: $startDate
      endDate: $endDate
    )
  }
`;
export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $phone: String
    $password: String
  ) {
    UpdateProfile(
      id: $id
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      password: $password
    ) {
      id
      firstName
      lastName

      token
    }
  }
`;
export const ADD_GUEST = gql`
  mutation addGuest(
    $firstName: String!
    $lastName: String!
    $email: String!
    $reference: String!
  ) {
    addGuest(
      firstName: $firstName
      lastName: $lastName
      email: $email
      reference: $reference
    ) {
      id
      reference
    }
  }
`;

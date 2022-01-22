const { gql } = require("apollo-server");

module.exports = gql`
  type Event {
    id: ID!
    title: String!
    description: String!
    createdAt: String!
    plan: String!
    location: String!
    startDate: String!
    endDate: String!
    guests: [Guest]
  }
  type Guest {
    id: ID!
    createdAt: String!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Customer {
    id: ID!
    email: String!
    password: String!
    token: String!
    firstName: String!
    lastName: String!
    createdAt: String!
  }
  input RegisterInput {
    firstName: String!
    lastName: String!
    password: String!
    email: String!
  }
  type Query {
    getEvents: [Event]
    getEvent(eventId: ID!): Event
    getMessage: String
  }
  type Mutation {
    register(registerInput: RegisterInput): Customer!
    login(email: String!, password: String!): Customer!
    createEvent(
      title: String!
      description: String!
      plan: String!
      location: String!
      startDate: String!
      endDate: String!
      reference: String!
    ): Event!
    deleteEvent(eventId: ID!): String!
    createComment(eventId: String!, title: String!): Event!
    deleteComment(eventId: ID!, commentId: ID!): Event!
    addGuest(firstName: String!, lastName: String!, email: String!): Guest!
    deleteGuest(guestId: ID!): Guest!
  }
`;

const eventsResolvers = require("./events");
const usersResolvers = require("./users");
const guestResolvers = require("./guests");
module.exports = {
  Query: {
    ...eventsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...eventsResolvers.Mutation,
    ...guestResolvers.Mutation,
  },
};

const { AuthenticationError, UserInputError } = require("apollo-server");

const Event = require("../../models/Event");
const Guest = require("../../models/Guest");
const checkAuth = require("../../util/check_auth");

module.exports = {
  Mutation: {
    async addGuest(_, { firstName, lastName, email }, context) {
      const customer = checkAuth(context);

      if (firstName.trim() === "") {
        throw new Error("First Name must not be empty");
      }
      if (lastName.trim() === "") {
        throw new Error("Last Name must not be empty");
      }

      if (email.trim() === "") {
        throw new Error("Event location must not be empty");
      }

      const newGuest = new Guest({
        firstName,
        lastName,
        email,
        customer: customer.id,
        author: customer.email,
        createdAt: new Date().toISOString(),
      });

      const guest = await newGuest.save();

      context.pubsub.publish("NEW_EVENT", {
        guest: guest,
      });

      return guest;
    },
    async deleteGuest(_, { guestId }, context) {
      const customer = checkAuth(context);

      try {
        const guest = await Guest.findById(guestId);
        if (customer.email === guest.author) {
          await guest.delete();
          return "guest deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};

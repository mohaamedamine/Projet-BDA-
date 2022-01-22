const { AuthenticationError, UserInputError } = require("apollo-server");

const Event = require("../../models/Event");
const checkAuth = require("../../util/check_auth");

module.exports = {
  Query: {
    async getEvents() {
      try {
        const events = await Event.find().sort({ createdAt: -1 });
        return events;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getEvent(_, { eventId }) {
      try {
        const event = await Event.findById(eventId);
        if (event) {
          return event;
        } else {
          throw new Error("Event not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getMessage() {
      return "bonjour";
    },
  },
  Mutation: {
    async createEvent(
      _,
      { title, description, plan, location, startDate, endDate, reference },
      context
    ) {
      const customer = checkAuth(context);

      if (title.trim() === "") {
        throw new Error("Event title must not be empty");
      }
      if (description.trim() === "") {
        throw new Error("Event description must not be empty");
      }

      if (location.trim() === "") {
        throw new Error("Event location must not be empty");
      }

      const newEvent = new Event({
        title,
        description,
        plan,
        location,
        startDate,
        endDate,
        reference,
        customer: customer.id,

        author: customer.email,
        createdAt: new Date().toISOString(),
      });

      const event = await newEvent.save();

      context.pubsub.publish("NEW_EVENT", {
        newEvent: event,
      });

      return event;
    },
    async deleteEvent(_, { eventId }, context) {
      const customer = checkAuth(context);

      try {
        const event = await Event.findById(eventId);
        if (customer.email === event.author) {
          await event.delete;
          return "event deleted successfully";
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

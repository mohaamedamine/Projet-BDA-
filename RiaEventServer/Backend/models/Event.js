const { model, Schema } = require("mongoose");

const eventSchema = new Schema({
  title: String,
  description: String,
  plan: String,
  startDate: String,
  endDate: String,
  event: String,
  location: String,
  createdAt: String,

  customer: {
    type: Schema.Types.ObjectId,
    ref: "customers",
  },
  guests: {
    type: Schema.Types.Array,
  },
});

module.exports = model("Event", eventSchema);

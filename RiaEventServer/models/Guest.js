const { model, Schema } = require("mongoose");

const guestSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  createdAt: String,
});

module.exports = model("Guest", guestSchema);

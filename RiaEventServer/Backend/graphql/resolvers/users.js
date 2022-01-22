const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
const { SECRET_KEY } = require("../../config");
const Customer = require("../../models/User");

function generateToken(customer) {
  return jwt.sign(
    {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const customer = await Customer.findOne({ email });

      if (!customer) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, customer.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(customer);

      return {
        ...customer._doc,
        id: customer._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { firstName, lastName, email, password } }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(email, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // TODO: Make sure user does nt already exist
      const customer = await Customer.findOne({ email });
      if (customer) {
        throw new UserInputError("Email is taken", {
          errors: {
            email: "This email is taken",
          },
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new Customer({
        email,
        firstName,
        lastName,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

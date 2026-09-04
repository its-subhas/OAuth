const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name required"],
  },

  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
    trim: true,
  },

  password: {
    type: String,
  },

  image: {
    type: String,
  },

  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model("Users", userSchema);

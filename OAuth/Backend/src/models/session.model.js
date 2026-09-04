const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User is required"],
    },

    accessTokenHash: {
      type: String,
      required: [true, "Access Token is required"],
    },

    revoked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Sessions", sessionSchema);

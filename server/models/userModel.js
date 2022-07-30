const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dictionary: [
      {
        word: {
          type: String,
          required: true,
          unique: true,
        },
        origin: {
          type: String,
          required: true,
          default: "unknown",
        },
        partOfSpeech: {
          type: String,
          required: true,
        },
        definition: {
          type: String,
          required: true,
          unique: "true",
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;

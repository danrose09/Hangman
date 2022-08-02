const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  words: Array,
});

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
        },
      },
    ],
    categories: [categorySchema],
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
const Category = mongoose.model("category", categorySchema);

module.exports = Category;
module.exports = User;

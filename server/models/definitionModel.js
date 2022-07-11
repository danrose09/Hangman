const mongoose = require("mongoose");
const { Schema } = mongoose;

const definitionSchema = new Schema({
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
});

const Definition = mongoose.model("definition", definitionSchema);
module.exports = Definition;

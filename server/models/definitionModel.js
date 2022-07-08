const mongoose = require("mongoose");
const { Schema } = mongoose;

const definitionSchema = new Schema({
  word: String,
  origin: String,
  partOfSpeech: String,
  definition: String,
});

const Definition = mongoose.model("definition", definitionSchema);
module.exports = Definition;

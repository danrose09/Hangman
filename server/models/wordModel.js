const mongoose = require("mongoose");
const { Schema } = mongoose;

const wordSchema = new Schema({
  name: String,
  words: Array,
});

const Word = mongoose.model("word", wordSchema);
module.exports = Word;

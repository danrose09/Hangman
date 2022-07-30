const mongoose = require("mongoose");

const dictionarySchema = new mongoose.Schema({
  terms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "definition",
    },
  ],
});

const Dictionary = mongoose.model("dictionary", dictionarySchema);

module.exports = Dictionary;

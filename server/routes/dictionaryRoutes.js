const express = require("express");
const Definition = require("../models/definitionModel");
const User = require("../models/userModel");

const dictionaryRouter = express.Router();

// dictionaryRouter.get("/", async (req, res) => {
//   const myDictionary = await Definition.find({});
//   myDictionary
//     ? res.json(myDictionary)
//     : res.status(404).send({ msg: "Dictionary not found..." });
// });

dictionaryRouter.get("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  const myDictionary = user.dictionary;

  myDictionary
    ? res.json(myDictionary)
    : res.status(404).send({ msg: "Dictionary not found..." });
});

// dictionaryRouter.put(`/delete/:word`, async (req, res) => {
//   const deletedWord = await Definition.findOneAndDelete({
//     word: req.params.word,
//   });
//   console.log(deletedWord);
// });

module.exports = dictionaryRouter;

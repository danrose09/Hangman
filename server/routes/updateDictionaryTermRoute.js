const express = require("express");
const User = require("../models/userModel");

const updateDictionaryTermRouter = express.Router();

updateDictionaryTermRouter.put("/:word", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const word = user.dictionary.filter((term) => {
    return term.word === req.params.word;
  });

  const updatedWord = {
    word: req.body.word.toLowerCase(),
    partOfSpeech: req.body.partOfSpeech.toLowerCase(),
    origin: req.body.origin,
    definition: req.body.definition.toLowerCase(),
  };

  const userDictionary = user.dictionary;
  const index = userDictionary.indexOf(word[0]);

  if (index !== -1) {
    userDictionary[index] = updatedWord;
  }

  await User.findOneAndUpdate(
    { username: req.body.username },
    { dictionary: userDictionary }
  );
});

module.exports = updateDictionaryTermRouter;

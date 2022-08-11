const express = require("express");
const User = require("../models/userModel");

const addToDictionaryRouter = express.Router();

addToDictionaryRouter.put("/addtomydictionary", async (req, res) => {
  const updateUserDictionary = await User.findOneAndUpdate(
    { username: req.body.username },
    {
      $push: {
        dictionary: {
          word: req.body.word.toLowerCase(),
          partOfSpeech: req.body.partOfSpeech.toLowerCase(),
          origin: req.body.origin,
          definition: req.body.definition.toLowerCase(),
        },
      },
    }
  );

  const update = updateUserDictionary.save();
  res.send(update);
  console.log(update);
});

addToDictionaryRouter.get("/:username/:word", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  const word = user.dictionary.filter((term) => {
    return term.word === req.params.word;
  });

  res.send(word);
});

module.exports = addToDictionaryRouter;
